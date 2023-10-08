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

        // Variables to store user details
        let lostItemDetails = "";
        let foundItemDetails = "";
        lost = false;

        await bot.sendMessage(chatID, "Please select an option from the menu below", subMenu);

        // Listen for user input
        bot.on("message", (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;

            if (userInput === "/start") {
                // Provide the main menu options when requested
                bot.sendMessage(chatID, "Welcome, I'm myAllianceBot! Please select an option from the menu:", BotServices5.mainMenuKeyboard);
            } else {
                // Check the user's input and trigger corresponding functions
                switch (userInput) {
                    case "Go Back To Main Menu":
                        // Go back to the main menu
                        bot.sendMessage(chatID, "Returning to the main menu:", BotServices5.mainMenuKeyboard);
                        break;
                    case "End Chat With Bot":
                        // End the chat with the bot
                        bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                        break;
                    case "Found a lost item":
                        // End the chat with the bot
                        lost = true;
                        bot.sendMessage(chatID, "Please enter the item name and your room number.");
                        break;
                    case "Report missing item":
                        // End the chat with the bot
                        bot.sendMessage(chatID, "Please enter the missing item name and your room number.");
                        break;
                    default:
                        // Collect user's name
                        bot.sendMessage(chatID, "Please select from the menu below.", subMenu);
                }
            }
        });


        // Listen for user input
        bot.on("message", (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;
            if(lost){
                lostItemDetails = userInput;
                foundItemDetails = null;
            }else{
                lostItemDetails = null;
                foundItemDetails = userInput;
            }

            bot.sendMessage(chatID, "Thank you. Our staff will attend to you soon.", BotServices5.mainMenuKeyboard);
        });

        //get details and send email
        const date = new Date().toLocaleDateString();
        if(lost){
            const mailBody = `
        🌟 Good day, Alliance Hotel staff!

        A customer lost his item on ${date}. Below is the item name and room number of the person:
        ${lostItemDetails}
        `;
        }else{
            const mailBody = `
        🌟 Good day, Alliance Hotel staff!

        A lost item was found on ${date}. Below is the item name and room number of the founder:
        ${foundItemDetails}
        `;
        }

        try {
            // Use await for asynchronous operations
            await MailServices.sendEmail("Lost And Found Services", mailBody);
            
            // Provide confirmation to the user
            bot.sendMessage(chatID, "Thank you for providing your details. Your booking request has been sent.", BotServices5.mainMenuKeyboard);

        } catch (error) {
            // Handle email sending error
            bot.sendMessage(chatID, "There was an issue sending your booking request. Please try again later.", BotServices5.mainMenuKeyboard);
            reject(error);
        }

    }

    mainMenuKeyboard = {
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
