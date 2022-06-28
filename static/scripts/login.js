loading = false;

async function onLoginSubmit(event) {
    event.preventDefault();

    if(loading) return;
    loading = true;
    document.getElementById("loading").classList.remove("hidden");

    let identifier = document.getElementById("identifier").value;
    let password = document.getElementById("password").value;

    try {
        let response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password }),
        });

        let data = await response.json();

        if(data.success === true) {
            showError(null);

            localStorage.setItem("token", data.data.token);
            document.cookie = `token=${data.data.token}`;

            window.location = sessionStorage.getItem("redirect") || "/files";
            sessionStorage.removeItem("redirect");
        } else {
            showError(data.error);
        }
    } catch(err) {
        console.error(err);
        showError(err.message);
    } finally {
        loading = false;
        document.getElementById("loading").classList.add("hidden");
    }
}

function showError(message) {
    let box = document.getElementById("error");

    if(message == null) {
        box.classList.add("hidden");
    } else {
        box.classList.remove("hidden");
        box.innerText = message;
    }
}