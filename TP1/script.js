var frases = [
    {
        texto: "La web se construye con estructura, estilo y comportamiento.",
        clase: "sombra-uno"
    },
    {
        texto: "HTML organiza el contenido y CSS le da presentacion.",
        clase: "sombra-dos"
    },
    {
        texto: "JavaScript permite que una pagina responda al usuario.",
        clase: "sombra-tres"
    }
];

var apis = {
    usuarios: {
        titulo: "Usuarios",
        url: "https://randomuser.me/api/?results=6&nat=es",
        tipo: "usuarios"
    },
    publicaciones: {
        titulo: "Publicaciones",
        url: "https://jsonplaceholder.typicode.com/posts?_limit=6",
        tipo: "publicaciones"
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
    var links = document.querySelectorAll(".menu a");

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(evento) {
            evento.preventDefault();
            var api = this.getAttribute("href").replace("#", "");
            consumirApi(api);
        };
    }
}

function consumirApi(nombreApi) {
    var api = apis[nombreApi];
    var contenido = document.getElementById("contenido-principal");

    contenido.innerHTML = "<section class='resultado'><h2>" + api.titulo + "</h2><p>Cargando informacion...</p></section>";

    var solicitud = new XMLHttpRequest();
    solicitud.onreadystatechange = function() {
        if (solicitud.readyState == 4 && solicitud.status == 200) {
            var datos = JSON.parse(solicitud.responseText);
            if (api.tipo == "usuarios") {
                mostrarDatos(api, datos.results);
            } else {
                mostrarDatos(api, datos);
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

    if (api.tipo == "usuarios") {
        html += "<div class='tarjetas'>";
        for (var i = 0; i < datos.length; i++) {
            html += "<article class='tarjeta'>";
            html += "<h3>" + datos[i].name.first + " " + datos[i].name.last + "</h3>";
            html += "<p><strong>Usuario:</strong> " + datos[i].login.username + "</p>";
            html += "<p><strong>Email:</strong> " + datos[i].email + "</p>";
            html += "<p><strong>Ciudad:</strong> " + datos[i].location.city + "</p>";
            html += "</article>";
        }
        html += "</div>";
    }

    if (api.tipo == "publicaciones") {
        html += "<div class='tarjetas'>";
        for (var j = 0; j < datos.length; j++) {
            html += "<article class='tarjeta'>";
            html += "<h3>" + datos[j].title + "</h3>";
            html += "<p>" + datos[j].body + "</p>";
            html += "</article>";
        }
        html += "</div>";
    }

    html += "</section>";
    contenido.innerHTML = html;
}
