//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');

//selector año
const max = new Date().getFullYear();
const min = max - 10;




//generar un objeto para la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',


}




//eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //muestra los autos al  cargar

    //llena las opciones del selector año
    llenarSelect();

});

// event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;


    filtrarAuto();

});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();

});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
    //console.log(datosBusqueda);
});







//funciones  /** muestra el resultado por HTML */
function mostrarAutos(autos) {

    limpiarHtml(); //elimina la informacion del HTML previamente

    //nos vamos a la base db.js en const autos
    autos.forEach(auto => {
        //creamos las constantes
        const { marca, modelo, year, precio, puertas, color, transmision } = auto
        const autoHtml = document.createElement('p');

        autoHtml.textContent = `
        ${marca} ${modelo} - ${year} -Precio ${precio} - ${puertas} puertas - color ${color} - trasmisión ${transmision} 
        
        `;

        //insertar en el Html
        resultado.appendChild(autoHtml);

    })
}

//limpiar HTML

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);

    }
}



//funcion para llenar el selector año
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);

    }
}

//funcion que filtra en base a la busqueda

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca)
    .filter(filtrarYear).filter(filtrarMinimo)
    .filter(filtrarMaximo).filter(filtrarPuerta)
    .filter(filterTransmision). filter(filtrarColor);    /*el autos es nombre de la variable dentro del db.js  */

    //muestra mensaje cuando no  hay resultado
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHtml();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado, intenta con otros términos de busqueda';
    resultado.appendChild(noResultado);
    
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;

}

function filtrarPuerta(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === parseInt(puertas);
    }
    return auto;
    
}

function filterTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
    
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;

    
}





