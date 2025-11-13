import { Table } from "lucide-react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

interface TableSceletonProps {
    columns: string;
    rows?: number;
    showActions?: boolean;
}

function TableSceleton({ columns, rows = 10, showActions = true }: TableSceletonProps) {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {
                            [...Array(columns)].map((_, i) => (
                                <TableHead key={i}>
                                    <Skeleton className="h-4 w-full" />
                                </TableHead>
                            ))
                        }
                        {
                            showActions && (
                                <TableHead className="w-[70px]">
                                    <Skeleton className="h-4 w-full" />
                                </TableHead>
                            )
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [...Array(rows)].map((_, i) => (
                            <TableCell key={i}>
                                <div className=" flex items-center gap-2">
                                    {
                                        i === 0 && (
                                            <Skeleton className="h-4 w-full" />
                                        )
                                    }
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </TableCell>
                        ))
                    }
                    {showActions && (<TableCell>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>)}
                </TableBody>
            </Table>
        </div>
    )
}

export default TableSceleton
