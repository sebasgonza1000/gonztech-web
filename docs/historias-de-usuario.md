# Fase 2 – Historias de usuario

> Proyecto: página de presentación de **Sebastián González – Desarrollo web y calidad de software**.
> Fecha: 28 de octubre de 2026 · Estado: **aprobado (28 oct 2026)**.
> Parte de: `docs/requerimientos.md` (Fase 1 aprobada).

## Cómo leer este documento

1. **Historia de usuario (HU):** una necesidad contada desde quien la vive: *Como [rol], quiero [acción], para [beneficio]*. Cada HU dice de qué RF sale.
2. **Criterios de aceptación en Gherkin:** describen *cuándo la HU está bien hecha*. Usan **Dado** (situación inicial), **Cuando** (lo que hace la persona) y **Entonces** (lo que debe pasar). Cada criterio tiene un ID (por ejemplo, `CA-02.1`). En la Fase 5, cada uno se convierte en uno o más casos de prueba.
3. **Casos negativos y de borde:** qué pasa si algo sale mal (un campo vacío, la red caída) o en el límite (una pantalla muy pequeña, un texto muy largo). Es donde suelen aparecer los defectos.
4. **Estimación:** horas de construcción (Fase 4). Las pruebas formales se cuentan aparte en la Fase 5.
5. **DoR y DoD:** listas que se aplican a todas las HU (ver §1).

## Supuestos de esta fase

Las 5 preguntas de la Fase 1 siguen abiertas. Mientras se responden:

1. **SUPUESTO:** el prototipo de restaurantes queda como tarjeta `[PENDIENTE]` hasta confirmar que es propio (HU-08).
2. **SUPUESTO:** los criterios del formulario no dependen de la herramienta (servicio externo o WhatsApp). La herramienta se decide en la Fase 3 con un ADR (HU-12).
3. ~~SUPUESTO: sin foto, "Sobre mí" muestra un espacio marcado `[PENDIENTE]`.~~ **Resuelto por ADR-007:** no se usa foto; va el emblema de identidad (HU-10).
4. **SUPUESTO:** el catálogo industrial se muestra con datos genéricos, nunca con datos reales de un cliente (HU-08).
5. **SUPUESTO:** el mensaje inicial de WhatsApp es *"Hola Sebastián, vi su página y quiero hablar sobre mi negocio."* El redactor comercial lo puede ajustar.

---

## 1. Definición de Listo (DoR) y Definición de Terminado (DoD)

**DoR – una HU puede empezar cuando:**
1. Dice de qué RF o RNF sale.
2. Sus criterios de aceptación están aprobados por Sebastián.
3. Su contenido está disponible o marcado como `[PENDIENTE]`.
4. Tiene estimación.
5. No depende de otra HU sin terminar (o esa dependencia está anotada).

**DoD – una HU está terminada cuando:**
1. Todos sus criterios de aceptación pasan.
2. QA la probó en 360 px (celular), 768 px (tablet) y 1280 px (computador).
3. Funciona con teclado y tiene textos alternativos donde aplica.
4. No hay errores en la consola del navegador.
5. Cumple las reglas de contenido RC-01 a RC-08.
6. El código está comentado en lo importante y subido en un commit pequeño en español.
7. La matriz de trazabilidad está actualizada.
8. Sebastián la aprobó.

---

## 2. Historias de usuario

### HU-00 · Estructura base de la página
**Origen:** RNF-01, RNF-03, RNF-08, ADR-007 · **Prioridad:** M · **Estimación:** 3,5 h (2 h de estructura + 1,5 h del sello)

> Como **Sebastián**, quiero **una estructura base ordenada y pensada para celular**, para **construir cada sección sobre algo firme y fácil de mantener**.

*Por qué existe:* no sale de un RF sino de los RNF. Es el "terreno" donde se construyen las demás HU: el archivo HTML, los estilos base y los colores como variables.

