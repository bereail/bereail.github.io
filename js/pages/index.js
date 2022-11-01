
var select = document.getElementById("SeleccionarCiudad");
var alerta = document.getElementById("alerta");

let nombreciudad = document.getElementById("ciudad");
let icono = document.getElementById("icono");
let temperatura = document.getElementById("temp");
let sensacionTermica = document.getElementById("sensacionTermica");
let humedad = document.getElementById("humedad");
let velocViento = document.getElementById("velViento")
let presion = document.getElementById("presion")

window.onload = () =>{
    cargarOpciones();
}

function cargarOpciones(){
    
    let cities = getCitiesFromLocalStorage();
    
    ocultar(alerta);

    if(!cities.length == 0){
        cities.forEach(ciudad =>{
            var opcion = document.createElement('option');
            opcion.text = ciudad;
            opcion.value = ciudad;
            select.appendChild(opcion);
        })
        
    }else{
        mostrar(alerta);
        alerta.innerHTML =  "No hay ciudades cargadas! Si desea agregar una ciudad diríjase a <a href='add-city.html'>Agregar Ciudad</a>";
    }
}

async function consultarClima(){
    let card = document.getElementById("mostrarClima");
    let ciudad = select.value;

    ocultar(card);
    ocultar(alerta);
    alerta.classList.remove("danger");

    try{
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ ciudad +"&appid=77f25957183b7a16a29a8321b9e76893&units=metric&lang=es";
        const respuesta = await fetch(url);
        if(respuesta.ok){
            const data = await respuesta.json();
            JSON.parse(JSON.stringify(data));
            mostrar(card);
            nombreciudad.innerHTML = ciudad;
            icono.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono clima actual">`;
            temperatura.innerHTML = "Temperatura: " + data.main.temp + " °C";
            sensacionTermica.innerHTML = "Sensación Térmica: " + data.main.feels_like + " °C";
            humedad.innerHTML = "Humedad: " + data.main.humidity + "%";
            velocViento.innerHTML = "Velocidad del viento: " + data.wind.speed + " m/s";
            presion.innerHTML =    "Presion: " + data.main.pressure + " hPa"
        }else{
            throw new Error();
        }
    }catch (err){
        mostrar(alerta)
        alerta.classList.add("danger");
        alerta.innerHTML = "Error al cargar datos";
    }

}

