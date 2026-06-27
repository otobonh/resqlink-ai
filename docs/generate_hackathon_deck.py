from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    HRFlowable, ListFlowable, ListItem
)
import os

W, H = landscape(A4)

RED = HexColor('#DC2626')
BLUE = HexColor('#2563EB')
DARK = HexColor('#111111')
GRAY = HexColor('#6B7280')
LIGHT = HexColor('#F9FAFB')
WHITE = HexColor('#FFFFFF')
GREEN = HexColor('#059669')
ORANGE = HexColor('#EA580C')
PURPLE = HexColor('#7C3AED')
CYAN = HexColor('#0891B2')
AMBER = HexColor('#D97706')
LIGHT_RED = HexColor('#FEE2E2')
LIGHT_BLUE = HexColor('#DBEAFE')
LIGHT_GREEN = HexColor('#D1FAE5')
LIGHT_AMBER = HexColor('#FEF3C7')
LIGHT_PURPLE = HexColor('#EDE9FE')

output = os.path.join(os.path.dirname(__file__), '..', 'ResQLink_AI_Hackathon.pdf')

doc = SimpleDocTemplate(
    output, pagesize=landscape(A4),
    rightMargin=50, leftMargin=50, topMargin=40, bottomMargin=40,
    title='ResQLink AI - Hackathon Pitch Deck',
    author='Omar Tobon',
)

s = {}
s['cover_title'] = ParagraphStyle('ct', fontSize=48, leading=54, textColor=DARK, alignment=TA_CENTER, fontName='Helvetica-Bold')
s['cover_sub'] = ParagraphStyle('cs', fontSize=20, leading=28, textColor=GRAY, alignment=TA_CENTER)
s['cover_tag'] = ParagraphStyle('ctag', fontSize=14, leading=20, textColor=GRAY, alignment=TA_CENTER, fontName='Helvetica-Oblique')
s['slide_title'] = ParagraphStyle('st', fontSize=32, leading=38, textColor=DARK, fontName='Helvetica-Bold', spaceBefore=0, spaceAfter=16)
s['slide_sub'] = ParagraphStyle('ss', fontSize=14, leading=20, textColor=GRAY, spaceAfter=8)
s['h2'] = ParagraphStyle('h2', fontSize=18, leading=24, textColor=DARK, fontName='Helvetica-Bold', spaceBefore=16, spaceAfter=8)
s['body'] = ParagraphStyle('b', fontSize=14, leading=22, textColor=HexColor('#374151'), spaceAfter=6)
s['body_sm'] = ParagraphStyle('bsm', fontSize=12, leading=18, textColor=GRAY, spaceAfter=4)
s['body_bold'] = ParagraphStyle('bb', fontSize=14, leading=22, textColor=DARK, fontName='Helvetica-Bold', spaceAfter=6)
s['stat_big'] = ParagraphStyle('sbig', fontSize=36, leading=40, textColor=RED, fontName='Helvetica-Bold', alignment=TA_CENTER)
s['stat_label'] = ParagraphStyle('slbl', fontSize=11, leading=14, textColor=GRAY, alignment=TA_CENTER)
s['footer'] = ParagraphStyle('f', fontSize=9, leading=12, textColor=HexColor('#9CA3AF'), alignment=TA_CENTER)
s['num'] = ParagraphStyle('num', fontSize=11, leading=14, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_CENTER)
s['quote'] = ParagraphStyle('q', fontSize=18, leading=26, textColor=DARK, fontName='Helvetica-Oblique', alignment=TA_CENTER, spaceBefore=20, spaceAfter=20)

story = []

def slide_number(canvas, doc):
    pg = canvas.getPageNumber()
    if pg > 1:
        canvas.saveState()
        canvas.setFont('Helvetica', 9)
        canvas.setFillColor(HexColor('#9CA3AF'))
        canvas.drawCentredString(W / 2, 20, f'ResQLink AI  |  Hackathon Pitch Deck  |  {pg}')
        canvas.restoreState()

def add_spacer(h=0.3):
    story.append(Spacer(1, h * inch))

def stat_box(value, label, color=RED):
    return Table(
        [[Paragraph(str(value), ParagraphStyle('sv', fontSize=32, leading=36, textColor=color, fontName='Helvetica-Bold', alignment=TA_CENTER))],
         [Paragraph(label, s['stat_label'])]],
        colWidths=[160], rowHeights=[44, 20]
    )

