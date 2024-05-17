const axios = require('axios');
require('dotenv').config();

const serviceId = process.env.serviceId;
const templateId = process.env.templateId;
const userId = process.env.userId;


class MailServices{
  static async sendEmail(subject, body) {
    const url = 'https://api.emailjs.com/api/v1.0/email/send';

    try {
        const response = await axios.post(url, {
            service_id: serviceId,
            template_id: templateId,
            user_id: userId,
            template_params: {
                to_email: '', //please put your testing email here
                from_name: 'Alliance Hotel',
                to_name: 'Alliance Hotel Staff',
                reply_to: 'agroguard@gmail.com',
                subject: subject,
                message: body,
            },
        }, {
            headers: {
                'origin': 'http://localhost',
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
}

module.exports = MailServices;