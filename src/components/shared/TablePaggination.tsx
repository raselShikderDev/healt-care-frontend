"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePagginationProps {
    currentPages: number;
    totalPages: number;
}


const TablePaggination = ({ currentPages, totalPages }: TablePagginationProps) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const navigateToPages = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", newPage.toString())
        startTransition(() => {
            router.push(`?${params.toString()}`)
        })
    }

    if (totalPages === 0) {
        return null
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <Button value={"outline"} size={"sm"} disabled={currentPages <= 1 || isPending} onClick={() => navigateToPages(currentPages - 1)}>
                <ChevronLeft className="w-4 h-4" />
                Previous
            </Button>
            <div className="flex items-center gap-1">
                {
                    Array.from({ length: Math.min(5, totalPages) }, (_, ind) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                            pageNumber = ind + 1
                        } else if (currentPages <= 3) {
                            pageNumber = ind + 1
                        } else if (currentPages <= totalPages - 2) {
                            pageNumber = totalPages - 4 + ind
                        } else {
                            pageNumber = currentPages - 2 + ind
                        }

                        return (<Button key={pageNumber} variant={pageNumber === currentPages ? "default" : "outline"} onClick={() => navigateToPages(currentPages)} disabled={isPending} className="w-10">{pageNumber}</Button>)
                    })
                }
            </div>
            <Button variant={"outline"} size={"sm"} onClick={()=>navigateToPages(currentPages + 1)} disabled={currentPages === totalPages || isPending} className="">
                next
                <ChevronRight className="w-4 h-4"/>
             
            </Button>
            <span>page {currentPages} of {totalPages}</span>
        </div>
    )
}

export default TablePaggination
