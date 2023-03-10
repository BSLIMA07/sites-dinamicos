const formSelector = document.querySelector('#form');
const nameSelector = document.querySelector('#nome');
const bannerSelector = document.querySelector('#banner');
const attractionsSelector = document.querySelector('#atracoes');
const descriptionSelector = document.querySelector('#descricao');
const dateSelector = document.querySelector('#data');
const capacitySelector = document.querySelector('#lotacao');

const urlObject = new URLSearchParams(window.location.search);
descriptionSelector.setAttribute("style", "resize:none");
descriptionSelector.setAttribute("maxlength", "300");


function InputValues(data) {
    nameSelector.value = data.name;
    bannerSelector.value = data.poster;
    attractionsSelector.value = data.attractions.join(', ');
    descriptionSelector.value = data.description;
    dateSelector.value = data.scheduled.substring(0, 16);
    capacitySelector.value = data.number_tickets;
}

fetch('soundgarden-api.deta.dev/events' + urlObject.get('id'), { "method": "GET" }).then(response => response.json()).then(data => InputValues(data)).catch(error => console.error(error));


formSelector.addEventListener('submit', event => {
    event.preventDefault();

    const body = {
        "name": nameSelector.value,
        "attractions": attractionsSelector.value.split(', '),
        "poster": bannerSelector.value,
        "description": descriptionSelector.value,
        "scheduled": dateSelector.value,
        "number_tickets": capacitySelector.value
    }

    fetch('soundgarden-api.deta.dev/events' + urlObject.get('id'), {
            "method": "PUT",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify(body)
        }).then(response => console.log(response))
        .then(() => alert("Evento editado com Sucesso"))
        .then(() => window.location.href = "admin.html")
        .catch(error => console.error(error));

});