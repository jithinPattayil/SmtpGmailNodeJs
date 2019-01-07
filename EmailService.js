var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var path = require('path');
//console.log();
module.exports = class Gmail {
    constructor() {
        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL // true for 465, false for other ports
            auth: {
                user: process.env.email, // generated ethereal user
                pass: process.env.emailpass // generated ethereal password
            }
        });
        this.transporter.use('compile', hbs({
            viewPath: path.resolve(__dirname) + '/templates/',
            extName: '.hbs'
        }))
    }

	//newRegistraction
    newRegistraction(data, token) {
            nodemailer.createTestAccount((err, account) => {
                let mailOptions = {
                    from: '"Please confirm your email address "',
                    to: data.email, 
                    subject: 'Please confirm your email address  ', 
                    template: 'regtemplate',
                    context: {
                        site: 'nsm',
                        name: data.userName,
                        email: data.email,
                        token: token,
                        'path':'http://139.59.18.187:3000/api/v1/user/account/verifications/'
                    } 
                };

                // send mail with defined transport object
                this.transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                   // console.log('Message sent: %s', info.messageId);
                   // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                });

            });

        }
        /** Account  Block
         * 
         */

    accountBlock(data) {
        nodemailer.createTestAccount((err, account) => {
            let mailOptions = {
                from: '"Your Account is blocked "',
                to: data.email, 
                subject: 'accountBlock', 
                text: 'Your Account is blocked',
                template: 'accountBlock',
                context: {
                    name: data.userName,
                } 
            };

            // send mail with defined transport object
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });

        });

    }

}