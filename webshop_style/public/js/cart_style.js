(function () {
    "use strict";

    // Run only on Cart page
    if (window.location.pathname !== "/cart") {
        return;
    }

    function applyCartContainerStyle() {
        const styleId = "vishuddhi-cart-container-style";

        let style = document.getElementById(styleId);

        if (!style) {
            style = document.createElement("style");
            style.id = styleId;
            document.head.appendChild(style);
        }

        style.textContent = `
            @media (max-width: 992px) {

                /* Cart page: remove the extra 1.5rem padding */
                .page-content-wrapper .container {
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }

                /* Cart page: keep container padding at 5px */
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
        document.addEventListener(
            "DOMContentLoaded",
            applyCartContainerStyle
        );
    } else {
        applyCartContainerStyle();
    }

})();