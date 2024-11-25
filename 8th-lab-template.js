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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Abstract class defining the template method and hooks
var BaseEntity = /** @class */ (function () {
    function BaseEntity() {
        //entity initialization
        this.onInit();
    }
    BaseEntity.prototype.update = function () {
        var entity = this.getEntity();
        if (!this.validate()) {
            this.onValidationFails();
        }
        var response = this.sendRequest(this.buildRequest());
        return this.formatResponse(response);
    };
    // Hooks
    BaseEntity.prototype.onInit = function () {
        // general logic
    };
    BaseEntity.prototype.onChange = function () {
        // general logic
        console.log('send request to write history');
    };
    BaseEntity.prototype.onDestroy = function () {
        // general logic
    };
    BaseEntity.prototype.onValidationFails = function () {
        console.log('write a history');
    };
    return BaseEntity;
}());
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Product.prototype.getEntity = function () {
        // special logic
        return this.entity;
    };
    Product.prototype.validate = function () {
        // validate this.entity
        return Math.random() >= 0.5;
    };
    Product.prototype.buildRequest = function () {
        // build request
        var body = {};
        return "https://".concat(this.entity.id, "/update");
    };
    Product.prototype.sendRequest = function (request) {
        // send request return response , special logic
        var httpClient = { sendRequest: function (requst) { } }; // :D
        var response = httpClient.sendRequest(request);
        return response;
    };
    Product.prototype.formatResponse = function (response) {
        // do something with response, special logic
        var formattedResponse = response;
        return formattedResponse;
    };
    Product.prototype.onValidationFails = function () {
        console.log('send message to admin as specific rule for product');
    };
    return Product;
}(BaseEntity));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.getEntity = function () {
        // special logic
        return this.entity;
    };
    User.prototype.validate = function () {
        // vaidate if email changed, as specific rule for User
        return Math.random() >= 0.5;
    };
    User.prototype.buildRequest = function () {
        // build request
        var body = {};
        return "https://".concat(this.entity.Id, "/update/");
    };
    User.prototype.sendRequest = function (request) {
        // send request return response , special logic
        var httpClient = { sendRequest: function (requst) { } }; // :D
        var response = httpClient.sendRequest(request);
        return response;
    };
    User.prototype.formatResponse = function (response) {
        // do something with response, special logic
        var formattedResponse = response;
        return formattedResponse;
    };
    return User;
}(BaseEntity));
// Concrete implementation for Order
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Order.prototype.getEntity = function () {
        // special logic
        return this.entity;
    };
    Order.prototype.validate = function () {
        // validate this.entity
        return Math.random() >= 0.5;
    };
    Order.prototype.buildRequest = function () {
        var body = {};
        return "https://".concat(this.entity.Id, "/update/");
    };
    Order.prototype.sendRequest = function (request) {
        var httpClient = { name: "SpecialHttpClient", sendRequest: function (request) { return { code: 200, status: "Success", entity: {} }; } };
        var response = httpClient.sendRequest(request);
        return response;
    };
    Order.prototype.formatResponse = function (response) {
        return __assign({ message: "Order updated" }, response);
    };
    return Order;
}(BaseEntity));
// Usage
var productUpdater = new Product();
productUpdater.update();
var userUpdater = new User();
console.log(userUpdater.update());
var orderUpdater = new Order();
console.log(orderUpdater.update());
