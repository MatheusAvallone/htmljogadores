async function login(username, password) {
    const response = await fetch("https://localhost:7015/login", { // Substitua pela sua API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "login": username, "password": password }),
        credentials: "include" // Envia cookies se necessário
    });

    console.log(response.status)

    console.log(!response.ok)
    // Verifica se a resposta foi bem-sucedida antes de tentar usar os dados
    if (!response.ok) {
        console.log("Login falhou. Verifique suas credenciais. sdadsasdd");
        alert("Falha no login. Verifique suas credenciais.");
        return; // Retorna se a resposta não for ok
    }

    // Espera a resposta JSON ser convertida
    const data = await response.json();
    
    console.log(data.token);
    // Salva o JWT no cookie
    setTokenCookie(data.token);

    window.location.href = "PaginaPrincipal.html"; // Redireciona para outra página

    // Alerta de sucesso
    alert("Login bem-sucedido!");

    // Retorna os dados ou o token se necessário
    return data;
}

function getTokenCookie() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "jwt") {
            return value;
        }
    }
    return null;
}

function setTokenCookie(token) {
    document.cookie = `jwt=${token}; Path=/; Secure; HttpOnly; SameSite=Strict;`;
}

function deleteTokenCookie() {
    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}