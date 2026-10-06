(function () {
    "use strict";

    function applyContactModalStyle() {
        const modalContent = document.querySelector(
            ".modal.show .modal-content"
        );

        if (!modalContent) {
            return;
        }

        modalContent.style.setProperty(
            "margin-top",
            "135px",
            "important"
        );
    }

    document.addEventListener("DOMContentLoaded", function () {
        applyContactModalStyle();

        const observer = new MutationObserver(function () {
            applyContactModalStyle();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["class", "style"]
        });
    });
})();