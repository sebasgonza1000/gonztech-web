# Plan y resultados de pruebas (Fase 5 · QA)

> Proyecto: página de **Gonztech**, por Sebastián González. Ejecutado el **29 oct 2026** sobre la rama `main` (commit `ad2bb07`), en la rama `fase-5-qa`.

## 1. Alcance

| Se prueba | No se prueba aquí (y dónde se prueba) |
|-----------|----------------------------------------|
| Las 4 páginas: `index.html`, `privacidad.html`, `proyecto-chicken-grill.html`, `gracias.html`. | El envío real del formulario a Netlify (CA-12.1): **Fase 7**. |
| Los 65 criterios de aceptación de HU-00 a HU-16. | La vista previa real en WhatsApp (CA-16.1): **Fase 7**. |
| Los RNF que se pueden medir sin publicar: responsive, accesibilidad, rendimiento, seguridad básica, SEO básico y versionado. | https y Lighthouse sobre la dirección real (RNF-02, RNF-04, RNF-07): **Fase 7**. |
| Regresión de los defectos ya corregidos (DEF-01 a DEF-03). | La prueba de los 10 segundos con 3 personas (CA-01.2) y la prueba en celulares reales (RNF-06): **Sebastián**, con la guía de la §7. |

## 2. Ambiente

- Servidor local `python3 -m http.server` en `http://127.0.0.1:8080` (no recibe envíos POST: responde 501, lo que sirve para probar la falla de conexión).
- Navegador de pruebas de Claude (motor Chromium) en 360 × 640, 768 × 1024 y 1280 × 800 px.
- Script de pruebas estáticas (estructura, enlaces, imágenes, seguridad y reglas de contenido) y pruebas en el navegador con JavaScript.
- Limitaciones del ambiente: ver `defectos.md`, "Observaciones del ambiente de pruebas".

## 3. Tipos de prueba

| Tipo | Qué se hizo | Resultado |
|------|-------------|-----------|
| **Estáticas** | ids únicos, `alt` en todas las imágenes, `width`/`height`, enlaces y anclas que existen, un solo `h1`, encabezados sin saltos, `lang="es"`, `viewport`. | Sin fallas en las 4 páginas. |
| **E2E** | Recorrido completo: portada → menú → secciones → proyecto → formulario (error, éxito simulado, falla de conexión) → aviso. | Pasa. |
| **Responsive** | 360, 768 y 1280 px en las 4 páginas. | Sin desplazamiento horizontal; ningún elemento se sale de la pantalla. |
| **Accesibilidad** | Contraste de todo el texto (WCAG AA), áreas de toque, teclado (Tab, Enter, Escape), etiquetas y mensajes de error, anuncios (`role="status"`). | Contraste mínimo **6,2:1** (pide 4,5:1). Ningún control mide menos de 44 px. |
| **Rendimiento** | Peso de la primera visita y de cada imagen; carga diferida. | Primera visita **≈ 55 KB comprimido** sin las fotos de proyectos; la foto más pesada pesa 155 KB (límite 200 KB). |
| **Seguridad básica (OWASP)** | Enlaces externos con `noopener`, todo en https, sin scripts ni hojas externas, campo trampa contra robots, sin claves ni contraseñas en el repositorio, los archivos de contexto interno fuera de git. | Pasa. Dos tareas para la Fase 7 (§6). |
| **Regresión** | DEF-01 (encabezado sin JavaScript), DEF-02 (enlace "Volver" en celular), DEF-03 (etiqueta del campo de contacto). | Los tres siguen corregidos. |
| **Contenido** | Reglas RC-01 a RC-08 en todas las páginas. | Pasa, salvo la marca pendiente de CA-05.4 (§5). |

## 4. Casos de prueba y resultados

**Resultados:** ✅ Pasa · ⚠️ Pasa con observación · ⏳ Pendiente (se indica quién y cuándo).

