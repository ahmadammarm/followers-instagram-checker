import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const tutorialSteps = [
    {
        title: "1. Buka Pusat Akun Instagram",
        description: 'Buka menu "Pusat Akun" lalu klik "Informasi dan izin Anda" dan pilih "Unduh informasi Anda".',
        image: "/images/step-1.png",
    },
    {
        title: "2. Pilih Unduh Informasi",
        description: 'Klik tombol "Mengunduh dan mentransfer informasi" untuk memulai proses.',
        image: "/images/step-2.png",
    },
    {
        title: "3. Tentukan Detail Informasi",
        description: 'Pilih opsi "Beberapa informasi Anda" agar ukuran file lebih kecil dan cepat.',
        image: "/images/step-3.png",
    },
    {
        title: "4. Pilih Data Pengikut",
        description: 'Cari dan centang hanya pada pilihan "Pengikut dan mengikuti".',
        image: "/images/step-4.png",
    },
    {
        title: "5. Metode Unduhan",
        description: 'Pilih "Unduh ke Perangkat" untuk mendapatkan file secara langsung.',
        image: "/images/step-5.png",
    },
    {
        title: "6. Atur Format JSON (Wajib)",
        description: "PENTING: Ubah Rentang Tanggal ke 'Sepanjang waktu' dan Format File wajib 'JSON'.",
        image: "/images/step-6.png",
    },
    {
        title: "7. Tunggu dan Ekstrak File ZIP",
        description: "Instagram butuh waktu (menit hingga jam) untuk menyiapkan file. Setelah siap, unduh lalu ekstrak foldernya.",
        image: "/images/step-7.png",
    },
    {
        title: "8. Upload ke Website Ini",
        description: "Cari file 'followers_1.json' dan 'following.json' di dalam folder hasil ekstrak, lalu upload ke sini.",
        image: "/images/step-8.png",
    },
]

const TutorialDialog = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mt-10 bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black shadow-neo font-black uppercase">
                        Panduan Ambil Data JSON
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] h-[90vh] flex flex-col border-2 border-black shadow-neo rounded-none">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black mb-5 uppercase tracking-tight text-center">
                            Tutorial Download Data Instagram
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto px-12 no-scrollbar">
                        <Carousel className="w-full max-w-5xl mx-auto">
                            <CarouselContent>
                                {tutorialSteps.map((step, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-4">
                                            <div className="flex flex-col items-center justify-center bg-white p-6">
                                                <h3 className="font-black text-2xl mb-4 uppercase text-center">{step.title}</h3>
                                                <div className="relative w-full h-[35vh] md:h-[45vh] mb-6 border-2 border-black">
                                                    <Image
                                                        src={step.image || "/placeholder.svg"}
                                                        layout="fill"
                                                        objectFit="contain"
                                                        alt={`Step ${index + 1}`}
                                                        className="bg-slate-50"
                                                    />
                                                </div>
                                                <p className="text-lg font-bold text-center max-w-2xl bg-black text-white p-4 uppercase leading-tight">
                                                    {step.description}
                                                </p>
                                                {index === 0 && (
                                                    <Link
                                                        href="https://accountscenter.instagram.com/info_and_permissions/"
                                                        className="text-blue-600 mt-6 hover:underline text-xl font-black uppercase"
                                                        target="_blank"
                                                    >
                                                        Klik di sini untuk buka Pusat Akun
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    </div>
                    <div className="p-6 bg-slate-100 border-t-2 border-black">
                        <p className="text-sm font-bold uppercase text-center text-slate-600">
                            Catatan: Proses penyiapan data oleh Instagram bisa memakan waktu beberapa menit hingga jam. 
                            Tampilan mungkin sedikit berbeda tergantung pembaruan aplikasi.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TutorialDialog
