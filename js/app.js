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

$$(document).on("click", "#btn-register", function ()
{
    mainView.router.navigate("/register/");
});

$$(document).on("click", "#btn-login", function ()
{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    app.request({
        url: "http://127.0.0.1/php/check-login.php",
        type: "POST",
        data: {
            "email": email,
            "password": password,
        },
        dataType: "json",
        success: () => {
            mainView.router.navigate("/dashboard/");
        },
        error: (err) => {
            // console.log(err.response.msg);
            app.dialog.alert(JSON.parse(err.response).msg);
        },
    })
});

$$(document).on("submit", "#login-form", function (e)
{
    // stop redirection
    e.preventDefault();
    this.reset(); // reset form
});

$$(document).on("click", "#btn-exit", function ()
{
    mainView.router.navigate("/");
});

$$(document).on("submit", "#register-form", function (e)
{
    // stop redirection
    e.preventDefault();

    let formData = new FormData();

    const file = document.getElementById("photo").files[0];
    formData.append("file", file);

    const name = document.getElementById("name").value;
    formData.append("name", name);

    const gradYear = document.getElementById("gradYear").value;
    formData.append("gradYear", gradYear);

    const prodi = document.getElementById("prodi").value;
    formData.append("prodi", prodi);

    const email = document.getElementById("regEmail").value;
    formData.append("email", email);

    const gender = document.getElementById("gender").value;
    formData.append("gender", gender);

    const password = document.getElementById("regPassword").value;
    formData.append("password", password);

    if (!!file) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            app.dialog.alert("Berhasil Disimpan !");
        };
        xhttp.open("POST", "http://127.0.0.1/php/save-alumni.php", true);
        xhttp.send(formData);
    } else {
        app.dialog.alert("Foto tidak boleh kosong !");
    }

    this.reset(); // reset form
});

$$(document).on("click", "#detail", function ()
{
    console.log($$("#detail"));
    const index = $$(this).data("index");
    localStorage.removeItem("index");
    localStorage.setItem("index", index);
    mainView.router.navigate("/detail-alumni/");
});
