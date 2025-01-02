import { BulkDiscountRule } from "./bulkdiscount";
import { BuyXForYDeal } from "./buyxforydeal";
import { PricingRule } from "./pricingRule";

/**
 * Factory class to create different types of pricing rules.
 * 
 * This factory class provides a static method to create instances of different pricing rules
 * based on the provided rule name. It supports creating instances of `BuyXForYDeal` and `BulkDiscountRule`.
 * 
 * @example
 * ```typescript
 * const rule = PricingRuleFactory.createRule('BuyXForYDeal', 'itemA', 3, 2, 100);
 * if (rule) {
 *     // Use the created rule instance
 * }
 * ```
 */
export class PricingRuleFactory {
    /**
     * Creates an instance of a pricing rule based on the provided rule name.
     * 
     * @param ruleName - The name of the pricing rule to create. Supported values are 'BuyXForYDeal' and 'BulkDiscount'.
     * @param args - The arguments required to create the specific pricing rule instance.
     * @returns An instance of the specified pricing rule, or `undefined` if the rule name is not recognized.
     */
    static createRule(ruleName: string, ...args: any[]): PricingRule | undefined {
        switch (ruleName) {
            case 'BuyXForYDeal':
                return new BuyXForYDeal(...args as [string, number, number, number])
            case 'BulkDiscount':
                return new BulkDiscountRule(...args as [string, number, number, number])
            default:
                return undefined;
        }
    }
}