```gherkin
Característica: Estructura base

  Escenario: CA-00.1 La página tiene las secciones en orden
    Dado que abro la página
    Entonces veo, en este orden, Portada, Servicios, Cómo trabajo, Proceso, Proyectos, Sobre mí y Contacto
    Y cada sección tiene un encabezado que la identifica

  Escenario: CA-00.2 Sin desplazamiento horizontal en celular (borde)
    Dado que abro la página en una pantalla de 360 px de ancho
    Cuando recorro toda la página
    Entonces no aparece desplazamiento horizontal

  Escenario: CA-00.3 Saltar al contenido con teclado
    Dado que abro la página
    Cuando presiono la tecla Tab por primera vez
    Entonces aparece un enlace visible "Saltar al contenido"
    Y al activarlo, el foco pasa al contenido principal

  Escenario: CA-00.4 Identidad visual aplicada (ADR-007)
    Dado que abro la página
    Entonces los colores son los del tono Bosque definidos en arquitectura.md §4.1
    Y el logo del tigre aparece en el encabezado (CC-10)
    Y la pestaña del navegador muestra la cabeza del tigre en un círculo verde

  Escenario: CA-00.5 El logo se ve igual en todos los dispositivos (borde) · ajustado por CC-10
    Dado que abro la página en iPhone, Android y computador
    Entonces el tigre, el nombre "GONZTECH" y el eslogan se ven completos y nítidos
    Y se ven idénticos en los tres, porque están en trazos (vector) y no dependen de una fuente

  Escenario: CA-00.6 El dorado no se usa en textos (negativo)
    Dado que reviso los estilos de la página
    Entonces ningún texto usa el color --color-acento
```

---

### HU-01 · Portada clara
**Origen:** RF-01 · **Prioridad:** M · **Estimación:** 1,5 h

> Como **dueño de negocio**, quiero **entender en segundos quién es Sebastián y qué hace**, para **decidir si vale la pena seguir leyendo**.

```gherkin
Característica: Portada

  Escenario: CA-01.1 La portada se entiende sin desplazarse
    Dado que abro la página en un celular de 360 x 640 px
    Entonces, sin desplazarme, veo la marca "Gonztech" y el nombre "Sebastián González"
    Y veo la línea "Desarrollo web y calidad de software"
    Y veo una frase de valor
    Y veo el botón "Escríbame por WhatsApp"

  Escenario: CA-01.2 Prueba de los 10 segundos
    Dado que muestro la portada a 3 personas no técnicas
    Cuando pasan 10 segundos
    Entonces cada una puede decir quién es Sebastián y qué ofrece

  Escenario: CA-01.3 Reglas de contenido (negativo)
    Dado que reviso los textos de la portada
    Entonces no aparece la palabra "ingeniero titulado"
    Y no aparece el nombre del empleador
    Y no aparecen cifras ni testimonios
```

---

### HU-02 · Contactar por WhatsApp con un toque
**Origen:** RF-02 · **Prioridad:** M · **Estimación:** 1 h

> Como **dueño de negocio**, quiero **escribirle a Sebastián por WhatsApp con un toque y sin redactar desde cero**, para **contactarlo rápido desde mi celular**.

```gherkin
Característica: Enlace de WhatsApp

  Escenario: CA-02.1 Abrir WhatsApp desde el celular
    Dado que estoy en la página desde un celular con WhatsApp
    Cuando toco cualquier botón de WhatsApp
    Entonces se abre una conversación con el número +57 317 568 0756
    Y el mensaje inicial ya está escrito

  Escenario: CA-02.2 Abrir WhatsApp desde un computador (borde)
    Dado que estoy en la página desde un computador
    Cuando hago clic en un botón de WhatsApp
    Entonces se abre WhatsApp Web o la aplicación de escritorio en una pestaña nueva
    Y la página de Sebastián sigue abierta

  Escenario: CA-02.3 Tildes y caracteres especiales (borde)
    Dado que el mensaje inicial tiene tildes y la letra "ñ"
    Cuando se abre la conversación
    Entonces el mensaje se ve escrito correctamente, sin símbolos raros

  Escenario: CA-02.4 Todos los botones llevan al mismo número (negativo)
    Dado que reviso todos los botones de WhatsApp de la página
    Entonces ninguno apunta a un número diferente
```

