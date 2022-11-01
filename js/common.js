function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES"); 
    if(cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function mostrar(elemento){
    elemento.classList.remove("hide");
}

function ocultar(elemento){
    elemento.classList.add("hide");
}