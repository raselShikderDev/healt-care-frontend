"use client"


import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

interface SearchFilterProps {
    placeholder?: string;
    paramName?: string;
}


const SearchFilter = ({ placeholder = "Search...", paramName = "searchTerm" }: SearchFilterProps) => {
    const [isPending, stratTransaction] = useTransition()
    const searchParams = useSearchParams()
    const [value, setValue] = useState(searchParams.get(paramName) || "")
    const debouncedValue = useDebounce(value, 500)
    const router = useRouter()

    useEffect(()=>{
        const params = new URLSearchParams(searchParams.toString())
        const initialValue = searchParams.get(paramName) || ""

        if (debouncedValue === initialValue) {
            return
        }

        if (debouncedValue) {
           params.set(paramName, debouncedValue)
           params.set("page", "1")
        } else  {
           params.delete(paramName)
           params.delete("page")
        }

        stratTransaction(()=>{
            router.push(`?${params.toString()}`)
        })
    })

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={placeholder} className="pl-10" value={value} disabled={isPending} onChange={(e) => e.target.value} />
        </div>
    )
}

export default SearchFilter
