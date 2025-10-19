import { useMultiStepForm } from "@/hooks/use-multi-step-from";
import type { StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardContent } from "./ui/card";
import ProgressSteps from "./progress-steps";
import {
  BillingInfoStep,
  PersonalInfoStep,
  ProfessionalInfoStep,
} from "./steps";
import { Button } from "./ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const MultiStepForm: React.FC = () => {
  const {
    currentStepIndex,
    step,
    formData,
    isSubmitted,
    isFirstStep,
    isLastStep,
    getCurrentStepSchema,
    goToPreviousStep,
    goToNextStep,
    updateFormData,
    submitForm,
    resetForm,
  } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStepIndex, formData, reset]);

  const onNext = async (data: StepFormData) => {
    const isValid = await trigger();
    if (!isValid) return;

    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);

    console.log(formData, data);

    if (isLastStep) {
      try {
        submitForm(updatedData as StepFormData);
      } catch (error) {
        console.error("Error submitting form: ", error);
      }
    } else {
      goToNextStep();
    }
  };

  /* This part of the code is handling the UI display when the form has been successfully submitted. */
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            {/* Success icon - green circle with checkmark */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-semibold mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Your form has been submitted.</p>

            {/* Allow user to submit another form */}
            <Button onClick={resetForm} className="w-full">
              Submit Another Form
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* This part of the code is responsible for rendering the main form interface. It includes the
  following components and functionalities: */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressSteps currentSteps={currentStepIndex} step={step} />
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStepIndex === 0 && (
            <PersonalInfoStep register={register} errors={errors} />
          )}
          {currentStepIndex === 1 && (
            <ProfessionalInfoStep
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          {currentStepIndex === 2 && (
            <BillingInfoStep register={register} errors={errors} />
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button type="button" onClick={handleSubmit(onNext)}>
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
