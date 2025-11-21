"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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

     const changeLimit = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1"); // Reset to first page when changing limit

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

    const currentLimit = searchParams.get("limit") || "10";


    // if (totalPages === 0) {
    //     return null
    // }

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

             {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <Select
          value={currentLimit}
          onValueChange={changeLimit}
          disabled={isPending}
        >
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
    )
}

export default TablePaggination
