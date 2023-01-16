const btnSubmit = document.querySelector(".btn-primary");
const descriptionSelector = document.querySelector('#descricao');
descriptionSelector.setAttribute("maxlength", "300");
descriptionSelector.setAttribute("style", "resize:none");

btnSubmit.addEventListener("click", () => cadastrarEvento());

function fazPost(url, corpo) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-type': "application/json", },
        body: JSON.stringify(corpo),
    })
        .then(() => console.log(JSON.stringify(corpo)))
        .then(() => alert('Evento Cadastrado com Sucesso'))
        .then(() => window.location.href = "admin.html")
        .catch((error) => alert('Não foi possível realizar o cadastro, tente novamente'))

}


function cadastrarEvento() {
    event.preventDefault()
    const url = "soundgarden-api.deta.dev/events";
    const nameSelector = document.querySelector('#nome').value;
    const attractionsSelector = document.querySelector('#atracoes').value.split(", ");
    const descriptionSelector = document.querySelector('#descricao').value;
    const dateSelector = document.querySelector('#data').value;
    const capacitySelector = document.querySelector('#lotacao').value;



    corpo =
    {
        "name": nameSelector,
        "poster": "https://i.imgur.com/fQHuZuv.png",
        "attractions": attractionsSelector,
        "description": descriptionSelector,
        "scheduled": dateSelector,
        "number_tickets": capacitySelector
    }
    fazPost(url, corpo);
}
