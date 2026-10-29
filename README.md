# Gonztech · Página de presentación

Página de presentación de **Gonztech**, por Sebastián González: desarrollo web y calidad de software para negocios en Colombia.

**Ver la página:** https://gonztech.netlify.app

![Vista previa de la página](img/vista-previa.png)

## Qué es

Una página de una sola vista, pensada primero para celular, para que el dueño de un negocio entienda en segundos qué ofrezco y me escriba por WhatsApp. Tiene servicios, compromisos de trabajo, proceso paso a paso, proyectos, perfil, contacto con formulario y aviso de privacidad (Ley 1581 de 2012).

## Cómo se construyó

El proyecto siguió un flujo por fases, como en una fábrica de software, con trazabilidad de punta a punta: **requerimiento → historia de usuario → criterio de aceptación → caso de prueba → resultado**.

| Fase | Qué se hizo | Dónde verlo |
|------|-------------|-------------|
| Historias de usuario | 17 historias con 65 criterios de aceptación en Gherkin (positivos, negativos y de borde) y matriz de trazabilidad. | [`docs/historias-de-usuario.md`](docs/historias-de-usuario.md) |
| Desarrollo | Una rama por historia o control de cambios, unida a `main` solo con aprobación. | El código de este repositorio |
| Pruebas (QA) | Plan de pruebas, 65 casos con resultado, pruebas E2E, responsive, accesibilidad (WCAG AA), rendimiento, seguridad básica y regresión. Veredicto: **con observaciones**, sin defectos críticos. | [`docs/plan-de-pruebas.md`](docs/plan-de-pruebas.md) |
| Defectos | Reporte con severidad, pasos para reproducir, esperado contra obtenido y verificación de cada corrección. | [`docs/defectos.md`](docs/defectos.md) |
| Publicación | Netlify con cabeceras de seguridad (CSP, X-Frame-Options, nosniff) y formulario con protección contra spam. | [`netlify.toml`](netlify.toml) |

La documentación interna del proyecto (requerimientos, decisiones de arquitectura y control de cambios) no se publica; algunos documentos la mencionan.

## Tecnología

- **HTML, CSS y JavaScript**, sin frameworks ni librerías: carga rápida y se entiende cada línea.
- **Mejora progresiva:** sin JavaScript la página sigue funcionando (menú y formulario incluidos).
- **Accesibilidad:** contraste mínimo de 6,2:1, áreas de toque de 44 px, navegación con teclado, etiquetas y mensajes de error anunciados al lector de pantalla, y respeto a "reducir movimiento".
- **Formulario:** Netlify Forms, validación en el navegador, campo trampa contra robots y WhatsApp como respaldo si falla el envío.
- **Imágenes:** logo y emblema en SVG; fotos de menos de 200 KB con carga diferida.

## Estructura

```
index.html                    Página principal
proyecto-chicken-grill.html   Detalle de un proyecto
privacidad.html               Aviso de privacidad y política de datos
gracias.html                  Confirmación del formulario (sin JavaScript)
css/estilos.css               Estilos (colores como variables)
js/main.js                    Menú, botón flotante, animaciones y formulario
img/                          Logo, emblema e imágenes
docs/                         Historias de usuario, pruebas y defectos
netlify.toml                  Publicación y cabeceras de seguridad
```

## Contacto

WhatsApp +57 317 568 0756 · contacto.gonztech@gmail.com

---

© 2026 Sebastián González · Gonztech. El código se muestra como portafolio; la marca, el logo y los textos no se pueden reutilizar.
