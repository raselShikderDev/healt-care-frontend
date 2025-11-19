"use client";

import ManagmentTable from "@/components/shared/managmentTable";
import { ISpecilaties } from "@/types/specalities.interface";
import { specilatiesColumns } from "./specialitiesColumn";
import { DeleteConfirmationDialog } from "@/components/shared/DeleteConfirmationDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSpeciliaty } from "@/services/admin/specialitiesManagment";
import { toast } from "react-toastify";

interface ISpecialtiesManagentTable {
  specalities: ISpecilaties[];
}

const SpecialtiesManagentTable = ({
  specalities,
}: ISpecialtiesManagentTable) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deleteSpecalaity, setDeleteSpecalaity] = useState<ISpecilaties | null>(
    null
  );
  const [isDeletingDialog, setIsDeletingDialog] = useState<boolean>(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (specality: ISpecilaties) => {
    setDeleteSpecalaity(specality);
  };

  const onConfirmDelete = async () => {
    if (!deleteSpecalaity) {
      return;
    }
    setIsDeletingDialog(true);

    const result = await deleteSpeciliaty(deleteSpecalaity.id);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success(result.message || "Speciality deleted successfully");
      setDeleteSpecalaity(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete speciality");
    }
  };

  return (
    <>
      <ManagmentTable
        data={specalities}
        columns={specilatiesColumns}
        onDelete={handleDelete}
        getRowKey={(specality) => specality.id}
        emptyMessage="No specilaties found"
      />
      <DeleteConfirmationDialog
        open={!!deleteSpecalaity}
        onClose={(open: boolean) => !open && setDeleteSpecalaity(null)}
        onConfirm={onConfirmDelete}
        title="Delete Speciliaty"
        description={`Are you sure, want to detele ${deleteSpecalaity?.title}. This action can notbe undone`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default SpecialtiesManagentTable;
