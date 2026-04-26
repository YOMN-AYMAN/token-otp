import express from 'express';
import { signup, signin } from './user.controller.js';
import { checkEmails } from '../../middleware/checkEmails.js';
import { verifyOTP } from '../../auth/verifyOTP.js';

export const userRouter = express.Router();

userRouter.post('/signup',checkEmails, signup);
userRouter.post('/signin' ,  signin);
userRouter.post("/verifyOTP" ,verifyOTP )
