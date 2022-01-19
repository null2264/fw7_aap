function titleize(str) {
    let upper = true
    let newStr = ""
    for (let i = 0, l = str.length; i < l; i++) {
        // Note that you can also check for all kinds of spaces  with
        // str[i].match(/\s/)
        if (str[i] == " ") {
            upper = true
            newStr += str[i]
            continue
        }
        newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase()
        upper = false
    }
    return newStr
}

const routes = [
    {
        name: "Home",
        path: "/",
        url: "index.html",
    },
    {
        name: "Products",
        path: "/products/:type/",
        url: "./pages/products.html",
        on: {
            pageAfterIn: (e, page) => {
                const type = page.route.params.type;

                // Hardcoded products
                const products = {
                    pants: [
                        {
                            brand: "Brand 1",
                            name: "Jeans",
                            price: 999999,
                        },
                        {
                            brand: "Brand 2",
                            name: "Shorts",
                            price: 999999,
                        },
                    ],
                    shirt: [
                        {
                            brand: "Brand 3",
                            name: "Sports",
                            price: 999999,
                        },
                        {
                            brand: "Brand 2",
                            name: "T-Shirt",
                            price: 999999,
                        },
                    ],
                };

                let inner = "";

                const selected = products[type];

                for (let i = 0; i<selected.length; i++) {
                    const name = `${selected[i].brand} - ${selected[i].name}`

                    inner += `
                        <li>
                            <a href="#" id="detail" data-index="${selected[i].id}" class="item-link item-content">
                                <div class="item-media">
                                    <img src="http://127.0.0.1/img/products/${selected[i].photo}"
                                        width="40" height="40"/>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">${name}</div>
                                    </div>
                                    <div class="item-subtitle">Rp.${selected[i].price}</div>
                                </div>
                            </a>
                        </li>
                    `
                }

                $$("#product-list").html(inner);

                $$("#product-type-name").html(titleize(type));
            },
        },
    },
    {
        name: "Admin",
        path: "/admin/",
        url: "./pages/admin/index.html",
        master: true,
        detailRoutes: [
            {
                path: "/admin/add/:type/",
                url: "./pages/admin/input-product.html",
                on: {
                    pageAfterIn: async (e, page) => {
                        document.getElementById("productType").value = titleize(page.route.params.type);
                    }
                }
            },
        ]
    },
];
