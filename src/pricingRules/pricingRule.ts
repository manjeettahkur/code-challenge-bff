import { Cart } from "../cart";

/**
 * Interface representing a pricing rule that can be applied to a shopping cart.
 * Implementations of this interface should define the logic for applying specific pricing rules.
 */
export interface PricingRule {
    /**
     * Applies the pricing rule to the given cart and returns the total price after applying the rule.
     * 
     * @param cart - The shopping cart to which the pricing rule should be applied.
     * @returns The total price after applying the pricing rule.
     */
    apply(cart: Cart): number;
}