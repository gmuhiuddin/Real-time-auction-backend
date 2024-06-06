import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendBiderEmail = async (email, amount, productTitle) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.Smtp_User_Name,
            pass: process.env.Smtp_Password,
        },
    });

    await transporter.sendMail({
        from: '"Aution-web-department" <aution.web.email>',
        to: email,
        subject: "Bid winning", // Subject line
        //     text: `You login in this ip address ${ipAddress}. If not you, Please contact our customer support
        // https://gmuhiuddin.website/support
        //     `,
        html: `<h1>You won a bid in $${amount}. Product title was ${productTitle}</h1>`,
    });
};

const sendProductOwnerEmail = async (productOwnerEmail, biderEmail, amount, productTitle) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.Smtp_User_Name,
            pass: process.env.Smtp_Password,
        },
    });

    await transporter.sendMail({
        from: '"Aution-web-department" <aution.web.email>',
        to: productOwnerEmail,
        subject: "Product Bided", // Subject line
        //     text: `You login in this ip address ${ipAddress}. If not you, Please contact our customer support
        // https://gmuhiuddin.website/support
        //     `,
        html: `<h1>Your product was sold in $${amount}. Product title was ${productTitle}, winner email was ${biderEmail}</h1>`,
    });
};

const sendProductOwneractivationEmail = async (productOwnerEmail, productTitle, productAmount, productId) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.Smtp_User_Name,
            pass: process.env.Smtp_Password,
        },
    });

    await transporter.sendMail({
        from: '"Aution-web-department" <aution.web.email>',
        to: productOwnerEmail,
        subject: "Product lived", // Subject line
        //     text: `You login in this ip address ${ipAddress}. If not you, Please contact our customer support
        // https://gmuhiuddin.website/support
        //     `,
        html: `<h1>Your product was lived Product title was ${productTitle} and product starting amount was ${productAmount}</h1>`,
    });
};

export { sendBiderEmail, sendProductOwnerEmail, sendProductOwneractivationEmail };