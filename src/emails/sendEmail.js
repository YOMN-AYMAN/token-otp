import { createTransport } from "nodemailer"
import jwt from "jsonwebtoken"
import { htmlCode } from "./htmlCode.js";

export const sendEmail = async (email) => {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: "yomna.aym@gmail.com",
            pass: "gciowzlluzwatmmk"
        }
    });

    const token = jwt.sign({ email }, "emailSignin");

    const info = await transporter.sendMail({
        from: "yomna '<yomna.aym@gmail.com>'",
        to: email,
        subject: "welcome",
        html: htmlCode(token)
    });

    console.log("message sent : %s", info.messageId);
};



