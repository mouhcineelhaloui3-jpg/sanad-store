PRODUCTS = {
    "sanad-align": {
        "name": "سَنَد ألاين",
        "price": 249,
        "upsell_price": 199,
        "cross_sell_priority": ["sanad-heat", "sanad-lumbo"],
    },
    "sanad-heat": {
        "name": "سَنَد هيت",
        "price": 299,
        "upsell_price": 249,
        "cross_sell_priority": ["sanad-lumbo", "sanad-align"],
    },
    "sanad-lumbo": {
        "name": "سَنَد لومبو",
        "price": 249,
        "upsell_price": 199,
        "cross_sell_priority": ["sanad-heat", "sanad-align"],
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
