# webshop_style/templates/pages/cart.py

no_cache = 1

from webshop.webshop.shopping_cart.cart import get_cart_quotation


def get_context(context):
    """Cart page context"""

    context.body_class = "product-page"

    # Get cart quotation and all cart details
    cart = get_cart_quotation()

    if cart:
        context.update(cart)

    # This webshop does not use Healthcare/Medication features
    context.prescription_required = 0

    return context