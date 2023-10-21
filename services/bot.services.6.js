const MailServices = require("./mail.services");

class BotServices6 {
    static async roomServiceOrders(chatID, bot) {
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

        // Initialize variables to store user details
        let userName = "";
        let roomNo = "";
        let serviceWanted = "";

        // Provide initial instruction
        bot.sendMessage(chatID, "Please enter your full name", subMenu);

        // Listen for user input to collect details
        bot.on("message", async (msg) => {
            const userInput = msg.text;

            if (userInput === "Go Back To Main Menu") {
                bot.sendMessage(chatID, "Returning to the main menu:", BotServices6.mainMenuKeyboard);
            } else if (userInput === "End Chat With Bot") {
                bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
            } else {
                // Handle user input based on the current step
                if (!userName) {
                    // Collect user's name
                    userName = userInput;
                    bot.sendMessage(chatID, `Thank you, ${userName}! Now please provide your room number.`, subMenu);
                } else if (!roomNo) {
                    // Collect user's room number
                    roomNo = userInput;
                    bot.sendMessage(chatID, "Thank you! Now, please specify your service request.", subMenu);
                } else if (!serviceWanted) {
                    // Collect the service request
                    serviceWanted = userInput;

                    // Send email with collected details
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

                        // Provide confirmation to the user and return to the main menu
                        bot.sendMessage(chatID, "Thank you for providing your details. Your request has been sent.", BotServices6.mainMenuKeyboard);

                    } catch (error) {
                        // Handle email sending error
                        bot.sendMessage(chatID, "There was an issue sending your request. Please try again later.", subMenu);
                        console.error(error);
                    }
                }
            }
        });
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
