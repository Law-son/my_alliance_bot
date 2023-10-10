const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const MailServices = require("./mail.services");

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

class BotServices5 {
    static async lostAndFoundServices(chatID) {
        const subMenu = {
            reply_markup: {
                keyboard: [
                    ["Report missing item"],
                    ["Found a lost item"],
                    ["Go Back To Main Menu"],
                    ["End Chat With Bot"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            }
        };

        bot.sendMessage(chatID, "Please select an option from the menu below", subMenu);

        let foundItem = false;
        let itemLost = "";
        let itemFound = "";

        bot.onText(/Go Back To Main Menu/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Returning to the main menu:", BotServices5.mainMenuKeyboard);
        });

        bot.onText(/End Chat With Bot/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
        });

        bot.onText(/Report missing item/, (msg) => {
            const chatID = msg.chat.id;
            foundItem = false;
            bot.sendMessage(chatID, "Please enter the missing item name and your room number.");
        });

        bot.onText(/Found a lost item/, (msg) => {
            const chatID = msg.chat.id;
            foundItem = true;
            bot.sendMessage(chatID, "Please enter the item name and your room number.");
        });

        bot.onText(/.+/, (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;
            if(foundItem == false){
                itemLost = userInput;
            }else{
                itemFound = userInput;
            }
            bot.sendMessage(chatID, "Thank you. Our staff will attend to you soon.", BotServices5.mainMenuKeyboard);
        });

        // Get details and send email
        const date = new Date().toLocaleDateString();
        let mailBody = "";
        if (!foundItem) {
            mailBody = `
                🌟 Good day, Alliance Hotel staff!

                A customer lost their item on ${date}. Below is the item name and room number of the person:
                ${itemLost}
            `;
        } else {
            mailBody = `
                🌟 Good day, Alliance Hotel staff!

                A lost item was found on ${date}. Below is the item name and room number of the founder:
                ${itemFound}
            `;
        }

        try {
            // Use await for asynchronous operations
            await MailServices.sendEmail("Lost And Found Services", mailBody);

            // Provide confirmation to the user
            bot.sendMessage(chatID, "Thank you for providing your details. Your request has been sent.", BotServices5.mainMenuKeyboard);
            delete this.chatStates[chatID];

        } catch (error) {
            // Handle email sending error
            bot.sendMessage(chatID, "There was an issue sending your request. Please try again later.", BotServices5.mainMenuKeyboard);
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

module.exports = BotServices5;
