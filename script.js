
const API_URL = "http://localhost:5000/api/profile";

// Authorized Request
async function getProfile() {

    const token = document.getElementById("token").value.trim();
    const result = document.getElementById("result");

    result.innerHTML = "Loading...";

    try {

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        result.innerHTML = `
            <h5 class="text-success">Success!</h5>
            <p>${data.message}</p>
            <p>Name: ${data.user.name}</p>
            <p>Role: ${data.user.role}</p>
        `;

    } catch (error) {

        result.innerHTML = `
            <p class="text-danger">
                Error: ${error.message}
            </p>
        `;

        console.error("API Error:", error);
    }
}

// Unauthorized Request
async function testUnauthorized() {

    document.getElementById("token").value = "wrong-token";

    await getProfile();
}
