import express, { type Request, type Response } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();
// Middleware to read JSON body
app.use(express.json());
// Middleware to read URL encoded data (optional but recommended)
app.use(express.urlencoded({ extended: false }))

app.use('/api/spells', eventRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);



app.listen(port, () => console.log(`Server started running on port ${port}`));


