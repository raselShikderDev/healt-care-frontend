import DoctorManagmentHeder from "@/components/modules/doctorManagment/DoctorManagmentHeders";
import DoctorTable from "@/components/modules/doctorManagment/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSceleton from "@/components/shared/TableSceleton";
import { getDoctors } from "@/services/admin/doctorManagament";
import { getSpecilites } from "@/services/admin/specialitiesManagment";
import { ISpecilaties } from "@/types/specalities.interface";
import { Suspense } from "react";

const AdminDoctorManagmentPage = async () => {
  const specialityResult = await getSpecilites();
  const doctorResult = await getDoctors();
  return (
    <div className="space-y-6">
      <DoctorManagmentHeder />
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
        <DoctorTable doctors={doctorResult.data} />
      </Suspense>
    </div>
  );
};

export default AdminDoctorManagmentPage;
