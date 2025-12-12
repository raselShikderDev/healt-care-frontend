"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


import {
    AppointmentStatus,
    IAppointment,
} from "@/types/appointments.interface";
import ChangeAppointmentStatusDialog from "./ChangeAppointmentStatusDialog";
import { toast } from "react-toastify";
import ManagmentTable from "@/components/shared/managmentTable";
import { doctorAppointmentColumns } from "./DoctorAppointmentColumns";
import DoctorAppointmentDetailDialog from "./DoctorAppointmentDetailDialog";


interface DoctorAppointmentsTableProps {
    appointments: IAppointment[];
}

export default function DoctorAppointmentsTable({
    appointments = [],
}: DoctorAppointmentsTableProps) {
    const router = useRouter();
    const [viewingAppointment, setViewingAppointment] =
        useState<IAppointment | null>(null);
    const [changingStatusAppointment, setChangingStatusAppointment] =
        useState<IAppointment | null>(null);

    const handleView = (appointment: IAppointment) => {
        setViewingAppointment(appointment);
    };

    const handleStatusChange = (appointment: IAppointment) => {
        setChangingStatusAppointment(appointment);
    };

    // Custom wrapper to conditionally show edit action
    const handleEditClick = (appointment: IAppointment) => {
        // Cannot change status for:
        // 1. Canceled appointments
        // 2. Completed appointments with prescriptions
        if (appointment.status === AppointmentStatus.CANCELED) {
            toast.error(
                <div>
                    <strong>Cannot change status for canceled appointments</strong>
                    <div>Canceled appointments are final and cannot be modified.</div>
                </div>
            );

            return;
        }

        if (
            appointment.status === AppointmentStatus.COMPLETED &&
            !!appointment.prescription
        ) {
            toast.error(
                <div>
                    <strong>Cannot change status once prescription is provided</strong>
                    <div>
                        Appointment status is locked after prescription is created to maintain
                        medical record integrity.
                    </div>
                </div>
            );

            return;
        }

        handleStatusChange(appointment);
    };

    return (
        <>
            <ManagmentTable
                data={appointments}
                columns={doctorAppointmentColumns}
                onView={handleView}
                onEdit={handleEditClick}
                getRowKey={(appointment) => appointment.id}
                emptyMessage="No appointments found"
            />

            {/* View Detail Dialog */}
            {viewingAppointment && (
                <DoctorAppointmentDetailDialog
                    appointment={viewingAppointment}
                    open={!!viewingAppointment}
                    onClose={() => {
                        setViewingAppointment(null);
                        router.refresh();
                    }}
                />
            )}

            {/* Change Status Dialog */}
            {changingStatusAppointment && (
                <ChangeAppointmentStatusDialog
                    appointment={changingStatusAppointment}
                    isOpen={!!changingStatusAppointment}
                    onClose={() => {
                        setChangingStatusAppointment(null);
                        router.refresh();
                    }}
                />
            )}
        </>
    );
}