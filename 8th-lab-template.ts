abstract class BaseEntity {

    protected entity;

    constructor() {
        //entity initialization
        this.onInit();
    }

    // Template method
    public update(): any {
        const entity = this.getEntity();

        if (!this.validate()) {
            this.onValidationFails();
        }

        const response = this.sendRequest(this.buildRequest());
        return this.formatResponse(response);
    }

    // Hooks
    protected onInit() {
        // general logic
    }

    protected onChange() {
        // general logic
        console.log('send request to write history')
    }

    protected onDestroy() {
        // general logic
    }

    protected onValidationFails() {
        console.log('write a history')
    }

    // abstract methods
    protected abstract getEntity(): any;
    protected abstract validate(): boolean;
    protected abstract buildRequest(): any;
    protected abstract formatResponse(response: any): any;
    protected abstract sendRequest(request: any): any;

}


class Product extends BaseEntity {
    protected getEntity(): any {
        // special logic
        return this.entity;
    }

    protected validate(): boolean {
        // validate this.entity
        return Math.random() >= 0.5;
    }

    protected buildRequest(): any {
        // build request
        const body = {}
        return `https://${this.entity.id}/update`
    }

    protected sendRequest(request: any): any {
        // send request return response , special logic
        const httpClient = { sendRequest: (requst) => { } } //
        const response = httpClient.sendRequest(request);
        return response;
    }

    protected formatResponse(response: any): any {
        // do something with response, special logic
        const formattedResponse = response;
        return formattedResponse;
    }

    protected onValidationFails() {
        console.log('send message to admin as specific rule for product');
    }

}

class User extends BaseEntity {
    protected getEntity(): any {
        // special logic
        return this.entity;
    }

    protected validate(): boolean {
        // vaidate if email changed, as specific rule for User
        return Math.random() >= 0.5;
    }

    protected buildRequest(): any {
        // build request
        const body = {}
        return `https://${this.entity.Id}/update/`
    }

    protected sendRequest(request: any): any {
        // send request return response , special logic
        const httpClient = { sendRequest: (requst) => { } } //
        const response = httpClient.sendRequest(request);
        return response;
    }

    protected formatResponse(response: any): any {
        // do something with response, special logic
        const formattedResponse = response;
        return formattedResponse;
    }
}

// Concrete implementation for Order
class Order extends BaseEntity {
    protected getEntity(): any {
        // special logic
        return this.entity;
    }

    protected validate(): boolean {
        // validate this.entity
        return Math.random() >= 0.5;
    }

    protected buildRequest(): any {
        const body = {}
        return `https://${this.entity.Id}/update/`
    }

    protected sendRequest(request: any): any {
        const httpClient = { name: "SpecialHttpClient", sendRequest: (request): { status: string, code: number, entity: Object } => { return { code: 200, status: "Success", entity: {} } } } // :DDD
        const response = httpClient.sendRequest(request);
        return response;
    }

    protected formatResponse(response: any): any {
        return {
            message: "Order updated",
            ...response,
        };
    }
}



// Usage
const productUpdater = new Product();
productUpdater.update();

const userUpdater = new User();
userUpdater.update();

const orderUpdater = new Order();
orderUpdater.update();
