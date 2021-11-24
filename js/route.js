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
];
