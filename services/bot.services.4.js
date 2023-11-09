const bot = require('../index');

class BotServices4 {
    static async fetchGymAndPoolInfo(chatID, bot) {
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

        // Provide information about gym and pool facilities
        const gymAndPoolInfo = `
🏨 Welcome to our hotel! Stay active and refreshed with our gym and pool facilities:

1. 💪 Fitness Center: Our fully-equipped gym is perfect for your daily workout routines.
2. 🏊‍♂️ Swimming Pool: Take a relaxing dip in our spacious swimming pool.
3. 🌞 Poolside Relaxation: Lounge by the poolside and soak up the sun.
4. 🥤 Refreshing Drinks: Enjoy poolside beverages and snacks from our bar.
5. 🧖‍♀️ Spa Services: Pamper yourself with rejuvenating spa treatments after your workout.
6. 🌅 Open Hours: Our gym and pool are open from early morning until late evening.
7. 🚿 Locker Rooms: Convenient locker rooms with showers are available for your use.
8. 🏋️‍♀️ Personal Trainers: Professional trainers are on hand to assist you with your fitness goals.

Whether you want to stay active or simply unwind by the pool, our facilities are designed for your comfort and relaxation.
`;


        // Send amenities information with the submenu
        bot.sendMessage(chatID, gymAndPoolInfo, subMenu);


        // bot.onText(/Go Back To Main Menu/, (msg) => {
        //     const chatID = msg.chat.id;
        //     bot.sendMessage(chatID, "Returning to the main menu:", BotServices4.mainMenuKeyboard);
        // });

        // bot.onText(/End Chat With Bot/, (msg) => {
        //     const chatID = msg.chat.id;
        //     bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
        // });
    }
}

BotServices4.mainMenuKeyboard = {
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

module.exports = BotServices4;
