(function () {

    frappe.ready(() => {

        // 🔁 Repeatedly clean cart indicators
        const killCartIndicators = () => {
            document
                .querySelectorAll('.cart-indicator, .list-indicator, .go-to-cart')
                .forEach(el => el.remove());
        };

        // Run immediately
        killCartIndicators();

        // Run after every AJAX/cart update
        document.addEventListener('click', () => {
            setTimeout(killCartIndicators, 50);
        });

        // Safety interval (covers login/cart sync)
        setInterval(killCartIndicators, 500);

        // -----------------------------
        // Override ProductList
        // -----------------------------
        if (!window.webshop || !webshop.ProductList) return;

        webshop.ProductList = class extends webshop.ProductList {

            get_title_html(item, title, settings) {
                return `
                    <div class="d-flex justify-content-between align-items-center w-100"
                         style="margin-left:-15px;">

                        <div class="pr-3 text-truncate" style="max-width:75%;">
                            <a href="/${item.route || '#'}"
                               style="color:var(--gray-800); font-weight:500;">
                                ${title}
                            </a>
                        </div>

                        ${settings.enabled ? this.get_primary_button(item, settings) : ``}
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

                if (!(settings.enabled && (settings.allow_items_not_in_stock || item.in_stock))) {
                    return ``;
                }

                // ✅ ICON ONLY (NO TEXT, NO BADGE)
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

        console.log("✅ ProductList overridden + cart indicators killed");
    });

})();
