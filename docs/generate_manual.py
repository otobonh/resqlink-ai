from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    HRFlowable, ListFlowable, ListItem, KeepTogether
)
from reportlab.pdfgen import canvas
import os

RED = HexColor('#DC2626')
BLUE = HexColor('#2563EB')
DARK = HexColor('#0A0A0A')
GRAY = HexColor('#6B7280')
LIGHT_GRAY = HexColor('#F3F4F6')
LIGHT_RED = HexColor('#FEE2E2')
LIGHT_BLUE = HexColor('#DBEAFE')
GREEN = HexColor('#16A34A')
ORANGE = HexColor('#EA580C')
PURPLE = HexColor('#7C3AED')
CYAN = HexColor('#0891B2')

output_path = os.path.join(os.path.dirname(__file__), '..', 'Manual_ResQLink_AI.pdf')

doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    rightMargin=60, leftMargin=60,
    topMargin=70, bottomMargin=60,
    title='Manual de Usuario - ResQLink AI',
    author='ResQLink AI',
)

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    'CoverTitle', parent=styles['Title'],
    fontSize=36, leading=42, textColor=DARK,
    spaceAfter=6, alignment=TA_CENTER, fontName='Helvetica-Bold',
))
styles.add(ParagraphStyle(
    'CoverSub', parent=styles['Normal'],
    fontSize=16, leading=22, textColor=GRAY,
    alignment=TA_CENTER, spaceAfter=4,
))
styles.add(ParagraphStyle(
    'H1', parent=styles['Heading1'],
    fontSize=24, leading=30, textColor=RED,
    spaceBefore=30, spaceAfter=14, fontName='Helvetica-Bold',
))
styles.add(ParagraphStyle(
    'H2', parent=styles['Heading2'],
    fontSize=18, leading=24, textColor=DARK,
    spaceBefore=20, spaceAfter=10, fontName='Helvetica-Bold',
))
styles.add(ParagraphStyle(
    'H3', parent=styles['Heading3'],
    fontSize=14, leading=18, textColor=BLUE,
    spaceBefore=14, spaceAfter=8, fontName='Helvetica-Bold',
))
styles.add(ParagraphStyle(
    'Body', parent=styles['Normal'],
    fontSize=11, leading=16, textColor=DARK,
    spaceAfter=8, alignment=TA_JUSTIFY,
))
styles.add(ParagraphStyle(
    'BodyBold', parent=styles['Normal'],
    fontSize=11, leading=16, textColor=DARK,
    spaceAfter=8, fontName='Helvetica-Bold',
))
styles.add(ParagraphStyle(
    'Tip', parent=styles['Normal'],
    fontSize=10, leading=14, textColor=HexColor('#1E40AF'),
    spaceAfter=8, leftIndent=20, borderPadding=8,
    backColor=LIGHT_BLUE, borderWidth=0,
))
styles.add(ParagraphStyle(
    'Warning', parent=styles['Normal'],
    fontSize=10, leading=14, textColor=HexColor('#991B1B'),
    spaceAfter=8, leftIndent=20, borderPadding=8,
    backColor=LIGHT_RED, borderWidth=0,
))
styles.add(ParagraphStyle(
    'StepNum', parent=styles['Normal'],
    fontSize=11, leading=16, textColor=white,
    fontName='Helvetica-Bold', alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    'Footer', parent=styles['Normal'],
    fontSize=8, leading=10, textColor=GRAY, alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    'TOCEntry', parent=styles['Normal'],
    fontSize=12, leading=20, textColor=DARK,
    leftIndent=10, spaceAfter=2,
))
styles.add(ParagraphStyle(
    'TOCSubEntry', parent=styles['Normal'],
    fontSize=11, leading=18, textColor=GRAY,
    leftIndent=30, spaceAfter=1,
))

story = []

def add_cover():
    story.append(Spacer(1, 2.5 * inch))
    story.append(Paragraph('ResQLink AI', styles['CoverTitle']))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width='40%', thickness=3, color=RED, spaceAfter=10, spaceBefore=4))
    story.append(Paragraph('Manual de Usuario', styles['CoverSub']))
    story.append(Spacer(1, 10))
    story.append(Paragraph('Plataforma de Respuesta Humanitaria en Tiempo Real', styles['CoverSub']))
    story.append(Spacer(1, 1.5 * inch))
    story.append(Paragraph('Conectamos necesidades con recursos.', ParagraphStyle(
        'tagline', parent=styles['Normal'], fontSize=13, textColor=GRAY, alignment=TA_CENTER,
        fontName='Helvetica-Oblique',
    )))
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph('Version 1.0 — Junio 2026', ParagraphStyle(
        'version', parent=styles['Normal'], fontSize=10, textColor=GRAY, alignment=TA_CENTER,
    )))
    story.append(PageBreak())

