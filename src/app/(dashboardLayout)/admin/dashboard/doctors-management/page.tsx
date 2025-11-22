import DoctorFilters from "@/components/modules/doctorManagment/DoctorFilters";
import DoctorManagmentHeder from "@/components/modules/doctorManagment/DoctorManagmentHeders";
import DoctorTable from "@/components/modules/doctorManagment/DoctorsTable";
import TablePaggination from "@/components/shared/TablePaggination";
import TableSceleton from "@/components/shared/TableSceleton";
import { queryStringFormatter } from "@/lib/formattor";
import { getDoctors } from "@/services/admin/doctorManagament";
import { getSpecilites } from "@/services/admin/specialitiesManagment";
import { Suspense } from "react";

const AdminDoctorManagmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);

  const specialityResult = await getSpecilites();
  const doctorResult = await getDoctors(queryString);
  console.log({ doctorResult });

  return (
    <div className="space-y-6">
      <DoctorManagmentHeder specialities={specialityResult?.data || []} />
      <DoctorFilters specialties={specialityResult?.data || []} />
      <Suspense fallback={<TableSceleton columns={10} rows={10} />}>
        <DoctorTable
          specialities={specialityResult?.data}
          doctors={doctorResult?.data || []}
        />
        <TablePaggination
          currentPages={doctorResult?.meta?.page || 1}
          totalPages={
            Math.ceil(
              (doctorResult?.meta?.total || 1) /
                (doctorResult?.meta?.limit || 1)
            ) || 1
          }
        />
      </Suspense>
    </div>
  );
};

export default AdminDoctorManagmentPage;
