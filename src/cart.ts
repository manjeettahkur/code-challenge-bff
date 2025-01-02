import { Catalog } from "./catalog"


/**
 * Represents a shopping cart that can hold items and calculate the total price.
 */
export class Cart {

    private items: Map<string, number>

    /**
     * Initializes a new instance of the Cart class.
     */
    constructor() {
        this.items = new Map()
    }

    /**
     * Adds an item to the cart. If the item already exists, increments the quantity by 1.
     * @param sku - The SKU (Stock Keeping Unit) of the item to add.
     */
    addItem(sku: string) {
        if (this.items.has(sku)) {
            return this.items.set(sku, (this.items.get(sku) ?? 0) + 1)
        }

        return this.items.set(sku, 1)
    }

    /**
     * Gets the quantity of a specific item in the cart.
     * @param sku - The SKU (Stock Keeping Unit) of the item.
     * @returns The quantity of the item in the cart.
     */
    /**
     * Gets the quantity of a specific item in the cart.
     * @param sku - The SKU (Stock Keeping Unit) of the item.
     * @returns The quantity of the item in the cart.
     */
    getItemCount(sku: string): number {
        return this.items.get(sku) || 0
    }
    
    /**
     * Gets all items in the cart.
     * @returns A map where the keys are SKUs and the values are quantities.
     */
    getItems(): Map<string, number> {
        return new Map(this.items)
    }

    /**
     * Calculates the total price of all items in the cart.
     * @param catalog - The catalog containing product information.
     * @returns The total price of all items in the cart.
     */
    getTotalPrice(catalog: Catalog): number {
        let totalPrice = 0;
        for (const [sku, count] of this.items.entries()) {
            const product = catalog.getProduct(sku)

            if (!product) {
                throw new Error(`Product with SKU ${sku} not found in catalog`)
            }

            totalPrice += product.price * count
        }

        return totalPrice
    }
}