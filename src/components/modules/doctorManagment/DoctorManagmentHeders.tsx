"use client";

import ManagmentHeader from "@/components/shared/managmentHeader";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DoctorFormDialog from "./DoctorFormDialog";
import { ISpecilaties } from "@/types/specalities.interface";

interface IDoctorManagmentHeder{

  specialities?:ISpecilaties[]
}

const DoctorManagmentHeder = ({ specialities}:IDoctorManagmentHeder) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dialogKey, setDialogKey] = useState<number>(0);

  const handleSuccess = () => {
    startTransition(()=>{
      router.refresh()
    })
  };

  const handleOpenDialog =()=>{
    setDialogKey((prev)=>prev + 1)
    setIsDialogOpen(true)
  }

  return (
    <>
      <DoctorFormDialog
        open={isDialogOpen}
        onSccucess={handleSuccess}
        onClose={() => setIsDialogOpen(false)}
    
        specialites={specialities}
      />
      <ManagmentHeader
        title="Doctor Managment"
        description="Managment doctor information and details"
        action={{
          label: "Doctor Managment",
          icon: Plus,
          onclick: handleOpenDialog,
        }}
      ></ManagmentHeader>
    </>
  );
};

export default DoctorManagmentHeder;
