"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManagerProxy = exports.SimpleDownloader = void 0;
var SimpleDownloader = /** @class */ (function () {
    function SimpleDownloader() {
    }
    SimpleDownloader.prototype.download = function (url) {
        console.log("download file using ".concat(url));
        return new Blob();
    };
    return SimpleDownloader;
}());
exports.SimpleDownloader = SimpleDownloader;
var CacheManagerProxy = /** @class */ (function () {
    function CacheManagerProxy(downloader) {
        this.downloader = downloader;
    }
    CacheManagerProxy.prototype.download = function (url) {
        // check for cahe, if exists, return cache
        if (this.cache) {
            return this.cache;
        }
        // if not, use original downloader
        var data = this.downloader.download(url);
        this.cache = data;
        return data;
    };
    return CacheManagerProxy;
}());
exports.CacheManagerProxy = CacheManagerProxy;
// usage
var simpleDownloader = new SimpleDownloader();
var simpleDownloaderProxy = new CacheManagerProxy(simpleDownloader);
simpleDownloaderProxy.download("https://url");
