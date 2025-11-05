class Product {
  constructor(sku, price) {
    if (typeof sku !== "string" || !sku.trim() || !Number.isFinite(price) || price <= 0)
      throw new Error("INVALID_PRODUCT");
    this.sku = sku;
    this.price = Number(price.toFixed(2));
  }
}

class Cart {
  #items = [];

  add(product, quantity) {
    if (!(product instanceof Product))
      throw new Error("INVALID_PRODUCT");
    if (!Number.isInteger(quantity) || quantity < 1)
      throw new Error("INVALID_QUANTITY");

    const found = this.#items.find(i => i.sku === product.sku);
    if (found) found.qty += quantity;
    else this.#items.push({ sku: product.sku, qty: quantity, unit: product.price });
  }

  remove(sku, quantity) {
    const item = this.#items.find(i => i.sku === sku);
    if (!item || item.qty < quantity) throw new Error("INVALID_REMOVE");
    item.qty -= quantity;
    if (item.qty === 0) this.#items = this.#items.filter(i => i.sku !== sku);
  }

  total({ discountPct = 0, vatPct = 0 } = {}) {
    const round2 = n => Number(n.toFixed(2));
    const subtotal = round2(this.#items.reduce((sum, i) => sum + i.qty * i.unit, 0));
    const discount = round2(subtotal * (discountPct / 100));
    const vat = round2((subtotal - discount) * (vatPct / 100));
    const total = round2(subtotal - discount + vat);
    return `SUB=${subtotal.toFixed(2)};DISC=${discount.toFixed(2)};VAT=${vat.toFixed(2)};TOTAL=${total.toFixed(2)}`;
  }
}
