import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
// import { Student } from './student.interface';
// import studentValidationSchema from './student.zod.validation';
// import studentJoiValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // ! schema validation using ZOD

    const { student: studentData } = req.body;

    // console.log(studentData);

    // & ===============data validation using ZOD=======================

    const zodParsedData = studentValidationSchema.parse(studentData);

    // will call service fun to send this data. and value comes from ZOD validation.
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // & ===============data validation using ZOD=======================

    // * ===============data validation using JOI=======================
    // const { error, value } = studentJoiValidationSchema.validate(studentData);
    // will call service fun to send this data. and value comes from joi validation.
    // const result = await StudentServices.createStudentIntoDB(value);

    // if (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: error.message || 'Something went wrong',
    //         error: error.details
    //     });
    // }
    // *========= data validation using JOI=================================

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created  successfully.',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved  successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved  successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudentById,
};
