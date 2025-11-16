import SpecialitiesManagmentHeader from "@/components/modules/admin/specialitesManagment/SpecialitiesManagmentHeader";
import RefreshButton from "@/components/shared/RefreshButton";

const AdmnScheduleManagmentPage = () => {
  return (
    <div className="space-y-6">
      <SpecialitiesManagmentHeader />
      <div className=" flex">
        <RefreshButton />
      </div>
    </div>
  );
};

export default AdmnScheduleManagmentPage;
