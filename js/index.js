const criarEstruturaEvento = (
    nomeEvento,
    dataEvento,
    atracaoEvento,
    descricaoEvento,
    indexBotao,
    idEvento
) => {
    const divEventos = document.querySelector("body > main > section:nth-child(2) > div.container.d-flex.justify-content-center.align-items-center")
    const eventoArticle = document.createElement("article")
    eventoArticle.setAttribute("class", "evento card p-5 m-3")
    divEventos.appendChild(eventoArticle)

    const nomeEventoH2 = document.createElement("h2")
    nomeEventoH2.innerHTML = `${nomeEvento} - ${formatarData(dataEvento)}`
    eventoArticle.appendChild(nomeEventoH2)

    const atracaoEventoH4 = document.createElement("h4")
    atracaoEventoH4.innerHTML = `${atracaoEvento}`
    eventoArticle.appendChild(atracaoEventoH4)

    const descricaoEventoH2 = document.createElement("p")
    descricaoEventoH2.innerHTML = `${descricaoEvento}`
    eventoArticle.appendChild(descricaoEventoH2)

    const botaoEvento = document.createElement("a")
    botaoEvento.setAttribute("class", "btn btn-primary")
    botaoEvento.setAttribute("id", `botao-reservar${indexBotao}`)
    botaoEvento.setAttribute("idevento", `${idEvento}`)
    botaoEvento.setAttribute("nomeevento", `${nomeEvento}`)
    botaoEvento.innerHTML = `reservar ingresso`
    eventoArticle.appendChild(botaoEvento)
}

const listarEventosFazerReserva = async() => {

    await fetch("soundgarden-api.deta.dev/events")
        .then(response => response.text())
        .then((data) => JSON.parse(data))
        .then(listaDeEventos => {

            listaDeEventos.sort((a, b) => {
                return new Date(a.scheduled) - new Date(b.scheduled);
            });


            const eventosFuturos = listaDeEventos.filter((data) => {
                const agora = new Date();
                return new Date(data.scheduled) > agora
            });

            for (let index = 0; index < 3; index++) {
                const evento = eventosFuturos[index];
                criarEstruturaEvento(
                    nomeEvento = evento.name,
                    dataEvento = evento.scheduled,
                    atracaoEvento = evento.attractions,
                    descricaoEvento = evento.description,
                    indexBotao = index,
                    idEvento = evento._id

                )
                const eventosResumo = {
                    id: evento._id,
                    nome: evento.name,
                    data: evento.scheduled,
                    atracao: evento.attractions,
                    data: evento.scheduled,
                    descricao: evento.description
                }
                console.log(eventosResumo);
            }
            modalReservarIngresso()
        })
        .catch(error => console.log('error', error));

    const formReservarIngresso = document.querySelector("#reserva");

    document.getElementById("botao-reservar0")
        .addEventListener("click", (event) => {
            const botaoAlvo = event.target
            const idevento = botaoAlvo.getAttribute("idevento")
            document.querySelector("#id").value = idevento;
        })

    document.getElementById("botao-reservar1")
        .addEventListener("click", (event) => {
            const botaoAlvo = event.target
            const idevento = botaoAlvo.getAttribute("idevento")
            document.querySelector("#id").value = idevento;
        })

    document.getElementById("botao-reservar2")
        .addEventListener("click", (event) => {
            const botaoAlvo = event.target
            const idevento = botaoAlvo.getAttribute("idevento")

            document.querySelector("#id").value = idevento;
        })

    const botaoConfirmar = document.querySelector("#myModal > div > div > div.modal-footer > button.btn.btn-primary")
    botaoConfirmar.addEventListener("click", (event) => {
        event.preventDefault();
        const corpoPost = {
            owner_name: formReservarIngresso[2].value,
            owner_email: formReservarIngresso[3].value,
            number_tickets: formReservarIngresso[1].value,
            event_id: formReservarIngresso[0].value
        }

        fetch(`soundgarden-api.deta.dev/events`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(corpoPost),
            })
            .then(() => {
                alert("Parabéns, sua reserva está concluída!");
            })
            .catch(error => console.log('error', error));
    })
}
listarEventosFazerReserva()