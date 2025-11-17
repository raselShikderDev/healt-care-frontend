"use client";

import ManagmentHeader from "@/components/shared/managmentHeader";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DoctorFormDialog from "./DoctorFormDialog";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecilaties } from "@/types/specalities.interface";

interface IDoctorManagmentHeder{
  doctor?:IDoctor;
  specialities?:ISpecilaties[]
}

const DoctorManagmentHeder = ({doctor, specialities}:IDoctorManagmentHeder) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSuccess = () => {
    startTransition(()=>{
      router.refresh()
    })
  };

  return (
    <>
      <DoctorFormDialog
        open={isDialogOpen}
        onSccucess={handleSuccess}
        onClose={() => setIsDialogOpen(false)}
        doctor={doctor}
        specialites={specialities}
      />
      <ManagmentHeader
        title="Doctor Managment"
        description="Managment doctor information and details"
        action={{
          label: "Doctor Managment",
          icon: Plus,
          onclick: () => setIsDialogOpen(true),
        }}
      ></ManagmentHeader>
    </>
  );
};

export default DoctorManagmentHeder;