def numbered_step(num, text, color=RED):
    num_cell = Table(
        [[Paragraph(str(num), s['num'])]],
        colWidths=[28], rowHeights=[28],
        style=TableStyle([
            ('BACKGROUND', (0,0), (0,0), color),
            ('ROUNDEDCORNERS', [14,14,14,14]),
            ('ALIGN', (0,0), (0,0), 'CENTER'),
            ('VALIGN', (0,0), (0,0), 'MIDDLE'),
        ])
    )
    return Table(
        [[num_cell, Paragraph(text, s['body'])]],
        colWidths=[40, None],
        style=TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (1,0), (1,0), 8),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ])
    )

# ========== SLIDE 1: COVER ==========
story.append(Spacer(1, 2.2 * inch))
story.append(Paragraph('Res<font color="#DC2626">Q</font>Link <font color="#2563EB">AI</font>', s['cover_title']))
add_spacer(0.15)
story.append(HRFlowable(width='20%', thickness=3, color=RED, spaceAfter=12))
story.append(Paragraph('Plataforma de respuesta humanitaria en tiempo real', s['cover_sub']))
add_spacer(0.1)
story.append(Paragraph('Potenciada por inteligencia artificial', s['cover_tag']))
add_spacer(1.2)
story.append(Paragraph('Omar Tobon  |  Hackathon 2026', ParagraphStyle('auth', fontSize=13, textColor=GRAY, alignment=TA_CENTER)))
add_spacer(0.15)
story.append(Paragraph('resqlink-ai.netlify.app  |  github.com/otobonh/resqlink-ai', ParagraphStyle('links', fontSize=11, textColor=BLUE, alignment=TA_CENTER)))
story.append(PageBreak())

# ========== SLIDE 2: EL PROBLEMA ==========
story.append(Paragraph('<font color="#DC2626">01</font>  El problema', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=16))

story.append(Paragraph('El 24-25 de junio de 2026, <b>dos terremotos consecutivos</b> de magnitud 7.2 y 7.5 golpearon Venezuela con solo 39 segundos de diferencia.', s['body']))
add_spacer(0.2)

stats = Table(
    [[stat_box('920+', 'Muertos confirmados', RED),
      stat_box('3,360+', 'Heridos', ORANGE),
      stat_box('50,000+', 'Desaparecidos', AMBER),
      stat_box('6.8M', 'Personas afectadas', DARK)]],
    style=TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), LIGHT),
        ('ROUNDEDCORNERS', [8,8,8,8]),
        ('TOPPADDING', (0,0), (-1,-1), 16),
        ('BOTTOMPADDING', (0,0), (-1,-1), 16),
    ])
)
story.append(stats)
add_spacer(0.3)

story.append(Paragraph('La coordinacion entre ciudadanos, voluntarios y organizaciones es <b>caotica</b>. No existe un sistema centralizado. La informacion viaja fragmentada por WhatsApp y redes sociales. Las lineas telefonicas estan saturadas.', s['body']))
add_spacer(0.15)
story.append(Paragraph('<b>250+ edificios colapsados</b> solo en La Guaira. Aeropuerto internacional cerrado. Metro de Caracas suspendido. 91 hospitales afectados. 13 hospitales con danos confirmados.', s['body']))
add_spacer(0.2)
story.append(Paragraph('<b>Cada minuto sin coordinacion cuesta vidas.</b>', s['body_bold']))
story.append(PageBreak())

# ========== SLIDE 3: LA SOLUCION ==========
story.append(Paragraph('<font color="#2563EB">02</font>  La solucion', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=16))

story.append(Paragraph('<b>ResQLink AI</b> es una plataforma web gratuita que conecta necesidades con recursos en tiempo real, permitiendo a cualquier persona reportar emergencias, ofrecer ayuda y coordinar respuesta humanitaria desde su celular.', s['body']))
add_spacer(0.2)

features_data = [
    ['Funcion', 'Descripcion'],
    ['Reportar emergencia', 'GPS automatico, fotos, descripcion. Menos de 30 segundos.'],
    ['Ofrecer recursos', 'Agua, alimentos, medicinas, transporte, refugio, sangre, personal.'],
    ['Mapa en tiempo real', 'Incidentes, recursos, hospitales y refugios geolocalizados con color por prioridad.'],
    ['Dashboard operativo', 'Estadisticas en vivo, gestion de incidentes, asignacion de voluntarios.'],
    ['IA integrada', 'Clasifica prioridades, detecta duplicados, recomienda recursos automaticamente.'],
    ['Funciona offline', 'PWA que guarda reportes sin internet y sincroniza al reconectarse.'],
]
ft = Table(features_data, colWidths=[160, None],
    style=TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 12),
        ('LEADING', (0,0), (-1,-1), 18),
        ('GRID', (0,0), (-1,-1), 0.5, HexColor('#E5E7EB')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT]),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0,1), (0,-1), BLUE),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ])
)
story.append(ft)
story.append(PageBreak())

