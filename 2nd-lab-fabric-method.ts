// Base class
export abstract class BaseSocialNetworkManager {
    abstract authenticate(): void;
    abstract sendMessage(text: string): void;

    public postMessage(text: string): void {
        this.authenticate();
        this.sendMessage(text);
    }
}
// external types
export interface BaseLoginParameters {
    password: number;
}

export interface LinkedInLoginParameters extends BaseLoginParameters {
    email: string;
}

export interface FacebookLoginParameters extends BaseLoginParameters {
    login: string;
}
// child classes
export class FacebookManager extends BaseSocialNetworkManager {
    public constructor(private loginParameters: FacebookLoginParameters) {
        super();
    }

    public authenticate(): void {
        console.log(`Authenticating to Facebook with: ${this.loginParameters.login} and ${this.loginParameters.password}`);
    }

    public sendMessage(text: string): void {
        console.log(`Publishing message on Facebook: ${text}`);
    }
}

export class LinkedInManager extends BaseSocialNetworkManager {
    public constructor(private linkedInLoginParameters: LinkedInLoginParameters) {
        super();
    }

    public authenticate(): void {
        console.log(`Authenticating to LinkedIn with: ${this.linkedInLoginParameters.email} and ${this.linkedInLoginParameters.password}`);
    }

    public sendMessage(text: string): void {
        console.log(`Publishing message on LinkedIn: ${text}`);
    }
}

// mock data
const facebookLoginParametersMock: FacebookLoginParameters = { login: "blabla@gmail.com", password: 11111 };
const linkedInLoginParametersMock: LinkedInLoginParameters = { email: "tadadad@gmail.com", password: 2222 };

// usage
const facebookPoster = new FacebookManager(facebookLoginParametersMock);
facebookPoster.postMessage('Hello, Facebook!');

const linkedInPoster = new LinkedInManager(linkedInLoginParametersMock);
linkedInPoster.postMessage('Hello, LinkedIn!');






