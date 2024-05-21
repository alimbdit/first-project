// import validator from 'validator';
import { Schema, model } from 'mongoose';
import {
  // StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.interface';

import bcrypt from 'bcrypt';
import config from '../config';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'First Name can not be more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameStr === value;
    //   },
    //   message: "'{VALUE}' is not in capitalize format"
    // }
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxLength: [20, 'Last Name can not be more than 20 characters'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "'{VALUE}' is not valid as Last Name, should only be Alpha"
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father Contact No. is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother Contact No. is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact No. is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Address is required'],
  },
});


// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods> // for custom instance method

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  password: {
    type: String, required: [true, 'password is required'], maxLength: [20, "password can not be more than 20 characters"],
    minLength: [6, "password can not be less than 6 characters"]
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "'{VALUE}' is not valid gender",
    },
    required: [true, 'Gender is required'],
  },
  DateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "'{VALUE}' is not valid Email type"
    // }
  },
  contactNo: { type: String, required: [true, 'Contact No. is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact No. is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: "'{VALUE}' is not valid",
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian Details is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian Details is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: "'{VALUE}' is not valid",
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
},
  {
    toJSON: {
      virtuals: true,
    }
  });


// ! virtual

studentSchema.virtual('fullName').get(function () {
  return (`${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`)
})


// pre save middleware /hooks. will work on create() save()

studentSchema.pre('save', async function (next) {
  // console.log(this, "pre hook : we will save data");
  const user = this; //document
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next();
})



// post save middleware /hooks

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this, ' post hook: we saved our data')
  next();
})



// query middleware.. here 'this' keyword will refer/point to the current query

studentSchema.pre('find', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } });
  next();
})

studentSchema.pre('findOne', function (next) {
  // this.findOne({ isDeleted: { $ne: true } });
  this.find({ isDeleted: { $ne: true } });
  next();
})


// aggregation
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
})


// * creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;

}

// * implement as object. creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser;
// }

// & creating model

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
