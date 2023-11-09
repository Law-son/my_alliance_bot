const MailServices = require("./mail.services");

class BotServices8 {
    static async handleComplaints(chatID, bot) {
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
        let complaint = "";

        // Provide initial instruction
        bot.sendMessage(chatID, "Please enter your full name", subMenu);

        // Listen for user input to collect details
        bot.on("message", async (msg) => {
            const userInput = msg.text;


            // Handle user input based on the current step
            if (!userName) {
                // Collect user's name
                userName = userInput;
                bot.sendMessage(chatID, `Thank you, ${userName}! Now please provide your room number.`, subMenu);
            } else if (!roomNo) {
                // Collect user's room number
                roomNo = userInput;
                bot.sendMessage(chatID, "Thank you! Now, please describe your complaint.", subMenu);
            } else if (!complaint) {
                // Collect the complaint description
                complaint = userInput;

                // Send email with collected details
                const date = new Date().toLocaleDateString();
                const mailBody = `
                        🌟 Good day, Alliance Hotel staff!

                        A complaint has been submitted by ${userName} on ${date}. Here are the details:
                        🏨 Room Number: ${roomNo}
                        📃 Complaint: ${complaint}
                    `;

                try {
                    // Use await for asynchronous operations
                    await MailServices.sendEmail("Complaint Submission", mailBody);

                    // Provide confirmation to the user and return to the main menu
                    bot.sendMessage(chatID, "Thank you for submitting your complaint. Our team will investigate and address it.", BotServices8.mainMenuKeyboard);

                } catch (error) {
                    // Handle email sending error
                    bot.sendMessage(chatID, "There was an issue sending your complaint. Please try again later.", subMenu);
                    console.error(error);
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

module.exports = BotServices8;

// if (userInput === "Go Back To Main Menu") {
//     bot.sendMessage(chatID, "Returning to the main menu:", BotServices8.mainMenuKeyboard);
// } else if (userInput === "End Chat With Bot") {
//     bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
// } else {}