| Caso | Criterio | Cómo se probó | Resultado |
|------|----------|---------------|-----------|
| CP-00.1 | CA-00.1 Secciones en orden | Orden de `<section>` y de los `h2` en `index.html`. | ✅ inicio, servicios, cómo, proceso, proyectos, sobre mí, contacto |
| CP-00.2 | CA-00.2 Sin desplazamiento horizontal | Ancho de página = ancho de pantalla a 360 px en las 4 páginas. | ✅ 360 = 360 |
| CP-00.3 | CA-00.3 Saltar al contenido | Tab → aparece el enlace; Enter → el foco pasa a `main#contenido`. | ✅ (ver DEF-04 para `gracias.html`) |
| CP-00.4 | CA-00.4 Identidad visual | Variables de color Bosque, logo en el encabezado, icono de pestaña. | ⚠️ Pasa con el tigre; el texto del criterio todavía dice "sello" (OBS-01) |
| CP-00.5 | CA-00.5 Logo en vector | Tigre, nombre y eslogan son SVG; nítidos en 360, 768 y 1280 px. | ✅ en Chromium · ✅ celular real: Sebastián, 29 oct 2026 |
| CP-00.6 | CA-00.6 Dorado no se usa en textos | Búsqueda de `color: var(--color-acento)` en el CSS. | ✅ ninguna regla |
| CP-01.1 | CA-01.1 Portada sin desplazarse | Captura a 360 × 640: marca, nombre, línea, frase y botón visibles. | ✅ |
| CP-01.2 | CA-01.2 Prueba de los 10 segundos | Requiere 3 personas. | ⏳ Sebastián (§7) |
| CP-01.3 | CA-01.3 Reglas de contenido | Búsqueda de "ingeniero", empleador, cifras y testimonios. | ✅ |
| CP-02.1 | CA-02.1 WhatsApp desde el celular | Enlace `wa.me/573175680756` con mensaje inicial. | ✅ enlace correcto · ✅ toque real en celular: Sebastián, 29 oct 2026 |
| CP-02.2 | CA-02.2 WhatsApp desde computador | `target="_blank"` y `rel="noopener"`; aviso "se abre en una pestaña nueva". | ✅ |
| CP-02.3 | CA-02.3 Tildes y "ñ" | Decodificar el mensaje: "Hola Sebastián, vi su página y quiero hablar sobre mi negocio." | ✅ |
| CP-02.4 | CA-02.4 Mismo número en todos | Comparar todos los enlaces `wa.me` de las 4 páginas con el oficial. | ✅ 1 enlace distinto en toda la página |
| CP-03.1 | CA-03.1 Flotante visible | Visible en Proceso (antes de Contacto). | ✅ |
| CP-03.4 | CA-03.4 Se esconde en Contacto | En el formulario y el pie: `visibility: hidden` (sale del orden del Tab). Vuelve al subir. | ✅ |
| CP-03.2 | CA-03.2 No tapa el formulario | Captura a 360 px con el botón Enviar y el pie a la vista. | ✅ |
| CP-03.3 | CA-03.3 Accesible | Nombre "Escribir por WhatsApp (se abre en una pestaña nueva)"; 56 × 56 px. | ✅ |
| CP-04.1 | CA-04.1 Ir a una sección | Cada `h2` queda en y = 148 px; el encabezado termina en 69 px. | ✅ |
| CP-04.2 | CA-04.2 Menú en celular | Abre con el botón; al elegir una sección se cierra solo. | ✅ |
| CP-04.3 | CA-04.3 Cerrar sin elegir | Cierra con el botón y con Escape; el foco vuelve al botón. | ✅ |
| CP-04.4 | CA-04.4 Menú con teclado | `aria-expanded` cambia entre "true" y "false"; `aria-controls="menu"`. | ✅ |
| CP-04.5 | CA-04.5 Sin JavaScript | El botón viene con `hidden` en el HTML; sin la clase `js` el menú se muestra y el encabezado no se queda pegado. | ✅ (regresión DEF-01) |
| CP-05.1 | CA-05.1 Los 7 servicios | Títulos de las tarjetas de Servicios. | ✅ los 7 · ⚠️ el título del criterio dice "4" (OBS-02) |
| CP-05.2 | CA-05.2 Sin tecnicismos | Lectura de QA. | ✅ · se confirma en la prueba de §7 |
| CP-05.3 | CA-05.3 Reglas de contenido | Sin precios, "nunca se cae" ni "para siempre". | ✅ |
| CP-05.4 | CA-05.4 Ejemplos reales de IA | Lectura del servicio; Sebastián confirmó los 3 ejemplos (29 oct 2026). Sin cifras de ahorro. | ✅ (PEN-01 resuelto en CC-14) |
| CP-05.5 | CA-05.5 Proyectos más grandes | Tiendas con pagos y sistemas a la medida; "lo evaluamos juntos"; sin "equipo"; enlace oficial. | ✅ |
| CP-05.6 | CA-05.6 NFC | Explicación en dos frases; "la mayoría de celulares"; a 1280 px ocupa toda la fila. | ✅ |
| CP-06.1 | CA-06.1 Los 6 compromisos | Títulos de Cómo trabajo. | ✅ |
| CP-06.2 | CA-06.2 Soporte con límites | "Corrijo los errores durante un periodo acordado." | ✅ |
| CP-07.1 | CA-07.1 Los 7 pasos en orden | Lista `ol` con los 7 pasos. | ✅ |
| CP-07.2 | CA-07.2 Proceso en celular | A 360 px, uno debajo del otro, sin cortarse. | ✅ |
| CP-07.3 | CA-07.3 Lista ordenada | Etiqueta `<ol>`. | ✅ |
| CP-08.1 | CA-08.1 Contenido de tarjetas | Imagen, título, reto y qué se hizo; todas las imágenes con `alt`. | ✅ |
| CP-08.2 | CA-08.2 Sin clientes sin permiso | Solo Chicken & Grill (permiso confirmado, RC-04); ningún otro cliente. | ✅ |
| CP-08.3 | CA-08.3 Proyecto pendiente | No hay tarjetas sin confirmar. | ✅ |
| CP-08.4 | CA-08.4 Imágenes livianas | Todas < 200 KB (la mayor: 155 KB); `loading="lazy"`. | ✅ (ver OBS-A3 sobre la caché) |
| CP-09.1 | CA-09.1 Pestaña nueva | `target="_blank"` en el enlace del proyecto. | ✅ · ⚠️ el botón dice "Ver las pantallas", no "Ver proyecto" (OBS-03) |
| CP-09.2 | CA-09.2 Enlace seguro | `rel="noopener"`. | ✅ |
| CP-09.3 | CA-09.3 Proyecto sin enlace | La tarjeta de automatización no tiene botón; sin enlaces rotos. | ✅ |
| CP-10.1 | CA-10.1 Sobre mí | Emblema con tigre y `alt`; perfil de QA; por qué la calidad. | ✅ |
| CP-10.2 | CA-10.2 Estudios con precisión | "estudiante de Ingeniería de Software"; sin "ingeniero"; empleador sin nombre ("una empresa de desarrollo"). | ✅ |
| CP-10.3 | CA-10.3 Emblema nítido | SVG a 360 y 1280 px; sin imágenes rotas. | ✅ |
| CP-11.1 | CA-11.1 Correo | `mailto:contacto.gonztech@gmail.com` con asunto. | ✅ |
| CP-11.2 | CA-11.2 WhatsApp | Enlace oficial. | ✅ |
| CP-11.3 | CA-11.3 Datos como texto | Correo y número visibles y seleccionables (`user-select: text`). | ✅ |
| CP-12.1 | CA-12.1 Envío exitoso | Simulado: se envía `form-name=contacto&…` a `/` y aparece "Gracias, recibí su mensaje. Le respondo pronto."; el formulario se limpia. | ✅ simulado · ✅ **envío real** en https://gonztech.netlify.app (29 oct 2026): mensaje de gracias, correo recibido y registro en Netlify Forms |
| CP-12.2 | CA-12.2 Campos vacíos | Nombre, medio de contacto y mensaje muestran su error; el foco va a Nombre. | ✅ |
| CP-12.3 | CA-12.3 Contacto inválido | "abc", "12345" y "ana@correo" se rechazan; "300 123 4567", "+57 3001234567" y "ana@correo.com" se aceptan. | ✅ |
| CP-12.4 | CA-12.4 Mensaje largo | Al pegar 1.050 caracteres quedan 1.000 y "Quedan 0 caracteres." | ✅ |
| CP-12.5 | CA-12.5 Doble clic | Dos envíos seguidos → 1 sola llamada. | ✅ |
| CP-12.6 | CA-12.6 Falla de conexión | Servidor 501 → "No se pudo enviar. Escríbame por WhatsApp" con enlace; los datos se conservan. | ✅ |
| CP-12.7 | CA-12.7 Spam | Con el campo trampa lleno no se envía nada y el formulario se limpia. | ✅ |
| CP-12.8 | CA-12.8 Accesible | Cada campo tiene su etiqueta y `aria-describedby` hacia su error; el estado usa `role="status"`. | ✅ (regresión DEF-03) |
| CP-13.1 | CA-13.1 Sin autorización | "Debe autorizar el tratamiento de sus datos para continuar". | ✅ |
| CP-13.2 | CA-13.2 Casilla sin marcar | `checked = false` al cargar. | ✅ |
| CP-13.3 | CA-13.3 Enlace al aviso | Enlace a `privacidad.html` en pestaña nueva. | ✅ |
| CP-14.1 | CA-14.1 Contenido mínimo | Responsable, finalidad, derechos y cómo ejercerlos, más la política (CC-08). | ✅ · ⏳ fecha de vigencia y abogado: Fase 7 |
| CP-14.2 | CA-14.2 Lenguaje sencillo | Lectura de QA. | ✅ · se confirma en la prueba de §7 |
| CP-14.3 | CA-14.3 Siempre accesible | Enlace en el pie de `index.html`. | ✅ |
| CP-15.1 | CA-15.1 Pie | "Gonztech · Sebastián González – Desarrollo web y calidad de software © 2026 · Aviso de privacidad". | ✅ |
| CP-15.2 | CA-15.2 Año automático | El año sale de JavaScript (`new Date().getFullYear()`). | ✅ |
| CP-16.1 | CA-16.1 Vista previa en WhatsApp | Las 11 etiquetas `og:` y `twitter:` están. | ✅ etiquetas · ✅ **prueba real** en WhatsApp con https://gonztech.netlify.app: Sebastián, 29 oct 2026 |
| CP-16.2 | CA-16.2 Imagen | 1200 × 630 px, 59 KB. | ✅ |
| CP-16.3 | CA-16.3 Título | "Gonztech \| Desarrollo web y calidad de software". | ✅ |

