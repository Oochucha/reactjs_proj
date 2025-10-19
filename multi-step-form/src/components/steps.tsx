/* This TypeScript React code snippet is defining three components: `PersonalInfoStep`,
`ProfessionalInfoStep`, and `BillingInfoStep`. These components are part of a multi-step form and
each component represents a different step in the form. */
import type { useForm } from "react-hook-form";
import FormField from "./form-field";
import { CardTitle } from "./ui/card";
import type { StepFormData } from "@/types";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

/* The `interface StepProps` is defining a type for the props that the components `PersonalInfoStep`,
`ProfessionalInfoStep`, and `BillingInfoStep` expect to receive. Here's a breakdown of what each
property in the `StepProps` interface represents: */
interface StepProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

/**
 * The `PersonalInfoStep` component in TypeScript React renders a form for capturing personal details
 * like first name, last name, email, and phone number.
 * @param {StepProps}  - The `PersonalInfoStep` component is a functional component that takes in two
 * props: `register` and `errors`.
 * @returns The `PersonalInfoStep` component is being returned. It renders a form for entering personal
 * details including first name, last name, email, and phone number. Each field is rendered using the
 * `FormField` component with specific properties like id, label, type, register, and errors passed
 * down as props. The form is structured in a grid layout with two columns for better organization. The
 * component also includes
 */
const PersonalInfoStep = ({ register, errors }: StepProps) => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Personal Details</CardTitle>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          register={register}
          errors={errors}
        />
        <FormField
          id="lastName"
          label="Last Name"
          register={register}
          errors={errors}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
        />
        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
};

/**
 * The ProfessionalInfoStep component in TypeScript React manages professional details input fields and
 * a select dropdown for years of experience.
 * @param {StepProps}  - The `ProfessionalInfoStep` component is a functional component that takes in
 * three props: `register`, `errors`, and `setValue`. Here is a breakdown of what each prop does:
 * @returns The `ProfessionalInfoStep` component is being returned. It renders a form for capturing
 * professional details including Company Name, Job Title, Industry, and Years of Experience. The
 * component uses `FormField`, `Label`, and `Select` components to create the form fields and dropdown
 * for selecting years of experience. The selected experience value is stored in the component's state
 * using `useState`.
 */
const ProfessionalInfoStep = ({ register, errors, setValue }: StepProps) => {
  const [experience, setExperience] = useState("");

  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Proffesional Details</CardTitle>
      {/* <div className="grid grid-cols-2 gap-4"> */}
      <FormField
        id="company"
        label="Company Name"
        register={register}
        errors={errors}
      />
      <FormField
        id="jobTitle"
        label="Job Title"
        register={register}
        errors={errors}
      />
      <FormField
        id="industry"
        label="Industry"
        register={register}
        errors={errors}
      />
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Select
          onValueChange={(value) => {
            setValue?.(
              "experience",
              value as Extract<
                StepFormData,
                { experience: string }
              >["experience"]
            );
            setExperience(value);
          }}
          value={experience}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 Years</SelectItem>
            <SelectItem value="3-5">3-5 Years</SelectItem>
            <SelectItem value="6-10">6-10 Years</SelectItem>
            <SelectItem value="10+">10+ Years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* </div> */}
    </div>
  );
};

/**
 * The BillingInfoStep component in TypeScript React renders a form for entering billing details with
 * fields for card number, expiry date, CVV, and card holder name.
 * @param {StepProps}  - The `BillingInfoStep` component takes two props: `register` and `errors`.
 * @returns The `BillingInfoStep` component is being returned. It renders a form for entering billing
 * details including card number, expiry date, CVV, and card holder name. Each form field is a
 * `FormField` component that takes in props like id, label, register function, errors object, and
 * maxLength for validation. The form is structured with appropriate spacing and grid layout for the
 * fields.
 */
const BillingInfoStep = ({ register, errors }: StepProps) => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-xl">Billing Details</CardTitle>
      <FormField
        id="cardNumber"
        label="Card Number"
        register={register}
        errors={errors}
        maxLength={16}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="expiryDate"
          label="Expiry Date (MM/YY)"
          register={register}
          errors={errors}
          maxLength={5}
        />
        <FormField
          id="cvv"
          label="CVV"
          register={register}
          errors={errors}
          maxLength={4}
        />
      </div>
      <FormField
        id="cardHolderName"
        label="Card Holder Name"
        register={register}
        errors={errors}
      />
    </div>
  );
};

export { PersonalInfoStep, ProfessionalInfoStep, BillingInfoStep };
