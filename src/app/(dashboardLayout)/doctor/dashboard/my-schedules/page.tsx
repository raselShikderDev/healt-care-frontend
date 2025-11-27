

import MySchedulesFilters from "@/components/modules/doctor/mySchedule/MyScheduleFilter";
import MySchedulesHeader from "@/components/modules/doctor/mySchedule/MyScheduleHeader";
import MySchedulesTable from "@/components/modules/doctor/mySchedule/MyScheduleTable";
import TablePaggination from "@/components/shared/TablePaggination";
import TableSceleton from "@/components/shared/TableSceleton";
import { queryStringFormatter } from "@/lib/formattor";
import { getAvailableSchedules, getDoctorOwnSchedules } from "@/services/doctor/doctorSchedules";
import { Suspense } from "react";

interface DoctorMySchedulesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}

const DoctorMySchedulesPage = async ({
  searchParams,
}: DoctorMySchedulesPageProps) => {
  const params = await searchParams;

  const queryString = queryStringFormatter(params);
  const myDoctorsScheduleResponse = await getDoctorOwnSchedules(queryString);
  const availableSchedulesResponse = await getAvailableSchedules();

  console.log({
    myDoctorsScheduleResponse,
    availableSchedulesResponse,
  });

  const schedules = myDoctorsScheduleResponse?.data || [];
  const meta = myDoctorsScheduleResponse?.meta;
  const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));

  return (
    <div className="space-y-6">
      <MySchedulesHeader
        availableSchedules={availableSchedulesResponse?.data || []}
      />

      <MySchedulesFilters />

      <Suspense fallback={<TableSceleton columns={5} rows={10} />}>
        <MySchedulesTable schedules={schedules} />
        <TablePaggination
          currentPages={meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default DoctorMySchedulesPage;