# ========== SLIDE 4: COMO FUNCIONA ==========
story.append(Paragraph('<font color="#059669">03</font>  Como funciona', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=16))

story.append(Paragraph('Dos caminos desde la pantalla principal:', s['body']))
add_spacer(0.15)

paths = Table(
    [[Paragraph('<b>NECESITO AYUDA</b><br/><font size=11 color="#991B1B">Reportar emergencia con GPS,<br/>fotos y descripcion</font>', ParagraphStyle('p1', fontSize=16, leading=22, textColor=RED, alignment=TA_CENTER, fontName='Helvetica-Bold')),
      Paragraph('<b>QUIERO AYUDAR</b><br/><font size=11 color="#1E40AF">Registrar recursos, unirse<br/>como voluntario</font>', ParagraphStyle('p2', fontSize=16, leading=22, textColor=BLUE, alignment=TA_CENTER, fontName='Helvetica-Bold'))]],
    colWidths=[320, 320],
    style=TableStyle([
        ('BACKGROUND', (0,0), (0,0), LIGHT_RED),
        ('BACKGROUND', (1,0), (1,0), LIGHT_BLUE),
        ('ROUNDEDCORNERS', [8,8,8,8]),
        ('TOPPADDING', (0,0), (-1,-1), 24),
        ('BOTTOMPADDING', (0,0), (-1,-1), 24),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ])
)
story.append(paths)
add_spacer(0.3)

story.append(Paragraph('<b>Flujo de trabajo:</b>', s['body_bold']))
add_spacer(0.1)
story.append(numbered_step(1, 'Ciudadano reporta emergencia o recurso — <b>sin cuenta obligatoria</b>'))
story.append(numbered_step(2, 'La <b>IA clasifica la prioridad</b> y detecta duplicados automaticamente'))
story.append(numbered_step(3, 'Aparece en el <b>mapa en tiempo real</b> para todos los usuarios conectados (<b>menos de 1 segundo</b>)'))
story.append(numbered_step(4, 'Coordinadores <b>asignan voluntarios y recursos</b> desde el centro de operaciones'))
story.append(numbered_step(5, 'El incidente se gestiona hasta su <b>resolucion con seguimiento completo</b>'))
story.append(PageBreak())

# ========== SLIDE 5: DATOS EN VIVO ==========
story.append(Paragraph('<font color="#D97706">04</font>  Datos verificados en produccion', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=16))

story.append(Paragraph('La plataforma ya esta en produccion con <b>datos reales y verificados</b> del terremoto de Venezuela:', s['body']))
add_spacer(0.15)

live_stats = Table(
    [[stat_box('35', 'Incidentes verificados', RED),
      stat_box('24', 'Recursos de ayuda', BLUE),
      stat_box('15', 'Hospitales mapeados', PURPLE),
      stat_box('11', 'Refugios activos', CYAN)]],
    style=TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), LIGHT),
        ('ROUNDEDCORNERS', [8,8,8,8]),
        ('TOPPADDING', (0,0), (-1,-1), 16),
        ('BOTTOMPADDING', (0,0), (-1,-1), 16),
    ])
)
story.append(live_stats)
add_spacer(0.2)

story.append(Paragraph('<b>Fuentes verificadas:</b>', s['body_bold']))
story.append(Paragraph('CNN, NPR, Al Jazeera, PBS, Univision, PAHO/OMS, IFRC/Cruz Roja, Wikipedia, Miyamoto International, World Vision, Direct Relief, USGS, ONU, Infobae, El Colombiano', s['body']))
add_spacer(0.15)

story.append(Paragraph('<b>Mapa interactivo:</b> Marcadores codificados por color y prioridad. Rojo = critico, naranja = alto, amarillo = medio. Azul = recursos, morado = hospitales, cyan = refugios. Cada marcador tiene popup con informacion detallada del evento.', s['body']))
story.append(PageBreak())

# ========== SLIDE 6: RESPUESTA INTERNACIONAL ==========
story.append(Paragraph('<font color="#2563EB">05</font>  Respuesta internacional registrada', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=16))

story.append(Paragraph('<b>35 equipos USAR de 17+ paises</b> — 1,600+ especialistas de rescate — 100+ perros de busqueda', s['body_bold']))
add_spacer(0.15)

