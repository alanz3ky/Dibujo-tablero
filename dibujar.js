/////////////////////////////////////////////////////////
// Función getId -> Para ahorrarnos el tener que escribir
// document.getElementById("elemento") todo el rato.
/////////////////////////////////////////////////////////
const getId = function (elemento) {
  return document.getElementById(elemento);
};

//////////////////////////////////////////////////////////////////
// función iniciar -- hace las llamadas al dibujo del tablero
// y además asigna los eventos de click correspondientes.
//////////////////////////////////////////////////////////////////
const iniciar = function () {
  // Dibujamos la tabla dónde pintaremos con el ratón
  dibujarTableroDibujo();
  //Asociamos el evento a la paleta de coleres para seleccinar el que se clicka
  crearEventosColorPaleta();
  //Al tablero le asignamos los eventos click y mouseover
  crearEventosTablero();
};
//////////////////////////////////////////////////////////////////
// función crearEventosTablero -- Asociamos el evento a la paleta
//de coleres para seleccinar el que se clicka.
//////////////////////////////////////////////////////////////////
const crearEventosTablero = function () {
  var tablero = getId("tablero");
  var celdasTablero = tablero.getElementsByTagName("td");
  //spread operator
  const celdasArray = [...celdasTablero];
  celdasArray.forEach((item) => {
    // Al tablero de dibujo le asignamos el evento de click para activar o desactivar la pintura..
    item.addEventListener("click", activarPintura, false);
    // Al tablero de dibujo le asignamos los eventos de mouseOver para pintar.
    item.addEventListener("mouseover", pintar);
  });
};
//////////////////////////////////////////////////////////////////
// función crearEventosColorPaleta -- Al tablero le asignamos los eventos click y mouseover
//////////////////////////////////////////////////////////////////
const crearEventosColorPaleta = function () {
  var tablaColores = getId("paleta");
  var celdasColores = tablaColores.getElementsByTagName("td");
  //spread operator
  const celdasColoresArray = [...celdasColores];
  celdasColoresArray.forEach((item) => {
    // A la tabla de colores le asignamos el evento de click para seleccionar un color.
    item.addEventListener("click", detectarColorPaleta, false);
  });

  // Ponemos como color activo de pintura el color de la primera celda.
  colorActivo = celdasColores[0].classList[0];
};

//////////////////////////////////////////////////////////////////
// función dibujarTableroDibujo -- realiza el dibujo del tablero
// y además asigna los eventos de click correspondientes.
//////////////////////////////////////////////////////////////////
const dibujarTableroDibujo = function dibujarTableroDibujo() {
  // Vamos creando la estructura de la tabla empleando el árbol de nodos del DOM.
  // Creamos primero el elemento table con todos sus atributos.
  var nuevaTabla = document.createElement("table");
  nuevaTabla.setAttribute("id", "tablero");
  nuevaTabla.setAttribute("class", "tablerodibujo");

  var tituloTabla = document.createElement("caption");
  var contenidoTitulo = document.createTextNode(
    "Haga CLICK en cualquier celda para activar/desactivar el Pincel"
  );
  tituloTabla.appendChild(contenidoTitulo);
  nuevaTabla.appendChild(tituloTabla);

  // Ahora crearemos las filas de la tabla y las celdas dentro de cada fila.
  for (var i = 1; i <= 30; i++) {
    var nuevaFila = document.createElement("tr");
    for (var j = 1; j <= 30; j++) {
      var nuevaCelda = document.createElement("td");
      nuevaFila.appendChild(nuevaCelda);
    }
    nuevaTabla.appendChild(nuevaFila);
  }

  // Una vez que ya tenemos la tabla completamente creada la metemos dentro del DIV zonadibujo.
  getId("zonadibujo").appendChild(nuevaTabla);
};

///////////////////////////////////////////////////////////////
// función detectarColorPaleta -- nos permite seleccionar un
// color de pincel en la paleta de colores.
///////////////////////////////////////////////////////////////
const detectarColorPaleta = function () {
  // Desactivamos la clase seleccionado sobre todas las celdas por si había alguna previamente seleccionada
  // Fijarse que si escribimos la fila con saltos de línea al final de cada fila
  // Tendremos un childNode adicional de tipo texto que contendrá un "\n"
  // De esta forma tenemos ahora 5 nodos hijo de TR
  const parentNode = this.parentNode;
  // Iterar sobre los nodos hijos y remover la clase "seleccionado" solo si el nodo es de tipo texto
  parentNode.childNodes.forEach((node) => {
    // Verificar si el nodo es de tipo texto
    if (node.nodeType === Node.ELEMENT_NODE)
      // Remover la clase "seleccionado"
      node.classList.remove("seleccionado");
  });
  colorActivo = this.classList[0];
  this.classList.add("seleccionado");
};

///////////////////////////////////////////////////////////////
// función activarPintura -- nos permite seleccionar un
// color y cambiar el mensaje del pincel activado/desactivado
///////////////////////////////////////////////////////////////
const activarPintura = function (evento) {
  if (pintarActivado) {
    getId("pincel").childNodes[0].nodeValue = "PINCEL DESACTIVADO...";
    pintarActivado = false;
  } else {
    getId("pincel").childNodes[0].nodeValue = "PINCEL ACTIVADO...";
    pintarActivado = true;
    // Pintamos dónde hemos hecho click, ya que el resto de cuadros serán pintados
    // cuando se produzca el mouseover.
    evento.target.className = colorActivo;
  }
};

/////////////////////////////////////////////////////////
// función pintar -- nos permite pintar sobre el tablero
/////////////////////////////////////////////////////////
const pintar = function (evento) {
  if (pintarActivado) {
    // Eliminamos las clases previas asignadas a ese cuadro.
    evento.target.classList = "";
    // Pintamos con el color que está activo.
    evento.target.classList.add(colorActivo);
  }
};

/////////////////////////////////////////////////////////
// Comienzo de la ejecución del código de JavaScript.
/////////////////////////////////////////////////////////
// Variables globales de la aplicación.
var colorActivo = "";
var pintarActivado = false;
// Cuando el documento esté cargado llamamos a la función iniciar().
/////////////////////////////////////////////////////////
iniciar();
/////////////////////////////////////////////////////////
