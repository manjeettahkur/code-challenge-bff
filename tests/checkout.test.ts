// SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
// SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95

import { test } from 'node:test'
import assert from 'node:assert'

import { Checkout } from '../src/checkout'
import { PricingRule } from '../src/pricingRules/pricingRule'
import { PricingRuleFactory } from '../src/pricingRules/pricingRuleFactory'

test('Checkout with BuyXForYDeal', () => {
    const pricingRules: PricingRule[] = [
        PricingRuleFactory.createRule('BuyXForYDeal', 'atv', 3, 2, 109.50)!,
        PricingRuleFactory.createRule('BulkDiscount', 'ipd', 4, 499.99, 549.99)!
    ];

    const checkout = new Checkout(pricingRules);

    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('vga');

    assert.strictEqual(checkout.total(), 249, `Expected 249, got ${checkout.total()}`);
});

test('Checkout with BulkDiscount', () => {
    const pricingRules: PricingRule[] = [
        PricingRuleFactory.createRule('BuyXForYDeal', 'atv', 3, 2, 109.50)!,
        PricingRuleFactory.createRule('BulkDiscount', 'ipd', 4, 499.99, 549.99)!
    ];

    const checkout = new Checkout(pricingRules);

    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');

    assert.strictEqual(checkout.total(), 1999.96, `Expected 2199.96, got ${checkout.total()}`);
});


test('Checkout with BulkDiscount', () => {
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
})



