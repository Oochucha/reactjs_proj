import { z } from 'zod';

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export const proffessionalInfoSchema = z.object({
    jobTitle: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company name is required'),
    experience: z.enum(["0-2", "3-5", "6-10", "10+"]),
    industry: z.string().min(1, 'Industry is required'),
}); 

export const billingInfoSchema = z.object({
    cardNumber: z.string()
        .min(16, 'Card number must be at least 16 digits')
        .max(16, 'Card number must be at most 16 digits'),
    expiryDate: z.string().min(5, 'Expiry date is required'),
    cvv: z.string().min(3, 'CVV must be at least 3 digits').max(4, 'CVV must be at most 4 digits'),
    cardHolderName: z.string().min(1, 'Card holder name is required'),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProffessionalInfo = z.infer<typeof proffessionalInfoSchema>;
export type BillingInfo = z.infer<typeof billingInfoSchema>;

export type StepFormData = PersonalInfo | ProffessionalInfo | BillingInfo;

export type AllFormData = PersonalInfo & ProffessionalInfo & BillingInfo;

export interface Step {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
}