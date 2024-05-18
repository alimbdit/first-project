import { z } from 'zod';

// ! schema validation using ZOD

// Define Zod schemas for individual components
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First Name cannot be more than 20 characters' })
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name must be in capitalize format',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, { message: 'Last Name cannot be more than 20 characters' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name should only contain alphabetic characters',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, { message: 'Father Name is required' }),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Father Contact No. is required' }),
  motherName: z.string().trim().min(1, { message: 'Mother Name is required' }),
  motherOccupation: z
    .string()
    .trim()
    .min(1, { message: 'Mother Occupation is required' }),
  motherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Mother Contact No. is required' }),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Name is required' }),
  occupation: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Occupation is required' }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Contact No. is required' }),
  address: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Address is required' }),
});

// Define the main student Zod schema
const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  name: userNameValidationSchema.refine((data) => !!data, {
    message: 'Student Name is required',
  }),
  gender: z.enum(['male', 'female', 'other']),
  DateOfBirth: z.string().optional(),
  email: z
    .string()
    .email('Email is not valid')
    .min(1, { message: 'Email is required' }),
  contactNo: z.string().min(1, { message: 'Contact No. is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency Contact No. is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, { message: 'Present Address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent Address is required' }),
  guardian: guardianValidationSchema.refine((data) => !!data, {
    message: 'Guardian Details are required',
  }),
  localGuardian: localGuardianValidationSchema.refine((data) => !!data, {
    message: 'Local Guardian Details are required',
  }),
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