**Resumen:** 65 criterios · **64 pasan** · **1 pendiente**: CA-01.2 (Sebastián). CA-05.4 pasó a ✅ con el CC-14 y CA-16.1 con la prueba real en la Fase 7.
De los que pasan, 3 tienen una observación de documentación (CA-00.4, CA-05.1, CA-09.1) y 6 se confirmaban después. Ya quedaron confirmados 4 en la Fase 7: en celular real (CA-00.5, CA-02.1), el envío real (CA-12.1) y la fecha de vigencia (CA-14.1). Faltan 2, con las personas de la §7 (CA-05.2, CA-14.2).

## 5. Defectos, observaciones y pendientes

El detalle está en `defectos.md`.

| ID | Tipo | Descripción | Severidad | Bloquea publicar |
|----|------|-------------|-----------|------------------|
| DEF-04 | Defecto | `gracias.html` no tiene "Saltar al contenido" ni `tabindex="-1"` en `main`, a diferencia de las otras páginas. | Baja | No |
| PEN-01 | Pendiente de Sebastián · **resuelto en CC-14** | CA-05.4: confirmar qué ejemplos de automatización e IA puede entregar hoy y quitar la marca `[PENDIENTE]` visible en Servicios. | — | Ya no |
| OBS-01 | Documentación | CA-00.4 todavía habla del "sello" en el encabezado y la pestaña; desde CC-10 es el tigre. | — | No |
| OBS-02 | Documentación | El título de CA-05.1 dice "Los 4 servicios" y la tabla tiene 7. | — | No |
| OBS-03 | Documentación | CA-09.1 y CA-09.3 dicen "Ver proyecto"; el botón dice "Ver las pantallas". | — | No |
| OBS-04 | Documentación | `arquitectura.md` §8 dice que el emblema lleva "sello"; desde CC-10 lleva el tigre. | — | No |

