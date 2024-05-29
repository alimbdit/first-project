import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    //! create user object
    const userData: Partial<TUser> = {}

    // if password is not given, use default password

    userData.password = password || config.default_password as string;

    // set role for student
    userData.role = 'student';

    // set manually generated id
    userData.id = '2030100001';

    // create a user
    const newUser = await User.create(userData);   /// built-in static method


    //! create a student
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id;     // reference _id

        const newStudent = await Student.create(studentData);
        return newStudent
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
}