---

### HU-03 · Botón flotante de WhatsApp
**Origen:** RF-03 · **Prioridad:** S · **Estimación:** 1 h · **Depende de:** HU-02

> Como **dueño de negocio**, quiero **tener siempre a mano el botón de WhatsApp**, para **escribir en el momento en que me convenza, sin volver arriba**.

```gherkin
Característica: Botón flotante

  Escenario: CA-03.1 Visible al desplazarse
    Dado que estoy en cualquier sección antes de Contacto
    Entonces veo el botón flotante de WhatsApp en una esquina inferior

  Escenario: CA-03.4 Se esconde donde ya están los datos de contacto
    Dado que llego a la sección Contacto o al pie de página
    Entonces el botón flotante se esconde
    Y no se puede alcanzar con la tecla Tab mientras está escondido
    Y vuelve a aparecer al subir a las secciones anteriores
    # Ajuste del 28 oct 2026: en Contacto el WhatsApp ya está en pantalla y el botón taparía el formulario (CA-03.2).

  Escenario: CA-03.2 No tapa contenido importante (borde)
    Dado que estoy en la sección Contacto en un celular de 360 px
    Entonces el botón flotante no tapa el botón de enviar ni los campos del formulario
    Y no tapa el pie de página

  Escenario: CA-03.3 Accesible
    Dado que uso un lector de pantalla
    Cuando llego al botón flotante
    Entonces se anuncia como "Escribir por WhatsApp"
    Y su área de toque mide al menos 44 x 44 px
```

---

### HU-04 · Menú de navegación
**Origen:** RF-04 · **Prioridad:** M · **Estimación:** 2,5 h

> Como **visitante**, quiero **saltar directo a la sección que me interesa**, para **no tener que recorrer toda la página**.

```gherkin
Característica: Menú

  Escenario: CA-04.1 Ir a una sección
    Dado que estoy en la página
    Cuando elijo "Servicios" en el menú
    Entonces la página me lleva a la sección Servicios
    Y el encabezado de la sección no queda tapado por el menú

  Escenario: CA-04.2 Menú en celular
    Dado que estoy en un celular
    Cuando toco el botón del menú
    Entonces se abre la lista de secciones
    Y al elegir una sección, el menú se cierra solo

  Escenario: CA-04.3 Cerrar el menú sin elegir (borde)
    Dado que el menú del celular está abierto
    Cuando toco el botón del menú otra vez o presiono la tecla Escape
    Entonces el menú se cierra

  Escenario: CA-04.4 Menú con teclado
    Dado que navego solo con el teclado
    Cuando recorro el menú con Tab y presiono Enter en una sección
    Entonces llego a esa sección
    Y el lector de pantalla anuncia si el menú está abierto o cerrado

  Escenario: CA-04.5 Funciona sin JavaScript (negativo)
    Dado que JavaScript está desactivado en el navegador
    Entonces los enlaces a las secciones siguen funcionando
```

---

### HU-05 · Conocer los servicios
**Origen:** RF-05 · **Prioridad:** M · **Estimación:** 2,5 h (7 servicios)

> Como **dueño de negocio**, quiero **ver qué servicios ofrece Sebastián y en qué me benefician**, para **saber si puede resolver lo que necesito**.

