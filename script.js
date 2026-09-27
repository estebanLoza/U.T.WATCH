// Usamos querySelector indicando el punto (.) de la clase
const hamMenu = document.querySelector(".fa-bars");
const exitMenu = document.querySelector(".fa-x");
const boxMenu = document.getElementById("box-menu");

// Evento para abrir el menú
hamMenu.addEventListener("click", function () {
  boxMenu.classList.add("activate");
  hamMenu.style.display = "none"; // ocultamos el ícono mientras el menú está abierto
});

// Evento para cerrar el menú
exitMenu.addEventListener("click", function () {
  boxMenu.classList.remove("activate");
  hamMenu.style.display = "flex"; // lo volvemos a mostrar
});

// Evento para cerrar el menú al hacer clic en cualquier opción
const menuLinks = document.querySelectorAll(".btn-box-menu");

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    boxMenu.classList.remove("activate");
    hamMenu.style.display = "flex";
  });
});

// Ocultar/mostrar el ícono de hamburguesa + cambio de color al deslizar
let prevScrollpos = window.pageYOffset;

window.addEventListener("scroll", function () {
  let currentScrollPos = window.pageYOffset;

  // Mostrar u ocultar según dirección del scroll
  if (prevScrollpos > currentScrollPos) {
    hamMenu.style.top = "20px";
  } else {
    hamMenu.style.top = "-50px";
  }

  // Color/fondo: si estás en el tope (posición original), vuelve al CSS.
  // Si ya deslizaste, usa el estilo "activo".
  if (currentScrollPos === 0) {
    hamMenu.style.removeProperty("color");
    hamMenu.style.removeProperty("background-color");
    hamMenu.style.removeProperty("width");
    hamMenu.style.removeProperty("height");
    hamMenu.style.removeProperty("justify-content");
    hamMenu.style.removeProperty("align-items");
    hamMenu.style.removeProperty("z-index");
    // Nota: "display" NO se toca aquí a propósito;
    // ese lo controla el evento de abrir/cerrar el menú.
  } else {
    hamMenu.style.color = "#2d4354";
    hamMenu.style.backgroundColor = "#CFCFCF";
    hamMenu.style.width = "32px";
    hamMenu.style.height = "35px";
    hamMenu.style.justifyContent = "center";
    hamMenu.style.alignItems = "center";
    hamMenu.style.zIndex = "1000";
    // display se queda como está: "flex" (por CSS o por el click)
  }

  prevScrollpos = currentScrollPos;
});

// ******* FUNCIÓN PARA HISTORIA

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// ******* GALERÍA - Ver más (mobile)

function initGaleriaVerMas() {
  const columnas = Array.from(
    document.querySelectorAll("#sectionGaleria .column"),
  ).map((col) => Array.from(col.querySelectorAll("img")));

  const galeriaImgs = document.querySelectorAll("#sectionGaleria .row img");
  const btnVerMas = document.getElementById("btn-ver-mas");
  const maxMobile = 3;
  const maxTablet = 7;
  const breakpointMobile = 600;
  const breakpointTablet = 800;

  let expandido = false; // controla en qué estado está el botón

  function mostrarLimitadas(limite) {
    galeriaImgs.forEach((img) => img.classList.add("img-oculta"));

    let mostradas = 0;
    let localIndex = 0;
    let quedanImagenes = true;

    while (mostradas < limite && quedanImagenes) {
      quedanImagenes = false;
      for (const colImgs of columnas) {
        if (mostradas >= limite) break;
        if (localIndex < colImgs.length) {
          colImgs[localIndex].classList.remove("img-oculta");
          mostradas++;
          quedanImagenes = true;
        }
      }
      localIndex++;
    }
  }

  function actualizarGaleria() {
    const anchoActual = window.innerWidth;

    let limite;
    if (anchoActual <= breakpointMobile) {
      limite = maxMobile;
    } else if (anchoActual <= breakpointTablet) {
      limite = maxTablet;
    } else {
      limite = galeriaImgs.length;
    }

    if (galeriaImgs.length > limite) {
      if (expandido) {
        galeriaImgs.forEach((img) => img.classList.remove("img-oculta"));
      } else {
        mostrarLimitadas(limite);
      }
      btnVerMas.style.display = "block";
      btnVerMas.textContent = expandido ? "Ver menos" : "Ver más";
    } else {
      galeriaImgs.forEach((img) => img.classList.remove("img-oculta"));
      btnVerMas.style.display = "none";
    }
  }

  btnVerMas.addEventListener("click", function () {
    expandido = !expandido; // alterna el estado
    actualizarGaleria();
  });

  actualizarGaleria();
  window.addEventListener("resize", actualizarGaleria);
}

initGaleriaVerMas();
