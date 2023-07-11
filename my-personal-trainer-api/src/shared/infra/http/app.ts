import 'reflect-metadata'
import 'dotenv/config'
import express, {Request, Response, NextFunction} from 'express'; import cors from 'cors'
import * as path from 'path'
import AppError from '@shared/errors/AppError';
import 'express-async-errors'
import routes from './routes';
import {errors} from 'celebrate';
import '../../container'

const app = express()
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', '..', '..', '..', 'tmp')));
app.use(routes)
app.use(errors())

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	console.log(err);

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

export default app
