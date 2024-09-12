"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonS3Storage = exports.LocalStorage = exports.UserHttpService = exports.StorageType = exports.User = exports.StorageManager = void 0;
// singleTon class
var StorageManager = /** @class */ (function () {
    function StorageManager() {
    }
    StorageManager.getInstance = function (storageType) {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
            if (storageType === StorageType.local) {
                StorageManager.instance.setStorage(new LocalStorage());
            }
            else if (storageType === StorageType.s3) {
                StorageManager.instance.setStorage(new AmazonS3Storage());
            }
        }
        return StorageManager.instance;
    };
    StorageManager.prototype.setStorage = function (storage) {
        this.storage = storage;
    };
    StorageManager.prototype.getStorage = function () {
        return this.storage;
    };
    return StorageManager;
}());
exports.StorageManager = StorageManager;
//user
var User = /** @class */ (function () {
    function User(id, name, storageType) {
        this.id = id;
        this.name = name;
        this.storageType = storageType;
    }
    return User;
}());
exports.User = User;
var StorageType;
(function (StorageType) {
    StorageType["local"] = "local";
    StorageType["s3"] = "s3";
})(StorageType || (exports.StorageType = StorageType = {}));
var UserHttpService = /** @class */ (function () {
    function UserHttpService() {
    }
    UserHttpService.prototype.getUser = function () {
        return userMock;
    };
    return UserHttpService;
}());
exports.UserHttpService = UserHttpService;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.connect = function () {
        console.log("Connecting to local storage ...");
    };
    LocalStorage.prototype.disconnect = function () {
        console.log("Disconnecting from local storage...");
    };
    LocalStorage.prototype.uploadFile = function () {
        console.log("Uploading file to local storage...");
    };
    LocalStorage.prototype.downloadFile = function () {
        console.log("Downloading file...");
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
var AmazonS3Storage = /** @class */ (function () {
    function AmazonS3Storage() {
    }
    AmazonS3Storage.prototype.connect = function () {
        console.log("Connecting to Amazon S3...");
    };
    AmazonS3Storage.prototype.disconnect = function () {
        console.log("Disconnecting from Amazon S3...");
    };
    AmazonS3Storage.prototype.uploadFile = function () {
        console.log("Uploading File to Amazon S3...");
    };
    AmazonS3Storage.prototype.downloadFile = function () {
        console.log("downloading file from Amazon S3...");
    };
    return AmazonS3Storage;
}());
exports.AmazonS3Storage = AmazonS3Storage;
// mock data
var userMock = new User(1, "Volodumur Zelenskii", StorageType.local);
//usage
var userHttpService = new UserHttpService();
var user = userHttpService.getUser();
var storageManager = StorageManager.getInstance(user.storageType);
storageManager.getStorage().connect();
storageManager.getStorage().uploadFile();
storageManager.getStorage().downloadFile();
storageManager.getStorage().disconnect();