```gherkin
Característica: Servicios

  Escenario: CA-05.1 Los 7 servicios están presentes
    Dado que llego a la sección Servicios
    Entonces veo exactamente estos 7 servicios:
      | Páginas web institucionales                      |
      | Catálogos sin precios con cotización por WhatsApp |
      | Automatizaciones e inteligencia artificial       |
      | Revisión y pruebas de su página o aplicación     |
      | Presencia en Google y Google Maps                |
      | Alojamiento y mantenimiento                      |
      | Placas y tarjetas NFC para reseñas en Google     |
    Y cada uno tiene una línea con su beneficio para el negocio

  Escenario: CA-05.2 Lenguaje sin tecnicismos
    Dado que una persona no técnica lee los servicios
    Entonces entiende cada uno sin tener que preguntar

  Escenario: CA-05.3 Reglas de contenido (negativo)
    Dado que reviso los textos de Servicios
    Entonces no aparecen precios
    Y no se promete que la página "nunca se cae"
    Y el mantenimiento no se presenta como "acompañamiento para siempre"

  Escenario: CA-05.4 Automatizaciones e IA con ejemplos reales (negativo)
    Dado que leo el servicio de automatizaciones e inteligencia artificial
    Entonces muestra solo ejemplos que Sebastián puede entregar hoy
    Y no promete cifras de ahorro de tiempo ni de dinero

  Escenario: CA-05.5 Proyectos más grandes sin promesas (negativo)
    Dado que leo el bloque "¿Necesita algo más grande?"
    Entonces menciona tiendas en línea con pagos y proyectos a la medida
    Y dice que cada caso se evalúa antes de comprometerse
    Y no afirma "contamos con un equipo" mientras no esté confirmado
    Y su botón usa el enlace oficial de WhatsApp (CA-02.4)

  Escenario: CA-05.6 Explicación de NFC que entiende cualquiera
    Dado que un dueño de negocio que no conoce NFC lee la tarjeta destacada
    Entonces entiende en una o dos frases qué es y para qué le sirve
    Y la tarjeta no promete que funciona con todos los celulares
    Y en computador ocupa todo el ancho, sin quedar sola en su fila
```

---

### HU-06 · Saber cómo trabaja
**Origen:** RF-06 · **Prioridad:** M · **Estimación:** 1 h

> Como **dueño de negocio que ya tuvo una mala experiencia**, quiero **conocer los compromisos de Sebastián**, para **confiar en que no me va a pasar lo mismo**.

```gherkin
Característica: Cómo trabajo

  Escenario: CA-06.1 Los 6 compromisos están presentes
    Dado que llego a la sección Cómo trabajo
    Entonces veo estos 6 compromisos, cada uno con una explicación corta:
      | Todo a nombre del cliente          |
      | Todo claro desde el inicio         |
      | Revisión en cada etapa             |
      | Pruebas antes de publicar          |
      | Trato directo                      |
      | Soporte después de la entrega      |

  Escenario: CA-06.2 El soporte tiene límites claros (negativo)
    Dado que leo el compromiso "Soporte después de la entrega"
    Entonces dice que es corrección de errores por un periodo acordado
    Y no promete soporte indefinido
```

---

### HU-07 · Ver el proceso paso a paso
**Origen:** RF-07 · **Prioridad:** M · **Estimación:** 1 h

> Como **dueño de negocio**, quiero **ver los pasos del trabajo de principio a fin**, para **saber qué esperar y cuándo me toca participar**.

```gherkin
Característica: Proceso

  Escenario: CA-07.1 Los 7 pasos en orden
    Dado que llego a la sección Proceso
    Entonces veo los pasos numerados en este orden:
      | 1 | Conversamos   |
      | 2 | Propuesta     |
      | 3 | Acuerdo       |
      | 4 | Diseño        |
      | 5 | Construcción  |
      | 6 | Pruebas       |
      | 7 | Publicación   |

  Escenario: CA-07.2 Se lee bien en celular (borde)
    Dado que estoy en un celular de 360 px
    Entonces los pasos se muestran uno debajo del otro, en orden y sin cortarse

  Escenario: CA-07.3 El orden lo entiende un lector de pantalla
    Dado que uso un lector de pantalla
    Entonces los pasos se anuncian como una lista ordenada
```