**Actualización 29 oct 2026:** DEF-04 y OBS-01 a OBS-04 se corrigieron en el **CC-13**, aprobado por Sebastián. En PEN-01, Sebastián confirmó que puede entregar los 3 ejemplos y la marca se quitó en el **CC-14**: CA-05.4 pasa y ya no hay bloqueos para publicar.

## 6. Para la Fase 7 (necesitan la página publicada)

1. ~~Envío real del formulario y llegada del correo~~ (CA-12.1): **pasa**, 29 oct 2026.
2. ~~Vista previa en WhatsApp con la dirección real~~ (CA-16.1, CC-16): **pasa**, 29 oct 2026. `og:url` y `og:image` usan `gonztech.netlify.app`.
3. ~~Fecha de vigencia en el aviso~~ (hecho: 29 oct 2026) y revisión de un abogado (CA-14.1, CC-08).
4. ~~Lighthouse sobre la dirección real~~ (RNF-02, RNF-03, RNF-07, RNF-04): **pasa**, 29 oct 2026, PageSpeed Insights sobre https://gonztech.netlify.app. Celular y escritorio dan lo mismo: Rendimiento **100**, Accesibilidad **100**, Prácticas recomendadas **92**, SEO **100**; https sin advertencias.
5. ~~Seguridad~~: **pasa**, 29 oct 2026. Netlify solo publica la carpeta `publicar/` (los archivos internos dan 404) y las cabeceras de `netlify.toml` llegan en vivo.
6. ~~Prueba en celular real~~ (RNF-06, CA-00.5, CA-02.1, guía §7 B): **pasa**, 29 oct 2026. Sebastián revisó logo, WhatsApp, botón flotante y menú.