def add_toc():
    story.append(Paragraph('Contenido', styles['H1']))
    story.append(Spacer(1, 10))
    toc_items = [
        ('1.', 'Introduccion'),
        ('2.', 'Primeros pasos'),
        ('', '2.1 Crear una cuenta'),
        ('', '2.2 Iniciar sesion'),
        ('3.', 'Reportar una emergencia'),
        ('', '3.1 Formulario de reporte'),
        ('', '3.2 GPS automatico'),
        ('4.', 'Ofrecer ayuda'),
        ('', '4.1 Registrar un recurso'),
        ('5.', 'Dashboard'),
        ('', '5.1 Estadisticas en tiempo real'),
        ('', '5.2 Mapa interactivo'),
        ('6.', 'Mapa de emergencias'),
        ('', '6.1 Filtros del mapa'),
        ('', '6.2 Marcadores'),
        ('7.', 'Centro de operaciones'),
        ('', '7.1 Gestionar incidentes'),
        ('', '7.2 Cambiar estados'),
        ('8.', 'Recursos disponibles'),
        ('9.', 'Configuracion de perfil'),
        ('10.', 'Roles y permisos'),
        ('11.', 'Inteligencia artificial'),
        ('12.', 'Modo offline (PWA)'),
        ('13.', 'Preguntas frecuentes'),
    ]
    for num, title in toc_items:
        if num:
            story.append(Paragraph(f'<b>{num}</b>  {title}', styles['TOCEntry']))
        else:
            story.append(Paragraph(title, styles['TOCSubEntry']))
    story.append(PageBreak())

def tip(text):
    story.append(Paragraph(f'<b>Consejo:</b> {text}', styles['Tip']))

def warning(text):
    story.append(Paragraph(f'<b>Importante:</b> {text}', styles['Warning']))

def step(number, text):
    data = [[
        Paragraph(str(number), styles['StepNum']),
        Paragraph(text, styles['Body']),
    ]]
    t = Table(data, colWidths=[30, None])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), RED),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (1, 0), (1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 4))

def section_table(headers, rows):
    data = [headers] + rows
    col_count = len(headers)
    col_w = (letter[0] - 120) / col_count
    t = Table(data, colWidths=[col_w] * col_count)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#E5E7EB')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, LIGHT_GRAY]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t)
    story.append(Spacer(1, 12))

# ============== BUILD MANUAL ==============

add_cover()
add_toc()

# 1. INTRODUCCION
story.append(Paragraph('1. Introduccion', styles['H1']))
story.append(Paragraph(
    'ResQLink AI es una plataforma gratuita de respuesta humanitaria disenada para situaciones de emergencia sismica. '
    'Permite conectar en tiempo real a personas que necesitan ayuda con voluntarios, organizaciones y recursos disponibles.',
    styles['Body']
))
story.append(Paragraph(
    'La plataforma utiliza inteligencia artificial para priorizar incidentes, detectar reportes duplicados y '
    'recomendar recursos automaticamente. Todo funciona desde el navegador, sin necesidad de instalar nada.',
    styles['Body']
))
story.append(Paragraph('Que puedes hacer con ResQLink AI:', styles['BodyBold']))
story.append(ListFlowable([
    ListItem(Paragraph('Reportar emergencias con ubicacion GPS automatica', styles['Body']), bulletColor=RED),
    ListItem(Paragraph('Ofrecer recursos como alimentos, agua, medicinas o transporte', styles['Body']), bulletColor=RED),
    ListItem(Paragraph('Visualizar un mapa en tiempo real con todos los incidentes y recursos', styles['Body']), bulletColor=RED),
    ListItem(Paragraph('Coordinar voluntarios y asignar tareas desde el centro de operaciones', styles['Body']), bulletColor=RED),
    ListItem(Paragraph('Consultar estadisticas actualizadas en el dashboard', styles['Body']), bulletColor=RED),
], bulletType='bullet', start=None))
tip('ResQLink AI funciona como PWA (Progressive Web App). Puedes instalarla en tu celular desde el navegador para usarla como una app nativa, incluso sin conexion a internet.')
story.append(PageBreak())

