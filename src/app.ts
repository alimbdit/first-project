import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// ! parser
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ! application routes
// & use routes from routers
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
