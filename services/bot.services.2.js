const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const MailServices = require("./mail.services");

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

class BotServices2 {
    static async roomReservationsAndBookings(chatID) {
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

        // Variables to store user details
        let userName = "";
        let userPhone = "";
        let numberOfRooms = "";

        await bot.sendMessage(chatID, "Please enter your full name", subMenu);

        // Listen for user input
        bot.on("message", (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;

            if (userInput === "/start") {
                // Provide the main menu options when requested
                bot.sendMessage(chatID, "Welcome, I'm myAllianceBot! Please select an option from the menu:", BotServices2.mainMenuKeyboard);
            } else {
                // Check the user's input and trigger corresponding functions
                switch (userInput) {
                    case "Go Back To Main Menu":
                        // Go back to the main menu
                        bot.sendMessage(chatID, "Returning to the main menu:", BotServices2.mainMenuKeyboard);
                        break;
                    case "End Chat With Bot":
                        // End the chat with the bot
                        bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                        break;
                    default:
                        // Collect user's name
                        userName = userInput;
                }

            }
        });


        await bot.sendMessage(chatID, `Thank you, ${userName}! Now please provide your phone number.`, BotServices2.subMenu);

        // Listen for user input
        bot.on("message", (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;

            if (userInput === "/start") {
                // Provide the main menu options when requested
                bot.sendMessage(chatID, "Welcome, I'm myAllianceBot! Please select an option from the menu:", BotServices2.mainMenuKeyboard);
            } else {
                // Check the user's input and trigger corresponding functions
                switch (userInput) {
                    case "Go Back To Main Menu":
                        // Go back to the main menu
                        bot.sendMessage(chatID, "Returning to the main menu:", BotServices2.mainMenuKeyboard);
                        break;
                    case "End Chat With Bot":
                        // End the chat with the bot
                        bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                        break;
                    default:
                        // Collect user's phone number
                        userPhone = userInput;
                }

            }
        });

        await bot.sendMessage(chatID, "Thank you! Now please provide the number of rooms want to book.");

        // Listen for user input
        bot.on("message", (msg) => {
            const chatID = msg.chat.id;
            const userInput = msg.text;

            if (userInput === "/start") {
                // Provide the main menu options when requested
                bot.sendMessage(chatID, "Welcome, I'm myAllianceBot! Please select an option from the menu:", BotServices2.mainMenuKeyboard);
            } else {
                // Check the user's input and trigger corresponding functions
                switch (userInput) {
                    case "Go Back To Main Menu":
                        // Go back to the main menu
                        bot.sendMessage(chatID, "Returning to the main menu:", BotServices2.mainMenuKeyboard);
                        break;
                    case "End Chat With Bot":
                        // End the chat with the bot
                        bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                        break;
                    default:
                        // Collect number of rooms
                        numberOfRooms = userInput;
                }

            }
        });

        // Send email with collected details
        const date = new Date().toLocaleDateString();
        const mailBody = `
        🌟 Good day, Alliance Hotel staff!

        A booking has been made by ${userName} on ${date}. Here are the booking details:

        📞 Phone Number: ${userPhone}
        🛏️ Number Of Rooms: ${numberOfRooms}
        `;

        try {
            // Use await for asynchronous operations
            await MailServices.sendEmail("Room Reservation and Booking", mailBody);
            
            // Provide confirmation to the user
            bot.sendMessage(chatID, "Thank you for providing your details. Your booking request has been sent.", BotServices2.mainMenuKeyboard);

        } catch (error) {
            // Handle email sending error
            bot.sendMessage(chatID, "There was an issue sending your booking request. Please try again later.", BotServices2.mainMenuKeyboard);
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

module.exports = BotServices2;
