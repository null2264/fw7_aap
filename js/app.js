const app = new Framework7({
    // App's root element
    el: "#app",
    // App's Name
    name: "My App",
    // App's id
    id: "com.myapp.test",
    // Enable swipe panel
    panel: {
        swipe: true,
    },
    // App's routes
    routes: routes // located in js/route.js
});

const mainView = app.views.create(".view-main");
const $$ = Dom7;

// $$(document).on("click", "#btn-register", function () {
$$(document).on("click", "#btn-register", () => {
    mainView.router.navigate("/register/");
});

$$(document).on("click", "#btn-login", () => {
    mainView.router.navigate("/dashboard/");
});

$$(document).on("click", "#btn-exit", () => {
    mainView.router.navigate("/");
});
