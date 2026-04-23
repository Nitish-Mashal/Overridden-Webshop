// 🔥 RUN ONLY ONCE
if (!window.cartOverrideInitialized) {

    window.cartOverrideInitialized = true;

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

            // ✅ Only stop bubbling (DO NOT kill all handlers)
            e.stopPropagation();
        }

    }, false); // 👈 IMPORTANT: bubble phase (NOT capture)


    frappe.ready(function () {

        console.log("✅ cart_override.js loaded (FINAL WORKING)");

        let isUpdating = false;

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

                        // 🔄 Reload safely
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
            e.stopImmediatePropagation(); // ✅ safe here

            if (isUpdating) return false;

            let $row = $(this).closest(".cart-item");

            let item_code = $row.data("item-code");
            let qty = parseInt($row.find(".item-qty").val()) || 0;

            update_cart(item_code, qty + 1);

            return false;
        });

        // ============================================
        // ➖ DECREASE QTY
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
            }

            return false;
        });

        // ============================================
        // ✅ PLACE ORDER
        // ============================================
        $(document).on("click", ".btn-place-order", function (e) {

            e.preventDefault();
            e.stopImmediatePropagation();

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

                        // 🔁 Redirect to order page
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