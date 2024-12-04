"use client";

import FileUploader from "@/components/FileUploader";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Link from "next/link";
import Image from "next/image";
import ResultTable from "@/components/ResultTable";
import { Button } from "@/components/ui/button";

interface User {
    href: string;
    value: string;
}

export default function Home() {
    const [following, setFollowing] = useState<User[] | null>(null);
    const [followers, setFollowers] = useState<User[] | null>(null);
    const [result, setResult] = useState<User[]>([]);

    const handleCompare = () => {
        if (following && followers) {
            const followerMap = new Map(followers.map((user) => [user.href, user.value]));

            const notFollowingBack = following.filter(
                (user) => !followerMap.has(user.href) || followerMap.get(user.href) !== user.value
            );

            setResult(notFollowingBack);
        }
    };

    const tutorialSteps = [
        {
            title: "Pergi ke URL Pusat akun Anda",
            description: "Klik menu \"Unduh informasi Anda\"",
            image: "/images/step-1.png",
        },
        {
            title: "Pilih Menu",
            description: "Pastikan Anda memilih menu \"Mengunduh dan mentransfer informasi \" ",
            image: "/images/step-2.png",
        },
        {
            title: "Pilih Beberapa Informasi",
            description: "Pastikan Anda memilih menu \"Beberapa informasi Anda \" ",
            image: "/images/step-3.png",
        },
        {
            title: "Pilih Koneksi",
            description: "Pastikan Anda memilih \"Pengikut dan mengikuti \" ",
            image: "/images/step-4.png",
        },
        {
            title: "Pilih Unduh ke Perangkat",
            description: "Pastikan Anda memilih menu \"Unduh ke Perangkat \" ",
            image: "/images/step-5.png",
        },
        {
            title: "Ubah Rentang Tanggal dan Format File",
            description: "Pastikan Anda mengubah rentang waktu menjadi sepanjang waktu dan ubah format file menjadi JSON",
            image: "/images/step-6.png",
        },
        {
            title: "Download dan Ekstrak File",
            description: "Setelah selesai, download file dan ekstrak file tersebut",
            image: "/images/step-7.png",
        },
        {
            title: "Pilih File Followers dan Following",
            description: "Upload file JSON followers_1 dan following yang telah diunduh ke web ini",
            image: "/images/step-8.png",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Instagram Follower Checker</h1>
            <FileUploader
                label="Upload File JSON Follower"
                fileType="followers"
                onFileUploaded={(data) => setFollowers(data)}
            />
            <FileUploader
                label="Upload File JSON Following"
                fileType="following"
                onFileUploaded={(data) => setFollowing(data)}
            />
            <Dialog>
                <DialogTrigger className="mt-4 rounded-md px-4 py-2 bg-green-600 text-white">
                    Tutorial Download File JSON
                </DialogTrigger>
                <DialogContent className="sm:max-w-[720px]">
                    <DialogHeader>
                        <DialogTitle className="mb-5">Tutorial Mengunduh File JSON</DialogTitle>
                    </DialogHeader>
                    <Carousel className="w-full max-w-lg mx-auto">
                        <CarouselContent>
                            {tutorialSteps.map((step, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <div className="flex flex-col items-center justify-center">
                                            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                            <Image
                                                src={step.image}
                                                width={300}
                                                height={300}
                                                alt={`Step ${index + 1}`}
                                                className="rounded-lg mb-2 w-full h-[17rem]"
                                            />
                                            <p className="text-sm text-center">{step.description}</p>
                                            {index === 0 && (
                                                <Link
                                                    href="https://accountscenter.instagram.com/info_and_permissions/"
                                                    className="text-blue-600 mt-2 hover:underline"
                                                >
                                                    Pusat akun Anda
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </DialogContent>
            </Dialog>
            <Button
                onClick={handleCompare}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!following || !followers}
            >
                Bandingkan
            </Button>
            {result.length > 0 && <ResultTable result={result} />}
        </div>
    );
}
