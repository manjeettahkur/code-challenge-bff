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

    /**
     * Adds a product to the catalog.
     * @param {string} sku - The SKU of the product.
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     * @returns {void}
     * @throws {Error} If a product with the same SKU already exists in the catalog.
     */

    addProduct(sku: string, name: string, price: number): Product | undefined {
        if (this.products.has(sku)) {
            throw new Error(`Product with SKU ${sku} already exists in catalog`);
        }

        this.products.set(sku, { sku, name, price });
        return this.products.get(sku);
    }
}