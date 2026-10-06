(function () {
    "use strict";

    function removeNetTotalRow() {
        document.querySelectorAll("#page-cart .cart-table tfoot tr").forEach(function (row) {

            const text = row.textContent.trim();

            if (text.includes("Net Total")) {
                row.remove();
            }

        });
    }

    // Initial run
    removeNetTotalRow();

    // Frappe may render the cart dynamically
    setTimeout(removeNetTotalRow, 300);
    setTimeout(removeNetTotalRow, 1000);
    setTimeout(removeNetTotalRow, 2000);

    // Watch for cart re-rendering
    const observer = new MutationObserver(function () {
        removeNetTotalRow();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();