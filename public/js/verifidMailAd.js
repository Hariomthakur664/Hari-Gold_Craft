const nodeMailer = require("nodemailer");

const sendVerifyMail = async (name, email, user_id) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER || "hariomthakur664@gmail.com", // Use environment variables
                pass: process.env.EMAIL_PASS || "mzuzhqvnovgfbivt"
            }
        });

        const mailOptions = {
            from: "hariomthakur664@gmail.com",
            to: email, // Corrected this line
            subject: "Verification Email",
            html: `<p>Hi ${name}, please click here to verify your account <a href="http://localhost:3000/verifyAdmin?id=${user_id}">Verify</a> your email</p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error sending email:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

    } catch (err) {
        console.log("Error:", err.message);
    }
};

module.exports = sendVerifyMail;