# 2. PRIMEROS PASOS
story.append(Paragraph('2. Primeros pasos', styles['H1']))

story.append(Paragraph('2.1 Crear una cuenta', styles['H2']))
story.append(Paragraph(
    'Para acceder a todas las funcionalidades de ResQLink AI necesitas crear una cuenta. '
    'El registro es rapido y gratuito.',
    styles['Body']
))
step(1, 'Abre la aplicacion y haz clic en <b>"Iniciar sesion"</b> en la parte inferior de la pantalla principal.')
step(2, 'Haz clic en <b>"Registrate"</b> en la parte inferior del formulario de login.')
step(3, 'Completa los campos: <b>Nombre completo</b>, <b>Email</b>, <b>Telefono</b>, <b>Contrasena</b> (minimo 6 caracteres) y selecciona tu <b>Rol</b>.')
step(4, 'Presiona <b>"Crear cuenta"</b>. Seras redirigido automaticamente al Dashboard.')
tip('Si eres voluntario, selecciona el rol "Voluntario" para recibir asignaciones de incidentes. Si representas a una organizacion, selecciona "Organizacion".')

story.append(Spacer(1, 10))
story.append(Paragraph('2.2 Iniciar sesion', styles['H2']))
story.append(Paragraph(
    'Si ya tienes una cuenta, simplemente ingresa tu email y contrasena en la pagina de login y presiona "Entrar".',
    styles['Body']
))
story.append(PageBreak())

# 3. REPORTAR EMERGENCIA
story.append(Paragraph('3. Reportar una emergencia', styles['H1']))
story.append(Paragraph(
    'Esta es la funcion principal de ResQLink AI. Fue disenada para que puedas reportar una emergencia '
    'en menos de 30 segundos, incluso bajo situaciones de estres.',
    styles['Body']
))
warning('No necesitas tener cuenta para reportar una emergencia. Cualquier persona puede enviar un reporte.')

story.append(Spacer(1, 8))
story.append(Paragraph('3.1 Formulario de reporte', styles['H2']))
step(1, 'Desde la pantalla principal, presiona el boton rojo <b>"Necesito ayuda"</b>.')
step(2, 'Selecciona el <b>tipo de emergencia</b>:')

section_table(
    ['Categoria', 'Descripcion'],
    [
        ['Personas atrapadas', 'Personas bajo escombros o sin salida'],
        ['Emergencia medica', 'Heridos que necesitan atencion medica'],
        ['Incendio', 'Fuego activo en estructura o zona'],
        ['Dano estructural', 'Edificios o vias con dano severo'],
        ['Inundacion', 'Zonas inundadas o en riesgo'],
        ['Deslizamiento', 'Deslizamiento de tierra activo'],
        ['Personas desaparecidas', 'Familiares o personas sin localizar'],
        ['Necesidad de refugio', 'Personas sin techo o desplazadas'],
        ['Alimento / Agua', 'Necesidad basica de alimentos o agua'],
        ['Otro', 'Cualquier otra emergencia'],
    ]
)

step(3, 'Escribe la <b>direccion o referencia</b> del lugar. Puedes presionar el icono de ubicacion para usar tu GPS automatico.')
step(4, 'Indica cuantas <b>personas estan afectadas</b>.')
step(5, 'Escribe una <b>descripcion breve</b> de la situacion.')
step(6, 'Opcionalmente, toma o sube hasta <b>4 fotografias</b> del lugar.')
step(7, 'Presiona <b>"Enviar reporte"</b>.')

story.append(Spacer(1, 8))
story.append(Paragraph('3.2 GPS automatico', styles['H2']))
story.append(Paragraph(
    'Al abrir el formulario, la aplicacion solicita automaticamente tu ubicacion GPS. '
    'Si aceptas, las coordenadas se adjuntan al reporte para que los equipos de respuesta '
    'puedan localizarte con precision en el mapa.',
    styles['Body']
))
tip('Acepta el permiso de ubicacion del navegador para que tu reporte sea mas preciso. Si no puedes, escribe la direccion manualmente.')
story.append(PageBreak())

