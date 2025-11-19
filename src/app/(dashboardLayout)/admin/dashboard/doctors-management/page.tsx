import DoctorManagmentHeder from "@/components/modules/doctorManagment/DoctorManagmentHeders";
import DoctorTable from "@/components/modules/doctorManagment/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePaggination from "@/components/shared/TablePaggination";
import TableSceleton from "@/components/shared/TableSceleton";
import { queryStringFormatter } from "@/lib/formattor";
import { getDoctors } from "@/services/admin/doctorManagament";
import { getSpecilites } from "@/services/admin/specialitiesManagment";
import { ISpecilaties } from "@/types/specalities.interface";
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
  console.log({ doctorResult: doctorResult.data });
  console.log({ specialityResult: specialityResult.data });

  return (
    <div className="space-y-6">
      <DoctorManagmentHeder
        specialities={specialityResult.data}
      />
      <div className=" flex">
        <SearchFilter paramName="searchTerm" placeholder="Search Doctor..." />
        <SelectFilter
          paramName="ALL"
          placheholder="Filter by Speciality"
          options={specialityResult?.data?.map((speciality: ISpecilaties) => ({
            label: speciality.title,
            value: speciality.id,
          }))}
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSceleton columns={10} rows={10} />}>
        <DoctorTable specialities={specialityResult?.data} doctors={doctorResult?.data} />
        <TablePaggination
          currentPages={doctorResult?.meta?.page}
          totalPages={Math.ceil(
            doctorResult?.meta?.total / doctorResult?.meta?.limit
          )}
        />
      </Suspense>
    </div>
  );
};

export default AdminDoctorManagmentPage;
