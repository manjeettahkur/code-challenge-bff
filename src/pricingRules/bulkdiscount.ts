import { Cart } from "../cart";
import { PricingRule } from "./pricingRule";

/**
 * Represents a bulk discount pricing rule.
 * 
 * @implements {PricingRule}
 */
export class BulkDiscountRule implements PricingRule {
    private sku: string;
    private quantityThreshold: number;
    private discountPrice: number;
    private originalPrice: number;

    /**
     * Creates an instance of BulkDiscountRule.
     * 
     * @param {string} sku - The SKU of the product to which the discount applies.
     * @param {number} quantityThreshold - The minimum quantity required to apply the discount.
     * @param {number} discountPrice - The discounted price per unit.
     * @param {number} originalPrice - The original price per unit.
     */
    constructor(sku: string, quantityThreshold: number, discountPrice: number, originalPrice: number) {
        this.sku = sku;
        this.quantityThreshold = quantityThreshold;
        this.discountPrice = discountPrice;
        this.originalPrice = originalPrice;
    }

    /**
     * Applies the bulk discount rule to the given cart.
     * 
     * @param {Cart} cart - The cart to which the discount rule is applied.
     * @returns {number} - The total discount amount.
     */
    apply(cart: Cart): number {
        const quantity = cart.getItemCount(this.sku);

        if (quantity >= this.quantityThreshold) {
            return quantity * this.originalPrice - quantity * this.discountPrice;
        }
        return 0;
    }
}