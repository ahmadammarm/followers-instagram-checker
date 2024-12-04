"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface User {
    href: string;
    value: string;
}

interface ResultTableProps {
    result: User[];
}

const ResultTable: React.FC<ResultTableProps> = ({ result }) => {
    return (
        <div className="mt-20">
            <h2 className="text-xl font-bold mb-5">Akun yang Tidak Mem-follow Balik Akun Anda</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.value}</TableCell>
                            <TableCell>
                                <a
                                    href={user.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {user.href}
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ResultTable;
