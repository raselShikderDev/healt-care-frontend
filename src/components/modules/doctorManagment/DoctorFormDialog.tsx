"use client";

import InputFeildError from "@/components/shared/InputFeildError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSpecialtySelection } from "@/hooks/specialityHooks/useSpecialitySelection";
import { createDoctor, updateDoctor } from "@/services/admin/doctorManagament";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecilaties } from "@/types/specalities.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SpecialtyMultiSelect from "./SpecialityMultiSelect";
import Image from "next/image";

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSccucess: () => void;
  doctor?: IDoctor;
  specialites?: ISpecilaties[];
}

const DoctorFormDialog = ({
  open,
  onClose,
  onSccucess,
  doctor,
  specialites,
}: IDoctorFormDialogProps) => {
  const isEdit = !!doctor;
  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    doctor?.gender || "MALE"
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const specialtySelection = useSpecialtySelection({
    doctor,
    isEdit,
    open,
  });

  const [state, formAction, pending] = useActionState(
    isEdit ? updateDoctor.bind(null, doctor.id!) : createDoctor,
    null
  );

  console.log({ state });

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (selectedFile) {
      setSelectedFile(null); // Clear preview
    }
    formRef.current?.reset(); // Clear form
    onClose(); // Close dialog
  };

  const getSpecialtyTitle = (id: string): string => {
    return specialites?.find((s) => s.id === id)?.title || "Unknown";
  };

  useEffect(() => {
    if (state && state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFile(null);
      onSccucess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSccucess, onClose, selectedFile]);
  console.log({isEdit});

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                defaultValue={
                  state?.formData?.name || isEdit ? doctor?.name : ""
                }
              />
              <InputFeildError state={state} feild="name" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                defaultValue={
                  state?.formData?.email || isEdit ? doctor?.email : ""
                }
                disabled={isEdit}
              />
              <InputFeildError state={state} feild="email" />
            </Field>
            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={state?.formData?.password || ""}
                    placeholder="Enter password"
                  />
                  <InputFeildError state={state} feild="password" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    defaultValue={state?.formData?.confirmPassword || ""}
                    placeholder="Confirm password"
                  />
                  <InputFeildError state={state} feild="confirmPassword" />
                </Field>
              </>
            )}

            {/* Specialty Selection */}
            <SpecialtyMultiSelect
              selectedSpecialtyIds={specialtySelection.selectedSpecialtyIds}
              removedSpecialtyIds={specialtySelection.removedSpecialtyIds}
              currentSpecialtyId={specialtySelection.currentSpecialtyId}
              availableSpecialties={specialtySelection.getAvailableSpecialties(
                specialites!
              )}
              isEdit={isEdit}
              onCurrentSpecialtyChange={
                specialtySelection.setCurrentSpecialtyId
              }
              onAddSpecialty={specialtySelection.handleAddSpecialty}
              onRemoveSpecialty={specialtySelection.handleRemoveSpecialty}
              getSpecialtyTitle={getSpecialtyTitle}
              getNewSpecialties={specialtySelection.getNewSpecialties}
            />
            <InputFeildError feild="specialties" state={state} />
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                defaultValue={
                  state?.formData?.contactNumber || isEdit
                    ? doctor?.contactNumber
                    : ""
                }
              />
              <InputFeildError state={state} feild="contactNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                defaultValue={
                  state?.formData?.address || isEdit ? doctor?.address : ""
                }
              />
              <InputFeildError state={state} feild="address" />
            </Field>

            <Field>
              <FieldLabel htmlFor="registrationNumber">
                Registration Number
              </FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
                defaultValue={
                  state?.formData?.registrationNumber || isEdit
                    ? doctor?.registrationNumber
                    : ""
                }
              />
              <InputFeildError state={state} feild="registrationNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="experience">
                Experience (in years)
              </FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                defaultValue={
                  state?.formData?.experience || isEdit
                    ? doctor?.experience
                    : ""
                }
                min="0"
              />
              <InputFeildError state={state} feild="experience" />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Input
                id="gender"
                name="gender"
                placeholder="Select gender"
                // defaultValue={state?.formData?.gender || isEdit ? doctor?.gender : ""}
                defaultValue={gender}
                type="hidden"
              />
              <Select
                value={gender}
                onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              <InputFeildError state={state} feild="gender" />
            </Field>

            <Field>
              <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
              <Input
                id="appointmentFee"
                name="appointmentFee"
                type="number"
                placeholder="100"
                defaultValue={
                  state?.formData?.appointmentFee || isEdit
                    ? doctor?.appointmentFee
                    : ""
                }
                min="0"
              />
              <InputFeildError state={state} feild="appointmentFee" />
            </Field>

            <Field>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                defaultValue={
                  state?.formData?.qualification || isEdit
                    ? doctor?.qualification
                    : ""
                }
              />
              <InputFeildError state={state} feild="qualification" />
            </Field>

            <Field>
              <FieldLabel htmlFor="currentWorkingPlace">
                Current Working Place
              </FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
                defaultValue={
                  state?.formData?.currentWorkingPlace || isEdit
                    ? doctor?.currentWorkingPlace
                    : ""
                }
              />
              <InputFeildError state={state} feild="currentWorkingPlace" />
            </Field>

            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
                defaultValue={
                  state?.formData?.designation || isEdit
                    ? doctor?.designation
                    : ""
                }
              />
              <InputFeildError state={state} feild="designation" />
            </Field>

            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                {selectedFile && (
                  <Image
                    //get from state if available
                    src={
                      typeof selectedFile === "string"
                        ? selectedFile
                        : URL.createObjectURL(selectedFile)
                    }
                    alt="Profile Photo Preview"
                    width={50}
                    height={50}
                    className="mb-2 rounded-full"
                  />
                )}
                <Input
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile photo for the doctor
                </p>
                <InputFeildError state={state} feild="file" />
              </Field>
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                ? "Update Doctor"
                : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFormDialog;