---

### HU-08 · Ver proyectos realizados
**Origen:** RF-08 · **Prioridad:** M · **Estimación:** 2 h

> Como **dueño de negocio**, quiero **ver ejemplos de lo que Sebastián ha hecho**, para **comprobar que sabe hacer lo que ofrece**.

```gherkin
Característica: Proyectos

  Escenario: CA-08.1 Contenido de cada tarjeta
    Dado que llego a la sección Proyectos
    Entonces cada tarjeta muestra una imagen, un título, el problema que resuelve y qué se hizo
    Y cada imagen tiene un texto alternativo que la describe

  Escenario: CA-08.2 Sin nombres de clientes sin permiso (negativo)
    Dado que un cliente no ha dado permiso escrito
    Entonces su nombre, logo y datos reales no aparecen en ninguna tarjeta
    Y la maqueta del catálogo industrial usa datos genéricos

  Escenario: CA-08.3 Proyecto pendiente (borde)
    Dado que un proyecto todavía no está confirmado para mostrarse
    Entonces su tarjeta no se publica o aparece marcada como "[PENDIENTE]" solo en la versión de prueba

  Escenario: CA-08.4 Imágenes livianas
    Dado que reviso las imágenes de las tarjetas
    Entonces cada una pesa menos de 200 KB
    Y solo se cargan cuando la persona se acerca a la sección
```

---

### HU-09 · Abrir un proyecto para verlo en detalle
**Origen:** RF-09 · **Prioridad:** S · **Estimación:** 1 h · **Depende de:** HU-08

> Como **dueño de negocio**, quiero **abrir la maqueta o las capturas de un proyecto**, para **verlo funcionando y no solo leer sobre él**.

```gherkin
Característica: Detalle del proyecto

  Escenario: CA-09.1 Abrir en una pestaña nueva
    Dado que estoy en una tarjeta de proyecto con enlace
    Cuando toco "Ver las pantallas"
    Entonces el proyecto se abre en una pestaña nueva
    Y la página de Sebastián sigue abierta

  Escenario: CA-09.2 Enlace externo seguro
    Dado que reviso el enlace de "Ver las pantallas"
    Entonces tiene el atributo rel="noopener"

  Escenario: CA-09.3 Proyecto sin enlace (borde)
    Dado que un proyecto no tiene maqueta pública
    Entonces su tarjeta no muestra el botón "Ver las pantallas"
    Y no hay enlaces rotos
```

---

### HU-10 · Conocer a Sebastián
**Origen:** RF-10 · **Prioridad:** M · **Estimación:** 1 h

> Como **dueño de negocio**, quiero **saber quién es Sebastián y por qué la calidad es su diferencia**, para **sentir que trato con una persona real y confiable**.

```gherkin
Característica: Sobre mí

  Escenario: CA-10.1 Contenido de la sección
    Dado que llego a la sección Sobre mí
    Entonces veo el emblema: el arco verde con textura guilloché y el tigre de Gonztech en el centro (ADR-007, ADR-009)
    Y el emblema tiene un texto alternativo
    Y leo su perfil de profesional de QA
    Y leo por qué la calidad es su diferencia

  Escenario: CA-10.2 Estudios dichos con precisión (negativo)
    Dado que reviso los textos de Sobre mí
    Entonces dice "estudiante de Ingeniería de Software"
    Y no dice "ingeniero" ni "ingeniero titulado"
    Y no nombra al empleador

  Escenario: CA-10.3 El emblema se ve nítido en cualquier pantalla (borde)
    Dado que abro la página en un celular de 360 px y en un computador de 1280 px
    Entonces el emblema se ve nítido, sin pixelarse ni deformarse
    Y no hay ninguna imagen rota ni espacio vacío
```

---

### HU-11 · Ver los datos de contacto
**Origen:** RF-11 · **Prioridad:** M · **Estimación:** 0,5 h