# 4. OFRECER AYUDA
story.append(Paragraph('4. Ofrecer ayuda', styles['H1']))
story.append(Paragraph(
    'Si tienes recursos que puedes donar o compartir, registralos para que las personas y organizaciones '
    'que los necesitan puedan encontrarlos en el mapa.',
    styles['Body']
))

story.append(Paragraph('4.1 Registrar un recurso', styles['H2']))
step(1, 'Desde la pantalla principal, presiona el boton azul <b>"Quiero ayudar"</b>.')
step(2, 'Selecciona el <b>tipo de recurso</b> que ofreces:')

section_table(
    ['Tipo', 'Ejemplo'],
    [
        ['Alimentos', 'Paquetes de arroz, enlatados, galletas'],
        ['Agua', 'Botellas, tanques, agua potable'],
        ['Medicinas', 'Botiquines, antibioticos, vendas'],
        ['Ropa', 'Cobijas, chaquetas, zapatos'],
        ['Refugio', 'Espacio disponible en casa o local'],
        ['Transporte', 'Vehiculo para trasladar personas'],
        ['Equipamiento', 'Herramientas, linternas, generadores'],
        ['Personal', 'Medicos, enfermeros, ingenieros'],
        ['Sangre', 'Donacion de sangre disponible'],
        ['Otro', 'Cualquier otro recurso'],
    ]
)

step(3, 'Escribe un <b>nombre descriptivo</b> (ej: "100 litros de agua potable").')
step(4, 'Indica la <b>cantidad</b> y la <b>unidad</b> (litros, kg, unidades).')
step(5, 'Escribe la <b>direccion</b> donde se puede recoger el recurso.')
step(6, 'Ingresa tu <b>telefono de contacto</b>.')
step(7, 'Presiona <b>"Registrar recurso"</b>.')

tip('Tu recurso aparecera inmediatamente en el mapa como un marcador azul. Cualquier persona o organizacion podra contactarte.')
story.append(PageBreak())

# 5. DASHBOARD
story.append(Paragraph('5. Dashboard', styles['H1']))
story.append(Paragraph(
    'El Dashboard es el centro de control de la plataforma. Muestra una vision general de toda la emergencia '
    'con estadisticas actualizadas en tiempo real.',
    styles['Body']
))

story.append(Paragraph('5.1 Estadisticas en tiempo real', styles['H2']))
story.append(Paragraph('El panel superior muestra 7 tarjetas con metricas clave:', styles['Body']))

section_table(
    ['Metrica', 'Descripcion', 'Color'],
    [
        ['Incidentes activos', 'Emergencias pendientes de resolver', 'Rojo'],
        ['Personas afectadas', 'Total de personas en emergencia', 'Naranja'],
        ['Recursos disponibles', 'Recursos registrados y activos', 'Azul'],
        ['Voluntarios activos', 'Voluntarios disponibles', 'Verde'],
        ['Refugios', 'Refugios habilitados', 'Cyan'],
        ['Hospitales', 'Hospitales registrados', 'Morado'],
        ['Casos resueltos', 'Incidentes cerrados exitosamente', 'Esmeralda'],
    ]
)

story.append(Paragraph('5.2 Mapa interactivo', styles['H2']))
story.append(Paragraph(
    'Debajo de las estadisticas se muestra un mapa en tiempo real con todos los incidentes activos. '
    'Los marcadores tienen colores segun la prioridad del incidente:',
    styles['Body']
))

section_table(
    ['Color del marcador', 'Prioridad'],
    [
        ['Rojo grande', 'Critica — requiere atencion inmediata'],
        ['Naranja', 'Alta — urgente'],
        ['Amarillo', 'Media — importante pero no inmediato'],
        ['Verde', 'Baja — sin riesgo de vida'],
    ]
)

story.append(Paragraph(
    'A la derecha del mapa se muestra la lista de incidentes recientes con su categoria, prioridad, '
    'estado, direccion y tiempo transcurrido.',
    styles['Body']
))
story.append(PageBreak())

# 6. MAPA
story.append(Paragraph('6. Mapa de emergencias', styles['H1']))
story.append(Paragraph(
    'La pagina de Mapa muestra una vista completa de todos los puntos de interes durante la emergencia. '
    'Se actualiza en tiempo real: cada nuevo reporte o recurso aparece instantaneamente.',
    styles['Body']
))

