"use client"

import ManagmentHeader from "@/components/shared/managmentHeader";
import { Plus } from "lucide-react";
import { AddSpecilatiesForom } from "./AddSpecialitiesForm";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";


const SpecialitiesManagmentHeader = () => {
    const router = useRouter()
    const [startTransition] = useTransition()
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)


    const handleSuccess = ()=>{

    }

  return (
    <>
    {/* <div className="flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold">Specilaties Managment</h1>
        <p className="text-muted-foreground mt-1">
          Managment specilaties information and details
        </p>
      </div>
      <Button className="cursor-pointer" onClick={()=> setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Doctor
      </Button>
    </div> */}
    <AddSpecilatiesForom open={isDialogOpen} onSuccess={handleSuccess} onClose={()=> setIsDialogOpen(false)} />
    <ManagmentHeader title="Specilaties Managment" description="Managment specilaties information and details" action={{
        label:"Specilaties Managment",
        icon:Plus,
        onclick:()=>setIsDialogOpen(true),
    }}>
      
    </ManagmentHeader>
    </>
  );
};

export default SpecialitiesManagmentHeader;
