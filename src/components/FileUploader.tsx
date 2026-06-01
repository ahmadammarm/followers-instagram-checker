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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const fileContent = await file.text();
            const jsonData: any = JSON.parse(fileContent);

            const extractUsername = (href: string): string => {
                try {
                    // Handle both https://www.instagram.com/username and https://www.instagram.com/_u/username
                    const url = new URL(href);
                    const parts = url.pathname.split("/").filter(Boolean);
                    return parts[parts.length - 1].toLowerCase();
                } catch (e) {
                    const parts = href.split("/").filter(Boolean);
                    return parts[parts.length - 1].toLowerCase();
                }
            };

            let extractedData: User[] = [];

            if (fileType === "followers") {
                // Followers can be an array (old) or an object with relationships_followers (new)
                const items = Array.isArray(jsonData) ? jsonData : jsonData.relationships_followers || [];
                extractedData = items.flatMap((item: any) =>
                    item.string_list_data?.map((user: any) => ({
                        href: user.href,
                        value: extractUsername(user.href),
                    })) || []
                );
            } else if (fileType === "following") {
                const items = jsonData.relationships_following || [];
                extractedData = items.flatMap((item: any) =>
                    item.string_list_data?.map((user: any) => ({
                        href: user.href,
                        value: extractUsername(user.href),
                    })) || []
                );
            }

            // Final filter to ensure we have valid data
            const cleanData = extractedData.filter(user => user.value && user.href);
            onFileUploaded(cleanData);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Gagal membaca file. Pastikan upload file JSON nya sesuai yaaaa");
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="p-6 border-2 border-black rounded-none bg-white mb-4 shadow-neo">
                <label className="block mb-3 text-sm font-black uppercase tracking-wide">{label}</label>
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