story.append(Paragraph('6.1 Filtros del mapa', styles['H2']))
story.append(Paragraph('Puedes activar o desactivar cada tipo de marcador usando los botones de filtro:', styles['Body']))

section_table(
    ['Filtro', 'Que muestra'],
    [
        ['Emergencias', 'Incidentes reportados (rojo/naranja/amarillo/verde)'],
        ['Recursos', 'Puntos de ayuda disponibles (azul)'],
        ['Hospitales', 'Centros medicos (morado)'],
        ['Refugios', 'Refugios habilitados (cyan)'],
        ['Vias bloqueadas', 'Calles intransitables (gris oscuro)'],
    ]
)

story.append(Paragraph('6.2 Marcadores', styles['H2']))
story.append(Paragraph(
    'Cada marcador en el mapa es interactivo. Al hacer clic sobre uno, se despliega un popup con '
    'el titulo y el tipo de punto. Los marcadores de incidentes varian de tamano segun su prioridad: '
    'los criticos son mas grandes para ser mas visibles.',
    styles['Body']
))
story.append(PageBreak())

# 7. CENTRO DE OPERACIONES
story.append(Paragraph('7. Centro de operaciones', styles['H1']))
story.append(Paragraph(
    'El Centro de Operaciones es la herramienta principal para coordinadores y administradores. '
    'Permite gestionar todos los incidentes, asignar equipos y hacer seguimiento.',
    styles['Body']
))

story.append(Paragraph('7.1 Gestionar incidentes', styles['H2']))
story.append(Paragraph(
    'Los incidentes se organizan en tres pestanas:',
    styles['Body']
))
story.append(ListFlowable([
    ListItem(Paragraph('<b>Pendientes:</b> Reportes nuevos que aun no han sido atendidos.', styles['Body']), bulletColor=RED),
    ListItem(Paragraph('<b>En progreso:</b> Incidentes que ya tienen asignacion o estan siendo atendidos.', styles['Body']), bulletColor=ORANGE),
    ListItem(Paragraph('<b>Resueltos:</b> Casos cerrados exitosamente.', styles['Body']), bulletColor=GREEN),
], bulletType='bullet', start=None))

story.append(Paragraph('7.2 Cambiar estados', styles['H2']))
story.append(Paragraph('Cada incidente muestra botones de accion segun su estado actual:', styles['Body']))

section_table(
    ['Estado actual', 'Accion disponible', 'Nuevo estado'],
    [
        ['Pendiente', 'Boton "Atender"', 'En progreso'],
        ['En progreso', 'Boton "Resolver"', 'Resuelto'],
        ['Resuelto', '—', 'Caso cerrado'],
    ]
)

story.append(Paragraph(
    'Puedes filtrar incidentes por prioridad (Critica, Alta, Media, Baja) usando el selector en la esquina superior.',
    styles['Body']
))
story.append(PageBreak())

# 8. RECURSOS
story.append(Paragraph('8. Recursos disponibles', styles['H1']))
story.append(Paragraph(
    'La seccion de Recursos muestra todos los recursos registrados por ciudadanos, voluntarios y organizaciones. '
    'Puedes filtrar por tipo de recurso y ver la disponibilidad de cada uno.',
    styles['Body']
))
story.append(Paragraph('Cada tarjeta de recurso muestra:', styles['Body']))
story.append(ListFlowable([
    ListItem(Paragraph('Nombre del recurso y tipo', styles['Body']), bulletColor=BLUE),
    ListItem(Paragraph('Cantidad y unidad disponible', styles['Body']), bulletColor=BLUE),
    ListItem(Paragraph('Estado: Disponible o Agotado', styles['Body']), bulletColor=BLUE),
    ListItem(Paragraph('Direccion de recogida', styles['Body']), bulletColor=BLUE),
    ListItem(Paragraph('Telefono de contacto', styles['Body']), bulletColor=BLUE),
], bulletType='bullet', start=None))
tip('Para registrar un nuevo recurso, presiona el boton "Ofrecer recurso" en la esquina superior derecha.')
story.append(PageBreak())

