console.log("🔥 product_override.js loaded");
frappe.ready(function () {

    $(document).on("click", ".btn-add-to-cart", function () {
        const $btn = $(this);
        const item_code = $btn.data("item-code");

        if (!item_code) {
            console.error("❌ Item code missing");
            return;
        }

        $btn.prop("disabled", true);

        // ✅ Use frappe.call instead of direct JS API
        frappe.call({
            method: "webshop.webshop.shopping_cart.cart.update_cart",
            args: {
                item_code: item_code,
                qty: 1
            },
            callback: function (r) {
                $btn.prop("disabled", false);

                if (r.message) {
                    // ✅ Toggle buttons properly
                    $btn.addClass("hidden");

                    $btn.closest(".item-cart")
                        .find(".btn-view-in-cart")
                        .removeClass("hidden");

                    console.log("✅ Added to cart");
                } else {
                    console.error("❌ Failed to add to cart");
                }
            }
        });
    });

});