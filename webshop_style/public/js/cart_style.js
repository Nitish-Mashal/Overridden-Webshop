(function () {
    "use strict";

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

    // Detect Frappe cart updates/re-rendering
    const observer = new MutationObserver(function () {
        removeNetTotalRow();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();