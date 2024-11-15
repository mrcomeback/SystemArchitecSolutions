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
exports.XmlRenderer = exports.JsonRenderer = exports.HtmlRenderer = exports.BaseRenderer = exports.Product = exports.ProductPage = exports.SimplePage = exports.BasePage = void 0;
var BasePage = /** @class */ (function () {
    function BasePage() {
    }
    return BasePage;
}());
exports.BasePage = BasePage;
var SimplePage = /** @class */ (function (_super) {
    __extends(SimplePage, _super);
    function SimplePage(title, content, renderer) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.content = content;
        _this.renderer = renderer;
        return _this;
    }
    return SimplePage;
}(BasePage));
exports.SimplePage = SimplePage;
var ProductPage = /** @class */ (function (_super) {
    __extends(ProductPage, _super);
    function ProductPage(product, renderer) {
        var _this = _super.call(this) || this;
        _this.product = product;
        _this.renderer = renderer;
        return _this;
    }
    return ProductPage;
}(BasePage));
exports.ProductPage = ProductPage;
var Product = /** @class */ (function () {
    function Product(id, name, description, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }
    return Product;
}());
exports.Product = Product;
var BaseRenderer = /** @class */ (function () {
    function BaseRenderer() {
    }
    BaseRenderer.prototype.pauseRender = function (callback) {
        callback();
        return true || false;
    };
    BaseRenderer.prototype.cleanUp = function (callback) {
        callback();
        return true || false;
    };
    BaseRenderer.prototype.stopRender = function (callback) {
        callback();
        return true || false;
    };
    return BaseRenderer;
}());
exports.BaseRenderer = BaseRenderer;
var HtmlRenderer = /** @class */ (function (_super) {
    __extends(HtmlRenderer, _super);
    function HtmlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlRenderer.prototype.renderTitle = function (title) {
        return "html";
    };
    HtmlRenderer.prototype.renderContent = function (content) {
        return "html";
    };
    HtmlRenderer.prototype.renderAll = function () {
        return "html";
    };
    HtmlRenderer.prototype.updateData = function (data) {
        return "html";
    };
    return HtmlRenderer;
}(BaseRenderer));
exports.HtmlRenderer = HtmlRenderer;
var JsonRenderer = /** @class */ (function (_super) {
    __extends(JsonRenderer, _super);
    function JsonRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonRenderer.prototype.renderTitle = function (title) {
        return "json";
    };
    JsonRenderer.prototype.renderContent = function (content) {
        return "json";
    };
    JsonRenderer.prototype.renderAll = function () {
        return "json";
    };
    JsonRenderer.prototype.updateData = function (data) {
        return "json";
    };
    return JsonRenderer;
}(BaseRenderer));
exports.JsonRenderer = JsonRenderer;
var XmlRenderer = /** @class */ (function (_super) {
    __extends(XmlRenderer, _super);
    function XmlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XmlRenderer.prototype.renderTitle = function (title) {
        return "xml";
    };
    XmlRenderer.prototype.renderContent = function (content) {
        return "xml";
    };
    XmlRenderer.prototype.renderAll = function () {
        return "xml";
    };
    XmlRenderer.prototype.updateData = function (data) {
        return "xml";
    };
    return XmlRenderer;
}(BaseRenderer));
exports.XmlRenderer = XmlRenderer;
// usage
var htmlRenderer = new HtmlRenderer();
var jsonRenderer = new JsonRenderer();
var xmlRenderer = new XmlRenderer();
var htmlSimplePage = new SimplePage("Custom title", "custom content", htmlRenderer).renderer.renderAll();
var jsonSimplePage = new SimplePage("Custom title", "custom content", jsonRenderer).renderer.renderAll();
var xmlSimplePage = new SimplePage("Custom title", "custom content", xmlRenderer).renderer.renderAll();
var htmlProductPage = new ProductPage(new Product(1, "custom product", "custom description", "https://imglink"), htmlRenderer).renderer.renderAll();
var jsonProductPage = new ProductPage(new Product(1, "custom product", "custom description", "https://imglink"), jsonRenderer).renderer.renderAll();
var xmlProductPage = new ProductPage(new Product(1, "custom product", "custom description", "https://imglink"), xmlRenderer).renderer.renderAll();
console.log("Simple pages ".concat(htmlSimplePage, ", ").concat(jsonSimplePage, ", ").concat(xmlSimplePage));
console.log("Product pages ".concat(htmlProductPage, ", ").concat(jsonProductPage, ", ").concat(xmlProductPage));
