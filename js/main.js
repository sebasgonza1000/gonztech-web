/* =========================================================
   Comportamiento de la página de Sebastián González
   Regla: la página funciona sin este archivo. Aquí solo van
   comodidades (mejora progresiva, arquitectura.md §1).
   ========================================================= */


/* ---------- MENÚ EN CELULAR (HU-04) ---------- */

// 1. Buscamos las piezas del menú en el HTML
const menuBoton = document.querySelector('.menu-boton');
const menu = document.getElementById('menu');

// Solo seguimos si las dos piezas existen (evita errores si algún día se quita el menú)
if (menuBoton && menu) {
  // 2. Mostramos el botón: estaba escondido con "hidden" porque sin JavaScript no serviría
  menuBoton.hidden = false;

  // Abre o cierra el menú y avisa el estado al lector de pantalla (CA-04.4)
  function cambiarMenu(abrir) {
    menu.classList.toggle('menu--abierto', abrir);
    menuBoton.setAttribute('aria-expanded', String(abrir));
  }

  const estaAbierto = () => menuBoton.getAttribute('aria-expanded') === 'true';

  // 3. Tocar el botón: si está cerrado lo abre, si está abierto lo cierra (CA-04.2, CA-04.3)
  menuBoton.addEventListener('click', () => {
    cambiarMenu(!estaAbierto());
  });

  // 4. Elegir una sección: el navegador baja a la sección y el menú se cierra solo (CA-04.2)
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      cambiarMenu(false);
    }
  });

  // 5. Tecla Escape: cierra el menú y devuelve el foco al botón,
  //    para que quien usa teclado no quede "perdido" (CA-04.3, CA-04.4)
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAbierto()) {
      cambiarMenu(false);
      menuBoton.focus();
    }
  });

  // 6. Tocar fuera del menú (en cualquier otra parte de la página): lo cierra
  document.addEventListener('click', (evento) => {
    const tocoDentro = menu.contains(evento.target) || menuBoton.contains(evento.target);
    if (estaAbierto() && !tocoDentro) {
      cambiarMenu(false);
    }
  });
}


/* ---------- AÑO DEL PIE DE PÁGINA (HU-15) ---------- */
// Pone el año actual para que nadie tenga que cambiarlo a mano cada enero (CA-15.2)
const anio = document.getElementById('anio');
if (anio) {
  anio.textContent = new Date().getFullYear();
}


/* ---------- BOTÓN FLOTANTE DE WHATSAPP (HU-03) ---------- */
// En Contacto y en el pie ya están los datos de contacto, y el botón podría tapar
// campos del formulario (CA-03.2). Por eso ahí se esconde.

const flotante = document.querySelector('.whatsapp-flotante');
const zonasSinFlotante = [document.getElementById('contacto'), document.querySelector('.pie')].filter(Boolean);

// IntersectionObserver "vigila" elementos y avisa cuando entran o salen de la pantalla.
// Si el navegador es muy viejo y no lo tiene, el botón simplemente queda siempre visible.
if (flotante && zonasSinFlotante.length && 'IntersectionObserver' in window) {
  const zonasVisibles = new Set(); // qué zonas se están viendo ahora mismo

  const vigilante = new IntersectionObserver((cambios) => {
    cambios.forEach((cambio) => {
      if (cambio.isIntersecting) {
        zonasVisibles.add(cambio.target);
      } else {
        zonasVisibles.delete(cambio.target);
      }
    });
    // Si alguna zona está en pantalla, se esconde el botón; si no, se muestra
    flotante.classList.toggle('whatsapp-flotante--oculto', zonasVisibles.size > 0);
  }, {
    // rootMargin recorta la "ventana de vigilancia" un 25 % por abajo:
    // la zona cuenta como visible solo cuando ya subió por encima del último cuarto de la pantalla.
    // Así el botón no desaparece apenas se asoma un pedacito de Contacto.
    rootMargin: '0px 0px -25% 0px',
  });

  zonasSinFlotante.forEach((zona) => vigilante.observe(zona));
}


/* ---------- ANIMACIONES AL BAJAR (CC-11) ---------- */
// Lo que está más abajo de la portada aparece suave cuando llega a la pantalla.
// No se anima si la persona pidió "reducir movimiento" o si el navegador no tiene IntersectionObserver:
// en esos casos no se agrega .revelar y todo se ve normal desde el inicio.

