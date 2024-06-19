import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //! create user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password

  userData.password = password || (config.default_password as string);

  // set role for student
  userData.role = 'student';

  // console.log(payload)

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // console.log(admissionSemester)

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set manually generated id
    // userData.id = '0001';
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array
    // built-in static method
    // console.log({ newUser })

    //! create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    // console.log({ newStudent })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    // throw new AppError(
    //   httpStatus.BAD_REQUEST,
    //   'Failed to create User and Student',
    // );
    throw new Error(err)
    // throw new AppError(err.errorResponse.code, err.errorResponse.errmsg)
    // console.log({ err })
  }

  // & for custom instance method
  // const student = new Student(studentData) // create an instance

  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('user already exists!')
  //   }

  //   const result = await student.save();  // built-in instance method
};

export const UserServices = {
  createStudentIntoDB,
};
