PRODUCTS = {
    "plan-3-months": {
        "name": "باقة 3 أشهر",
        "price": 150,
        "upsell_price": 130,
        "cross_sell_priority": ["plan-6-months", "plan-12-months"],
    },
    "plan-6-months": {
        "name": "باقة 6 أشهر",
        "price": 250,
        "upsell_price": 220,
        "cross_sell_priority": ["plan-12-months", "plan-3-months"],
    },
    "plan-12-months": {
        "name": "باقة سنة كاملة",
        "price": 400,
        "upsell_price": 350,
        "cross_sell_priority": ["plan-6-months", "plan-3-months"],
    },
}


def get_product(product_id: str) -> dict:
    product = PRODUCTS.get(product_id)
    if not product:
        raise ValueError("Unknown product")
    return product


def choose_upsell_product(cart_product_ids: list[str]) -> str | None:
    if len(set(cart_product_ids)) >= len(PRODUCTS):
        return None

    for product_id in cart_product_ids:
        for candidate in PRODUCTS[product_id]["cross_sell_priority"]:
            if candidate not in cart_product_ids:
                return candidate

    for product_id in PRODUCTS:
        if product_id not in cart_product_ids:
            return product_id

    return None
