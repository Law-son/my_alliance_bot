const MailServices = require("./mail.services");

class BotServices5 {
    static async lostAndFoundServices(chatID, bot) {
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

        let foundItem = false;
        let itemLost = "";
        let itemFound = "";

        // Provide initial instruction
        bot.sendMessage(chatID, "Please select an option from the menu below", subMenu);

        // Listen for user input to handle menu options
        bot.on("message", async (msg) => {
            const userInput = msg.text;
            
            if (userInput === "Go Back To Main Menu") {
                bot.sendMessage(chatID, "Returning to the main menu:", BotServices5.mainMenuKeyboard);
            } else if (userInput === "End Chat With Bot") {
                bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
            } else if (userInput === "Report missing item" || userInput === "Found a lost item") {
                // Update the foundItem flag and provide the appropriate instruction
                foundItem = userInput === "Found a lost item";
                bot.sendMessage(chatID, `Please enter the ${foundItem ? "found" : "missing"} item name and your room number.`);
            } else {
                // Handle user input for lost or found items
                if (!foundItem) {
                    itemLost = userInput;
                } else {
                    itemFound = userInput;
                }
                bot.sendMessage(chatID, "Thank you. Our staff will attend to you soon.", BotServices5.mainMenuKeyboard);

                // Get details and send email
                const date = new Date().toLocaleDateString();
                const mailBody = `
                    🌟 Good day, Alliance Hotel staff!

                    ${foundItem ? "A lost item was found" : "A customer lost their item"} on ${date}. Below is the item name and room number:
                    ${foundItem ? itemFound : itemLost}
                `;

                try {
                    // Use await for asynchronous operations
                    await MailServices.sendEmail("Lost And Found Services", mailBody);

                    // Provide confirmation to the user
                    bot.sendMessage(chatID, "Thank you for providing your details. Your request has been sent.", BotServices5.mainMenuKeyboard);

                } catch (error) {
                    // Handle email sending error
                    bot.sendMessage(chatID, "There was an issue sending your request. Please try again later.", BotServices5.mainMenuKeyboard);
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

module.exports = BotServices5;
