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
exports.GlovoApp = exports.Order = exports.DeliveryType = exports.DeliveryContext = exports.OwnDeliveryStrategy = exports.OutsourceDeliveryStrategy = exports.PickUpStrategy = exports.BaseDeliveryStrategy = void 0;
var BaseDeliveryStrategy = /** @class */ (function () {
    function BaseDeliveryStrategy() {
    }
    BaseDeliveryStrategy.prototype.calculateDistance = function (pointA, pointB) {
        return 10;
    };
    return BaseDeliveryStrategy;
}());
exports.BaseDeliveryStrategy = BaseDeliveryStrategy;
var PickUpStrategy = /** @class */ (function (_super) {
    __extends(PickUpStrategy, _super);
    function PickUpStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PickUpStrategy.prototype.calculatePrice = function (distance) {
        return 0;
    };
    return PickUpStrategy;
}(BaseDeliveryStrategy));
exports.PickUpStrategy = PickUpStrategy;
var OutsourceDeliveryStrategy = /** @class */ (function (_super) {
    __extends(OutsourceDeliveryStrategy, _super);
    function OutsourceDeliveryStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OutsourceDeliveryStrategy.prototype.calculatePrice = function (distance) {
        return distance * 10;
    };
    return OutsourceDeliveryStrategy;
}(BaseDeliveryStrategy));
exports.OutsourceDeliveryStrategy = OutsourceDeliveryStrategy;
var OwnDeliveryStrategy = /** @class */ (function (_super) {
    __extends(OwnDeliveryStrategy, _super);
    function OwnDeliveryStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OwnDeliveryStrategy.prototype.calculatePrice = function (distance) {
        return distance * 5;
    };
    return OwnDeliveryStrategy;
}(BaseDeliveryStrategy));
exports.OwnDeliveryStrategy = OwnDeliveryStrategy;
var DeliveryContext = /** @class */ (function () {
    function DeliveryContext() {
    }
    DeliveryContext.prototype.setStrategy = function (strategy) {
        this.deliveryStrategy = strategy;
    };
    DeliveryContext.prototype.useStrategy = function (pointA, pointB) {
        return this.deliveryStrategy.calculatePrice(this.deliveryStrategy.calculateDistance(pointA, pointB));
    };
    return DeliveryContext;
}());
exports.DeliveryContext = DeliveryContext;
// usage
var DeliveryType;
(function (DeliveryType) {
    DeliveryType[DeliveryType["pickup"] = 0] = "pickup";
    DeliveryType[DeliveryType["outSourceDelivery"] = 1] = "outSourceDelivery";
    DeliveryType[DeliveryType["ownDelivery"] = 2] = "ownDelivery";
})(DeliveryType || (exports.DeliveryType = DeliveryType = {}));
var Order = /** @class */ (function () {
    function Order(id, deliveryType, pointA, pointB) {
        this.id = id;
        this.deliveryType = deliveryType;
        this.pointA = pointA;
        this.pontB = pointB;
    }
    return Order;
}());
exports.Order = Order;
var GlovoApp = /** @class */ (function () {
    function GlovoApp(deliveryContext) {
        this.deliveryContext = deliveryContext;
    }
    GlovoApp.prototype.calculateDeliveryPrice = function (order) {
        var price;
        if (order.deliveryType === DeliveryType.pickup) {
            this.deliveryContext.setStrategy(new PickUpStrategy());
            price = this.deliveryContext.useStrategy(order.pointA, order.pontB);
        }
        else if (order.deliveryType === DeliveryType.outSourceDelivery) {
            this.deliveryContext.setStrategy(new OutsourceDeliveryStrategy());
            price = this.deliveryContext.useStrategy(order.pointA, order.pontB);
        }
        else {
            this.deliveryContext.setStrategy(new OwnDeliveryStrategy());
            price = this.deliveryContext.useStrategy(order.pointA, order.pontB);
        }
        return price;
    };
    return GlovoApp;
}());
exports.GlovoApp = GlovoApp;
var glovoApp = new GlovoApp(new DeliveryContext());
var order1 = new Order(1, DeliveryType.pickup, 'office', 'office');
var order2 = new Order(2, DeliveryType.outSourceDelivery, 'htz', 'gradusnik');
var order3 = new Order(3, DeliveryType.ownDelivery, 'saltovka', 'center');
glovoApp.calculateDeliveryPrice(order1);
glovoApp.calculateDeliveryPrice(order2);
glovoApp.calculateDeliveryPrice(order3);
console.log("order1 price ".concat(glovoApp.calculateDeliveryPrice(order1)));
console.log("order2 price ".concat(glovoApp.calculateDeliveryPrice(order2)));
console.log("order3 price ".concat(glovoApp.calculateDeliveryPrice(order3)));