## 7. Guía corta para Sebastián

**A. Prueba de los 10 segundos (CA-01.2), con 3 personas que no sean de tecnología:**
1. Abra la página en su celular y muéstreles solo la portada durante 10 segundos.
2. Quíteles el celular y pregunte: "¿Quién es y qué ofrece?".
3. Anote lo que diga cada una. Pasa si las 3 responden algo como "hace páginas web y revisa que funcionen".
4. Aproveche y pídales leer un servicio y el aviso de privacidad: ¿entendieron sin preguntarle? (CA-05.2, CA-14.2).

**B. En su celular (RNF-06, CA-00.5, CA-02.1).** Hágalo cuando la página esté publicada, o desde su computador conectado a la misma red wifi:
1. ¿El logo se ve completo y nítido?
2. Toque "Escríbame por WhatsApp": ¿se abre el chat con +57 317 568 0756 y el mensaje ya escrito, con tildes bien?
3. Baje hasta Contacto: ¿el botón flotante se esconde? ¿Al subir, vuelve?
4. Abra el menú, escoja una sección: ¿baja suave y el menú se cierra?
5. Si puede, repita en un iPhone y en un Android, en Chrome y en Safari.

**C. Opcional, Lighthouse en Chrome:** clic derecho → Inspeccionar → pestaña **Lighthouse** → Móvil → Analizar. Anote los cuatro números.

## 8. Veredicto

### **CON OBSERVACIONES**

La página cumple los criterios que se pueden probar sin publicarla. No hay defectos críticos, altos ni medios: solo uno bajo (DEF-04) y cuatro detalles de documentación.

**PEN-01 quedó resuelto en el CC-14:** ya no hay bloqueos para publicar. Lo demás (§6 y §7) se completa en la Fase 7 y con las pruebas de Sebastián.

**Actualización de la Fase 7 (29 oct 2026):** con la página publicada pasan el envío real del formulario, la vista previa en WhatsApp, Lighthouse (100 · 100 · 92 · 100), la prueba en celular real y la seguridad en vivo. **64 de 65 criterios pasan.** Solo queda CA-01.2 (prueba de los 10 segundos con 3 personas), que no bloquea: la página queda **en producción**.
