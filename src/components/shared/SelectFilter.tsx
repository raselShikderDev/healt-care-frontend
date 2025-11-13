"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTransition } from "react";


interface SelectFilterProps{
    paramName?:string;
    placheholder?:string;
    options:{label:string, value:string}[]
}

function SelectFilter({paramName = "All", placheholder, options}:SelectFilterProps)  {
 const router = useRouter()
 const searchparams = useSearchParams()
 const [isPending, startTransition] = useTransition()

 const currentValue = searchparams.get(paramName) || ""

const handleChange = (value:string) =>{
    const params = new URLSearchParams(searchparams.toString())

    if (value === "All") {
       params.delete(paramName) 
    } else if(value){
        params.set(paramName, value)
    } else{
        params.delete(paramName)
    }
    
    startTransition(()=>{
        router.push(`?${searchparams.toString()}`)
    })
}
 
 
    return (
    <Select value={currentValue} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger>
            <SelectValue placeholder={placheholder}/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {options?.map((option)=>(
                <SelectItem key={option?.value} value={option?.value}>
                    {option?.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default 'SelectFilter'
