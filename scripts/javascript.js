function loadPage(page){
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;
        })
        .catch(error => console.log("Erro ao carregar a página", error));
}

