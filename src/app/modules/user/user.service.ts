import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';


const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //! create user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password

  userData.password = password || (config.default_password as string);

  // set role for student
  userData.role = 'student';



  // console.log(payload)

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
  // console.log(admissionSemester)

  // set manually generated id
  // userData.id = '0001';
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // create a user
  const newUser = await User.create(userData); /// built-in static method
  // console.log({ newUser })

  //! create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    // console.log({ newStudent })
    return newStudent;
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
