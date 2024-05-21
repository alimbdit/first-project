import Joi from 'joi';

// ! schema validation using JOI

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.pattern.base': "'{#value}' is not in capitalize format",
      'string.max': 'First Name can not be more than 20 characters',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Za-z]+$/, 'alpha characters only')
    .messages({
      'string.pattern.base':
        "'{#value}' is not valid as Last Name, should only be Alpha",
      'string.max': 'Last Name can not be more than 20 characters',
      'any.required': 'Last Name is required',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Father Name is required' }),
  fatherOccupation: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Father Occupation is required' }),
  fatherContactNo: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Father Contact No. is required' }),
  motherName: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Mother Name is required' }),
  motherOccupation: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Mother Occupation is required' }),
  motherContactNo: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Mother Contact No. is required' }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Local Guardian Name is required' }),
  occupation: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Local Guardian Occupation is required' }),
  contactNo: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Local Guardian Contact No. is required' }),
  address: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'Local Guardian Address is required' }),
});

// Define the main student Joi schema
const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required().messages({ 'any.required': 'ID is required' }),
  name: userNameValidationSchema
    .required()
    .messages({ 'any.required': 'Student Name is required' }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': "'{#value}' is not valid gender",
    'any.required': 'Gender is required',
  }),
  DateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    'string.email': "'{#value}' is not valid Email type",
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Contact No. is required' }),
  emergencyContactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Emergency Contact No. is required' }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({ 'any.only': "'{#value}' is not valid" }),
  presentAddress: Joi.string()
    .required()
    .messages({ 'any.required': 'Present Address is required' }),
  permanentAddress: Joi.string()
    .required()
    .messages({ 'any.required': 'Permanent Address is required' }),
  guardian: guardianValidationSchema
    .required()
    .messages({ 'any.required': 'Guardian Details are required' }),
  localGuardian: localGuardianValidationSchema
    .required()
    .messages({ 'any.required': 'Local Guardian Details are required' }),
  profileImg: Joi.string().uri(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .messages({ 'any.only': "'{#value}' is not valid" }),
  isDeleted: Joi.boolean()
});

export default studentJoiValidationSchema;
