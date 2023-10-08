const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

class BotServices1 {
    static async fetchHotelAmenitiesAndServices(chatID) {
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

        // Provide information about hotel amenities and services with emojis
        const amenitiesInfo = `
🏨 Welcome to our hotel! Here are some of our amenities and services:
  
1. 🍽️ Dining: Enjoy delicious meals at our restaurant.
2. 🏊‍♂️ Pool: Take a dip in our refreshing swimming pool.
3. 💪 Gym: Stay fit in our fully-equipped gym.
4. 🚗 Parking: We offer secure parking facilities.
5. 🌐 Wi-Fi: High-speed Wi-Fi is available in all areas.
6. 🛎️ Room Service: Order your favorite dishes to your room.
7. 🎉 Events: Host your special events at our banquet hall.
8. 🚕 Airport Shuttle: Complimentary shuttle service.
9. 🧳 Concierge: Our staff can assist with travel plans.
10. 🏢 Business Center: Business amenities for professionals.
`;

        // Send amenities information with the submenu
        bot.sendMessage(chatID, amenitiesInfo, subMenu);

        // Listen for user input
        bot.on("message", (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;

            if (userInput === "/start" || userInput.toLowerCase() === "menu") {
                // Provide the main menu options when requested
                bot.sendMessage(chatID, "Welcome, I'm myAllianceBot! Please select an option from the menu:", BotServices1.mainMenuKeyboard);
            } else {
                // Check the user's input and trigger corresponding functions
                switch (userInput) {
                    case "Go Back To Main Menu":
                        // Go back to the main menu
                        bot.sendMessage(chatID, "Returning to the main menu:", BotServices1.mainMenuKeyboard);
                        break;
                    case "End Chat With Bot":
                        // End the chat with the bot
                        bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                        break;
                    default:
                        // Handle unknown input or provide instructions
                        bot.sendMessage(chatID, "Please select an option from the menu:", mainMenuKeyboard);
                }
            }
        });
    }
}

BotServices1.mainMenuKeyboard = {
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

module.exports = BotServices1;