> Como **dueño de negocio**, quiero **ver el WhatsApp y el correo de Sebastián**, para **contactarlo por el medio que prefiera**.

```gherkin
Característica: Datos de contacto

  Escenario: CA-11.1 Correo que se puede tocar
    Dado que estoy en la sección Contacto
    Cuando toco el correo contacto.gonztech@gmail.com (CC-12)
    Entonces se abre mi aplicación de correo con el destinatario ya escrito

  Escenario: CA-11.2 WhatsApp que se puede tocar
    Dado que estoy en la sección Contacto
    Cuando toco el número de WhatsApp
    Entonces se abre la conversación, como en CA-02.1

  Escenario: CA-11.3 Datos visibles como texto (borde)
    Dado que mi dispositivo no tiene aplicación de correo
    Entonces puedo leer y copiar el correo y el número como texto
```

---

### HU-12 · Enviar un mensaje por el formulario
**Origen:** RF-12 · **Prioridad:** S · **Estimación:** 3 h

> Como **dueño de negocio que no usa WhatsApp para trabajo**, quiero **dejar mis datos y mi mensaje en un formulario**, para **que Sebastián me contacte después**.

```gherkin
Característica: Formulario de contacto

  Escenario: CA-12.1 Envío exitoso
    Dado que lleno nombre, negocio, medio de contacto y mensaje
    Y marco la casilla de autorización de datos
    Cuando toco "Enviar"
    Entonces veo un mensaje que confirma el envío
    Y Sebastián recibe los datos

  Esquema del escenario: CA-12.2 Campo obligatorio vacío (negativo)
    Dado que dejo vacío el campo "<campo>"
    Cuando toco "Enviar"
    Entonces el formulario no se envía
    Y veo junto a "<campo>" un mensaje que explica qué falta

    Ejemplos:
      | campo             |
      | Nombre            |
      | Medio de contacto |
      | Mensaje           |

  Escenario: CA-12.3 Medio de contacto inválido (negativo)
    Dado que escribo "abc" como medio de contacto
    Cuando toco "Enviar"
    Entonces veo el mensaje "Escriba un correo o un número de celular válido"

  Escenario: CA-12.4 Mensaje demasiado largo (borde)
    Dado que escribo un mensaje de más de 1.000 caracteres
    Entonces el formulario no me deja seguir escribiendo
    Y me muestra cuántos caracteres quedan

  Escenario: CA-12.5 Doble clic en "Enviar" (borde)
    Dado que el formulario está completo
    Cuando toco "Enviar" dos veces seguidas
    Entonces el mensaje se envía una sola vez

  Escenario: CA-12.6 Falla de conexión (negativo)
    Dado que no tengo internet o el servicio no responde
    Cuando toco "Enviar"
    Entonces veo un mensaje de error que me ofrece escribir por WhatsApp
    Y lo que escribí no se borra

  Escenario: CA-12.7 Protección contra spam
    Dado que un programa automático llena el campo oculto trampa
    Cuando envía el formulario
    Entonces el mensaje se descarta

  Escenario: CA-12.8 Formulario accesible
    Dado que uso un lector de pantalla
    Entonces cada campo anuncia su etiqueta
    Y los mensajes de error se anuncian al aparecer
```

---

### HU-13 · Autorizar el tratamiento de mis datos
**Origen:** RF-13, RNF-11 · **Prioridad:** M · **Estimación:** 1 h · **Depende de:** HU-12, HU-14

> Como **visitante**, quiero **decidir si autorizo el uso de mis datos antes de enviarlos**, para **saber que se respetan mis derechos**.

