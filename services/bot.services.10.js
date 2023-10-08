const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

class BotServices10 {
    static async fetchGeneralSupportInfo(chatID) {
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

// Provide information about general customer support
const generalSupportInfo = `
🏨 Welcome to our hotel! We're here to assist you with all your needs, and you can reach us through various contact methods:

1. 📞 Phone Support:
   - 📞 General Inquiries: +233-XXXXXXXXX
   - 📞 Reservations: +233-YYYYYYYYY
   - 📞 Front Desk: +233-ZZZZZZZZZ

2. 📧 Email Support:
   - 📧 General Inquiries: info@alliancehotel.com
   - 📧 Reservations: reservations@alliancehotel.com
   - 📧 Customer Support: support@alliancehotel.com

3. 💼 Visit Us:
   - 🏨 Hotel Address: Beach Road, Takoradi, Ghana

4. 🌐 Online:
   - 💻 Website: www.alliancehotel.com
   - 📱 Social Media: Follow us on Facebook, Twitter(X), and Instagram for updates and assistance.

Our dedicated team is available to provide you with the best service possible. Feel free to contact us through any of the above methods, and we'll be delighted to assist you.
`;


        // Send gymAndPoolInfo information with the submenu
        bot.sendMessage(chatID, generalSupportInfo, subMenu);

        // Listen for user input
        bot.on("message", (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;

            if (userInput === "/start" || userInput.toLowerCase() === "menu") {
                // Provide the main menu options when requested
                bot.sendMessage(chatID, "Welcome, I'm myAllianceBot! Please select an option from the menu:", BotServices10.mainMenuKeyboard);
            } else {
                // Check the user's input and trigger corresponding functions
                switch (userInput) {
                    case "Go Back To Main Menu":
                        // Go back to the main menu
                        bot.sendMessage(chatID, "Returning to the main menu:", BotServices10.mainMenuKeyboard);
                        break;
                    case "End Chat With Bot":
                        // End the chat with the bot
                        bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                        break;
                    default:
                        // Handle unknown input or provide instructions
                        bot.sendMessage(chatID, "Please select an option from the menu:", BotServices10.mainMenuKeyboard);
                }
            }
        });
    }
}

BotServices10.mainMenuKeyboard = {
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

module.exports = BotServices10;
