
(function () {
    "use strict";

    function addMobilePaginationCSS() {

        if (document.getElementById("vishuddhi-mobile-pagination-css")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "vishuddhi-mobile-pagination-css";

        style.textContent = `

            /* =================================================
               CART WIDTH - MOBILE + TABLET
               ================================================= */

         @media (max-width: 992px) {

        button.btn-add-to-cart.w-30-40 {
            width: 50% !important;
            min-width: 50% !important;
            max-width: 50% !important;
            flex: 0 0 50% !important;
            flex-basis: 50% !important;
        }

        .btn-add-to-cart.w-30-40 {
            width: 50% !important;
            min-width: 50% !important;
            max-width: 50% !important;
            flex: 0 0 50% !important;
            flex-basis: 50% !important;
        }

    }


            /* =================================================
               MOBILE PAGINATION
               ================================================= */

            @media (max-width: 767px) {

                #page-all-products .product-paging-area,
                .product-paging-area {

                    width: 100% !important;
                    max-width: 100% !important;

                    margin-left: 0 !important;
                    margin-right: 0 !important;

                    padding-left: 8px !important;
                    padding-right: 8px !important;

                    box-sizing: border-box !important;

                    position: relative !important;
                    left: -40px !important;
                    bottom: 75px !important;

                    overflow: visible !important;

                    margin-top: 50px !important;
                }


                #page-all-products .product-paging-area.row,
                .product-paging-area.row {

                    margin-left: 0 !important;
                    margin-right: 0 !important;

                    padding-left: 0 !important;
                    padding-right: 0 !important;

                    width: 100% !important;
                    max-width: 100% !important;

                    box-sizing: border-box !important;

                    display: flex !important;
                    flex-wrap: nowrap !important;

                    align-items: center !important;
                }


                #page-all-products .product-paging-area > .row,
                .product-paging-area > .row {

                    width: 100% !important;
                    max-width: 100% !important;

                    margin-left: 0 !important;
                    margin-right: 0 !important;

                    padding-left: 0 !important;
                    padding-right: 0 !important;

                    display: flex !important;
                    flex-wrap: nowrap !important;

                    align-items: center !important;

                    box-sizing: border-box !important;
                }


                #page-all-products .product-paging-area .row > [class*="col-"],
                .product-paging-area .row > [class*="col-"] {

                    margin-left: 0 !important;
                    margin-right: 0 !important;

                    padding-left: 5px !important;
                    padding-right: 5px !important;

                    box-sizing: border-box !important;

                    min-width: 0 !important;
                }


                #page-all-products .product-paging-area button,
                .product-paging-area button {

                    position: static !important;

                    left: auto !important;
                    right: auto !important;
                    top: auto !important;
                    bottom: auto !important;

                    transform: none !important;

                    margin-top: 0 !important;
                    margin-bottom: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;

                    max-width: 100% !important;

                    box-sizing: border-box !important;

                    white-space: nowrap !important;
                }


                #page-all-products .product-paging-area .btn:first-child,
                .product-paging-area .btn:first-child {

                    margin-left: 0 !important;
                    margin-right: auto !important;
                }


                #page-all-products .product-paging-area .btn:last-child,
                .product-paging-area .btn:last-child {

                    margin-left: auto !important;
                    margin-right: 0 !important;
                }


                #page-all-products .product-paging-area .col-3,
                .product-paging-area .col-3 {

                    width: 25% !important;
                    max-width: 25% !important;

                    flex: 0 0 25% !important;
                }


                #page-all-products .product-paging-area .col-6,
                .product-paging-area .col-6 {

                    width: 50% !important;
                    max-width: 50% !important;

                    flex: 0 0 50% !important;
                }


                #page-all-products .product-paging-area .col-9,
                .product-paging-area .col-9 {

                    width: 75% !important;
                    max-width: 75% !important;

                    flex: 0 0 75% !important;
                }


                #page-all-products .product-paging-area span,
                #page-all-products .product-paging-area div,
                .product-paging-area span {

                    box-sizing: border-box !important;
                }


                #page-all-products .product-paging-area .btn-default,
                #page-all-products .product-paging-area .btn-primary,
                .product-paging-area .btn-default,
                .product-paging-area .btn-primary {

                    display: inline-flex !important;

                    align-items: center !important;
                    justify-content: center !important;

                    min-height: 34px !important;

                    padding-left: 12px !important;
                    padding-right: 12px !important;
                }


                #page-all-products,
                #page-all-products .page-content,
                #page-all-products main,
                #page-all-products .container,
                #page-all-products .container-fluid {

                    max-width: 100% !important;

                    box-sizing: border-box !important;
                }


                #page-all-products .product-paging-area {

                    overflow-x: hidden !important;
                    overflow-y: visible !important;
                }


                @media (max-width: 400px) {

                    #page-all-products .product-paging-area {

                        padding-left: 5px !important;
                        padding-right: 5px !important;
                    }


                    #page-all-products .product-paging-area button {

                        font-size: 13px !important;

                        padding-left: 9px !important;
                        padding-right: 9px !important;
                    }
                }
            }
        `;

        document.head.appendChild(style);
    }


    function fixProductPagination() {

        if (window.innerWidth > 767) {
            return;
        }

        const paginationAreas = document.querySelectorAll(
            ".product-paging-area"
        );

        if (!paginationAreas.length) {
            return;
        }

        paginationAreas.forEach(function (pagination) {

            pagination.style.width = "100%";
            pagination.style.maxWidth = "100%";

            pagination.style.marginLeft = "0";
            pagination.style.marginRight = "0";

            pagination.style.paddingLeft = "8px";
            pagination.style.paddingRight = "8px";

            pagination.style.boxSizing = "border-box";

            pagination.style.position = "relative";

            pagination.style.left = "-40px";
            pagination.style.right = "auto";

            pagination.style.bottom = "75px";

            pagination.style.marginTop = "50px";


            if (pagination.classList.contains("row")) {

                pagination.style.marginLeft = "0";
                pagination.style.marginRight = "0";

                pagination.style.paddingLeft = "0";
                pagination.style.paddingRight = "0";

                pagination.style.display = "flex";

                pagination.style.flexWrap = "nowrap";

                pagination.style.alignItems = "center";
            }


            const rows = pagination.querySelectorAll(".row");

            rows.forEach(function (row) {

                row.style.width = "100%";
                row.style.maxWidth = "100%";

                row.style.marginLeft = "0";
                row.style.marginRight = "0";

                row.style.paddingLeft = "0";
                row.style.paddingRight = "0";

                row.style.display = "flex";

                row.style.flexWrap = "nowrap";

                row.style.alignItems = "center";

                row.style.boxSizing = "border-box";
            });


            const columns = pagination.querySelectorAll(
                "[class*='col-']"
            );

            columns.forEach(function (column) {

                column.style.marginLeft = "0";
                column.style.marginRight = "0";

                column.style.boxSizing = "border-box";

                column.style.minWidth = "0";
            });


            const buttons = pagination.querySelectorAll("button");

            buttons.forEach(function (button) {

                button.style.position = "static";

                button.style.left = "auto";
                button.style.right = "auto";

                button.style.top = "auto";
                button.style.bottom = "auto";

                button.style.transform = "none";

                button.style.marginTop = "0";
                button.style.marginBottom = "0";

                button.style.boxSizing = "border-box";

                button.style.maxWidth = "100%";

                button.style.whiteSpace = "nowrap";
            });


            const firstColumn = columns[0];

            const lastColumn = columns[columns.length - 1];


            if (firstColumn) {

                firstColumn.style.marginLeft = "0";

                firstColumn.style.paddingLeft = "5px";
                firstColumn.style.paddingRight = "5px";
            }


            if (lastColumn && lastColumn !== firstColumn) {

                lastColumn.style.marginRight = "0";

                lastColumn.style.paddingLeft = "5px";
                lastColumn.style.paddingRight = "5px";
            }
        });
    }


    let fixTimer = null;

    function schedulePaginationFix() {

        clearTimeout(fixTimer);

        fixTimer = setTimeout(function () {

            fixProductPagination();

        }, 100);
    }


    function initializeCSSChanges() {

        addMobilePaginationCSS();

        schedulePaginationFix();


        setTimeout(function () {
            schedulePaginationFix();
        }, 300);


        setTimeout(function () {
            schedulePaginationFix();
        }, 800);


        setTimeout(function () {
            schedulePaginationFix();
        }, 1500);
    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeCSSChanges
        );

    } else {

        initializeCSSChanges();
    }


    let resizeTimer = null;

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            schedulePaginationFix();

        }, 150);
    });


    let observerTimer = null;

    const observer = new MutationObserver(function () {

        clearTimeout(observerTimer);

        observerTimer = setTimeout(function () {

            if (
                document.querySelector(
                    ".product-paging-area"
                )
            ) {

                fixProductPagination();
            }

        }, 150);
    });


    function startObserver() {

        if (!document.body) {
            return;
        }

        observer.observe(document.body, {

            childList: true,

            subtree: true
        });
    }


    if (document.body) {

        startObserver();

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            startObserver
        );
    }


    document.addEventListener(
        "page-change",
        function () {

            setTimeout(function () {

                schedulePaginationFix();

            }, 300);
        }
    );

})();