```gherkin
Característica: Autorización de datos

  Escenario: CA-13.1 No se envía sin autorización (negativo)
    Dado que lleno el formulario completo
    Y no marco la casilla de autorización
    Cuando toco "Enviar"
    Entonces el formulario no se envía
    Y veo el mensaje "Debe autorizar el tratamiento de sus datos para continuar"

  Escenario: CA-13.2 La casilla viene sin marcar
    Dado que abro la página
    Entonces la casilla de autorización está desmarcada

  Escenario: CA-13.3 Enlace al aviso
    Dado que estoy junto a la casilla
    Cuando toco "aviso de privacidad"
    Entonces puedo leer el aviso sin perder lo que escribí en el formulario
```

---

### HU-14 · Leer el aviso de privacidad
**Origen:** RF-14, RNF-11 · **Prioridad:** M · **Estimación:** 1,5 h

> Como **visitante**, quiero **leer qué se hace con mis datos**, para **decidir con información si los entrego**.

```gherkin
Característica: Aviso de privacidad

  Escenario: CA-14.1 Contenido mínimo (Ley 1581 de 2012)
    Dado que abro el aviso de privacidad
    Entonces leo quién es el responsable y cómo contactarlo
    Y leo para qué se usan los datos
    Y leo los derechos del titular: conocer, actualizar, corregir y pedir que se borren sus datos
    Y leo cómo ejercer esos derechos

  Escenario: CA-14.2 Lenguaje sencillo
    Dado que una persona no técnica lee el aviso
    Entonces lo entiende sin ayuda

  Escenario: CA-14.3 Siempre accesible
    Dado que estoy en cualquier parte de la página
    Entonces puedo llegar al aviso desde el pie de página
```

---

### HU-15 · Pie de página
**Origen:** RF-15 · **Prioridad:** M · **Estimación:** 0,5 h

> Como **visitante**, quiero **un cierre con los datos básicos de la página**, para **saber que es un sitio serio y mantenido**.

```gherkin
Característica: Pie de página

  Escenario: CA-15.1 Contenido
    Dado que llego al final de la página
    Entonces veo "Gonztech · Sebastián González – Desarrollo web y calidad de software"
    Y veo el año actual
    Y veo un enlace al aviso de privacidad

  Escenario: CA-15.2 Año actualizado (borde)
    Dado que cambia el año
    Entonces el pie de página muestra el año nuevo sin que Sebastián lo edite a mano
```

---

### HU-16 · Vista previa al compartir
**Origen:** RF-16 · **Prioridad:** S · **Estimación:** 1 h

> Como **persona que recomienda a Sebastián**, quiero **que el enlace se vea bien al compartirlo por WhatsApp**, para **que quien lo recibe confíe y lo abra**.

```gherkin
Característica: Vista previa

  Escenario: CA-16.1 Vista previa en WhatsApp
    Dado que pego el enlace de la página en un chat de WhatsApp
    Entonces aparece una vista previa con título, descripción e imagen

  Escenario: CA-16.2 Imagen de la vista previa (borde)
    Dado que reviso la imagen de la vista previa
    Entonces mide 1200 x 630 px y pesa menos de 300 KB

  Escenario: CA-16.3 Título en el buscador
    Dado que la página aparece en Google
    Entonces el título dice "Gonztech | Desarrollo web y calidad de software"
```

---

## 3. Resumen y backlog por sprints

**Sprint** = una semana de trabajo de unas 10 a 15 horas. Las horas son solo de construcción. Las pruebas de QA de cada HU se hacen al cerrarla, según el flujo de `CLAUDE.md`.

| Sprint | Meta del sprint | HU | Horas |
|--------|-----------------|----|-------|
| **1** | Una página navegable con portada y WhatsApp funcionando | HU-00, HU-01, HU-02, HU-04, HU-03, HU-15 | 10 h |
| **2** | El contenido que genera confianza | HU-05, HU-06, HU-07, HU-08, HU-09, HU-10 | 8,5 h |
| **3** | Contacto completo y listo para compartir | HU-11, HU-14, HU-12, HU-13, HU-16 | 7 h |
| | **Total** | **17 HU** | **25,5 h** |

