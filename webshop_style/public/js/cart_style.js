(function () {
    "use strict";

    // =========================================================
    // REMOVE NET TOTAL / TAX ROW FROM CART
    // =========================================================

    function removeNetTotalRow() {
        const rows = document.querySelectorAll(
            "#page-cart .cart-table tfoot.cart-tax-items tr"
        );

        rows.forEach(function (row) {
            row.remove();
        });
    }

    // Remove immediately
    removeNetTotalRow();

    // Frappe may recreate the row
    setTimeout(removeNetTotalRow, 100);
    setTimeout(removeNetTotalRow, 500);
    setTimeout(removeNetTotalRow, 1000);
    setTimeout(removeNetTotalRow, 2000);

    // Detect Frappe cart updates / re-rendering
    const observer = new MutationObserver(function () {
        removeNetTotalRow();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


    // =========================================================
    // CART MOBILE CONTAINER PADDING
    // =========================================================

    function applyCartContainerStyle() {
        // Run only on Cart page
        if (window.location.pathname !== "/cart") {
            return;
        }

        const styleId = "vishuddhi-cart-container-style";

        let style = document.getElementById(styleId);

        if (!style) {
            style = document.createElement("style");
            style.id = styleId;
            document.head.appendChild(style);
        }

        style.textContent = `
            @media (max-width: 992px) {
                .page-content-wrapper .container {
                    padding-left: 2px !important;
                    padding-right: 2px !important;
                }
            }
        `;
    }

    // Apply when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            applyCartContainerStyle
        );
    } else {
        applyCartContainerStyle();
    }
})();