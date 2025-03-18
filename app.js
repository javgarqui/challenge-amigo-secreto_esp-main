// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Arreglo global para almacenar los nombres de los amigos.
let amigos = [];

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Funciones reutilizables

// Limpia el campo de entrada y reposiciona el cursor.
function limpiarInput(input) {
    input.value = ""; // Limpia el contenido del campo de entrada.
    input.focus(); // Coloca el cursor en el campo para facilitar la interacción del usuario.
}

// Crea y agrega un elemento <li> a una lista <ul>.
function agregarElementoALista(lista, texto) {
    const item = document.createElement("li"); // Crea un nuevo elemento <li>.
    item.textContent = texto; // Asigna el texto proporcionado al elemento.
    lista.appendChild(item); // Añade el elemento <li> a la lista <ul>.
}

// Función para permitir solo letras en el campo de entrada.
function validarSoloLetras(input) {
    input.value = input.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, ""); 
    // Reemplaza todo lo que no sea letras (incluyendo caracteres con tilde y espacio).
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Funciones para el manejo de la lista de amigos

// Captura el nombre del campo de entrada, valida y lo agrega al arreglo `amigos`.
function agregarAmigo() { 
    let inputAmigo = document.getElementById("amigos"); // Obtiene el elemento del input por ID.
    let nombreAmigo = inputAmigo.value.trim(); // Captura el contenido ingresado en el input y elimina espacios adicionales.

    // Validar si el campo está vacío.
    if (!nombreAmigo) {
        alert("Debes ingresar un nombre"); // Muestra una alerta al usuario.
        return; // Sale de la función.
    }

    // Convertir el texto ingresado a "Primera Letra Mayúscula".
    nombreAmigo = nombreAmigo.charAt(0).toUpperCase() + nombreAmigo.slice(1).toLowerCase();

    // Validar si el nombre ya existe en el arreglo.
    if (amigos.includes(nombreAmigo)) {
        alert("Este nombre ya existe..."); // Notifica al usuario si el nombre es duplicado.
        limpiarInput(inputAmigo); // Limpia el campo de entrada.
        return; // Sale de la función.
    }

    amigos.push(nombreAmigo); // Agrega el nombre al arreglo `amigos`.
    limpiarInput(inputAmigo); // Limpia el campo de entrada.
    renderizarAmigos(); // Actualiza la lista visible en la interfaz.

    // Limpia el mensaje del amigo sorteado.
    document.getElementById("resultado").innerHTML = ""; // Vacía el contenedor del resultado.
}

// Actualiza visualmente la lista de amigos en la página.
function renderizarAmigos() { 
    let listaAmigos = document.getElementById("listaAmigos"); // Obtiene el elemento <ul> por ID.
    listaAmigos.innerHTML = ""; // Limpia la lista para evitar duplicados.

    // Itera sobre cada amigo en el arreglo y lo agrega a la lista visible.
    amigos.forEach((nombre) => {
        agregarElementoALista(listaAmigos, nombre);
    });

    // Mejora la accesibilidad para usuarios con tecnologías asistidas.
    listaAmigos.setAttribute("aria-live", "polite"); // Notifica cambios de manera no intrusiva.
    listaAmigos.setAttribute("role", "list"); // Define la lista semánticamente como un "list".
}

// Limpia la lista de amigos y actualiza la interfaz.
function limpiarLista() {
    amigos = []; // Vacía el arreglo global de nombres.
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpia la lista visible en la interfaz.
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpia el mensaje del resultado, si existe alguno.
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Funciones para la experiencia interactiva (sorteo y animaciones)

// Realiza el sorteo de un amigo al azar y muestra el resultado en la interfaz.
function sortearAmigo() {
    // Valida si hay menos de 3 nombres en el arreglo.
    if (amigos.length < 3) {
        alert("Debes agregar al menos 3 nombres antes de sortear."); // Notifica al usuario.
        return; // Sale de la función.
    }

    // Selecciona un amigo aleatorio del arreglo.
    const amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    const resultado = document.getElementById("resultado"); // Obtiene el contenedor del resultado.

    // Muestra el resultado del sorteo.
    resultado.innerHTML = `<li class="highlight">🎉 El amigo sorteado es: ${amigoSorteado} 🎉</li>`;
    resultado.setAttribute("aria-live", "assertive"); // Notifica el cambio de forma inmediata.
    resultado.setAttribute("role", "alert"); // Marca el mensaje como importante.
    lanzarGlobos();

    // Limpia la lista de amigos tras realizar el sorteo.
    const limpiarLista = document.getElementById("listaAmigos");
    limpiarLista.innerHTML = ""; // Limpia la lista visible.
    amigos = []; // Vacía el arreglo global `amigos`.
}

// Genera una animación de globos en la pantalla.
function lanzarGlobos() {
    for (let i = 0; i < 20; i++) { // Genera 20 globos
        const globo = document.createElement('div');
        globo.className = 'globo';
        globo.style.left = Math.random() * 100 + 'vw';
        globo.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(globo);

        // Elimina el globo después de la animación.
        setTimeout(() => {
            globo.remove();
        }, 5000);
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Inicialización de eventos

// Agrega un listener al campo de entrada para validar solamente letras.
document.getElementById("amigos").addEventListener("input", function () {
    validarSoloLetras(this); // Llama a la función cada vez que el usuario escribe en el input.
});
