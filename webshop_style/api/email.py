import frappe
from frappe.utils import today

@frappe.whitelist(allow_guest=True)
def subscribe_user(email):
    if not email:
        return {
            "status": "error",
            "message": "Email is required"
        }

    email = email.strip().lower()

    # Check if email already exists
    if frappe.db.exists("Ecommerce-Subscription", {"email": email}):
        return {
            "status": "exists",
            "message": "You are already subscribed."
        }

    # Create new subscription
    doc = frappe.get_doc({
        "doctype": "Ecommerce-Subscription",
        "email": email,
        "date": today(),
        "subscribe": "Yes"
    })
    doc.insert(ignore_permissions=True)

    # Send email to admin
    frappe.sendmail(
        recipients=["nitish.m@quantumberg.com"],
        subject="New Newsletter Subscription",
        message=f"""
            <p>A new user has subscribed.</p>
            <p><strong>Email:</strong> {email}</p>
        """
    )

    frappe.sendmail(
        recipients=[email],
        subject="Subscription Successful",
        message="""
            <p>Thank you for subscribing to our newsletter!</p>
            <p>You will now receive updates and offers from us.</p>
        """
    )


    return {
        "status": "success",
        "message": "Subscription successful"
    }
