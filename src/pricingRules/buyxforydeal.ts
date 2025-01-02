import { Cart } from "../cart";
import { PricingRule } from "./pricingRule";

/**
 * Represents a pricing rule where a customer can buy a certain quantity of items for the price of a lesser quantity.
 * 
 * @implements {PricingRule}
 */
export class BuyXForYDeal implements PricingRule {
    private sku: string;
    private productPrice: number;
    private buyQuantity: number;
    private payQuantity: number;

    /**
     * Creates an instance of BuyXForYDeal.
     * 
     * @param {string} sku - The SKU of the product.
     * @param {number} buyQuantity - The quantity of items to buy to get the deal.
     * @param {number} payQuantity - The quantity of items to pay for in the deal.
     * @param {number} productPrice - The price of a single product.
     */
    constructor(sku: string, buyQuantity: number, payQuantity: number, productPrice: number) {
        this.sku = sku;
        this.productPrice = productPrice;
        this.buyQuantity = buyQuantity;
        this.payQuantity = payQuantity;
    }

    /**
     * Applies the pricing rule to the given cart.
     * 
     * @param {Cart} cart - The shopping cart.
     * @returns {number} The discount amount to be applied.
     */
    apply(cart: Cart): number {
        const quantity = cart.getItemCount(this.sku);
        if (quantity < this.buyQuantity) {
            return 0;
        }
        const discount = Math.floor(quantity / 3);
        return discount * this.productPrice;
    }
}