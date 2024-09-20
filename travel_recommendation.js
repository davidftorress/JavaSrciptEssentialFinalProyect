let data = [];

// Cargar datos del archivo JSON
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(json => {
            data = json;
            console.log('El archivo Json se cargo correctamente');
       
    })
    .catch(error => {
        console.error('Error:', error);
    });
// funciones
function search() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    console.log(input);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const filteredResults = [];

   // Buscar en cada categoría
    data.forEach(category => {
        if (category.countries) {
            category.countries.forEach(country => {
                if (country.name.toLowerCase().includes(input)) {
                    country.cities.forEach(city => {
                        filteredResults.push(city);
                    });
                }
            });
        }
        if (category.temples) {
            category.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(input)) {
                    filteredResults.push(temple);
                }
            });
        }
        if (category.beaches) {
            category.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(input)) {
                    filteredResults.push(beach);
                }
            });
        }
    });

    // Mostrar resultados
    filteredResults.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.description}</p>
        `;
        resultsDiv.appendChild(itemDiv);
    });
}

function clearSearch() {
    document.getElementById('conditionInput').value = '';
    document.getElementById('results').innerHTML = '';
}

