const bot = require('../index');

class BotServices9 {
    static async fetchBillingAndPaymentInfo(chatID, bot) {
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

        // Provide information about billing and payment info
        const billingAndPaymentInfo = `
🏨 Welcome to our hotel! Here's everything you need to know about billing and payment:

1. 💳 Payment Methods: We accept various payment methods for your convenience, including:
   - 💵 Cash
   - 💳 Credit and Debit Cards
   - 📱 Mobile Money
   
2. 📲 Mobile Money Numbers: To make your payment via mobile money, please use one of the following numbers:
   - 📞 +233XXXXXXXXX (Main Hotel Account)
   - 📞 +233YYYYYYYYY (Reservations)
   
3. 💼 Invoice Requests: If you require an invoice for your stay, please contact our front desk.
   
4. 🧾 Receipts: Receipts for your payments will be provided upon check-out.
   
5. 💼 Corporate Accounts: We offer corporate billing options for business travelers.
   
6. 💱 Currency Exchange: Currency exchange services are available at the front desk.

We strive to make your payment experience as convenient as possible. If you have any questions or need assistance with billing, please don't hesitate to ask our friendly staff.
`;


        // Send gymAndPoolInfo information with the submenu
        bot.sendMessage(chatID, billingAndPaymentInfo, subMenu);

        // bot.onText(/Go Back To Main Menu/, (msg) => {
        //     const chatID = msg.chat.id;
        //     bot.sendMessage(chatID, "Returning to the main menu:", BotServices9.mainMenuKeyboard);
        // });

        // bot.onText(/End Chat With Bot/, (msg) => {
        //     const chatID = msg.chat.id;
        //     bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
        // });
    }
}

BotServices9.mainMenuKeyboard = {
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

module.exports = BotServices9;
