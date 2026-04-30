// 🔥 RUN ONLY ONCE
if (!window.cartOverrideInitialized) {

    window.cartOverrideInitialized = true;

    // 🆕 GLOBAL PRESCRIPTION STATE
    let uploaded_prescription = null;
    let prescription_required = false;

    // ============================================
    // 🚫 BLOCK WEBSHOP DEFAULT HANDLERS (SAFE)
    // ============================================
    document.addEventListener("click", function (e) {

        const isCartButton =
            e.target.closest(".btn-increase-qty") ||
            e.target.closest(".btn-decrease-qty") ||
            e.target.closest(".btn-place-order");

        if (isCartButton) {
            console.log("🛑 Blocking default webshop handler (safe)");

            // ✅ Only stop bubbling
            e.stopPropagation();
        }

    }, false);


    frappe.ready(function () {

        console.log("✅ cart_override.js loaded (FINAL WORKING)");

        let isUpdating = false;

        // 🆕 DETECT PRESCRIPTION REQUIREMENT FROM DOM
        if ($("#prescription-upload").length) {
            prescription_required = true;
            console.log("💊 Prescription required for this cart");
        }

        // 🆕 HANDLE FILE UPLOAD
        $(document).on("change", "#prescription-upload", function () {

            let file = this.files[0];
            if (!file) return;

            let form_data = new FormData();
            form_data.append("file", file);

            fetch("/api/method/upload_file", {
                method: "POST",
                body: form_data,
                headers: {
                    "X-Frappe-CSRF-Token": frappe.csrf_token
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    uploaded_prescription = data.message.file_url;

                    console.log("✅ Prescription uploaded:", uploaded_prescription);

                    $("#prescription-status").show();
                }
            })
            .catch(() => {
                frappe.msgprint("❌ Prescription upload failed");
            });
        });

        // ============================================
        // ✅ UPDATE CART (SAFE + LOCK)
        // ============================================
        function update_cart(item_code, qty) {

            if (isUpdating) {
                console.log("⛔ Skipped duplicate call");
                return;
            }

            isUpdating = true;

            console.log("🚀 Updating:", item_code, qty);

            frappe.call({
                method: "webshop.webshop.shopping_cart.cart.update_cart",
                args: {
                    item_code: item_code,
                    qty: qty,
                    with_items: 1
                },
                freeze: false,
                callback: function (r) {

                    isUpdating = false;

                    if (r.exc) {
                        console.error("❌ API Error", r.exc);
                        return;
                    }

                    if (r.message) {
                        console.log("✅ Cart updated");

                        setTimeout(() => {
                            location.reload();
                        }, 100);
                    }
                },
                error: function () {
                    isUpdating = false;
                    console.error("❌ Request failed");
                }
            });
        }

        // ============================================
        // ➕ INCREASE QTY
        // ============================================
        $(document).on("click", ".btn-increase-qty", function (e) {

            e.preventDefault();
            e.stopImmediatePropagation();

            if (isUpdating) return false;

            let $row = $(this).closest(".cart-item");

            let item_code = $row.data("item-code");
            let qty = parseInt($row.find(".item-qty").val()) || 0;

            update_cart(item_code, qty + 1);

            return false;
        });

        // ============================================
        // ➖ DECREASE QTY
        // ✅ If qty = 1 remove item from cart
        // ============================================
        $(document).on("click", ".btn-decrease-qty", function (e) {

            e.preventDefault();
            e.stopImmediatePropagation();

            if (isUpdating) return false;

            let $row = $(this).closest(".cart-item");

            let item_code = $row.data("item-code");
            let qty = parseInt($row.find(".item-qty").val()) || 0;

            if (qty > 1) {
                update_cart(item_code, qty - 1);
            } else if (qty === 1) {
                update_cart(item_code, 0);   // ✅ remove item
            }

            return false;
        });

        // ============================================
        // ✅ PLACE ORDER (UPDATED WITH PRESCRIPTION)
        // ============================================
        $(document).on("click", ".btn-place-order", function (e) {

            e.preventDefault();
            e.stopImmediatePropagation();

            // 🆕 BLOCK IF PRESCRIPTION REQUIRED BUT NOT UPLOADED
            if (prescription_required && !uploaded_prescription) {
                frappe.msgprint({
                    title: "Prescription Required",
                    message: "Please upload a prescription before placing the order.",
                    indicator: "red"
                });
                return false;
            }

            if (isUpdating) return false;

            isUpdating = true;

            console.log("🚀 Placing order...");

            frappe.call({
                method: "webshop.webshop.shopping_cart.cart.place_order",
                freeze: true,
                freeze_message: "Placing Order...",
                callback: function (r) {

                    isUpdating = false;

                    if (r.message) {
                        console.log("✅ Order Created:", r.message);

                        // 🆕 ATTACH PRESCRIPTION AFTER ORDER CREATION
                        if (uploaded_prescription) {
                            frappe.call({
                                method: "webshop_style.api.attach_prescription",
                                args: {
                                    sales_order: r.message,
                                    file_url: uploaded_prescription
                                }
                            });
                        }

                        window.location.href = "/orders/" + r.message;

                    } else {
                        frappe.msgprint("❌ Order failed");
                    }
                },
                error: function () {
                    isUpdating = false;
                    console.error("❌ Request failed");
                }
            });

            return false;
        });

    });
}