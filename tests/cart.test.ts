import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { Cart } from '../src/cart';
import { Catalog } from '../src/catalog';




describe('Cart', () => {
    let cart: Cart;
    let catalog: Catalog;

    beforeEach(() => {
        cart = new Cart();
        catalog = new Catalog();
        catalog.addProduct("mob", "Mobile", 10);
        catalog.addProduct("lap", "Laptop", 20);
        catalog.addProduct("key", "Keyboard", 30);
    });

    describe('Adding Items', () => {
        it('Adds a new item to the cart', () => {
            cart.addItem("mob");
            assert.strictEqual(cart.getItemCount("mob"), 1);
        });

        it('Adds an existing item to the cart', () => {
            cart.addItem("mob");
            cart.addItem("mob");
            assert.strictEqual(cart.getItemCount("mob"), 2);
        });

        it('Adds multiple different items to the cart', () => {
            cart.addItem("mob");
            cart.addItem("key");
            assert.strictEqual(cart.getItemCount("mob"), 1);
            assert.strictEqual(cart.getItemCount("key"), 1);
        });
    });

    describe('Getting Item Count', () => {
        it('Gets the quantity of an item that exists in the cart', () => {
            cart.addItem("atv");
            assert.strictEqual(cart.getItemCount("atv"), 1);
        });

        it('Gets the quantity of an item that does not exist in the cart', () => {
            assert.strictEqual(cart.getItemCount("ipd"), 0);
        });
    });

    describe('Getting All Items', () => {
        it('Gets all items in the cart', () => {
            cart.addItem("mbp");
            cart.addItem("vga");
            const items = cart.getItems();
            assert.strictEqual(items.get("mbp"), 1);
            assert.strictEqual(items.get("vga"), 1);
            assert.strictEqual(items.get("mob"), undefined);
        });
    });

    describe('Calculating Total Price', () => {
        it('Calculates the total price with valid catalog', () => {
            cart.addItem("atv");
            cart.addItem("vga");
            assert.strictEqual(cart.getTotalPrice(catalog), 139.5);
        });

        it('Calculates the total price with multiple quantities', () => {
            cart.addItem("atv");
            cart.addItem("atv");
            cart.addItem("atv");
            cart.addItem("atv");
            assert.strictEqual(cart.getTotalPrice(catalog), 438);
        });

        it('Calculates the total price with a single item', () => {
            cart.addItem("mbp");
            assert.strictEqual(cart.getTotalPrice(catalog), 1399.99);
        });
    });

    // Negative Test Cases

    describe('Error Handling', () => {
        it('Throws an error if the product is not found in the catalog', () => {
            cart.addItem("xyz");
            assert.throws(() => cart.getTotalPrice(catalog), /Product with SKU xyz not found in catalog/);
        });

        it('Throws an error if the catalog is null', () => {
            cart.addItem("SKU1");
            // @ts-expect-error: Testing invalid input
            assert.throws(() => cart.getTotalPrice(null), /Catalog is null/);
        });

        it('Throws an error if the SKU is an empty string', () => {
            assert.throws(() => cart.addItem(""), /Invalid SKU/);
        });

        it('Throws an error if the SKU is null', () => {
            // @ts-expect-error: Testing invalid input
            assert.throws(() => cart.addItem(null), /Invalid SKU/);
        });

        it('Throws an error if the SKU is a number', () => {
            // @ts-expect-error: Testing invalid input
            assert.throws(() => cart.addItem(123), /Invalid SKU/);
        });

        it('Throws an error if the SKU is an object', () => {
            // @ts-expect-error: Testing invalid input
            assert.throws(() => cart.addItem({}), /Invalid SKU/);
        });
    });
});