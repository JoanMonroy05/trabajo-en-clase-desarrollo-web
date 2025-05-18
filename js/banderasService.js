document.querySelector('#banderas').addEventListener('click', () => banderas());

function banderas() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de banderas</h5>'
    const URL = 'https://restcountries.com/v3.1/all';
    fetch(URL)
    .then(res => res.json().then(data => ({status: res.status, data})))
    .then(result => mostrarBanderas(result))
}

function mostrarBanderas(result) {
    if (result.status === 200) {
        result.data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        document.getElementById('info').innerHTML = '';
        result.data.forEach(bandera => {
            const card = cardBandera(bandera);
            document.getElementById('info').appendChild(card);
        });
        document.getElementById('info').classList = 'd-flex flex-wrap justify-content-center gap-3 p-3';
    } else {
        document.getElementById('cardHeader').innerHTML = '<h5>No hay banderas en la db</h5>'
    }
}

function cardBandera(bandera) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';
    card.classList.add('flex-grow-1')

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = bandera.flags.png;
    img.alt = `Bandera de ${bandera.flags.png}`;
    img.style.width = '100%';
    img.style.height = '200px';
    img.style.objectFit = 'contain';
    img.style.objectPosition = 'center';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `${bandera.name.common}`;

    const text1 = document.createElement('p');
    text1.className = 'card-text';
    text1.textContent = `Capital: ${bandera.capital}`;

    const text2 = document.createElement('p');
    text2.className = 'card-text';
    text2.textContent = `Continente: ${bandera.continents}`;

    const button = document.createElement('a');
    button.className = 'btn btn-primary';
    button.href = '#';
    button.textContent = 'Mas Información';

    cardBody.appendChild(title);
    cardBody.appendChild(text1);
    cardBody.appendChild(text2);
    cardBody.appendChild(button);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
}


