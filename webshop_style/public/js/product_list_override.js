
(function () {

    frappe.ready(() => {

        // =====================================
        // Remove unwanted indicators
        // =====================================

        const killCartIndicators = () => {
            document
                .querySelectorAll(
                    '.cart-indicator, .list-indicator, .go-to-cart'
                )
                .forEach(el => el.remove());
        };

        killCartIndicators();

        document.addEventListener('click', () => {
            setTimeout(killCartIndicators, 50);
        });

        setInterval(killCartIndicators, 500);


        // =====================================
        // Refresh Navbar Badges
        // =====================================

        const refreshNavbarBadges = () => {

            if (typeof updateNavbarBadges === "function") {
                updateNavbarBadges();
                return;
            }

            // Cart
            frappe.call({
                method: "webshop_style.api.cart.get_cart_count",
                callback: r => {
                    const badge = document.getElementById("cartBadgeTop");

                    if (badge) {
                        badge.innerText = r.message || 0;
                    }
                }
            });

            // Wishlist
            frappe.call({
                method: "webshop_style.api.cart.get_wishlist_count",
                callback: r => {
                    const badge = document.getElementById("wishlistBadgeTop");

                    if (badge) {
                        badge.innerText = r.message || 0;
                    }
                }
            });
        };


        // =====================================
        // CART CLICK
        // =====================================

        document.addEventListener("click", function (e) {

            const cartBtn = e.target.closest(".btn-add-to-cart-list");

            if (cartBtn) {
                setTimeout(() => {
                    refreshNavbarBadges();
                }, 800);
            }

        });


        // =====================================
        // WISHLIST CLICK
        // =====================================

        document.addEventListener("click", function (e) {

            const wishBtn = e.target.closest(`
                .like-action,
                .wishlist-btn,
                .btn-add-to-wishlist,
                .wishlist-toggle,
                .product-wishlist,
                .btn-wishlist,
                [data-action="wishlist"],
                [data-wished],
                .wish-icon
            `);

            if (wishBtn) {
                setTimeout(() => {
                    refreshNavbarBadges();
                }, 1000);
            }

        });


        // =====================================
        // AJAX COMPLETE
        // =====================================

        $(document).ajaxComplete(function (event, xhr, settings) {

            const url = settings.url || "";

            if (
                url.includes("wishlist") ||
                url.includes("add_to_wishlist") ||
                url.includes("remove_from_wishlist")
            ) {
                setTimeout(() => {
                    refreshNavbarBadges();
                }, 500);
            }

        });


        // =====================================
        // MOBILE ALL PRODUCTS - DEFAULT GRID VIEW
        // =====================================

        function setMobileProductGridView() {

            const currentPath = window.location.pathname
                .replace(/\/+$/, "");

            const isAllProductsPage =
                currentPath === "/all-products";

            if (!isAllProductsPage || window.innerWidth > 767) {
                return;
            }

            // Try to find an existing Grid View toggle.
            const gridSelectors = [
                '[data-view="grid"]',
                '[data-type="grid"]',
                '.grid-view',
                '.btn-grid-view',
                '[aria-label="Grid View"]',
                '[title="Grid View"]'
            ];

            let gridButton = null;

            for (const selector of gridSelectors) {
                gridButton = document.querySelector(selector);

                if (gridButton) {
                    break;
                }
            }

            // Activate Grid View if the button exists.
            if (gridButton) {

                const isAlreadyActive =
                    gridButton.classList.contains("active") ||
                    gridButton.getAttribute("aria-pressed") === "true";

                if (!isAlreadyActive) {
                    gridButton.click();
                }

                return;
            }

            // Fallback: find the product listing container.
            const productContainer = document.querySelector(
                "#page-all-products .product-listing, " +
                "#page-all-products .product-grid, " +
                "#page-all-products .products"
            );

            if (!productContainer) {
                return;
            }

            // Apply a two-column mobile grid.
            productContainer.style.setProperty(
                "display",
                "grid",
                "important"
            );

            productContainer.style.setProperty(
                "grid-template-columns",
                "repeat(2, minmax(0, 1fr))",
                "important"
            );

            productContainer.style.setProperty(
                "gap",
                "12px",
                "important"
            );

            productContainer.style.setProperty(
                "width",
                "100%",
                "important"
            );

            productContainer.style.setProperty(
                "box-sizing",
                "border-box",
                "important"
            );
        }


        // =====================================
        // INITIALIZE MOBILE GRID
        // =====================================

        function initializeMobileProductGrid() {

            setMobileProductGridView();

            // Retry while the product listing loads.
            setTimeout(setMobileProductGridView, 300);
            setTimeout(setMobileProductGridView, 800);
            setTimeout(setMobileProductGridView, 1500);
        }

        initializeMobileProductGrid();


        // Reapply on viewport resize.
        let gridResizeTimer = null;

        window.addEventListener("resize", function () {

            clearTimeout(gridResizeTimer);

            gridResizeTimer = setTimeout(() => {
                setMobileProductGridView();
            }, 200);

        });


        // Reapply after Frappe page navigation.
        document.addEventListener("page-change", function () {

            setTimeout(() => {
                initializeMobileProductGrid();
            }, 300);

        });


        // =====================================
        // WATCH FOR DYNAMIC PRODUCT CONTENT
        // =====================================

        let gridObserverTimer = null;

        const gridObserver = new MutationObserver(function () {

            clearTimeout(gridObserverTimer);

            gridObserverTimer = setTimeout(() => {
                setMobileProductGridView();
            }, 250);

        });

        if (document.body) {

            gridObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

        }


        // =====================================
        // OVERRIDE PRODUCT LIST
        // =====================================

        if (!window.webshop || !webshop.ProductList) {
            console.warn(
                "Webshop ProductList is not available yet."
            );
            return;
        }

        webshop.ProductList = class extends webshop.ProductList {

            get_title_html(item, title, settings) {

                return `
                    <div class="d-flex justify-content-between align-items-center w-100"
                         style="margin-left:-3px;">

                        <div class="pr-3 text-truncate" style="max-width:75%;">
                            <a href="/${item.route || '#'}"
                               style="color:var(--gray-800); font-weight:500;">
                                ${title}
                            </a>
                        </div>

                        ${settings.enabled
                            ? this.get_primary_button(item, settings)
                            : ``}
                    </div>
                `;
            }


            get_primary_button(item, settings) {

                if (item.has_variants) {

                    return `
                        <a href="/${item.route || '#'}">
                            <div class="btn btn-sm btn-explore-variants">
                                ${__("Explore")}
                            </div>
                        </a>
                    `;
                }

                if (
                    !(settings.enabled &&
                    (settings.allow_items_not_in_stock || item.in_stock))
                ) {
                    return ``;
                }

                return `
                    <div class="btn btn-sm btn-primary btn-add-to-cart-list
                                d-flex align-items-center justify-content-center"
                         data-item-code="${item.item_code}"
                         style="width:36px; height:36px; padding:0;">

                        <svg class="icon icon-md">
                            <use href="#icon-assets"></use>
                        </svg>

                    </div>
                `;
            }

        };


        console.log("Wishlist live badge fixed");
        console.log("Mobile product grid initialized");

    });

})();
