const bot = require('../index');

class BotServices3 {
    static async fetchWifiDetails(chatID) {
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

        // Provide information about hotel Wi-Fi and internet connections
        const wifiInfo = `
🏨 Welcome to our hotel! Stay connected with our Wi-Fi and internet services:

1. 🌐 High-Speed Wi-Fi: Enjoy fast and reliable internet access throughout the hotel.
2. 💻 Business Center: Our business center offers computers, printers, and high-speed internet for business travelers.
3. 📱 In-Room Wi-Fi: Each room is equipped with complimentary Wi-Fi access for your convenience.
4. 🎉 Events and Conferences: We provide seamless internet connectivity for your meetings and events.
5. 📞 Technical Support: Our friendly staff is available 24/7 to assist with any Wi-Fi-related issues.
6. 🕒 Extended Access: Wi-Fi is available in common areas and public spaces around the clock.
7. 🔐 Secure Connection: Your online security is our priority; we offer a secure network for your peace of mind.

Whether you're here for business or leisure, we ensure you have a smooth online experience during your stay.
`;


        // Send amenities information with the submenu
        bot.sendMessage(chatID, wifiInfo, subMenu);


        bot.onText(/Go Back To Main Menu/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Returning to the main menu:", BotServices3.mainMenuKeyboard);
        });

        bot.onText(/End Chat With Bot/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
        });
    }
}

BotServices3.mainMenuKeyboard = {
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

module.exports = BotServices3;
