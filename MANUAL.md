# ResQLink AI — Manual de Usuario

**Plataforma de Respuesta Humanitaria en Tiempo Real**

*Conectamos necesidades con recursos. Cada minuto cuenta.*

**Version 1.0 — Junio 2026**

---

## Contenido

1. [Introducción](#1-introducción)
2. [Primeros pasos](#2-primeros-pasos)
3. [Reportar una emergencia](#3-reportar-una-emergencia)
4. [Ofrecer ayuda](#4-ofrecer-ayuda)
5. [Dashboard](#5-dashboard)
6. [Mapa de emergencias](#6-mapa-de-emergencias)
7. [Centro de operaciones](#7-centro-de-operaciones)
8. [Recursos disponibles](#8-recursos-disponibles)
9. [Configuración de perfil](#9-configuración-de-perfil)
10. [Roles y permisos](#10-roles-y-permisos)
11. [Inteligencia artificial](#11-inteligencia-artificial)
12. [Modo offline (PWA)](#12-modo-offline-pwa)
13. [Preguntas frecuentes](#13-preguntas-frecuentes)

---

## 1. Introducción

ResQLink AI es una plataforma gratuita de respuesta humanitaria diseñada para situaciones de emergencia sísmica. Permite conectar en tiempo real a personas que necesitan ayuda con voluntarios, organizaciones y recursos disponibles.

La plataforma utiliza inteligencia artificial para priorizar incidentes, detectar reportes duplicados y recomendar recursos automáticamente. Todo funciona desde el navegador, sin necesidad de instalar nada.

### ¿Qué puedes hacer con ResQLink AI?

- Reportar emergencias con ubicación GPS automática
- Ofrecer recursos como alimentos, agua, medicinas o transporte
- Visualizar un mapa en tiempo real con todos los incidentes y recursos
- Coordinar voluntarios y asignar tareas desde el centro de operaciones
- Consultar estadísticas actualizadas en el dashboard

> **Consejo:** ResQLink AI funciona como PWA (Progressive Web App). Puedes instalarla en tu celular desde el navegador para usarla como una app nativa, incluso sin conexión a internet.

---

## 2. Primeros pasos

### 2.1 Crear una cuenta

Para acceder a todas las funcionalidades de ResQLink AI necesitas crear una cuenta. El registro es rápido y gratuito.

**Paso 1:** Abre la aplicación y haz clic en **"Iniciar sesión"** en la parte inferior de la pantalla principal.

**Paso 2:** Haz clic en **"Regístrate"** en la parte inferior del formulario de login.

**Paso 3:** Completa los campos:
- **Nombre completo**
- **Email**
- **Teléfono**
- **Contraseña** (mínimo 6 caracteres)
- **Rol** (Ciudadano, Voluntario u Organización)

**Paso 4:** Presiona **"Crear cuenta"**. Serás redirigido automáticamente al Dashboard.

> **Consejo:** Si eres voluntario, selecciona el rol "Voluntario" para recibir asignaciones de incidentes. Si representas a una organización, selecciona "Organización".

### 2.2 Iniciar sesión

Si ya tienes una cuenta, simplemente ingresa tu email y contraseña en la página de login y presiona **"Entrar"**.

---

## 3. Reportar una emergencia

Esta es la función principal de ResQLink AI. Fue diseñada para que puedas reportar una emergencia **en menos de 30 segundos**, incluso bajo situaciones de estrés.

> **Importante:** No necesitas tener cuenta para reportar una emergencia. Cualquier persona puede enviar un reporte.

### 3.1 Formulario de reporte

**Paso 1:** Desde la pantalla principal, presiona el botón rojo **"🆘 Necesito ayuda"**.

**Paso 2:** Selecciona el **tipo de emergencia**:

| Categoría | Descripción |
|-----------|-------------|
| Personas atrapadas | Personas bajo escombros o sin salida |
| Emergencia médica | Heridos que necesitan atención médica |
| Incendio | Fuego activo en estructura o zona |
| Daño estructural | Edificios o vías con daño severo |
| Inundación | Zonas inundadas o en riesgo |
| Deslizamiento | Deslizamiento de tierra activo |
| Personas desaparecidas | Familiares o personas sin localizar |
| Necesidad de refugio | Personas sin techo o desplazadas |
| Alimento / Agua | Necesidad básica de alimentos o agua |
| Otro | Cualquier otra emergencia |

**Paso 3:** Escribe la **dirección o referencia** del lugar. Puedes presionar el ícono de ubicación para usar tu GPS automático.

**Paso 4:** Indica cuántas **personas están afectadas**.

**Paso 5:** Escribe una **descripción breve** de la situación.

**Paso 6:** Opcionalmente, toma o sube hasta **4 fotografías** del lugar.

**Paso 7:** Presiona **"Enviar reporte"**.

### 3.2 GPS automático

Al abrir el formulario, la aplicación solicita automáticamente tu ubicación GPS. Si aceptas, las coordenadas se adjuntan al reporte para que los equipos de respuesta puedan localizarte con precisión en el mapa.

> **Consejo:** Acepta el permiso de ubicación del navegador para que tu reporte sea más preciso. Si no puedes, escribe la dirección manualmente.

---

## 4. Ofrecer ayuda

Si tienes recursos que puedes donar o compartir, regístralos para que las personas y organizaciones que los necesitan puedan encontrarlos en el mapa.

### 4.1 Registrar un recurso

**Paso 1:** Desde la pantalla principal, presiona el botón azul **"🤝 Quiero ayudar"**.

**Paso 2:** Selecciona el **tipo de recurso** que ofreces:

| Tipo | Ejemplo |
|------|---------|
| Alimentos | Paquetes de arroz, enlatados, galletas |
| Agua | Botellas, tanques, agua potable |
| Medicinas | Botiquines, antibióticos, vendas |
| Ropa | Cobijas, chaquetas, zapatos |
| Refugio | Espacio disponible en casa o local |
| Transporte | Vehículo para trasladar personas |
| Equipamiento | Herramientas, linternas, generadores |
| Personal | Médicos, enfermeros, ingenieros |
| Sangre | Donación de sangre disponible |
| Otro | Cualquier otro recurso |

**Paso 3:** Escribe un **nombre descriptivo** (ej: "100 litros de agua potable").

**Paso 4:** Indica la **cantidad** y la **unidad** (litros, kg, unidades).

**Paso 5:** Escribe la **dirección** donde se puede recoger el recurso.

**Paso 6:** Ingresa tu **teléfono de contacto**.

**Paso 7:** Presiona **"Registrar recurso"**.

> **Consejo:** Tu recurso aparecerá inmediatamente en el mapa como un marcador azul. Cualquier persona u organización podrá contactarte.

---

## 5. Dashboard

El Dashboard es el centro de control de la plataforma. Muestra una visión general de toda la emergencia con estadísticas actualizadas en tiempo real.

### 5.1 Estadísticas en tiempo real

El panel superior muestra 7 tarjetas con métricas clave:

| Métrica | Descripción | Color |
|---------|-------------|-------|
| Incidentes activos | Emergencias pendientes de resolver | 🔴 Rojo |
| Personas afectadas | Total de personas en emergencia | 🟠 Naranja |
| Recursos disponibles | Recursos registrados y activos | 🔵 Azul |
| Voluntarios activos | Voluntarios disponibles | 🟢 Verde |
| Refugios | Refugios habilitados | 🔵 Cyan |
| Hospitales | Hospitales registrados | 🟣 Morado |
| Casos resueltos | Incidentes cerrados exitosamente | 🟢 Esmeralda |

### 5.2 Mapa interactivo

Debajo de las estadísticas se muestra un mapa en tiempo real con todos los incidentes activos. Los marcadores tienen colores según la prioridad del incidente:

| Color del marcador | Prioridad |
|-------------------|-----------|
| 🔴 Rojo grande | **Crítica** — requiere atención inmediata |
| 🟠 Naranja | **Alta** — urgente |
| 🟡 Amarillo | **Media** — importante pero no inmediato |
| 🟢 Verde | **Baja** — sin riesgo de vida |

A la derecha del mapa se muestra la lista de incidentes recientes con su categoría, prioridad, estado, dirección y tiempo transcurrido.

---

## 6. Mapa de emergencias

La página de Mapa muestra una vista completa de todos los puntos de interés durante la emergencia. Se actualiza en tiempo real: cada nuevo reporte o recurso aparece instantáneamente.

### 6.1 Filtros del mapa

Puedes activar o desactivar cada tipo de marcador usando los botones de filtro:

| Filtro | Qué muestra |
|--------|-------------|
| Emergencias | Incidentes reportados (rojo/naranja/amarillo/verde) |
| Recursos | Puntos de ayuda disponibles (azul) |
| Hospitales | Centros médicos (morado) |
| Refugios | Refugios habilitados (cyan) |
| Vías bloqueadas | Calles intransitables (gris oscuro) |

### 6.2 Marcadores

Cada marcador en el mapa es interactivo. Al hacer clic sobre uno, se despliega un popup con el título y el tipo de punto. Los marcadores de incidentes varían de tamaño según su prioridad: los críticos son más grandes para ser más visibles.

---

## 7. Centro de operaciones

El Centro de Operaciones es la herramienta principal para coordinadores y administradores. Permite gestionar todos los incidentes, asignar equipos y hacer seguimiento.

### 7.1 Gestionar incidentes

Los incidentes se organizan en tres pestañas:

- **Pendientes:** Reportes nuevos que aún no han sido atendidos.
- **En progreso:** Incidentes que ya tienen asignación o están siendo atendidos.
- **Resueltos:** Casos cerrados exitosamente.

### 7.2 Cambiar estados

Cada incidente muestra botones de acción según su estado actual:

| Estado actual | Acción disponible | Nuevo estado |
|--------------|-------------------|--------------|
| Pendiente | Botón "Atender" | En progreso |
| En progreso | Botón "Resolver" | Resuelto |
| Resuelto | — | Caso cerrado |

Puedes filtrar incidentes por prioridad (Crítica, Alta, Media, Baja) usando el selector en la esquina superior.

---

## 8. Recursos disponibles

La sección de Recursos muestra todos los recursos registrados por ciudadanos, voluntarios y organizaciones. Puedes filtrar por tipo de recurso y ver la disponibilidad de cada uno.

Cada tarjeta de recurso muestra:

- Nombre del recurso y tipo
- Cantidad y unidad disponible
- Estado: **Disponible** o **Agotado**
- Dirección de recogida
- Teléfono de contacto

> **Consejo:** Para registrar un nuevo recurso, presiona el botón "Ofrecer recurso" en la esquina superior derecha.

---

## 9. Configuración de perfil

En la sección de Configuración puedes editar tu información personal:

- **Nombre:** tu nombre visible en la plataforma.
- **Teléfono:** número de contacto.
- **Email:** no editable (se usa para autenticación).
- **Rol:** no editable desde esta pantalla (solo un administrador puede cambiarlo).

Presiona **"Guardar cambios"** para actualizar tu perfil.

---

## 10. Roles y permisos

ResQLink AI tiene 4 roles con diferentes niveles de acceso:

| Rol | Permisos | Quién lo usa |
|-----|----------|--------------|
| **Ciudadano** | Reportar emergencias, ofrecer recursos, ver mapa | Cualquier persona |
| **Voluntario** | Todo lo anterior + recibir asignaciones de incidentes | Personas registradas como voluntarios |
| **Organización** | Todo lo anterior + gestionar equipos y recursos de la organización | ONGs, hospitales, empresas |
| **Administrador** | Acceso total: gestionar usuarios, incidentes, configuración del sistema | Coordinadores de emergencia |

> **Importante:** El rol de Administrador solo puede ser asignado directamente desde la base de datos de Supabase por seguridad.

---

## 11. Inteligencia artificial

ResQLink AI utiliza inteligencia artificial para agilizar la respuesta a emergencias. La IA trabaja de forma automática en segundo plano, sin que el usuario tenga que hacer nada adicional.

### Funciones de IA

| Función | Qué hace | Cómo ayuda |
|---------|----------|------------|
| **Clasificar prioridad** | Analiza la descripción y categoría para asignar prioridad automáticamente | Los incidentes críticos se atienden primero |
| **Detectar duplicados** | Compara nuevos reportes con los existentes | Evita saturar el sistema con reportes repetidos |
| **Recomendar recursos** | Sugiere qué tipo de recursos se necesitan según el incidente | Acelera la asignación de ayuda |
| **Resumir incidentes** | Genera un resumen conciso del estado actual | Facilita la coordinación entre equipos |

> **Consejo:** La IA está preparada para funcionar con OpenAI (GPT-4o), Google Gemini y Anthropic Claude. Actualmente usa OpenAI como motor principal.

---

## 12. Modo offline (PWA)

ResQLink AI funciona como una Progressive Web App (PWA), lo que significa que puedes instalarla en tu celular o computador y usarla como una aplicación nativa.

### Cómo instalar la PWA

**Paso 1:** Abre ResQLink AI en el navegador de tu celular (Chrome recomendado).

**Paso 2:** Toca el menú del navegador (tres puntos) y selecciona **"Instalar app"** o **"Agregar a pantalla de inicio"**.

**Paso 3:** La app se instalará como un ícono en tu pantalla de inicio.

### Funcionalidad offline

- Si pierdes conexión a internet, puedes seguir llenando reportes de emergencia.
- Los reportes se guardan localmente en tu dispositivo.
- Cuando la conexión se restablezca, los reportes se envían automáticamente.

> **Importante:** El mapa requiere conexión a internet para cargar los tiles de OpenStreetMap. Sin embargo, los datos ya cargados permanecen visibles.

---

## 13. Preguntas frecuentes

**¿Necesito crear una cuenta para reportar una emergencia?**
No. Cualquier persona puede reportar una emergencia sin registrarse. La cuenta es necesaria para acceder al Dashboard, Centro de Operaciones y funciones avanzadas.

**¿La aplicación es gratuita?**
Sí, ResQLink AI es completamente gratuita. Es una plataforma humanitaria de código abierto.

**¿Funciona en mi celular?**
Sí. Está optimizada para móviles (mobile-first). Funciona en cualquier navegador moderno: Chrome, Safari, Firefox, Edge.

**¿Qué tan rápido aparece mi reporte en el mapa?**
Instantáneamente. Gracias a la tecnología de tiempo real de Supabase, tu reporte aparece en el mapa de todos los usuarios en menos de 1 segundo.

**¿Puedo usar la app sin internet?**
Parcialmente. Puedes llenar formularios offline y se enviarán cuando recuperes la conexión. El mapa necesita internet para cargar.

**¿Quién puede ver mis datos personales?**
Solo los administradores del sistema. Tu email y teléfono están protegidos por Row Level Security en la base de datos.

**¿Cómo se determina la prioridad de un incidente?**
La inteligencia artificial analiza la categoría, la cantidad de personas afectadas y la descripción para asignar una prioridad automática (Crítica, Alta, Media o Baja).

**¿Puedo modificar un reporte después de enviarlo?**
Actualmente solo los administradores pueden modificar reportes desde el Centro de Operaciones.

**¿En qué idioma funciona la aplicación?**
La interfaz está en español. La IA puede procesar descripciones en español e inglés.

**¿Cómo contacto al equipo de soporte?**
Escribe al correo del administrador de la plataforma o utiliza la sección de Configuración para enviar un mensaje.

---

*ResQLink AI — Cada minuto cuenta. Cada conexión salva vidas.*

*Plataforma gratuita de respuesta humanitaria. Potenciada por Inteligencia Artificial.*