aid_data = [
    ['Pais / Organizacion', 'Ayuda desplegada'],
    ['Estados Unidos', '$150M, equipos USAR (Fairfax + LA), barcos, aviones, helicopteros'],
    ['Brasil', 'Hospital de campana, 36 bomberos, 100 purificadores de agua'],
    ['Colombia', '60+ rescatistas, 12 toneladas de ayuda humanitaria'],
    ['El Salvador', '300 rescatistas/paramedicos, 50 toneladas de equipo'],
    ['Turquia', '67 miembros SAR, medicos y trabajadores de ayuda'],
    ['Suiza', '80 rescatistas, perros de busqueda, 18 toneladas de equipo'],
    ['Francia', '85 trabajadores de rescate'],
    ['Alemania', '6 aviones de transporte militar'],
    ['India', '41 medicos, hospital de campana, 36 toneladas de suministros'],
    ['IFRC / Cruz Roja', 'CHF 50M apelacion de emergencia — 300,000 personas objetivo'],
    ['UNICEF', 'Proteccion infantil, plantas potabilizadoras, kits de higiene'],
    ['OPS/OMS (PAHO)', 'Kits de trauma, vigilancia epidemiologica, 91 hospitales monitoreados'],
]
at = Table(aid_data, colWidths=[180, None],
    style=TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 10),
        ('LEADING', (0,0), (-1,-1), 15),
        ('GRID', (0,0), (-1,-1), 0.5, HexColor('#E5E7EB')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT]),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ])
)
story.append(at)
story.append(PageBreak())

# ========== SLIDE 7: TECNOLOGIA ==========
story.append(Paragraph('<font color="#7C3AED">06</font>  Stack tecnologico', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=16))

story.append(Paragraph('Arquitectura profesional — Clean Architecture — lista para produccion:', s['body']))
add_spacer(0.15)

tech_data = [
    ['Capa', 'Tecnologia', 'Funcion'],
    ['Frontend', 'Next.js 15, React 19, TypeScript', 'SSR, App Router, type safety'],
    ['UI', 'TailwindCSS, shadcn/ui, Framer Motion', 'Diseno responsive, animaciones suaves'],
    ['Backend', 'Supabase (PostgreSQL + PostGIS)', 'Base de datos, auth, storage, realtime'],
    ['Tiempo real', 'Supabase Realtime (WebSockets)', 'Cada reporte aparece en < 1 segundo'],
    ['Mapas', 'Leaflet + OpenStreetMap', 'Mapa interactivo con marcadores'],
    ['IA', 'OpenAI GPT-4o (preparado para Gemini/Claude)', 'Clasificacion, duplicados, recomendaciones'],
    ['PWA', 'Service Workers + Cache API', 'Funciona offline, instalable en celular'],
    ['Seguridad', 'JWT + Row Level Security + Roles', 'Admin, organizacion, voluntario, ciudadano'],
    ['Hosting', 'Netlify', 'Deploy automatico, CDN global'],
]
tt = Table(tech_data, colWidths=[100, 240, None],
    style=TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 11),
        ('LEADING', (0,0), (-1,-1), 16),
        ('GRID', (0,0), (-1,-1), 0.5, HexColor('#E5E7EB')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT]),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0,1), (0,-1), PURPLE),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ])
)
story.append(tt)
add_spacer(0.2)

story.append(Paragraph('<b>Principios:</b> SOLID, Clean Code, Repository Pattern, Server Components, Mobile-First, Code Splitting, Lazy Loading, SEO optimizado', s['body_sm']))
story.append(PageBreak())

# ========== SLIDE 8: BENEFICIOS ==========
story.append(Paragraph('<font color="#059669">07</font>  Beneficios clave', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=16))

benefits = [
    ['Reduce tiempo de respuesta', 'De horas a segundos. Un reporte llega al mapa y al centro de operaciones instantaneamente.', RED, LIGHT_RED],
    ['Visibilidad total', 'Mapa unificado con todos los incidentes, recursos, hospitales y refugios. Nadie trabaja a ciegas.', BLUE, LIGHT_BLUE],
    ['Coordinacion efectiva', 'Voluntarios y organizaciones saben exactamente donde ir y que llevar. Sin duplicacion de esfuerzos.', GREEN, LIGHT_GREEN],
    ['IA que prioriza', 'Incidentes criticos se atienden primero. Detecta duplicados y recomienda recursos necesarios.', AMBER, LIGHT_AMBER],
    ['Gratuita y accesible', 'Sin costo. Funciona en cualquier celular con navegador. No requiere instalacion. Funciona offline.', PURPLE, LIGHT_PURPLE],
    ['Escalable', 'Preparada para terremotos, inundaciones, huracanes o cualquier desastre en cualquier pais.', DARK, LIGHT],
]

