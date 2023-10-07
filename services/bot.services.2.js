const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const MailServices = require("./mail.services");

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

class BotServices2 {
    static roomReservationsAndBookings(chatID) {
        return new Promise(async (resolve, reject) => {
            // Variables to store user details
            let userName = "";
            let userPhone = "";
            let numberOfRooms = "";

            // State to keep track of the current step
            let currentState = 0;

            // Introduction message with placeholders for user details
            const introduction = `
            🏨 Booking or reserving rooms at Alliance Hotel is a breeze! Let's get started by providing the necessary details to book your room.

            Please enter your full name:
            `;

            // Function to handle user input for collecting details
            async function handleUserDetailsInput(msg) {
                bot.sendMessage(chatID, introduction);

                const userInput = msg.text;

                switch (currentState) {
                    case 0:
                        // Collect user's name
                        userName = userInput;
                        currentState++;
                        bot.sendMessage(chatID, `Thank you, ${userName}! Now please provide your phone number.`);
                        break;
                    case 1:
                        // Collect user's phone number
                        userPhone = userInput;
                        currentState++;
                        bot.sendMessage(chatID, "Thank you! Now please provide the number of rooms wanted.");
                        break;
                    case 2:
                        // Collect number of rooms
                        numberOfRooms = userInput;
                        
                        // Validate the number of rooms (you can use a regex or other validation method)
                        if (!/^\d+$/.test(numberOfRooms)) {
                            bot.sendMessage(chatID, "Please provide a valid number of rooms.");
                            return;
                        }

                        currentState++;

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
                            await MailServices.sendEmail(userName, "Room Reservation and Booking", mailBody);
                            
                            // Provide confirmation to the user
                            bot.sendMessage(chatID, "Thank you for providing your details. Your booking request has been sent.");

                            // Reset the state
                            currentState = 0;

                            // Remove the event listener to stop listening for further input
                            bot.removeListener("text", handleUserDetailsInput);

                            // Resolve the Promise to signal that all conditions are met
                            resolve();
                        } catch (error) {
                            // Handle email sending error
                            bot.sendMessage(chatID, "There was an issue sending your booking request. Please try again later.");
                            reject(error);
                        }
                        break;
                    default:
                        // Handle unknown input or provide instructions
                        bot.sendMessage(chatID, "Please provide the required information.");
                        break;
                }
            }

            // Listen for user input to collect details
            bot.on("text", handleUserDetailsInput);
        });
    }
}

BotServices2.mainMenuKeyboard = {
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

module.exports = BotServices2;
