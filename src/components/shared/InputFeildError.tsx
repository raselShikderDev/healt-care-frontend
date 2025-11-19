import getInputFeildError, { IInputErrorState } from "@/lib/getInputFeildError";
import { FieldDescription } from "../ui/field";

interface FeildErrorProps {
    feild: string;
    state: IInputErrorState
}


const InputFeildError = ({ feild, state }: FeildErrorProps) => {
    if (getInputFeildError(feild, state)) {
        return (
            <FieldDescription className="text-red-600">
                error {getInputFeildError(feild, state)}
            </FieldDescription>
        )
    }
    return null

}

export default InputFeildError
