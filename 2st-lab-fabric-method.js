"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedInManager = exports.FacebookManager = exports.BaseSocialNetworkManager = void 0;
// Base class
var BaseSocialNetworkManager = /** @class */ (function () {
    function BaseSocialNetworkManager() {
    }
    BaseSocialNetworkManager.prototype.postMessage = function (text) {
        this.authenticate();
        this.sendMessage(text);
    };
    return BaseSocialNetworkManager;
}());
exports.BaseSocialNetworkManager = BaseSocialNetworkManager;
// child classes
var FacebookManager = /** @class */ (function (_super) {
    __extends(FacebookManager, _super);
    function FacebookManager(loginParameters) {
        var _this = _super.call(this) || this;
        _this.loginParameters = loginParameters;
        return _this;
    }
    FacebookManager.prototype.authenticate = function () {
        console.log("Authenticating to Facebook with: ".concat(this.loginParameters.login, " and ").concat(this.loginParameters.password));
    };
    FacebookManager.prototype.sendMessage = function (text) {
        console.log("Publishing message on Facebook: ".concat(text));
    };
    return FacebookManager;
}(BaseSocialNetworkManager));
exports.FacebookManager = FacebookManager;
var LinkedInManager = /** @class */ (function (_super) {
    __extends(LinkedInManager, _super);
    function LinkedInManager(linkedInLoginParameters) {
        var _this = _super.call(this) || this;
        _this.linkedInLoginParameters = linkedInLoginParameters;
        return _this;
    }
    LinkedInManager.prototype.authenticate = function () {
        console.log("Authenticating to LinkedIn with: ".concat(this.linkedInLoginParameters.email, " and ").concat(this.linkedInLoginParameters.password));
    };
    LinkedInManager.prototype.sendMessage = function (text) {
        console.log("Publishing message on LinkedIn: ".concat(text));
    };
    return LinkedInManager;
}(BaseSocialNetworkManager));
exports.LinkedInManager = LinkedInManager;
// mock data
var facebookLoginParametersMock = { login: "blabla@gmail.com", password: 11111 };
var linkedInLoginParametersMock = { email: "tadadad@gmail.com", password: 2222 };
// usage
var facebookPoster = new FacebookManager(facebookLoginParametersMock);
facebookPoster.postMessage('Hello, Facebook!');
var linkedInPoster = new LinkedInManager(linkedInLoginParametersMock);
linkedInPoster.postMessage('Hello, LinkedIn!');
