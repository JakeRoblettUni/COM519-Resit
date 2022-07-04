loading = false;

async function onSubmit(event) {
    event.preventDefault();

    if (loading) return;
    loading = true;
    document.getElementById("loading").classList.remove("hidden");

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    try {
        let response = await fetch(`/api/auth/me`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email }),
        });

        let data = await response.json();

        if (data.success === true) {
            showError(null);
            window.location.reload();
        } else {
            showError(data.error);
        }
    } catch (err) {
        console.error(err);
        showError(err.message);
    } finally {
        loading = false;
        document.getElementById("loading").classList.add("hidden");
    }
}

function showError(message) {
    let box = document.getElementById("error");

    if (message == null) {
        box.classList.add("hidden");
    } else {
        box.classList.remove("hidden");
        box.innerText = message;
    }
}