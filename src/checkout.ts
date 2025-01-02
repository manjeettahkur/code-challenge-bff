import { Cart } from "./cart";
import { Catalog } from "./catalog";
import { PricingRule } from "./pricingRules/pricingRule";


/**
 * Represents the checkout process for a shopping cart.
 * 
 * @class Checkout
 */
export class Checkout {
    private cart: Cart;
    private catalog: Catalog;
    private pricingRule: PricingRule[];

    /**
     * Creates an instance of Checkout.
     * 
     * @constructor
     * @param {PricingRule[]} pricingRules - An array of pricing rules to be applied during checkout.
     */
    constructor(pricingRules: PricingRule[]) {
        this.cart = new Cart();
        this.catalog = new Catalog();
        this.pricingRule = pricingRules;
    }

    /**
     * Scans an item and adds it to the cart.
     * 
     * @param {string} sku - The SKU of the item to be added to the cart.
     */
    scan(sku: string) {
        if (this.catalog.getProduct(sku)) {
            return this.cart.addItem(sku);
        }
        
        throw new Error(`Item with SKU ${sku} does not exist in the catalog.`);

    }

    /**
     * Calculates the total price of the items in the cart after applying pricing rules.
     * 
     * @returns {number} The total price after discounts and pricing rules are applied.
     */
    total(): number {
        let totalPrice = this.cart.getTotalPrice(this.catalog);

        for (const rule of this.pricingRule) {
            totalPrice -= rule.apply(this.cart);
        }

        return totalPrice;
    }
}