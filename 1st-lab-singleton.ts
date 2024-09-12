// singleTon class
export class StorageManager {
    private static instance: StorageManager;
    private storage: Storage;

    private constructor() { }

    public static getInstance(storageType: StorageType): StorageManager {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
            
            if(storageType === StorageType.local){
                StorageManager.instance.setStorage(new LocalStorage());
            }else if(storageType === StorageType.s3){
                StorageManager.instance.setStorage(new AmazonS3Storage());
            }
        }
        return StorageManager.instance;
    }

    private setStorage(storage: Storage): void {
        this.storage = storage;
    }

    public getStorage(): Storage {
        return this.storage;
    }
}


//user
export class User {
    public id: number;
    public name: string;
    public storageType: StorageType;

    public constructor(id: number, name: string, storageType: StorageType) {
        this.id = id;
        this.name = name;
        this.storageType = storageType;
    }
}

export enum StorageType {
    local = "local",
    s3 = "s3"
}

export class UserHttpService {

    public constructor() { }

    public getUser(): User {
        return userMock
    }
}

// storage stuff

export interface Storage {
    connect(): void;
    disconnect(): void;
    uploadFile(): void;
    downloadFile(): void;
}

export class LocalStorage implements Storage {
    connect(): void {
        console.log("Connecting to local storage ...");
    }
    disconnect(): void {
        console.log("Disconnecting from local storage...");
    }
    uploadFile(): void {
        console.log("Uploading file to local storage...");
    }
    downloadFile(): void {
        console.log("Downloading file...")
    }
}

export class AmazonS3Storage implements Storage {
    connect(): void {
        console.log("Connecting to Amazon S3...");
    }
    disconnect(): void {
        console.log("Disconnecting from Amazon S3...");
    }
    uploadFile(): void {
        console.log("Uploading File to Amazon S3...");
    }
    downloadFile(): void {
        console.log("downloading file from Amazon S3...");
    }
}

// mock data

const userMock = new User(1, "Volodumur Zelenskii", StorageType.local)

//usage

const userHttpService = new UserHttpService();
const user = userHttpService.getUser();

const storageManager = StorageManager.getInstance(user.storageType);

storageManager.getStorage().connect();
storageManager.getStorage().uploadFile();
storageManager.getStorage().downloadFile();
storageManager.getStorage().disconnect();


