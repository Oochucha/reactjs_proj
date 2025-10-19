import { billingInfoSchema, personalInfoSchema, proffessionalInfoSchema, type Step, type StepFormData } from "@/types";
import { Briefcase, CreditCard, User } from "lucide-react";
import { useState } from "react";

const stepSchema = [
    personalInfoSchema,
    proffessionalInfoSchema,
    billingInfoSchema
];

export const step : Step[] = [
    { id: "personal", name: "Personal Info" , icon: User },
    { id: "proffessional", name: "Proffessional Info" , icon: Briefcase },
    { id: "billing", name: "Billing Info" , icon: CreditCard }
];

export const useMultiStepForm = () => {
    const [currentStepIndex, setCurrentStepIndex] =  useState(0);
    const [formData, setFormData] = useState<Partial<StepFormData>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const totalSteps = step.length;
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === totalSteps - 1;

    const getCurrentStepSchema = () => {
        return stepSchema[currentStepIndex];
    }

    const goToPreviousStep = () => {
        if (!isFirstStep) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    }

    const goToNextStep = () => {
        if (!isLastStep) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    }

    const updateFormData = (newData: Partial<StepFormData>) => {
        setFormData((prev) => ({
            ...prev,
            ...newData
        }));
    }

    const submitForm = (data: StepFormData) => {
        console.log("Final Submitted Data: ", data);
        setIsSubmitted(true);
    }

    const resetForm = () => {
        setFormData({});
        setCurrentStepIndex(0);
        setIsSubmitted(false);
    }

    return {
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        formData,
        isSubmitted,
        getCurrentStepSchema,
        goToPreviousStep,
        goToNextStep,
        updateFormData,
        submitForm,
        resetForm
    };
}