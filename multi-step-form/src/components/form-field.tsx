import type { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import type { AllFormData, StepFormData } from "@/types";
import { Label } from "./ui/label";

const FormField = ({id, label, register, type="text", errors, maxLength}: {
    id: keyof AllFormData;
    label: string;
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    type?: string;
    errors: Record<string, {message?: string}>;
    maxLength?: number;
}) => {
    return (
    <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} maxLength={maxLength} {...register(id)} />

        {errors[id] && (
            <p className="text-sm text-destructive">{errors[id]?.message}</p>
        ) }
    </div>)
}

export default FormField;