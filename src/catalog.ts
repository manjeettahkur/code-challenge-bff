import { Product } from "./product";
import * as fs from 'fs';
import * as path from 'path';

/**
 * Class representing a catalog of products.
 */
export class Catalog {
    private products: Map<string, Product>;

    /**
     * Creates an instance of Catalog and initializes the product collection.
     */
    constructor() {
        this.products = new Map();
        this.initilizeCatalog();
    }

    /**
     * Initializes the catalog by reading product data from a JSON file and populating the products map.
     * @private
     */
    initilizeCatalog() {
        const fileName = '../product.json';
        const filePath = path.join(__dirname, fileName);
        const rawData = fs.readFileSync(filePath, 'utf8');
        const productData: Product[] = JSON.parse(rawData);

        for (const product of productData) {
            this.products.set(product.sku, product);
        }
    }

    /**
     * Retrieves a product by its SKU.
     * @param {string} sku - The SKU of the product to retrieve.
     * @returns {Product | undefined} The product with the given SKU, or undefined if not found.
     */
    getProduct(sku: string): Product | undefined {
        return this.products.get(sku);
    }
}