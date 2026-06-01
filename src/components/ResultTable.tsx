"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, EyeOff, Download, ShieldCheck, Trash2 } from "lucide-react"
import { Input as NeoInput } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface User {
    value: string
    href: string
}

interface ResultTableProps {
    result: User[]
    onWhitelist: (href: string) => void
    searchQuery: string
    onSearchChange: (query: string) => void
    whitelistData: User[]
    onRemoveFromWhitelist: (href: string) => void
}

const exportToCSV = (data: User[]) => {
    const csvContent = "data:text/csv;charset=utf-8,Username,Link\n" 
        + data.map(e => `"${e.value}","${e.href}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "not_following_back.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const ResultTable: React.FC<ResultTableProps> = ({ 
    result, 
    onWhitelist, 
    searchQuery, 
    onSearchChange,
    whitelistData,
    onRemoveFromWhitelist
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(result.length / itemsPerPage)

    const paginatedResult = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="mt-8 w-full max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-black mb-8 text-center mt-10 uppercase tracking-tight">Akun yang Tidak Mem-follow Balik</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <NeoInput
                    placeholder="Cari username..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-grow border-2 border-black rounded-none shadow-neo-sm focus-visible:ring-0 bg-white"
                />
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="bg-purple-400 hover:bg-purple-300 border-2 border-black shadow-neo font-black uppercase">
                                <ShieldCheck className="mr-2 h-4 w-4" /> Whitelist ({whitelistData.length})
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="border-2 border-black shadow-neo rounded-none bg-white">
                            <DialogHeader>
                                <DialogTitle>Whitelisted Accounts</DialogTitle>
                            </DialogHeader>
                            <div className="max-h-[60vh] overflow-y-auto no-scrollbar py-4">
                                {whitelistData.length === 0 ? (
                                    <p className="text-center font-bold uppercase">Belum ada akun di whitelist.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {whitelistData.map((user) => (
                                            <div key={user.href} className="flex justify-between items-center p-3 border-2 border-black bg-white">
                                                <span className="font-bold uppercase text-sm">{user.value}</span>
                                                <Button 
                                                    size="sm" 
                                                    variant="destructive" 
                                                    onClick={() => onRemoveFromWhitelist(user.href)}
                                                    className="h-8 w-8 p-0 border-2 border-black shadow-neo-sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button 
                        onClick={() => exportToCSV(result)}
                        className="bg-green-400 hover:bg-green-300 border-2 border-black shadow-neo font-black uppercase whitespace-nowrap"
                    >
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {paginatedResult.length === 0 ? (
                <div className="p-12 border-4 border-black bg-white text-center shadow-neo">
                    <p className="text-xl font-black uppercase">Tidak ada hasil yang cocok dengan pencarian atau semua sudah disembunyikan.</p>
                </div>
            ) : (
                <>
                    {/* Tampilan Mobile */}
                    <div className="md:hidden space-y-6">
                        {paginatedResult.map((user, index) => (
                            <Card key={index} className="border-2 border-black shadow-neo bg-white rounded-none">
                                <CardHeader>
                                    <CardTitle className="text-lg font-black uppercase">
                                        {(currentPage - 1) * itemsPerPage + index + 1}. {user.value}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-3">
                                        <Button asChild variant="outline" className="w-full bg-blue-400 hover:bg-blue-300 border-2 border-black shadow-neo-sm font-bold uppercase">
                                            <a
                                                href={user.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center"
                                            >
                                                Lihat Profil <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            onClick={() => onWhitelist(user.href)}
                                            className="w-full bg-slate-200 hover:bg-slate-300 border-2 border-black shadow-neo-sm font-bold uppercase"
                                        >
                                            <EyeOff className="mr-2 h-4 w-4" /> Sembunyikan
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Tampilan Desktop */}
                    <div className="hidden md:block">
                        <div className="rounded-none border-4 border-black shadow-neo bg-white overflow-hidden">
                            <Table>
                                <TableHeader className="bg-black">
                                    <TableRow className="hover:bg-black border-none">
                                        <TableHead className="w-[100px] text-white font-black uppercase">No</TableHead>
                                        <TableHead className="text-white font-black uppercase">Username</TableHead>
                                        <TableHead className="text-white font-black uppercase">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedResult.map((user, index) => (
                                        <TableRow key={index} className="border-b-2 border-black hover:bg-slate-50">
                                            <TableCell className="font-black">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                                            <TableCell className="font-bold uppercase">{user.value}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button asChild variant="outline" size="sm" className="bg-cyan-400 hover:bg-cyan-300 border-2 border-black shadow-neo-sm font-bold uppercase">
                                                        <a
                                                            href={user.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center"
                                                        >
                                                            Profil <ExternalLink className="ml-2 h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={() => onWhitelist(user.href)}
                                                        className="bg-slate-200 hover:bg-slate-300 border-2 border-black shadow-neo-sm font-bold uppercase"
                                                    >
                                                        <EyeOff className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </>
            )}

            {/* Pagination untuk table */}
            {paginatedResult.length > 0 && (
                <div className="flex justify-between items-center mt-10 mb-20">
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="bg-white border-2 border-black shadow-neo font-black uppercase"
                    >
                        <ChevronLeft className="h-5 w-5 mr-1" /> Prev
                    </Button>
                    <span className="text-lg font-black uppercase bg-black text-white px-4 py-2 border-2 border-black shadow-neo-sm">
                        Page {currentPage} / {totalPages}
                    </span>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="bg-white border-2 border-black shadow-neo font-black uppercase"
                    >
                        Next <ChevronRight className="h-5 w-5 ml-1" />
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ResultTable
