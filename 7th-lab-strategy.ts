export interface DeliveryStrategy {
    calculateDistance(pointA: string, pointB: string): number;
    calculatePrice(distance: number);
}

export class BaseDeliveryStrategy {
    calculateDistance(pointA: string, pointB: string): number {
        return 10;
    }
}

export class PickUpStrategy extends BaseDeliveryStrategy implements DeliveryStrategy {
    calculatePrice(distance: number) {
        return 0;
    }
}

export class OutsourceDeliveryStrategy extends BaseDeliveryStrategy implements DeliveryStrategy {
    calculatePrice(distance: number) {
        return distance * 10;
    }
}

export class OwnDeliveryStrategy extends BaseDeliveryStrategy implements DeliveryStrategy {
    calculatePrice(distance: number) {
        return distance * 5;
    }
}

export class DeliveryContext {
    private deliveryStrategy: DeliveryStrategy;

    public setStrategy(strategy: DeliveryStrategy) {
        this.deliveryStrategy = strategy;
    }
    public useStrategy(pointA: string, pointB: string): number {
        return this.deliveryStrategy.calculatePrice(this.deliveryStrategy.calculateDistance(pointA, pointB));
    }
}

// usage
export enum DeliveryType {
    pickup,
    outSourceDelivery,
    ownDelivery
}

export class Order {
    public id: number;
    public deliveryType: DeliveryType;
    public pointA: string;
    public pontB: string;

    constructor(id: number, deliveryType: DeliveryType, pointA: string, pointB: string) {
        this.id = id;
        this.deliveryType = deliveryType;
        this.pointA = pointA;
        this.pontB = pointB;
    }
}

export class GlovoApp {
    private deliveryContext;

    constructor(deliveryContext: DeliveryContext) {
        this.deliveryContext = deliveryContext;
    }

    public calculateDeliveryPrice(order: Order): number {
        let price: number;
        if (order.deliveryType === DeliveryType.pickup) {
            this.deliveryContext.setStrategy(new PickUpStrategy());
            price = this.deliveryContext.useStrategy(order.pointA, order.pontB);
        } else if (order.deliveryType === DeliveryType.outSourceDelivery) {
            this.deliveryContext.setStrategy(new OutsourceDeliveryStrategy());
            price = this.deliveryContext.useStrategy(order.pointA, order.pontB);
        } else {
            this.deliveryContext.setStrategy(new OwnDeliveryStrategy());
            price = this.deliveryContext.useStrategy(order.pointA, order.pontB);
        }
        return price;
    }
}

const glovoApp = new GlovoApp(new DeliveryContext());
const order1 = new Order(1, DeliveryType.pickup, 'office', 'office');
const order2 = new Order(2, DeliveryType.outSourceDelivery, 'htz', 'gradusnik');
const order3 = new Order(3, DeliveryType.ownDelivery, 'saltovka', 'center');

glovoApp.calculateDeliveryPrice(order1);
glovoApp.calculateDeliveryPrice(order2);
glovoApp.calculateDeliveryPrice(order3);

console.log(`order1 price ${glovoApp.calculateDeliveryPrice(order1)}`);
console.log(`order2 price ${glovoApp.calculateDeliveryPrice(order2)}`);
console.log(`order3 price ${glovoApp.calculateDeliveryPrice(order3)}`);
