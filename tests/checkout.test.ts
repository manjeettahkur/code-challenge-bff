import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Checkout } from '../src/checkout';
import { PricingRule } from '../src/pricingRules/pricingRule';
import { PricingRuleFactory } from '../src/pricingRules/pricingRuleFactory';

describe('Checkout', () => {
    describe('BuyXForYDeal', () => {
        it('Calculates total with BuyXForYDeal for atv', () => {
            const pricingRules: PricingRule[] = [
                PricingRuleFactory.createRule('BuyXForYDeal', 'atv', 3, 2, 109.50)!,
                PricingRuleFactory.createRule('BulkDiscount', 'ipd', 4, 499.99, 549.99)!
            ];

            const checkout = new Checkout(pricingRules);

            checkout.scan('atv');
            checkout.scan('atv');
            checkout.scan('atv');
            checkout.scan('vga');

            assert.strictEqual(checkout.total(), 249.00, `Expected 249.00, got ${checkout.total()}`);
        });
    });

    describe('BulkDiscount', () => {
        it('Calculates total with BulkDiscount for ipd', () => {
            const pricingRules: PricingRule[] = [
                PricingRuleFactory.createRule('BuyXForYDeal', 'atv', 3, 2, 109.50)!,
                PricingRuleFactory.createRule('BulkDiscount', 'ipd', 4, 499.99, 549.99)!
            ];

            const checkout = new Checkout(pricingRules);

            checkout.scan('ipd');
            checkout.scan('ipd');
            checkout.scan('ipd');
            checkout.scan('ipd');

            assert.strictEqual(checkout.total(), 1999.96, `Expected 1999.96, got ${checkout.total()}`);
        });
    });

    describe('Combined Pricing Rules', () => {
        it('Calculates total with both BuyXForYDeal for atv and BulkDiscount for ipd', () => {
            const pricingRules: PricingRule[] = [
                PricingRuleFactory.createRule('BuyXForYDeal', 'atv', 3, 2, 109.50)!,
                PricingRuleFactory.createRule('BulkDiscount', 'ipd', 4, 499.99, 549.99)!
            ];

            const checkout = new Checkout(pricingRules);

            checkout.scan('atv');
            checkout.scan('ipd');
            checkout.scan('ipd');
            checkout.scan('atv');
            checkout.scan('ipd');
            checkout.scan('ipd');
            checkout.scan('ipd');

            assert.strictEqual(checkout.total(), 2718.95, `Expected 2718.95, got ${checkout.total()}`);
        });
    });
});