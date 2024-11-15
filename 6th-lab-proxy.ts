export interface Downloader {
    download(url: string): Blob;
}

export class SimpleDownloader implements Downloader {
    download(url: string): Blob {
        console.log(`download file using ${url}`)
        return new Blob();
    }
}

export class CacheManagerProxy implements Downloader {
    private downloader;
    private cache: Blob;

    constructor(downloader: SimpleDownloader) {
        this.downloader = downloader;
    }

    public download(url: string): Blob {
        // check for cahe, if exists, return cache
        if (this.cache) {
            return this.cache;
        }
        // if not, use original downloader
        const data = this.downloader.download(url);
        this.cache = data;
        return data;
    }
}

// usage

const simpleDownloader = new SimpleDownloader();
const simpleDownloaderProxy = new CacheManagerProxy(simpleDownloader);

simpleDownloaderProxy.download("https://url");



