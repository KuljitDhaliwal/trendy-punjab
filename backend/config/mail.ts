import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})


// transporter.verify((error, success) => {
//     if (error) {
//         console.error("Mail transporter error:", error)
//     } else {
//         console.log("Mail server is ready!")
//     }
// })

export default transporter