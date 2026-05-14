import frappe

@frappe.whitelist(allow_guest=True)
def get_cart_count():
    if frappe.session.user == "Guest":
        return 0

    from webshop.webshop.shopping_cart.cart import _get_cart_quotation, get_party

    party = get_party()
    quotation = _get_cart_quotation(party)

    if quotation and quotation.get("items"):
        return sum(item.qty for item in quotation.items)

    return 0

@frappe.whitelist(allow_guest=True)
def get_wishlist_count():
    if frappe.session.user == "Guest":
        return 0

    wishlist_items = frappe.get_all(
        "Wishlist Item",
        filters={"owner": frappe.session.user},
        pluck="name"
    )
    return len(wishlist_items)
