const bot = require('../index');

const MailServices = require("./mail.services");

class BotServices8 {
    static async handleComplaints(chatID) {
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
        let complaint = "";

        // Provide initial instruction
        bot.sendMessage(chatID, "Please enter your full name", subMenu);


        bot.onText(/Go Back To Main Menu/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Returning to the main menu:", BotServices8.mainMenuKeyboard);
        });

        bot.onText(/End Chat With Bot/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
        });

        let replies = [
            `Thank you, ${userName}! Now please provide your room number.`,
            `Thank you! Now, please describe your complaint.`
                `Thank you for your order.`
        ];

        for(let i = 0; i < 3; i++) {
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
                    complaint = userInput;
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
                            🍽️ Service Request: ${complaint}
                        `;


        try {
            // Use await for asynchronous operations
            await MailServices.sendEmail("Room Service and Orders", mailBody);

            // Provide confirmation to the user
            bot.sendMessage(chatID, "Thank you for submitting your complaint. Our team will investigate and address it.", BotServices8.mainMenuKeyboard);
            delete this.chatStates[chatID];

        } catch (error) {
            // Handle email sending error
            bot.sendMessage(chatID, "There was an issue sending your complaint. Please try again later.", BotServices8.mainMenuKeyboard);
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

module.exports = BotServices8;