const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!sinMovimiento && 'IntersectionObserver' in window) {
  // Qué se revela: títulos, introducciones, tarjetas, compromisos, pasos, proyectos y Sobre mí
  const piezas = document.querySelectorAll(
    'main .seccion:not(.portada) h2, .seccion__intro, .tarjeta, .servicios__mas, .compromiso, ' +
    '.proceso > li, .proyecto, .pantalla, .sobre-mi__emblema'
  );

  const revelador = new IntersectionObserver((cambios) => {
    cambios.forEach((cambio) => {
      if (cambio.isIntersecting) {
        const pieza = cambio.target;
        pieza.classList.add('revelar--visto');
        revelador.unobserve(pieza); // ya apareció: no hace falta seguir vigilándola
        // Al terminar, se quitan las clases y el retraso, para que el efecto al pasar el mouse responda sin demora
        setTimeout(() => {
          pieza.classList.remove('revelar', 'revelar--visto');
          pieza.style.transitionDelay = '';
        }, 1000);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  piezas.forEach((pieza) => {
    // Las tarjetas hermanas aparecen en cascada: cada una 0,08 s después de la anterior (máximo 0,32 s)
    const posicion = Array.from(pieza.parentElement.children).indexOf(pieza);
    pieza.style.transitionDelay = `${Math.min(posicion, 4) * 0.08}s`;
    pieza.classList.add('revelar');
    revelador.observe(pieza);
  });
}


/* ---------- FORMULARIO DE CONTACTO (HU-12 y HU-13) ---------- */
// Capa 2 de validación (arquitectura.md §5): mensajes claros en español y envío sin salir de la página.
// Si este bloque falla, el formulario sigue funcionando con la validación del navegador y gracias.html.

const formulario = document.getElementById('formulario');

if (formulario) {
  // 1. Desde aquí validamos nosotros: se apagan los globos del navegador
  formulario.noValidate = true;

  const campos = {
    nombre: formulario.elements.nombre,
    contacto: formulario.elements.contacto,
    mensaje: formulario.elements.mensaje,
    autorizacion: formulario.elements.autorizacion,
  };
  const botonEnviar = formulario.querySelector('.formulario__enviar');
  const estado = document.getElementById('estado-formulario');
  const contador = document.getElementById('contador-mensaje');
  const ENLACE_WHATSAPP = 'https://wa.me/573175680756?text=Hola%20Sebasti%C3%A1n%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20hablar%20sobre%20mi%20negocio.';

  // 2. Reglas del contrato. Cada una devuelve el mensaje de error, o '' si está bien.
  const esCorreo = (texto) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto);
  // Celular colombiano: 10 dígitos que empiezan por 3. Se aceptan espacios, guiones y el +57 adelante.
  const esCelular = (texto) => /^3\d{9}$/.test(texto.replace(/[\s-]/g, '').replace(/^\+?57/, ''));

  const reglas = {
    nombre: (v) => v.trim().length >= 2 ? '' : 'Escriba su nombre.',
    contacto: (v) => {
      if (!v.trim()) return 'Escriba un correo o un número de celular para responderle.';
      return esCorreo(v.trim()) || esCelular(v.trim()) ? '' : 'Escriba un correo o un número de celular válido';
    },
    mensaje: (v) => {
      if (!v.trim()) return 'Cuénteme en qué le puedo ayudar.';
      return v.trim().length >= 10 ? '' : 'Escriba un poco más: mínimo 10 caracteres.';
    },
    autorizacion: (_, campo) => campo.checked ? '' : 'Debe autorizar el tratamiento de sus datos para continuar',
  };

  // 3. Muestra u oculta el error de un campo. aria-invalid avisa al lector de pantalla (CA-12.8).
  function revisar(nombre) {
    const campo = campos[nombre];
    const error = reglas[nombre](campo.value, campo);
    const caja = document.getElementById(`error-${nombre}`);
    caja.textContent = error;
    caja.hidden = !error;
    campo.setAttribute('aria-invalid', error ? 'true' : 'false');
    return !error;
  }

  // 4. Mientras corrige, el error se actualiza solo, sin esperar a que vuelva a tocar "Enviar"
  Object.keys(campos).forEach((nombre) => {
    const evento = nombre === 'autorizacion' ? 'change' : 'input';
    campos[nombre].addEventListener(evento, () => {
      if (campos[nombre].getAttribute('aria-invalid') === 'true') revisar(nombre);
    });
  });

  // 5. Contador de caracteres del mensaje (CA-12.4)
  function actualizarContador() {
    const quedan = campos.mensaje.maxLength - campos.mensaje.value.length;
    contador.textContent = quedan === 1 ? 'Queda 1 carácter.' : `Quedan ${quedan.toLocaleString('es-CO')} caracteres.`;
  }
  campos.mensaje.addEventListener('input', actualizarContador);
  actualizarContador();

  function mostrarEstado(tipo, html) {
    estado.className = `formulario__estado formulario__estado--${tipo}`;
    estado.innerHTML = html;
  }

  // 6. Enviar
  let enviando = false;

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    if (enviando) return; // CA-12.5: un segundo clic no hace nada mientras se envía

    // Revisa todo y lleva el foco al primer campo con error (CA-12.2)
    const malos = Object.keys(campos).filter((nombre) => !revisar(nombre));
    if (malos.length) {
      campos[malos[0]].focus();
      return;
    }

    // CA-12.7: si un robot llenó la trampa, se "finge" el éxito y no se envía nada
    if (formulario.elements['bot-field'].value) {
      formulario.reset();
      return;
    }

    enviando = true;
    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Enviando…';
    mostrarEstado('exito', 'Enviando su mensaje…');

    try {
      // Netlify Forms recibe los datos como un formulario normal, enviados a la raíz del sitio
      const respuesta = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(formulario)).toString(),
      });
      if (!respuesta.ok) throw new Error(`Respuesta ${respuesta.status}`);

      // CA-12.1: confirma y limpia el formulario
      formulario.reset();
      actualizarContador();
      mostrarEstado('exito', 'Gracias, recibí su mensaje. Le respondo pronto.');
    } catch (error) {
      // CA-12.6: no se borra lo escrito y se ofrece WhatsApp
      mostrarEstado('error',
        `No se pudo enviar. <a href="${ENLACE_WHATSAPP}" target="_blank" rel="noopener">Escríbame por WhatsApp<span class="solo-lector"> (se abre en una pestaña nueva)</span></a>.`);
    } finally {
      enviando = false;
      botonEnviar.disabled = false;
      botonEnviar.textContent = 'Enviar mensaje';
    }
  });
}
