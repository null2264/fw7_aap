function timeDifference(current, previous) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else {
        return current.toDateString();   
    }
}

const routes = [
    {
        name: "Home",
        path: "/",
        url: "index.html",
    },
    {
        name: "About",
        path: "/about/",
        url: "./pages/about.html",
        options: {
            pushState: true,
        },
    },
    {
        name: "Dashboard",
        path: "/dashboard/",
        url: "./pages/dashboard.html",
        options: {
            pushState: true,
        },
    },
    {
        name: "Register",
        path: "/register/",
        url: "./pages/register.html",
        options: {
            pushState: true,
        },
    },
    {
        name: "InfoAlumni",
        path: "/info-alumni/",
        url: "./pages/alumni/index.html",
        options: {
            pushState: true,
        },
        on: {
            pageAfterIn: (e, page) => {
                app.request.json("http://127.0.0.1/php/alumni.php", (data) => {
                    let alumni = "";

                    for (let i=0;i<data.length;i++) {
                        alumni += `
                            <li>
                                <a href="#" id="detail" data-index="${data[i].id}" class="item-link item-content">
                                    <div class="item-media">
                                        <img src="http://127.0.0.1/alumniPhoto/${data[i].photo}"
                                            width="40" height="40"/>
                                    </div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">${data[i].name}</div>
                                        </div>
                                        <div class="item-subtitle">${data[i].year}</div>
                                    </div>
                                </a>
                            </li>
                        `;
                    }

                    $$("#list-alumni").html(alumni);
                });
            },
        },
        detailRoutes: [
            {
                path: "/info-alumni/:userId/",
                url: "./pages/alumni/detail.html",
                master: true,
                on: {
                    pageAfterIn: async (e, page) => {
                        const index = page.route.params.userId;
                        await app.request({
                            url: "http://127.0.0.1/php/alumni.php",
                            type: "GET",
                            data: {
                                "id": index
                            },
                            dataType: "json",
                            success: (data) => {
                                const cur = data[0];
                                let tdm = `
                                    <tr>
                                        <td>Nama</td>
                                        <td>:</td>
                                        <td>${cur.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Prodi</td>
                                        <td>:</td>
                                        <td>${cur.prodi}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>:</td>
                                        <td>${cur.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>:</td>
                                        <td>${cur.gender}</td>
                                    </tr>
                                `;
                                $$("#info-alum").html(tdm);
                            },
                            error: (err) => {
                                // console.log(err.response.msg);
                                app.dialog.alert(JSON.parse(err.response).msg);
                            },
                        })
                    },
                },
            },
        ],
    },
    {
        name: "Jobs",
        path: "/jobs/",
        url: "./pages/jobs/index.html",
        options: {
            pushState: true,
        },
        routes: [
            {
                name: "NewJob",
                path: "new/",
                url: "./pages/jobs/new.html",
            },
        ],
        on: {
            pageAfterIn: (e, page) => {
                app.request.json("http://127.0.0.1/php/job.php", (data) => {
                    let job = "";

                    for (let i=0;i<data.length;i++) {
                        job += `
                            <li>
                                <a href="#" data-index="${data[i].id}" class="item-link item-content">
                                    <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title">${data[i].name}</div>
                                        <div class="item-after">${data[i].position}</div>
                                    </div>
                                </a>
                            </li>
                        `;
                    }

                    $$("#list-job").html(job);
                });
            },
        },
    },
    {
        name: "Blog",
        path: "/blog/",
        url: "./pages/blog/index.html",
        options: {
            pushState: true,
        },
        routes: [
            {
                name: "NewPost",
                path: "new/",
                url: "./pages/blog/new.html",
            },
        ],
        on: {
            pageAfterIn: (e, page) => {
                app.request.json("http://127.0.0.1/php/blog.php", (data) => {
                    let blog = "";

                    for (let i=0;i<data.length;i++) {
                        blog += `
                            <li>
                                <a href="#" data-index="${data[i].id}" class="item-link item-content">
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">${data[i].title}</div>
                                            <div class="item-after">${timeDifference(new Date(), new Date(data[i].date*1000))}</div>
                                        </div>
                                        <div class="item-subtitle">Unknown</div>
                                        <div class="item-text">
                                            ${data[i].content}
                                        </div>
                                    </div>
                                </a>
                            </li>
                        `;
                    }

                    $$("#list-post").html(blog);
                });
            },
        },
    },
];
