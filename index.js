// const TelegramBot = require("node-telegram-bot-api/lib/telegram");
const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const BotServices1 = require('./services/bot.services.1');
const BotServices2 = require('./services/bot.services.2');
const BotServices3 = require('./services/bot.services.3');
const BotServices4 = require('./services/bot.services.4');
const BotServices5 = require('./services/bot.services.5');
const BotServices6 = require('./services/bot.services.6');
const BotServices7 = require('./services/bot.services.7');
const BotServices8 = require('./services/bot.services.8');
const BotServices9 = require('./services/bot.services.9');
const BotServices10 = require('./services/bot.services.10');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

//BotServices1.botStuff(bot);
bot.on("message", async (msg) => {
    const chatID = msg.chat.id;
    const userInput = msg.text;

    if (userInput === "/start" || userInput.toLowerCase() === "menu") {
        bot.sendMessage(chatID, "🤖 Hello,\n I'm AllianceBot and I'm here to assist you with all sorts of services to make your experience at Alliance Hotel great.\n Let's start with these menu options. What do you need assistance with?\n Please choose from the menu:", mainMenuKeyboard);
    } else {
        switch (userInput) {
            case "1. Hotel Amenities and Services":
                BotServices1.fetchHotelAmenitiesAndServices(chatID, bot);
                break;
            case "2. Room Reservations and Bookings":
                BotServices2.roomReservationsAndBookings(chatID, bot);
                break;
            case "3. Wi-Fi Connection":
                BotServices3.fetchWifiDetails(chatID, bot);
                break;
            case "4. Gym and Pool Facilities":
                BotServices4.fetchGymAndPoolInfo(chatID, bot);
                break;
            case "5. Lost and Found Services":
                BotServices5.lostAndFoundServices(chatID, bot);
                break;
            case "6. Room Service Orders":
                BotServices6.roomServiceOrders(chatID, bot);
                break;
            case "7. Hotel Policies and Procedures":
                BotServices7.fetchHotelPolicies(chatID, bot);
                break;
            case "8. Handle Complaints":
                BotServices8.handleComplaints(chatID, bot);
                break;
            case "9. Billing and Payment":
                BotServices9.fetchBillingAndPaymentInfo(chatID, bot);
                break;
            case "10. General Customer Support":
                BotServices10.fetchGeneralSupportInfo(chatID, bot);
                break;
            case "/Go Back To Main Menu/":
                bot.sendMessage(chatID, "Returning to the main menu:", mainMenuKeyboard);
                break;
            case "/End Chat With Bot/":
                bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                break;
            case "End Chat With Bot":
                bot.sendMessage(chatID, "Thank you for using our services. Have a great day!");
                break;
            default:
                // Handle unknown input or provide instructions
                console.log("Unknown item entered.");
        }
    }
});

const mainMenuKeyboard = {
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

