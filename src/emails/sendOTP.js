
import { createTransport } from "nodemailer"

export const sendOTP = async (email, otp) => {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: "yomna.aym@gmail.com",
            pass: "gciowzlluzwatmmk"
        }
    });

    await transporter.sendMail({
        from: "yomna <yomna.aym@gmail.com>",
        to: email,
        subject: "Your OTP Code",
        html: `
        <h2>Your OTP is: ${otp}</h2>

        <a href="http://localhost:3000/verifyOTP"
        style="
            display:inline-block;
            padding:10px 20px;
            background:#6c63ff;
            color:white;
            text-decoration:none;
            border-radius:5px;
            margin-top:10px;
        ">
        Enter OTP
        </a>
        `
    });
};