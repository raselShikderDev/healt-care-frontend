import DoctorManagmentHeder from "@/components/modules/doctorManagment/DoctorManagmentHeders";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { getSpecilites } from "@/services/admin/specialitiesManagment";
import { ISpecilaties } from "@/types/specalities.interface";

const AdminDoctorManagmentPage = async () => {
  const specialityResult = await getSpecilites();
  return (
    <div className="space-y-6">
      <DoctorManagmentHeder />
      <div className=" flex">
        <SearchFilter paramName="searchTerm" placeholder="Search Doctor..." />
        <SelectFilter
          paramName="ALL"
          placheholder="Filter by Speciality"
          options={specialityResult?.data?.map((speciality:ISpecilaties) => ({
            label: speciality.title,
            value: speciality.id,
          }))}
        />
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSceleton columns={2} rows={10} />}>
        <DoctorManagmentTable specialityResult={specialityResult.data} />
      </Suspense> */}
    </div>
  );
};

export default AdminDoctorManagmentPage;
