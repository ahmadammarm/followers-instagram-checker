"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";

interface User {
    value: string;
    href: string;
}

interface StringListData {
    href: string;
    value: string;
}

interface DataItem {
    string_list_data: StringListData[];
}

interface FollowingData {
    relationships_following: DataItem[];
}

interface FileUploaderProps {
    label: string;
    fileType: "followers" | "following";
    onFileUploaded: (data: User[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label, fileType, onFileUploaded }) => {
    const [error, setError] = useState<string>("");
    const [count, setCount] = useState<number | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const fileContent = await file.text();
            const jsonData: any = JSON.parse(fileContent);

            const extractUsername = (item: any, user: any): string => {
                // Priority 1: Explicit value field (common in followers)
                if (user.value) return user.value.toLowerCase();
                
                // Priority 2: Title field in parent (common in following)
                if (item.title) return item.title.toLowerCase();

                // Priority 3: Extract from href URL
                if (user.href) {
                    try {
                        const url = new URL(user.href);
                        const parts = url.pathname.split("/").filter(Boolean);
                        const lastPart = parts[parts.length - 1];
                        return lastPart.toLowerCase();
                    } catch (e) {
                        const parts = user.href.split("/").filter(Boolean);
                        return parts[parts.length - 1].toLowerCase();
                    }
                }
                return "";
            };

            let extractedData: User[] = [];

            if (fileType === "followers") {
                const items = Array.isArray(jsonData) ? jsonData : jsonData.relationships_followers || [];
                extractedData = items.flatMap((item: any) =>
                    item.string_list_data?.map((user: any) => ({
                        href: user.href,
                        value: extractUsername(item, user),
                    })) || []
                );
            } else if (fileType === "following") {
                const items = jsonData.relationships_following || [];
                extractedData = items.flatMap((item: any) =>
                    item.string_list_data?.map((user: any) => ({
                        href: user.href,
                        value: extractUsername(item, user),
                    })) || []
                );
            }

            const cleanData = extractedData.filter(user => user.value && user.href);
            onFileUploaded(cleanData);
            setCount(cleanData.length);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Gagal membaca file. Pastikan upload file JSON nya sesuai yaaaa");
            setCount(null);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="p-6 border-2 border-black rounded-none bg-white mb-4 shadow-neo">
                <label className="block mb-1 text-sm font-black uppercase tracking-wide">{label}</label>
                {count !== null && (
                    <p className="text-xs font-bold text-blue-600 mb-3 uppercase">Terdeteksi: {count} Akun</p>
                )}
                <Input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="w-full"
                />
            </div>
            {error && <p className="text-red-600 font-bold mt-2 mb-4 text-center bg-red-50 border-2 border-red-600 p-2 shadow-neo-sm">{error}</p>}
        </div>
    );
};

export default FileUploader;