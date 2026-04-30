# webshop_style/templates/pages/cart.py

no_cache = 1

import frappe
from webshop.webshop.shopping_cart.cart import get_cart_quotation


def get_context(context):
    context.body_class = "product-page"

    # existing cart data
    cart = get_cart_quotation()
    context.update(cart)

    doc = context.get("doc")

    prescription_required = 0

    if doc and doc.items:
        item_codes = [item.item_code for item in doc.items]

        # Step 1: Get linked medications from child table
        linked = frappe.get_all(
            "Medication Linked Item",
            filters={"item": ["in", item_codes]},
            fields=["parent"]
        )

        medication_names = list(set([d.parent for d in linked]))

        # Step 2: Check if any medication requires prescription
        if medication_names:
            required = frappe.get_all(
                "Medication",
                filters={
                    "name": ["in", medication_names],
                    "custom_prescription_required": 1
                },
                limit=1
            )

            if required:
                prescription_required = 1

    # send to template
    context.prescription_required = prescription_required