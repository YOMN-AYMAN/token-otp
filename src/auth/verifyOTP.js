import { User } from "../../dbConnection/models/user.model.js";

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    if (user.isVerified) {
        return res.json({ message: "already verified" });
    }

    if (user.otp !== otp) {
        return res.status(400).json({ message: "invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({ message: "account verified successfully" });
};


