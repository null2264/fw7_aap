// ESLint hates this way of using Framework7 ._.
// eslint-disable-next-line no-undef, no-unused-vars
const app = new Framework7({
    el: "#app",
    name: "My App",
    id: "com.myapp.test",
    panel: {
        swipe: true,
    },
    // eslint-disable-next-line no-undef
    routes: routes // located in js/route.js
});

// const mainView = app.views.create(".view-main");
// eslint-disable-next-line no-undef
const $$ = Dom7;

$$(document).on("click", "#calculate", () => {
    const x = parseInt(document.getElementById("valX").value);
    const y = parseInt(document.getElementById("valY").value);
    const chosen = document.getElementById("choice").value;

    let result = document.getElementById("result");
    switch (chosen) {
        case "*": result.value = x*y; break;
        case "+": result.value = x+y; break;
        case "-": result.value = x-y; break;
        case "/": result.value = x/y; break;
        default: alert("how?"); break;
    }

});
