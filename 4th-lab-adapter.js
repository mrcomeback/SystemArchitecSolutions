"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsNotificationAdapter = exports.SmsManager = exports.SlackNotificationAdapter = exports.SlackApiManager = exports.EmailNotification = void 0;
// Email Notification
var EmailNotification = /** @class */ (function () {
    function EmailNotification(adminEmail) {
        this.adminEmail = adminEmail;
    }
    EmailNotification.prototype.send = function (title, message) {
        console.log("Sent email with title '".concat(title, "' to '").concat(this.adminEmail, "' that says '").concat(message, "'."));
    };
    return EmailNotification;
}());
exports.EmailNotification = EmailNotification;
// Slack API
var SlackApiManager = /** @class */ (function () {
    function SlackApiManager(login, apiKey) {
        this.login = login;
        this.apiKey = apiKey;
    }
    SlackApiManager.prototype.authenticate = function () {
        console.log("login with ".concat(this.login, " and ").concat(this.apiKey));
    };
    SlackApiManager.prototype.sendMessage = function (chatId, message) {
        // slack special funcionallity 
        console.log("Sent message to Slack chat '".concat(chatId, "' with message '").concat(message, "'."));
    };
    return SlackApiManager;
}());
exports.SlackApiManager = SlackApiManager;
// Slack Notification Adapter
var SlackNotificationAdapter = /** @class */ (function () {
    function SlackNotificationAdapter(slackApiManager) {
        this.slackApiManager = slackApiManager;
    }
    SlackNotificationAdapter.prototype.setChatId = function (chatId) {
        this.chatId = chatId;
    };
    SlackNotificationAdapter.prototype.clearChatId = function () {
        this.chatId = null;
    };
    SlackNotificationAdapter.prototype.send = function (title, message) {
        this.slackApiManager.authenticate();
        if (this.chatId) {
            this.slackApiManager.sendMessage(this.chatId, "".concat(title, ": ").concat(message));
        }
    };
    return SlackNotificationAdapter;
}());
exports.SlackNotificationAdapter = SlackNotificationAdapter;
// SMS Manager
var SmsManager = /** @class */ (function () {
    function SmsManager() {
    }
    SmsManager.prototype.sendSms = function (phone, sender, message) {
        // sms special funcionallity 
        console.log("Sent SMS from '".concat(sender, "' to '").concat(phone, "' with message '").concat(message, "'."));
    };
    return SmsManager;
}());
exports.SmsManager = SmsManager;
// SMS Notification Adapter
var SmsNotificationAdapter = /** @class */ (function () {
    function SmsNotificationAdapter(smsManager, phone, sender) {
        this.smsManager = smsManager;
        this.phone = phone;
        this.sender = sender;
    }
    SmsNotificationAdapter.prototype.send = function (title, message) {
        this.smsManager.sendSms(this.phone, this.sender, "".concat(title, ": ").concat(message));
    };
    return SmsNotificationAdapter;
}());
exports.SmsNotificationAdapter = SmsNotificationAdapter;
// usage
var emailNotification = new EmailNotification("gubkaBob@patrik.com");
var slackApiManager = new SlackApiManager("user_login", "api_key");
var slackNotification = new SlackNotificationAdapter(slackApiManager);
var smsManager = new SmsManager();
var smsNotification = new SmsNotificationAdapter(smsManager, "1234567890", "SenderName");
emailNotification.send("Default Email", "Default email message");
slackNotification.setChatId("exampleChatId");
slackNotification.send("Slack", "Slack message with login");
slackNotification.clearChatId();
smsNotification.send("SMS", "SMS message");
