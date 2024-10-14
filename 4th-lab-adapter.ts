// Existing interface
export interface Notification {
    send(title: string, message: string): void;
}

// Email Notification
export class EmailNotification implements Notification {
    private adminEmail: string;

    constructor(adminEmail: string) {
        this.adminEmail = adminEmail;
    }

    send(title: string, message: string): void {
        console.log(`Sent email with title '${title}' to '${this.adminEmail}' that says '${message}'.`);
    }
}

// Slack API
export class SlackApiManager {
    private login: string;
    private apiKey: string;

    constructor(login: string, apiKey: string) {
        this.login = login;
        this.apiKey = apiKey;
    }

    authenticate() {
        console.log(`login with ${this.login} and ${this.apiKey}`);
    }

    sendMessage(chatId: string, message: string): void {
        // slack special funcionallity 
        console.log(`Sent message to Slack chat '${chatId}' with message '${message}'.`);
    }
}

// Slack Notification Adapter
export class SlackNotificationAdapter implements Notification {
    private slackApiManager: SlackApiManager;
    private chatId: string | null;

    constructor(slackApiManager: SlackApiManager) {
        this.slackApiManager = slackApiManager;
    }

    setChatId(chatId: string) {
        this.chatId = chatId;
    }

    clearChatId() {
        this.chatId = null;
    }

    send(title: string, message: string): void {
        this.slackApiManager.authenticate(); 
        if(this.chatId) {
            this.slackApiManager.sendMessage(this.chatId, `${title}: ${message}`);
        }
    }
}

// SMS Manager
export class SmsManager {
    sendSms(phone: string, sender: string, message: string): void {
        // sms special funcionallity 
        console.log(`Sent SMS from '${sender}' to '${phone}' with message '${message}'.`);
    }
}

// SMS Notification Adapter
export class SmsNotificationAdapter implements Notification {
    private smsManager: SmsManager;
    private phone: string;
    private sender: string;

    constructor(smsManager: SmsManager, phone: string, sender: string) {
        this.smsManager = smsManager;
        this.phone = phone;
        this.sender = sender;
    }

    send(title: string, message: string): void {
        this.smsManager.sendSms(this.phone, this.sender, `${title}: ${message}`);
    }
}

// usage
const emailNotification = new EmailNotification("gubkaBob@patrik.com");

const slackApiManager = new SlackApiManager("user_login", "api_key");
const slackNotification = new SlackNotificationAdapter(slackApiManager);

const smsManager = new SmsManager();
const smsNotification = new SmsNotificationAdapter(smsManager, "1234567890", "SenderName");

emailNotification.send("Default Email", "Default email message");

slackNotification.setChatId("exampleChatId");
slackNotification.send("Slack", "Slack message with login");
slackNotification.clearChatId();

smsNotification.send("SMS", "SMS message");