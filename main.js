const divPersonajes = document.getElementById("card");
const baseRrl = `https://rickandmortyapi.com/api/character`;

let currentPage = 1;

const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");
const pageInfo = document.getElementById("info-page");

pageInfo.style.color="white";


async function mostrarDatos (page = 1){
    const url = `${baseRrl}?page=${page}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    data.results.forEach(personaje => {
        
        const divContent = document.createElement('div');
        divContent.classList = "card";
        divContent.innerHTML=
        `   <div class="idPersonaje">
                <p>${personaje.id}</p>
            </div>
            <img src="${personaje.image}" alt="" srcset="">
            <div class="card-body">
            
            <h1>${personaje.name} - <span>${personaje.gender}</span></h1>
            <p>${personaje.status}</p>
            
            </div>
        
        `;
        divPersonajes.appendChild(divContent);
    });

    currentPage = page;
    pageInfo.textContent = `Pagina ${currentPage} de ${data.info.pages}`;

    prevBtn.disabled = !data.info.prev;
    nextBtn.disabled = !data.info.next;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        mostrarDatos(currentPage - 1);
    }
});

nextBtn.addEventListener('click', () => {
    mostrarDatos(currentPage + 1);
});

mostrarDatos();

