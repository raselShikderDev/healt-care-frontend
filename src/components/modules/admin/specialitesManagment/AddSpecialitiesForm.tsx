"use client";

import InputFeildError from "@/components/shared/InputFeildError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IInputErrorState } from "@/lib/getInputFeildError";
import { createSpecilites } from "@/services/admin/specialitiesManagment";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

interface AddSpecilatiesProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddSpecilatiesForom({
  open,
  onClose,
  onSuccess,
}: AddSpecilatiesProps) {
  const [state, formAction, isPending] = useActionState(createSpecilites, null);
  useEffect(() => {
    if (state && state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Specilaties</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Field>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue="Specialties Name"
                />
                <InputFeildError
                  state={state as IInputErrorState}
                  feild={"title"}
                />
              </Field>
            </div>
            <div className="grid gap-3">
              <Field>
                <Label htmlFor="file">Upload Icon</Label>
                <Input id="file" name="file" type="file" accept="image/*" />
                <InputFeildError
                  state={state as IInputErrorState}
                  feild={"file"}
                />
              </Field>
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="cursor-pointer"
              disabled={isPending}
              type="submit"
            >
              Create Specilaties
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