# 9. CONFIGURACION
story.append(Paragraph('9. Configuracion de perfil', styles['H1']))
story.append(Paragraph(
    'En la seccion de Configuracion puedes editar tu informacion personal:',
    styles['Body']
))
story.append(ListFlowable([
    ListItem(Paragraph('<b>Nombre:</b> tu nombre visible en la plataforma.', styles['Body']), bulletColor=DARK),
    ListItem(Paragraph('<b>Telefono:</b> numero de contacto.', styles['Body']), bulletColor=DARK),
    ListItem(Paragraph('<b>Email:</b> no editable (se usa para autenticacion).', styles['Body']), bulletColor=DARK),
    ListItem(Paragraph('<b>Rol:</b> no editable desde esta pantalla (solo un administrador puede cambiarlo).', styles['Body']), bulletColor=DARK),
], bulletType='bullet', start=None))
story.append(Paragraph(
    'Presiona "Guardar cambios" para actualizar tu perfil.',
    styles['Body']
))
story.append(PageBreak())

# 10. ROLES
story.append(Paragraph('10. Roles y permisos', styles['H1']))
story.append(Paragraph(
    'ResQLink AI tiene 4 roles con diferentes niveles de acceso:',
    styles['Body']
))

section_table(
    ['Rol', 'Permisos', 'Quien lo usa'],
    [
        ['Ciudadano', 'Reportar emergencias, ofrecer recursos, ver mapa', 'Cualquier persona'],
        ['Voluntario', 'Todo lo anterior + recibir asignaciones de incidentes', 'Personas registradas como voluntarios'],
        ['Organizacion', 'Todo lo anterior + gestionar equipos y recursos de la organizacion', 'ONGs, hospitales, empresas'],
        ['Administrador', 'Acceso total: gestionar usuarios, incidentes, configuracion del sistema', 'Coordinadores de emergencia'],
    ]
)

warning('El rol de Administrador solo puede ser asignado directamente desde la base de datos de Supabase por seguridad.')
story.append(PageBreak())

# 11. IA
story.append(Paragraph('11. Inteligencia artificial', styles['H1']))
story.append(Paragraph(
    'ResQLink AI utiliza inteligencia artificial para agilizar la respuesta a emergencias. '
    'La IA trabaja de forma automatica en segundo plano, sin que el usuario tenga que hacer nada adicional.',
    styles['Body']
))

story.append(Paragraph('Funciones de IA:', styles['H2']))

section_table(
    ['Funcion', 'Que hace', 'Como ayuda'],
    [
        ['Clasificar prioridad', 'Analiza la descripcion y categoria para asignar prioridad automaticamente', 'Los incidentes criticos se atienden primero'],
        ['Detectar duplicados', 'Compara nuevos reportes con los existentes', 'Evita saturar el sistema con reportes repetidos'],
        ['Recomendar recursos', 'Sugiere que tipo de recursos se necesitan segun el incidente', 'Acelera la asignacion de ayuda'],
        ['Resumir incidentes', 'Genera un resumen conciso del estado actual', 'Facilita la coordinacion entre equipos'],
    ]
)

tip('La IA esta preparada para funcionar con OpenAI (GPT-4o), Google Gemini y Anthropic Claude. Actualmente usa OpenAI como motor principal.')
story.append(PageBreak())

# 12. PWA
story.append(Paragraph('12. Modo offline (PWA)', styles['H1']))
story.append(Paragraph(
    'ResQLink AI funciona como una Progressive Web App (PWA), lo que significa que puedes instalarla '
    'en tu celular o computador y usarla como una aplicacion nativa.',
    styles['Body']
))

story.append(Paragraph('Como instalar la PWA:', styles['H2']))
step(1, 'Abre ResQLink AI en el navegador de tu celular (Chrome recomendado).')
step(2, 'Toca el menu del navegador (tres puntos) y selecciona <b>"Instalar app"</b> o <b>"Agregar a pantalla de inicio"</b>.')
step(3, 'La app se instalara como un icono en tu pantalla de inicio.')

story.append(Spacer(1, 8))
story.append(Paragraph('Funcionalidad offline:', styles['H2']))
story.append(ListFlowable([
    ListItem(Paragraph('Si pierdes conexion a internet, puedes seguir llenando reportes de emergencia.', styles['Body']), bulletColor=GREEN),
    ListItem(Paragraph('Los reportes se guardan localmente en tu dispositivo.', styles['Body']), bulletColor=GREEN),
    ListItem(Paragraph('Cuando la conexion se restablezca, los reportes se envian automaticamente.', styles['Body']), bulletColor=GREEN),
], bulletType='bullet', start=None))
warning('El mapa requiere conexion a internet para cargar los tiles de OpenStreetMap. Sin embargo, los datos ya cargados permanecen visibles.')
story.append(PageBreak())

