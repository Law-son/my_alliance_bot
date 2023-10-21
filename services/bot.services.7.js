const bot = require('../index');

class BotServices7 {
    static async fetchHotelPolicies(chatID, bot) {
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

        // Provide information about hotel policies and procedures
        const hotelPolicies = `
🏨 Welcome to our hotel! To ensure a pleasant stay, please familiarize yourself with our policies and procedures:

1. 🕒 Check-in and Check-out: Check-in time is 3:00 PM, and check-out time is 11:00 AM.
2. 🚬 Smoking Policy: Our hotel is entirely smoke-free. Smoking is only allowed in designated areas.
3. 🐾 Pet-Friendly: We welcome well-behaved pets in specific rooms. Please inquire about our pet policy.
4. 🪥 Housekeeping: Daily housekeeping services are provided for your comfort.
5. 🏨 Room Keys: Please keep your room key secure to avoid replacement charges.
6. 📶 Internet Access: Enjoy complimentary high-speed Wi-Fi throughout your stay.
7. 🍽️ Dining Options: Explore our dining facilities for delicious meals and room service.
8. 📦 Luggage Storage: Luggage storage is available for early check-ins or late check-outs.
9. 🏊‍♂️ Pool Hours: Our swimming pool is open from 8:00 AM to 8:00 PM.
10. 📜 Policies Details: For a detailed overview of our policies, please visit our website or inquire at the front desk.

We strive to provide a comfortable and enjoyable experience for all our guests. If you have any questions or need assistance, our friendly staff is here to help.
`;


        // Send amenities information with the submenu
        bot.sendMessage(chatID, hotelPolicies, subMenu);


        bot.onText(/Go Back To Main Menu/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Returning to the main menu:", BotServices7.mainMenuKeyboard);
        });

        bot.onText(/End Chat With Bot/, (msg) => {
            const chatID = msg.chat.id;
            bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
        });
    }
}

BotServices7.mainMenuKeyboard = {
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

module.exports = BotServices7;
