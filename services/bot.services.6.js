const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const MailServices = require("./mail.services");

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

class BotServices6 {
    static async roomServiceOrders(chatID) {
        const subMenu = {
            reply_markup: {
                keyboard: [
                    ["Go Back To Main Menu"],
                    ["End Chat With Bot"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            }
        };

        let userName = "";
        let roomNo = "";
        let serviceWanted = "";

        // Provide initial instruction
        bot.sendMessage(chatID, "Please enter your full name", subMenu);


        bot.onText(/Go Back To Main Menu/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Returning to the main menu:", BotServices6.mainMenuKeyboard);
        });

        bot.onText(/End Chat With Bot/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
        });

        let replies = [
            `Thank you, ${userName}! Now please provide your room number.`,
            `Thank you! Now, please specify your service request.`
                `Thank you for your order. Our staff will attend to you soon.`
        ];

        for(let i = 0; i < 3; i++){
            bot.onText(/.+/, (msg) => {
                const chatID = msg.chat.id;
                const userInput = msg.text;
                if (i == 0) {
                    userName = userInput;
                }
                if (i == 1) {
                    roomNo = userInput;
                }
                if (i == 2) {
                    serviceWanted = userInput;
                }
                bot.sendMessage(chatID, replies[i]);
            });
        }

        // Get details and send email
        const date = new Date().toLocaleDateString();
        const mailBody = `
                            🌟 Good day, Alliance Hotel staff!
        
                            A room service order has been placed by ${userName} on ${date}. Here are the details:
        
                            🏨 Room Number: ${roomNo}
                            🍽️ Service Request: ${serviceWanted}
                        `;


        try {
            // Use await for asynchronous operations
            await MailServices.sendEmail("Room Service and Orders", mailBody);

            // Provide confirmation to the user
            bot.sendMessage(chatID, "Thank you for providing your details. Your request has been sent.", BotServices6.mainMenuKeyboard);
            delete this.chatStates[chatID];

        } catch (error) {
            // Handle email sending error
            bot.sendMessage(chatID, "There was an issue sending your request. Please try again later.", BotServices6.mainMenuKeyboard);
            console.error(error);
        }
    }

    static mainMenuKeyboard = {
        reply_markup: {
            keyboard: [
                ["1. Hotel Amenities and Services"],
                ["2. Room Reservations and Bookings"],
                ["3. Wi-Fi Connection"],
                ["4. Gym and Pool Facilities"],
                ["5. Lost and Found Services"],
                ["6. Room Service Orders"],
                ["7. Hotel Policies and Procedures"],
                ["8. Handle Complaints"],
                ["9. Billing and Payment"],
                ["10. General Customer Support"],
                ["End Chat With Bot"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    };
}

module.exports = BotServices6;
