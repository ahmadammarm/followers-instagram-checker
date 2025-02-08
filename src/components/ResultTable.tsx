"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

interface User {
    value: string
    href: string
}

interface ResultTableProps {
    result: User[]
}

const ResultTable: React.FC<ResultTableProps> = ({ result }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(result.length / itemsPerPage)

    const paginatedResult = result.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="mt-8 w-full max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center mt-10">Akun yang Tidak Mem-follow Balik Akun Anda</h2>

            {/* Tampilan Mobile */}
            <div className="md:hidden space-y-4">
                {paginatedResult.map((user, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                {(currentPage - 1) * itemsPerPage + index + 1}. {user.value}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <a
                                href={user.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline flex items-center"
                            >
                                Lihat Profil <ExternalLink className="ml-1 h-4 w-4" />
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tampilan Desktop */}
            <div className="hidden md:block">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Link</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedResult.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                                    <TableCell>{user.value}</TableCell>
                                    <TableCell>
                                        <a
                                            href={user.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline flex items-center"
                                        >
                                            Lihat Profil <ExternalLink className="ml-1 h-4 w-4" />
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination untuk table */}
            <div className="flex justify-between items-center mt-4 mb-10">
                <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                >
                    Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    )
}

export default ResultTable

