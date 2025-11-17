"use client"

import { DeleteConfirmationDialog } from "@/components/shared/DeleteConfirmationDialog";
import { IDoctor } from "@/types/doctor.interface";
import { toast } from "react-toastify";
import { doctorsColumns } from "./DoctorsColumns";
import ManagmentTable from "@/components/shared/managmentTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { softDeleteDoctor } from "@/services/admin/doctorManagament";


interface IDoctorTableProps{
doctors?:IDoctor[]
}

const DoctorTable = ({doctors}:IDoctorTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deleteDoctor, setDeleteDoctor] = useState<IDoctor | null>(
    null
  );
  const [isDeletingDialog, setIsDeletingDialog] = useState<boolean>(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (doctor: IDoctor) => {
    setDeleteDoctor(doctor);
  };

  const handleEdit =()=>{

  }

  

  const handleView =()=>{

  }

  

  const onConfirmDelete = async () => {
    if (!deleteDoctor) {
      return;
    }
    setIsDeletingDialog(true);

    const result = await softDeleteDoctor(deleteDoctor.id!);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success(result.message || "Speciality deleted Doctor");
      setDeleteDoctor(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete Doctor");
    }
  };

  return (
    <>
      <ManagmentTable
        data={doctors!}
        columns={doctorsColumns}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(doctor:IDoctor) => doctor.id!}
        emptyMessage="No doctor found"
      />
      <DeleteConfirmationDialog
        open={!!deleteDoctor}
        onClose={(open: boolean) => !open && setDeleteDoctor(null)}
        onConfirm={onConfirmDelete}
        title="Delete doctor"
        description={`Are you sure, want to detele ${deleteDoctor?.name}. This action can notbe undone`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
}

export default DoctorTable
