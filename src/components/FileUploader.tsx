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
            const jsonData: DataItem[] | FollowingData = JSON.parse(fileContent);

            const extractData = (data: DataItem[], key: "string_list_data"): User[] =>
                data.flatMap(item =>
                    item[key]?.map((user: StringListData) => ({
                        href: user.href,
                        value: user.value,
                    })) || []
                );

            let extractedData: User[] = [];

            if (fileType === "followers" && Array.isArray(jsonData)) {
                extractedData = extractData(jsonData, "string_list_data");
            } else if (
                fileType === "following" &&
                "relationships_following" in jsonData &&
                Array.isArray(jsonData.relationships_following)
            ) {
                extractedData = extractData(jsonData.relationships_following, "string_list_data");
            } else {
                throw new Error(`Format file ${fileType} tidak valid.`);
            }

            onFileUploaded(extractedData);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Gagal membaca file. Pastikan upload file JSON nya sesuai yaaaa");
        }
    };

    return (
        <>
            <div className="p-4 border rounded bg-gray-100 mb-4">
                <label className="block mb-2 text-sm font-medium">{label}</label>
                <Input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="w-full text-sm text-gray-600 file:mr-4 file:border file:rounded file:border-gray-300 file:bg-gray-50 hover:file:bg-gray-100"
                />
            </div>
            {error && <p className="text-red-500 mt-2 mb-2 text-center">{error}</p>}
        </>
    );
};

export default FileUploader;