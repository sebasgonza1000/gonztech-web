# Reporte de defectos

Severidad: **Crítica** (bloquea el uso) · **Alta** (falla un criterio M) · **Media** (falla un criterio S o afecta a muchos) · **Baja** (detalle con poco impacto).

| ID | HU | Descripción | Pasos para reproducir | Esperado | Obtenido | Severidad | Estado |
|----|----|-------------|-----------------------|----------|----------|-----------|--------|
| DEF-01 | HU-04 | Sin JavaScript, el encabezado ocupa dos filas y, al quedar pegado arriba, tapa parte del título de la sección elegida. | 1. Desactivar JavaScript. 2. Abrir la página en 360 px. 3. Tocar "Proceso" en el menú. | El título de Proceso se ve completo. | El encabezado (unos 130 px) tapaba el título, porque el espacio reservado es de 84 px. | Baja | **Corregido**: sin JS el encabezado no se queda pegado (`html:not(.js) .encabezado`). Verificado: el título queda visible. |
| DEF-02 | HU-09, HU-15 | En las páginas secundarias, el enlace "Volver a proyectos" / "Volver al inicio" no cabía al lado del nombre en celular, bajaba de línea y medía menos de 44 px de alto. | 1. Abrir `proyecto-chicken-grill.html` o `privacidad.html` en 360 px. 2. Mirar el encabezado. | El enlace queda en la misma línea que el nombre y mide al menos 44 px. | El enlace bajaba a una segunda línea y el encabezado se veía descuadrado. | Baja | **Corregido**: enlace corto "← Volver" (clase `.enlace-volver`); el lector de pantalla sigue escuchando "Volver a proyectos". Verificado: misma línea y 44 px. |
| DEF-04 | HU-00, HU-12 | `gracias.html` no tiene el enlace "Saltar al contenido" ni `tabindex="-1"` en `main`, a diferencia de las otras tres páginas. | 1. Enviar el formulario sin JavaScript (llega a `gracias.html`). 2. Presionar Tab. | El primer Tab muestra "Saltar al contenido", como en las demás páginas (CA-00.3, RNF-03). | El primer Tab va directo al logo. | Baja | **Corregido** en el CC-13: se agregó el enlace y `tabindex="-1"` en `main`. Verificado: el primer Tab muestra "Saltar al contenido" y Enter lleva el foco a `main`. |

## Observaciones del ambiente de pruebas (no son defectos de la página)

| Fecha | Observación | Impacto | Acción |
|-------|-------------|---------|--------|
| 28 oct 2026 | En el navegador de pruebas de Claude, con el panel oculto, la página no dibuja cuadros (0 en 1 segundo). Por eso el desplazamiento suave (`scroll-behavior: smooth`) no se anima y parece que el menú "no baja". | Con la animación desactivada, el menú lleva correctamente a cada sección (CA-04.1 pasa). | Sebastián debe confirmar el desplazamiento suave en su celular y su computador. |
| 28 oct 2026 | El mismo ambiente no ejecuta `IntersectionObserver` (lo que esconde el botón flotante) mientras el panel está oculto. Al tomar una captura de pantalla, el navegador dibuja un cuadro y el vigilante sí responde. | Las pruebas de CA-03.4 se hicieron con una captura en cada punto. Pasan. | Sebastián confirma en su celular que el botón se esconde al llegar a Contacto. |
| 29 oct 2026 | Al recargar la página, las fotos de Proyectos se cargan de una vez aunque tienen `loading="lazy"`. Causa: el navegador ya las tenía en caché, y Chromium muestra de inmediato las imágenes en caché. Con una imagen nueva, la carga diferida sí espera (comprobado). | Para un visitante nuevo, las fotos se cargan al acercarse (CA-08.4 pasa). | Confirmar en la Fase 7 con Lighthouse en una ventana de incógnito. |

## DEF-03 · Etiqueta del campo "Correo o celular" sin asociar (HU-12)

- **Encontrado:** 28 oct 2026, al probar CA-12.8 (cada campo anuncia su etiqueta).
- **Qué pasaba:** el campo tenía `id="contacto"`, el mismo id de la sección Contacto. `label for="contacto"` apuntaba a la sección, no al campo, y el lector de pantalla no anunciaba "Correo o celular".
- **Corrección:** el campo pasa a `id="medio-contacto"`. Se conserva `name="contacto"`, que es el que exige el contrato del formulario (arquitectura §5).
- **Verificación:** la etiqueta queda asociada y no hay ids repetidos en `index.html`.

## Fase 5 · Pendientes y observaciones de documentación (29 oct 2026)

No son fallas de la página, pero quedan registradas para no perder la trazabilidad. **OBS-01 a OBS-04 se corrigieron en el CC-13** (aprobado por Sebastián el 29 oct 2026).

| ID | Tipo | Descripción | Qué se propone | Bloquea publicar |
|----|------|-------------|----------------|------------------|
| PEN-01 | Pendiente de Sebastián · **resuelto en el CC-14**: Sebastián confirmó el 29 oct 2026 que puede entregar los 3 ejemplos y se quitó la marca | CA-05.4: en Servicios se ve `[PENDIENTE: confirmar que estos ejemplos se pueden entregar hoy]`. | Sebastián confirma los ejemplos de automatización e IA que puede entregar hoy; se ajusta el texto y se quita la marca. | Ya no |
| OBS-01 | Documentación | CA-00.4 dice "el sello de calidad aparece en el encabezado" y "la pestaña muestra la versión simple del sello". Desde CC-10 es el tigre. | Actualizar el texto del criterio. | No |
| OBS-02 | Documentación | El título de CA-05.1 dice "Los 4 servicios" y la tabla tiene 7. | Cambiar el título a "Los 7 servicios". | No |
| OBS-03 | Documentación | CA-09.1 y CA-09.3 dicen "Ver proyecto"; el botón de la página dice "Ver las pantallas". | Alinear el criterio con el texto aprobado del botón. | No |
| OBS-04 | Documentación | `arquitectura.md` §8 dice que el emblema lleva "arco + guilloché + sello". | Cambiar "sello" por "tigre" (CC-10). | No |
