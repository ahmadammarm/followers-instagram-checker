import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const tutorialSteps = [
    {
        title: "Pergi ke URL Pusat akun Anda",
        description: 'Klik menu "Unduh informasi Anda"',
        image: "/images/step-1.png",
    },
    {
        title: "Pilih Menu",
        description: 'Pastikan Anda memilih menu "Mengunduh dan mentransfer informasi " ',
        image: "/images/step-2.png",
    },
    {
        title: "Pilih Beberapa Informasi",
        description: 'Pastikan Anda memilih menu "Beberapa informasi Anda " ',
        image: "/images/step-3.png",
    },
    {
        title: "Pilih Koneksi",
        description: 'Pastikan Anda memilih "Pengikut dan mengikuti " ',
        image: "/images/step-4.png",
    },
    {
        title: "Pilih Unduh ke Perangkat",
        description: 'Pastikan Anda memilih menu "Unduh ke Perangkat " ',
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
]

const TutorialDialog = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-10 bg-green-700">
                        Tutorial Download File JSON
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold mb-5">
                            Tutorial Mengunduh File JSON Follower dan Following
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto">
                        <Carousel className="w-full max-w-4xl mx-auto">
                            <CarouselContent>
                                {tutorialSteps.map((step, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-4">
                                            <div className="flex flex-col items-center justify-center">
                                                <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
                                                <div className="relative w-full h-[40vh] md:h-[50vh] mb-4">
                                                    <Image
                                                        src={step.image || "/placeholder.svg"}
                                                        layout="fill"
                                                        objectFit="contain"
                                                        alt={`Step ${index + 1}`}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                                <p className="text-base text-center max-w-2xl">{step.description}</p>
                                                {index === 0 && (
                                                    <Link
                                                        href="https://accountscenter.instagram.com/info_and_permissions/"
                                                        className="text-blue-600 mt-4 hover:underline text-lg"
                                                        target="_blank"
                                                    >
                                                        Pusat akun Anda
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TutorialDialog
