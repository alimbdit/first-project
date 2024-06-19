import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';


const app: Application = express();

// ! parser
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ! application routes
// & use routes from routers
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  // Promise.reject();
  // const a = 10;
  // res.send(a);
  res.send('server is running!');
};

app.get('/', test);

// ! global Error Handler Middleware
app.use(globalErrorHandler);

// ! NOT found Middleware
app.use(notFound);

export default app;
