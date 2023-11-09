const MailServices = require("./mail.services");

class BotServices2 {
    static async roomReservationsAndBookings(chatID, bot) {
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

        let userState = 0;
        let userName = "";
        let phone = "";
        let noRooms = 0;


        const sendMessage = (chatID, message, keyboard) => {
            bot.sendMessage(chatID, message, keyboard);
        };

        // Function to ask for the user's name
        const askForName = (chatID) => {
            sendMessage(chatID, "Please enter your full name", subMenu);
            userState = 0; // Reset the step to 0
        };

        // Function to handle user input for collecting details
        bot.on("message", async (msg) => {
            const userInput = msg.text;
            const chatID = msg.chat.id;

            // Handle user input based on the current step
            switch (userState) {
                case 0:
                    // Collect user's name
                    userName = userInput;
                    sendMessage(chatID, `Thank you, ${userName}! Now please provide your phone number.`, subMenu);
                    userState = 1;
                    break;
                case 1:
                    // Collect user's phone number
                    phone = userInput;
                    sendMessage(chatID, "Thank you! Now please provide the number of rooms you want to book.", subMenu);
                    userState = 2;
                    break;
                case 2:
                    // Collect number of rooms
                    noRooms = userInput;
                    // Send email with collected details
                    const date = new Date().toLocaleDateString();
                    const mailBody = `
                            🌟 Good day, Alliance Hotel staff!

                            A booking has been made by ${userName} on ${date}. Here are the booking details:
                            📞 Phone Number: ${phone}
                            🛏️ Number Of Rooms: ${noRooms}
                        `;
                    try {
                        // Use await for asynchronous operations
                        await MailServices.sendEmail("Room Reservation and Booking", mailBody);
                        // Provide confirmation to the user and return to the main menu
                        sendMessage(chatID, "Thank you for providing your details. Your booking request has been sent.", BotServices2.mainMenuKeyboard);
                        //userState = 0;
                    } catch (error) {
                        // Handle email sending error
                        sendMessage(chatID, "There was an issue sending your booking request. Please try again later.", subMenu);
                        console.error(error);
                    }
                    break;
                default:
                    console.log("Ending chat or unknown text");
            }

        });

        // Ask for the user's name when the function is called
        askForName(chatID);
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

module.exports = BotServices2;
