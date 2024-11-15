export class BasePage<T> {
    renderer: IRenderer<T>
}

export class SimplePage extends BasePage<string> {
    private title: string;
    private content: string;

    constructor(title: string, content: string, renderer: IRenderer<string>) {
        super();
        this.title = title;
        this.content = content;
        this.renderer = renderer;
    }
}

export class ProductPage extends BasePage<Product> {
    private product: Product;

    constructor(product: Product, renderer: IRenderer<Product>) {
        super();
        this.product = product;
        this.renderer = renderer;
    }
    
}

export class Product {
    private id: number;
    private name: string;
    private description: string;
    private image: string;

    constructor(id: number, name:string, description: string, image: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }
}

export interface IRenderer<T> {
    renderContent(content: T): string;
    renderTitle(title: string): string;
    renderAll(): string;
    updateData(data: T): string;
    stopRender(callback: () => {}): boolean;
    cleanUp(callback: () => {}): boolean;
    pauseRender(callback: () => {}): boolean;
}

export class BaseRenderer {
    pauseRender(callback: () => {}): boolean {
        callback();
        return true || false;
    }

    cleanUp(callback: () => {}): boolean {
        callback();
        return true || false;
    }

    stopRender(callback: () => {}): boolean {
        callback();
        return true || false;
    }
}

export class HtmlRenderer extends BaseRenderer implements IRenderer<string | Product> {
    renderTitle(title: string): string {
        return "html";
    }

    renderContent(content: string | Product): string {
        return "html";
    }

    renderAll(): string {
        return "html";
    }

    updateData(data: string | Product): string {
        return "html";
    }
}

export class JsonRenderer extends BaseRenderer implements IRenderer<string | Product> {
    renderTitle(title: string): string {
        return "json";
    }

    renderContent(content: string | Product): string {
        return "json";
    }

    renderAll(): string {
        return "json";
    }

    updateData(data: string | Product): string {
        return "json";
    }
}

export class XmlRenderer extends BaseRenderer implements IRenderer<string | Product> {
    renderTitle(title: string): string {
        return "xml";
    }

    renderContent(content: string | Product): string {
        return "xml";
    }

    renderAll(): string {
        return "xml";
    }

    updateData(data: string | Product): string {
        return "xml";
    }
}

// usage

const htmlRenderer = new HtmlRenderer();
const jsonRenderer = new JsonRenderer();
const xmlRenderer = new XmlRenderer();

const htmlSimplePage: string = new SimplePage("Custom title", "custom content", htmlRenderer).renderer.renderAll();
const jsonSimplePage: string = new SimplePage("Custom title", "custom content", jsonRenderer).renderer.renderAll();
const xmlSimplePage: string = new SimplePage("Custom title", "custom content", xmlRenderer).renderer.renderAll();

const htmlProductPage: string = new ProductPage(new Product(1,"custom product", "custom description", "https://imglink"), htmlRenderer).renderer.renderAll();
const jsonProductPage: string = new ProductPage(new Product(1,"custom product", "custom description", "https://imglink"), jsonRenderer).renderer.renderAll();
const xmlProductPage: string = new ProductPage(new Product(1,"custom product", "custom description", "https://imglink"), xmlRenderer).renderer.renderAll();

console.log(`Simple pages ${htmlSimplePage}, ${jsonSimplePage}, ${xmlSimplePage}`);
console.log(`Product pages ${htmlProductPage}, ${jsonProductPage}, ${xmlProductPage}`);