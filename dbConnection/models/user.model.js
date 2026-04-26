import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    // confirmEmail:{
    //     type:Boolean,
    //     default:false
    // },
    otp: String,
    otpExpires: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'], 
        default:"user",
    }
} , {
    timeseries:{
        createdAt:"date",
        updatedAt:false
    },
    versionKey:false,
    strict:true
});

export const  User = model('user', userSchema);