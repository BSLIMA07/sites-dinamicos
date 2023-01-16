async function getEvents() {

    try {
        const response = await fetch('soundgarden-api.deta.dev/events');

        const data = await response.json();

        createElementsFromEvents(data);

        return data;
    } catch (error) {
        console.error(error);
    }
}
getEvents();

async function getEventsToModal(id) {
    const bookingList = await fetch('soundgarden-api.deta.dev/bookings/${id}')
    .then(data => data.json())
    .catch(error => console.log(error))

    if (bookingList.length < 1) {
        const thead = document.querySelector('#thead-modal')
        thead.setAttribute('style', 'display:none')
        document.querySelector('#tbody-modal').innerHTML = "Não há reservas para esse evento"
        return;
    } else {
        const bookingListLength = bookingList.length
        createListToModal(bookingList, bookingListLength);
    }
}

async function createElementsFromEvents(data) {
    const tableSelector = document.querySelector('.table');
    const tableBodySelector = tableSelector.childNodes[3];
    data.forEach((event, index) => {
        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'row');
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        firstTdElement.innerText = new Date(event.scheduled).toLocaleString("pt-br")

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.name;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.attractions.join(', ');
        console.log(window.screen.width)
        if (window.screen.width <= 480) {
            thirdTdElement.setAttribute('style', 'display:none')
        }

        const fourthTdElement = document.createElement('td');

        const firstAnchor = document.createElement('a');
        firstAnchor.innerText = "ver reservas";
        firstAnchor.classList.add('btn');
        firstAnchor.classList.add('btn-dark');
        firstAnchor.setAttribute('data', event._id);
        firstAnchor.addEventListener('click', () => {

            openAndCloseModal();
            getEventsToModal(event._id);
        })


        const secondAnchor = document.createElement('a');
        secondAnchor.innerText = "editar";
        secondAnchor.classList.add('btn');
        secondAnchor.classList.add('btn-secondary');
        secondAnchor.href = 'editar-evento.html?id=' + event._id;

        const thirdAnchor = document.createElement('a');
        thirdAnchor.innerText = "excluir";
        thirdAnchor.classList.add('btn');
        thirdAnchor.classList.add('btn-danger');
        thirdAnchor.href = 'excluir-evento.html?id=' + event._id;

        fourthTdElement.append(firstAnchor, secondAnchor, thirdAnchor);


        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, fourthTdElement);
        tableBodySelector.appendChild(trElement);

    })
}

async function openAndCloseModal() {
    const modal = document.querySelector(".myModal");
    modal.setAttribute('style', 'display:block')

    const span = document.getElementsByClassName("close")[0]; 
    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

async function createListToModal(data, dataLength) {
    const thead = document.querySelector('#thead-modal')
    thead.setAttribute('style', 'display:deafult')
    document.querySelector('#tbody-modal').innerHTML = null

    for (let index = 0; index < dataLength; index++) {
        const dataObject = data[index]
        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'row')

        const nameTdElement = document.createElement('td');
        nameTdElement.innerText = dataObject.owner_name;

        const emailTdElement = document.createElement('td');
        emailTdElement.innerText = dataObject.owner_email;

        const ticketsTdElement = document.createElement('td');
        ticketsTdElement.innerText = dataObject.number_tickets;

        const tableBodyModalSelector = document.querySelector('#tbody-modal')
        tableBodyModalSelector.appendChild(trElement);
        trElement.append(thElement, nameTdElement, emailTdElement, ticketsTdElement);

    }
}