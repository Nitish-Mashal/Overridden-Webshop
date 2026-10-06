(function () {
    "use strict";

    // Only Cart page
    if (window.location.pathname !== "/cart") {
        return;
    }

    function applyCartStyle() {
        let style = document.getElementById("vishuddhi-cart-style");

        if (!style) {
            style = document.createElement("style");
            style.id = "vishuddhi-cart-style";
            document.head.appendChild(style);
        }

        style.textContent = `
            @media (max-width: 992px) {

                /* Remove the 1.5rem padding from the page wrapper */
                .page-content-wrapper .container {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }

                /* Keep the actual container at 5px */
                .container,
                .container-fluid,
                .container-xl,
                .container-lg,
                .container-md,
                .container-sm {
                    width: 100% !important;
                    padding-left: 5px !important;
                    padding-right: 5px !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                }
            }
        `;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyCartStyle);
    } else {
        applyCartStyle();
    }

})();