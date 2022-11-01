let ciudad = document.getElementById("Ciudad");
let danger = document.getElementById("danger");
let warning = document.getElementById("warning");
let success = document.getElementById("success");

function addNewCityToLocalStorage(){

    let newCity = formatearString(ciudad);
    
    ocultar(danger);
    ocultar(warning);
    ocultar(success);

    // Verifico que el campo Ciudad este cargado
    if (newCity != ""){
        // Obtengo la lista de ciudades 
        let cities = getCitiesFromLocalStorage();
        // Verifico si la ciudad ya esta incluida
        if(!cities.includes(newCity)){
            // Cargar los datos en el localStorage, en caso de error muestro un mensaje 
            try{
                if(consultarAPI(newCity)){
                    cities.push(newCity);
                    localStorage.setItem("CITIES", JSON.stringify(cities));
                    mostrar(success);
                    success.innerHTML = "Ciudad agregada con exito";
                }else{
                    throw new Error();
                }
            }catch{
                mostrar(danger);
                danger.innerHTML = "Error: La ciudad ingresada no se encuetra en la API o se produjo un error al consultar";
            } 
        }else{
            mostrar(warning);
            warning.innerHTML = "La ciudad ingresada ya se encuentra almacenada";
        }

    }else{
        mostrar(warning);
        warning.innerHTML = "Debe completar el campo";
    }
}   

function formatearString(ciudad){
    return ciudad.value.charAt(0).toUpperCase() + ciudad.value.slice(1);
}

function borrarDatos(){
    localStorage.clear();
    alert("LocalStorage borrado!");
}