# 13. FAQ
story.append(Paragraph('13. Preguntas frecuentes', styles['H1']))

faqs = [
    ('Necesito crear una cuenta para reportar una emergencia?',
     'No. Cualquier persona puede reportar una emergencia sin registrarse. La cuenta es necesaria para acceder al Dashboard, Centro de Operaciones y funciones avanzadas.'),
    ('La aplicacion es gratuita?',
     'Si, ResQLink AI es completamente gratuita. Es una plataforma humanitaria de codigo abierto.'),
    ('Funciona en mi celular?',
     'Si. Esta optimizada para moviles (mobile-first). Funciona en cualquier navegador moderno: Chrome, Safari, Firefox, Edge.'),
    ('Que tan rapido aparece mi reporte en el mapa?',
     'Instantaneamente. Gracias a la tecnologia de tiempo real de Supabase, tu reporte aparece en el mapa de todos los usuarios en menos de 1 segundo.'),
    ('Puedo usar la app sin internet?',
     'Parcialmente. Puedes llenar formularios offline y se enviaran cuando recuperes la conexion. El mapa necesita internet para cargar.'),
    ('Quien puede ver mis datos personales?',
     'Solo los administradores del sistema. Tu email y telefono estan protegidos por Row Level Security en la base de datos.'),
    ('Como se determina la prioridad de un incidente?',
     'La inteligencia artificial analiza la categoria, la cantidad de personas afectadas y la descripcion para asignar una prioridad automatica (Critica, Alta, Media o Baja).'),
    ('Puedo modificar un reporte despues de enviarlo?',
     'Actualmente solo los administradores pueden modificar reportes desde el Centro de Operaciones.'),
    ('En que idioma funciona la aplicacion?',
     'La interfaz esta en espanol. La IA puede procesar descripciones en espanol e ingles.'),
    ('Como contacto al equipo de soporte?',
     'Escribe al correo del administrador de la plataforma o utiliza la seccion de Configuracion para enviar un mensaje.'),
]

for q, a in faqs:
    story.append(Paragraph(f'<b>{q}</b>', styles['BodyBold']))
    story.append(Paragraph(a, styles['Body']))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# FINAL PAGE
story.append(Spacer(1, 3 * inch))
story.append(HRFlowable(width='30%', thickness=2, color=RED, spaceAfter=20, spaceBefore=0))
story.append(Paragraph('ResQLink AI', ParagraphStyle(
    'finalTitle', parent=styles['Normal'], fontSize=28, textColor=DARK,
    alignment=TA_CENTER, fontName='Helvetica-Bold', spaceAfter=8,
)))
story.append(Paragraph('Cada minuto cuenta. Cada conexion salva vidas.', ParagraphStyle(
    'finalTag', parent=styles['Normal'], fontSize=14, textColor=GRAY,
    alignment=TA_CENTER, fontName='Helvetica-Oblique', spaceAfter=30,
)))
story.append(Paragraph('Plataforma gratuita de respuesta humanitaria', ParagraphStyle(
    'finalSub', parent=styles['Normal'], fontSize=11, textColor=GRAY,
    alignment=TA_CENTER,
)))
story.append(Paragraph('Potenciada por Inteligencia Artificial', ParagraphStyle(
    'finalSub2', parent=styles['Normal'], fontSize=11, textColor=GRAY,
    alignment=TA_CENTER,
)))

# PAGE NUMBERS
def add_page_number(canvas_obj, doc):
    page_num = canvas_obj.getPageNumber()
    if page_num > 1:
        canvas_obj.saveState()
        canvas_obj.setFont('Helvetica', 8)
        canvas_obj.setFillColor(GRAY)
        canvas_obj.drawCentredString(letter[0] / 2, 30, f'ResQLink AI — Manual de Usuario  |  Pagina {page_num}')
        canvas_obj.restoreState()

doc.build(story, onFirstPage=lambda c, d: None, onLaterPages=add_page_number)
print(f'Manual generado: {os.path.abspath(output_path)}')
