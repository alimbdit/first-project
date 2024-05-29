import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// * will call controller
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudentById);
router.delete('/:studentId', StudentControllers.deleteStudentById)

// ! here router is an object itself so not need to export as object like {router}, should export only router because it hold an object of routes.
export const StudentRoutes = router;
