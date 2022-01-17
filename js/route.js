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
        url: "./pages/info-alumni.html",
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
                url: "./pages/detail-alumni.html",
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
        url: "./pages/jobs.html",
        options: {
            pushState: true,
        },
        routes: [
            {
                name: "NewJob",
                path: "new/",
                url: "./pages/new-job.html",
            },
        ],
        on: {
            pageAfterIn: (e, page) => {
                app.request.json("http://127.0.0.1/php/job.php", (data) => {
                    let job = "";

                    for (let i=0;i<data.length;i++) {
                        job += `
                            <li>
                                <a href="#" class="item-link item-content">
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
        url: "./pages/blog.html",
        options: {
            pushState: true,
        },
        routes: [
            {
                name: "NewPost",
                path: "new/",
                url: "./pages/new-post.html",
            },
        ],
        // on: {
        //     pageAfterIn: (e, page) => {
        //         app.request.json("http://127.0.0.1/php/blog.php", (data) => {
        //             let blog = "";

        //             for (let i=0;i<data.length;i++) {
        //                 blog += `
        //                     <li>
        //                         <a href="#" class="item-link item-content">
        //                             <div class="item-media"><i class="icon icon-f7"></i></div>
        //                             <div class="item-inner">
        //                                 <div class="item-title">${data[i].name}</div>
        //                                 <div class="item-after">${data[i].position}</div>
        //                             </div>
        //                         </a>
        //                     </li>
        //                 `;
        //             }

        //             $$("#list-post").html(blog);
        //         });
        //     },
        // },
    },
];
