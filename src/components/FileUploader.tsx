"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";

interface User {
    value: string;
    href: string;
}

interface FileUploaderProps {
    label: string;
    fileType: "followers" | "following";
    onFileUploaded: (data: User[]) => void;
}


const FileUploader: React.FC<FileUploaderProps> = ({ label, fileType, onFileUploaded }) => {
    const [error, setError] = useState("");

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const fileContent = await file.text();
                const jsonData = JSON.parse(fileContent);

                let extractedData: User[] = [];

                if (fileType === "followers") {
                    if (Array.isArray(jsonData)) {
                        extractedData = jsonData.flatMap((item: any) =>
                            item.string_list_data?.map((user: any) => ({
                                href: user.href,
                                value: user.value,
                            })) || []
                        );
                    } else {
                        throw new Error("Format file follower tidak valid.");
                    }
                } else if (fileType === "following") {
                    if (jsonData.relationships_following && Array.isArray(jsonData.relationships_following)) {
                        extractedData = jsonData.relationships_following.flatMap((item: any) =>
                            item.string_list_data?.map((user: any) => ({
                                href: user.href,
                                value: user.value,
                            })) || []
                        );
                    } else {
                        throw new Error("Format file following tidak valid.");
                    }
                }

                onFileUploaded(extractedData);
                setError("");
            } catch (error) {
                console.error(error);
                setError("Gagal membaca file. Pastikan upload file JSON nya sesuai yaaaa");
            }
        }
    };

    return (
        <div className="p-4 border rounded bg-gray-100 mb-4">
            <label className="block mb-2 text-sm font-medium">{label}</label>
            <Input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="w-full text-sm text-gray-600 file:mr-4 file:border file:rounded file:border-gray-300 file:bg-gray-50 hover:file:bg-gray-100"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default FileUploader;
