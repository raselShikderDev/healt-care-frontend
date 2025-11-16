import SpecialitiesManagmentHeader from "@/components/modules/admin/specialitesManagment/SpecialitiesManagmentHeader";
import SpecialtiesManagentTable from "@/components/modules/admin/specialitesManagment/specialtiesManagentTable";
import RefreshButton from "@/components/shared/RefreshButton";
import TableSceleton from "@/components/shared/TableSceleton";
import { getSpecilites } from "@/services/admin/specialitiesManagment";
import { Suspense } from "react";

const AdmnScheduleManagmentPage = async () => {
  const result = await getSpecilites();
  return (
    <div className="space-y-6">
      <SpecialitiesManagmentHeader />
      <div className=" flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSceleton columns={2} rows={10} />}>
        <SpecialtiesManagentTable specalities={result.data} />
      </Suspense>
    </div>
  );
};

export default AdmnScheduleManagmentPage;