for title, desc, color, bg in benefits:
    row = Table(
        [[Paragraph(f'<b>{title}</b>', ParagraphStyle('bt', fontSize=14, textColor=color, fontName='Helvetica-Bold')),
          Paragraph(desc, s['body_sm'])]],
        colWidths=[200, None],
        style=TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), bg),
            ('ROUNDEDCORNERS', [6,6,6,6]),
            ('TOPPADDING', (0,0), (-1,-1), 12),
            ('BOTTOMPADDING', (0,0), (-1,-1), 12),
            ('LEFTPADDING', (0,0), (-1,-1), 16),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ])
    )
    story.append(row)
    story.append(Spacer(1, 6))
story.append(PageBreak())

# ========== SLIDE 9: DEMO / ACCESO ==========
story.append(Paragraph('<font color="#2563EB">08</font>  Demo en vivo', s['slide_title']))
story.append(HRFlowable(width='100%', thickness=1, color=HexColor('#E5E7EB'), spaceAfter=20))

add_spacer(0.3)
story.append(Paragraph('La plataforma esta en produccion ahora mismo', s['quote']))
story.append(Paragraph('con datos reales del terremoto de Venezuela.', s['quote']))

add_spacer(0.4)

demo_box = Table(
    [[Paragraph('<b>resqlink-ai.netlify.app</b>', ParagraphStyle('url', fontSize=24, textColor=BLUE, fontName='Helvetica-Bold', alignment=TA_CENTER))]],
    colWidths=[500],
    style=TableStyle([
        ('BACKGROUND', (0,0), (0,0), LIGHT_BLUE),
        ('ROUNDEDCORNERS', [12,12,12,12]),
        ('TOPPADDING', (0,0), (0,0), 28),
        ('BOTTOMPADDING', (0,0), (0,0), 28),
        ('ALIGN', (0,0), (0,0), 'CENTER'),
    ])
)
story.append(Table([[demo_box]], colWidths=[W-100], style=TableStyle([('ALIGN',(0,0),(0,0),'CENTER')])))

add_spacer(0.3)

info_data = [
    ['Repositorio', 'github.com/otobonh/resqlink-ai'],
    ['Stack', 'Next.js 15 + Supabase + OpenAI + Leaflet'],
    ['Estado', 'En produccion con datos verificados'],
    ['Costo', 'Gratuita — codigo abierto'],
]
it = Table(info_data, colWidths=[140, 360],
    style=TableStyle([
        ('FONTSIZE', (0,0), (-1,-1), 13),
        ('LEADING', (0,0), (-1,-1), 20),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0,0), (0,-1), GRAY),
        ('TEXTCOLOR', (1,0), (1,-1), DARK),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
    ])
)
story.append(Table([[it]], colWidths=[W-100], style=TableStyle([('ALIGN',(0,0),(0,0),'CENTER')])))
story.append(PageBreak())

# ========== SLIDE 10: CIERRE ==========
story.append(Spacer(1, 2 * inch))
story.append(HRFlowable(width='15%', thickness=3, color=RED, spaceAfter=20))
story.append(Paragraph('Res<font color="#DC2626">Q</font>Link <font color="#2563EB">AI</font>', ParagraphStyle('final', fontSize=42, textColor=DARK, alignment=TA_CENTER, fontName='Helvetica-Bold', spaceAfter=12)))
story.append(Paragraph('Cada minuto cuenta.', ParagraphStyle('f1', fontSize=22, textColor=DARK, alignment=TA_CENTER, fontName='Helvetica-Oblique', spaceAfter=4)))
story.append(Paragraph('Cada conexion salva vidas.', ParagraphStyle('f2', fontSize=22, textColor=RED, alignment=TA_CENTER, fontName='Helvetica-Oblique', spaceAfter=30)))
story.append(Paragraph('Plataforma gratuita de respuesta humanitaria', ParagraphStyle('f3', fontSize=14, textColor=GRAY, alignment=TA_CENTER, spaceAfter=4)))
story.append(Paragraph('Potenciada por inteligencia artificial', ParagraphStyle('f4', fontSize=14, textColor=GRAY, alignment=TA_CENTER, spaceAfter=30)))
story.append(Paragraph('Omar Tobon  |  otobon16@hotmail.com', ParagraphStyle('f5', fontSize=12, textColor=GRAY, alignment=TA_CENTER)))

doc.build(story, onFirstPage=lambda c, d: None, onLaterPages=slide_number)
print(f'Presentacion generada: {os.path.abspath(output)}')