*Por qué este orden:* al terminar el Sprint 1 ya existe algo publicable con lo mínimo (quién es y cómo contactarlo). El formulario va de último porque es lo más complejo y depende de la decisión de la Fase 3.

| Prioridad | HU |
|-----------|----|
| M (debe tener) | HU-00, 01, 02, 04, 05, 06, 07, 08, 10, 11, 13, 14, 15 |
| S (debería tener) | HU-03, 09, 12, 16 |

---

## 4. Matriz de trazabilidad

Casos y resultados de la Fase 5 (29 oct 2026). Detalle en `plan-de-pruebas.md`.

| RF / RNF | HU | Criterios | Casos de prueba | Resultado |
|----------|----|-----------|-----------------|-----------|
| RNF-01, RNF-03, RNF-08, ADR-007 | HU-00 | CA-00.1 a CA-00.6 | CP-00.1 a CP-00.6 | ✅ 6/6 (OBS-01 corregida en CC-13) · ⏳ CA-00.5 en celular real |
| RF-01 | HU-01 | CA-01.1 a CA-01.3 | CP-01.1 a CP-01.3 | ✅ 2/3 · ⏳ CA-01.2 (Sebastián) |
| RF-02 | HU-02 | CA-02.1 a CA-02.4 | CP-02.1 a CP-02.4 | ✅ 4/4 · ⏳ CA-02.1 en celular real |
| RF-03 | HU-03 | CA-03.1 a CA-03.4 | CP-03.1 a CP-03.4 | ✅ 4/4 |
| RF-04 | HU-04 | CA-04.1 a CA-04.5 | CP-04.1 a CP-04.5 | ✅ 5/5 |
| RF-05 | HU-05 | CA-05.1 a CA-05.6 | CP-05.1 a CP-05.6 | ✅ 6/6 (OBS-02 en CC-13 · CA-05.4 confirmada en CC-14) |
| RF-06 | HU-06 | CA-06.1 a CA-06.2 | CP-06.1 a CP-06.2 | ✅ 2/2 |
| RF-07 | HU-07 | CA-07.1 a CA-07.3 | CP-07.1 a CP-07.3 | ✅ 3/3 |
| RF-08 | HU-08 | CA-08.1 a CA-08.4 | CP-08.1 a CP-08.4 | ✅ 4/4 |
| RF-09 | HU-09 | CA-09.1 a CA-09.3 | CP-09.1 a CP-09.3 | ✅ 3/3 (OBS-03 corregida en CC-13) |
| RF-10 | HU-10 | CA-10.1 a CA-10.3 | CP-10.1 a CP-10.3 | ✅ 3/3 |
| RF-11 | HU-11 | CA-11.1 a CA-11.3 | CP-11.1 a CP-11.3 | ✅ 3/3 |
| RF-12 | HU-12 | CA-12.1 a CA-12.8 | CP-12.1 a CP-12.8 | ✅ 8/8 · ⏳ envío real en Fase 7 |
| RF-13, RNF-11 | HU-13 | CA-13.1 a CA-13.3 | CP-13.1 a CP-13.3 | ✅ 3/3 |
| RF-14, RNF-11 | HU-14 | CA-14.1 a CA-14.3 | CP-14.1 a CP-14.3 | ✅ 3/3 · ⏳ fecha de vigencia y abogado (Fase 7) |
| RF-15 | HU-15 | CA-15.1 a CA-15.2 | CP-15.1 a CP-15.2 | ✅ 2/2 |
| RF-16, RNF-07 | HU-16 | CA-16.1 a CA-16.3 | CP-16.1 a CP-16.3 | ✅ 2/3 · ⏳ CA-16.1 (Fase 7) |

**RNF transversales** (se verifican en todas las HU con la DoD y en la Fase 5): RNF-02 rendimiento, RNF-04 y RNF-05 seguridad, RNF-06 compatibilidad, RNF-09 versionado y RNF-10 costo.
