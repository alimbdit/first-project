import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {

    // ! schema validation using ZOD

    const { password, student: studentData } = req.body;

    // console.log(studentData);

    // & ===============data validation using ZOD=======================

    // const zodParsedData = studentValidationSchema.parse(studentData);

    // will call service fun to send this data. and value comes from ZOD validation.
    const result = await UserServices.createStudentIntoDB(
        password,
        studentData,
    );

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

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created  successfully.',
        data: result,
    });

});

export const UserControllers = {
    createStudent,
};
