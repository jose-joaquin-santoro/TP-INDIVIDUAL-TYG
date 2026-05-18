var frases = [
    {
        texto: "Las personas valorarian mas su silencio si supieran el peso de sus palabras.",
        clase: "sombra-uno"
    },
    {
        texto: "Quien no conoce el dolor no puede entender la verdadera paz.",
        clase: "sombra-dos"
    },
    {
        texto: "Las personas viven atadas a lo que aceptan como verdad.",
        clase: "sombra-tres"
    }
];

var apis = {
    akatsuki: {
        titulo: "Akatsuki",
        url: "https://dattebayo-api.onrender.com/akatsuki?page=1&limit=44",
        tipo: "akatsuki"
    },
    bijuus: {
        titulo: "Bijuus",
        url: "https://dattebayo-api.onrender.com/tailed-beasts?page=1&limit=10",
        tipo: "bijuus"
    }
};

window.onload = function() {
    mostrarFraseAleatoria();
    prepararMenu();
};

function mostrarFraseAleatoria() {
    var indice = Math.floor(Math.random() * frases.length);
    var fraseElegida = frases[indice];
    var elemento = document.getElementById("frase-inicio");

    elemento.innerHTML = fraseElegida.texto;
    elemento.className = "frase " + fraseElegida.clase;
}

function prepararMenu() {
    var linkAkatsuki = document.getElementById("link-akatsuki");
    var linkBijuus = document.getElementById("link-bijuus");

    linkAkatsuki.onclick = function() {
        consumirApi("akatsuki");
        return false;
    };

    linkBijuus.onclick = function() {
        consumirApi("bijuus");
        return false;
    };
}

function consumirApi(nombreApi) {
    var api = apis[nombreApi];
    var contenido = document.getElementById("contenido-principal");

    contenido.innerHTML = "<section class='resultado'><h2>" + api.titulo + "</h2><p>Cargando informacion...</p></section>";

    var solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
        if (solicitud.readyState == 4 && solicitud.status == 200) {
            var datos = JSON.parse(solicitud.responseText);

            if (api.tipo == "akatsuki") {
                mostrarDatos(api, datos.akatsuki);
            }

            if (api.tipo == "bijuus") {
                mostrarDatos(api, datos["tailed-beasts"]);
            }
        }

        if (solicitud.readyState == 4 && solicitud.status != 200) {
            contenido.innerHTML = "<section class='resultado'><h2>Error</h2><p>No se pudo obtener la informacion solicitada.</p></section>";
        }
    };

    solicitud.open("GET", api.url, true);
    solicitud.send();
}

function mostrarDatos(api, datos) {
    var contenido = document.getElementById("contenido-principal");
    var html = "<section class='resultado'><h2>" + api.titulo + "</h2>";

    if (api.tipo == "akatsuki" || api.tipo == "bijuus") {
        html += "<div class='tarjetas'>";

        for (var i = 0; i < datos.length; i++) {
            var imagen = "";

            if (datos[i].images && datos[i].images.length > 0) {
                imagen = datos[i].images[0];
            }

            html += "<article class='tarjeta'>";

            if (imagen != "") {
                html += "<img class='imagen-tarjeta' src='" + imagen + "' alt='" + datos[i].name + "'>";
            }

            html += "<h3>" + datos[i].name + "</h3>";
            html += "</article>";
        }

        html += "</div>";
    }

    html += "</section>";
    contenido.innerHTML = html;
}
