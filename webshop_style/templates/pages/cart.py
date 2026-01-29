# webshop_style/templates/pages/cart.py

no_cache = 1

from webshop.webshop.shopping_cart.cart import get_cart_quotation


def get_context(context):
    context.body_class = "product-page"
    context.update(get_cart_quotation())
