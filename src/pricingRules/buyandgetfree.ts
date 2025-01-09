import { Cart } from '../cart';
import { PricingRule } from './pricingRule'

export class BuyAndGetFree implements PricingRule {

    private productPrice: number;

    constructor(productPrice: number) {
        this.productPrice = productPrice
    }

    apply(cart: Cart): number {

        if (cart.getItems().has('atv') && cart.getItems().has('ipd')) {
            return this.productPrice
        }

        return 0

    }
}