import frappe

@frappe.whitelist()
def attach_prescription(sales_order, file_url):
    if not sales_order or not file_url:
        return

    frappe.db.set_value(
        "Sales Order",
        sales_order,
        "custom_prescription",
        file_url
    )