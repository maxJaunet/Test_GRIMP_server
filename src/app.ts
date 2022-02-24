import cors from 'cors';
import express, { Express } from 'express';
import jobPostRoutes from './routes/jobPostRoutes';
import loginRoutes from './routes/loginRoutes';


const app: Express = express();

app.use(express.json({ limit: '25mb'}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/jobPost', jobPostRoutes);
app.use('/login', loginRoutes);


export default app;