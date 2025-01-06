import { mock, describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { Catalog } from '../src/catalog';
import { Product } from '../src/product';


// Mock product data for testing
const mockProductData: Product[] = [
    {
        "sku": "ipd",
        "name": "Super iPad",
        "price": 549.99
    },
    {
        "sku": "mbp",
        "name": "MacBook Pro",
        "price": 1399.99
    },
    {
        "sku": "atv",
        "name": "Apple TV",
        "price": 109.50
    },
    {
        "sku": "vga",
        "name": "VGA adapter",
        "price": 30.00
    }
]

describe('Catalog', () => {

    const mockReadFile = mock.fn((path: fs.PathLike, options?: any) => {
        if (path == "product.json") {
            return JSON.stringify(mockProductData);
        } else {
            return 'another file mocked content';
        }
    });



    mock.method(fs, 'readFileSync', mockReadFile);

    describe('Initialization', () => {
        it('Initializes the catalog with product data from the JSON file', () => {
            const catalog = new Catalog();
            const product1 = catalog.getProduct("ipd");
            const product2 = catalog.getProduct("atv");

            assert.deepStrictEqual(product1, { sku: "ipd", name: "Super iPad", price: 549.99 });
            assert.deepStrictEqual(product2, { sku: "atv", name: "Apple TV", price: 109.50 });
        });

        it('Retrieves a product by its SKU', () => {
            const catalog = new Catalog();
            const product = catalog.getProduct("vga");
            assert.deepStrictEqual(product, { sku: "vga", name: "VGA adapter", price: 30.00 });
        });

        it('Returns undefined for a non-existing SKU', () => {
            const catalog = new Catalog();
            const product = catalog.getProduct("SKU3");
            assert.strictEqual(product, undefined);
        });
    });

    describe('Error Handling', () => {

        it('Throws an error if the JSON file is not found', () => {

            mock.method(fs, 'readFileSync', () => {
                throw new Error("File not found");
            });

            assert.throws(() => new Catalog(), /File not found/);
        });

        it('Throws an error if the JSON file is malformed', () => {
            mock.method(fs, 'readFileSync', () => {
                return "invalid JSON";
            });

            assert.throws(() => new Catalog(), /Unexpected token 'i', "invalid JSON" is not valid JSON/);
        });

        it('Throws an error if the JSON file is empty', () => {
            mock.method(fs, 'readFileSync', () => {
                return "";
            });

            assert.throws(() => new Catalog(), /Unexpected end of JSON input/);
        });

        it('Handles empty product data in the JSON file', () => {
            mock.method(fs, 'readFileSync', () => {
                return JSON.stringify([]);
            });

            const catalog = new Catalog();
            assert.strictEqual(catalog.getProduct("SKU1"), undefined);
            assert.strictEqual(catalog.getProduct("SKU2"), undefined);
        });

        it('Handles duplicate SKUs in the JSON file', () => {
            const duplicateProductData: Product[] = [
                { sku: "SKU1", name: "Product 1", price: 10 },
                { sku: "SKU1", name: "Product 1 (Duplicate)", price: 15 }
            ];
            mock.method(fs, 'readFileSync', () => {
                return JSON.stringify(duplicateProductData);
            });

            const catalog = new Catalog();
            const product1 = catalog.getProduct("SKU1");

            // The last product with the same SKU should be stored
            assert.deepStrictEqual(product1, { sku: "SKU1", name: "Product 1 (Duplicate)", price: 15 });
        });
    });


    mock.restoreAll();
});