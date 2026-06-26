-- ============================================
-- DATOS VERIFICADOS: Terremoto Venezuela 24-25 Jun 2026
-- 920+ muertos | 3,360+ heridos | 50,000+ desaparecidos
-- Fuentes: CNN, NPR, Al Jazeera, PAHO, IFRC, Wikipedia,
-- Univision, PBS, Miyamoto International, World Vision
-- ============================================

DELETE FROM incidents WHERE reporter_id = 'system';
DELETE FROM resources WHERE provider_id = 'system';

-- =============================================
-- INCIDENTES VERIFICADOS
-- =============================================

INSERT INTO incidents (reporter_id, title, description, category, priority, status, location, address, affected_people, photos) VALUES

-- CARACAS — Edificios colapsados verificados
('system', 'Edificio 14 pisos colapsado — Residencias Petunia, Los Palos Grandes', 'Edificio residencial de 14 pisos parcialmente colapsado, solo 6 pisos intactos. Personas atrapadas bajo escombros. Equipos de rescate internacionales trabajando en el sitio. Fuente: CNN/Wikipedia', 'trapped', 'critical', 'in_progress', ST_MakePoint(-66.850, 10.500)::geography, 'Residencias Petunia, Los Palos Grandes, Caracas', 100, ARRAY[]::text[]),

('system', 'Edificio 22 pisos totalmente colapsado — Altamira', 'Edificio de 22 pisos completamente colapsado en Altamira. 30 edificios adicionales con daño severo en el distrito. Zona de búsqueda y rescate activa. Fuente: CNN/Wikipedia', 'trapped', 'critical', 'in_progress', ST_MakePoint(-66.845, 10.500)::geography, 'Altamira, Municipio Chacao, Caracas', 200, ARRAY[]::text[]),

('system', 'Dos edificios colapsados — Municipio Chacao', '18 personas rescatadas con vida, al menos 16 heridos confirmados. Vecinos excavan con palas y manos buscando sobrevivientes. Fuente: PBS/CNN', 'trapped', 'critical', 'in_progress', ST_MakePoint(-66.855, 10.498)::geography, 'Municipio Chacao, Caracas', 18, ARRAY[]::text[]),

('system', 'Colapso estructural — Parroquia San Bernardino', 'Edificio colapsado en San Bernardino. Joven rescatado con vida en camilla. Operaciones de rescate continúan. Fuente: PBS/Al Jazeera', 'trapped', 'critical', 'in_progress', ST_MakePoint(-66.905, 10.515)::geography, 'Parroquia San Bernardino, Caracas', 50, ARRAY[]::text[]),

('system', 'Muertes por colapsos — Municipio Baruta', 'Al menos 3 muertos confirmados por colapso de edificaciones en Baruta. Búsqueda de más víctimas en curso. Fuente: Wikipedia', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.870, 10.440)::geography, 'Municipio Baruta, Caracas', 50, ARRAY[]::text[]),

('system', 'Muertes y colapsos — Pinto Salinas', 'Múltiples muertes reportadas por fallas estructurales en el sector Pinto Salinas. Zona de alta densidad poblacional. Fuente: Wikipedia', 'structural', 'critical', 'pending', ST_MakePoint(-66.920, 10.510)::geography, 'Pinto Salinas, Caracas', 80, ARRAY[]::text[]),

('system', 'Familias sin hogar — El Paraíso', 'Docenas de familias perdieron sus viviendas en El Paraíso. Personas durmiendo en calles y plazas. Necesitan refugio urgente. Fuente: Al Jazeera', 'shelter', 'high', 'pending', ST_MakePoint(-66.935, 10.490)::geography, 'El Paraíso, Caracas', 300, ARRAY[]::text[]),

('system', 'Edificios altos destruidos — Sureste de Caracas', 'Casi todos los edificios altos del sureste de Caracas con daño severo o destruidos. Zona declarada inhabitable. Fuente: CNN/Wikipedia', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.830, 10.470)::geography, 'Sureste de Caracas', 5000, ARRAY[]::text[]),

('system', 'Metro de Caracas suspendido totalmente', 'Todo el servicio del Metro de Caracas suspendido por daños estructurales en túneles y estaciones. Millones de usuarios afectados. Fuente: Wikipedia', 'structural', 'high', 'in_progress', ST_MakePoint(-66.880, 10.495)::geography, 'Sistema Metro de Caracas', 2000000, ARRAY[]::text[]),

('system', 'Sede Cruz Roja dañada — Caracas', 'Sede de la Cruz Roja Venezolana severamente dañada, afectando capacidad de coordinación de ayuda. Fuente: Wikipedia', 'structural', 'high', 'in_progress', ST_MakePoint(-66.890, 10.500)::geography, 'Cruz Roja Venezolana, Caracas', 100, ARRAY[]::text[]),

('system', 'Embajada de Francia dañada — Caracas', 'Edificio de la Embajada de Francia severamente dañado por el sismo. Fuente: Wikipedia', 'structural', 'medium', 'assigned', ST_MakePoint(-66.855, 10.503)::geography, 'Embajada de Francia, Caracas', 20, ARRAY[]::text[]),

('system', 'Daños en Petare — zona vulnerable', 'Petare, la barriada más grande de Latinoamérica, con construcciones informales vulnerables afectadas. Difícil acceso para equipos de rescate. Fuente: Miyamoto International', 'structural', 'high', 'pending', ST_MakePoint(-66.810, 10.485)::geography, 'Petare, Municipio Sucre, Caracas', 1000, ARRAY[]::text[]),

-- LA GUAIRA — Zona de desastre declarada
('system', 'ZONA DE DESASTRE — 250+ edificios colapsados La Guaira', '250+ edificios residenciales colapsados confirmados por imágenes satelitales. Zona declarada en desastre por vicepresidenta Delcy Rodríguez. Miles duermen al aire libre. Fuente: CNN/Al Jazeera/Univision', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.933, 10.603)::geography, 'Centro de La Guaira, Estado La Guaira', 70000, ARRAY[]::text[]),

('system', 'Destrucción masiva — Caraballeda', '100+ edificios parcial o totalmente colapsados visibles en imágenes satelitales de Caraballeda. Fuente: CNN/Wikipedia', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.850, 10.615)::geography, 'Caraballeda, La Guaira', 2000, ARRAY[]::text[]),

('system', 'Barrio devastado — Playa Grande', 'Vecindario de Playa Grande severamente dañado. Múltiples estructuras colapsadas. Fuente: Wikipedia', 'structural', 'critical', 'pending', ST_MakePoint(-66.840, 10.610)::geography, 'Playa Grande, La Guaira', 500, ARRAY[]::text[]),

('system', 'Destrucción — Tanaguarenas', 'Vecindario de Tanaguarenas con daño severo generalizado. Fuente: Wikipedia', 'structural', 'critical', 'pending', ST_MakePoint(-66.835, 10.618)::geography, 'Tanaguarenas, La Guaira', 400, ARRAY[]::text[]),

('system', 'Destrucción — Los Corales', 'Los Corales severamente dañado. Operaciones de búsqueda y rescate activas. Fuente: Wikipedia', 'structural', 'critical', 'pending', ST_MakePoint(-66.830, 10.620)::geography, 'Los Corales, La Guaira', 300, ARRAY[]::text[]),

('system', 'Aeropuerto Simón Bolívar cerrado — Maiquetía', 'Aeropuerto internacional Simón Bolívar con daño severo en infraestructura. Todos los vuelos cancelados. Aeropuerto cerrado indefinidamente. Fuente: CNN/Wikipedia', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.991, 10.601)::geography, 'Aeropuerto Internacional Simón Bolívar, Maiquetía', 50000, ARRAY[]::text[]),

('system', 'Crisis alimentaria — colas masivas La Guaira', 'Largas colas por asistencia alimentaria. Escasez crítica de agua, antibióticos, solución IV y anestésicos. Fuente: Univision/CNN', 'food_water', 'critical', 'in_progress', ST_MakePoint(-66.933, 10.603)::geography, 'La Guaira, puntos de distribución', 70000, ARRAY[]::text[]),

('system', 'Daños — Catia La Mar', 'Catia La Mar entre las localidades más dañadas de La Guaira. Fuente: Miyamoto International', 'structural', 'high', 'pending', ST_MakePoint(-67.030, 10.590)::geography, 'Catia La Mar, La Guaira', 500, ARRAY[]::text[]),

-- CARABOBO
('system', '25+ viviendas destruidas — Morón y Urama', '25+ viviendas destruidas en parroquias de Morón y Urama, estado Carabobo. Fuente: Wikipedia', 'structural', 'high', 'pending', ST_MakePoint(-68.190, 10.280)::geography, 'Morón y Urama, Carabobo', 100, ARRAY[]::text[]),

('system', 'Muertes y colapsos — Puerto Cabello', 'Muertes reportadas y edificios colapsados en Puerto Cabello. Fuente: Wikipedia', 'structural', 'high', 'in_progress', ST_MakePoint(-68.007, 10.473)::geography, 'Puerto Cabello, Carabobo', 50, ARRAY[]::text[]),

('system', 'Muertes reportadas — San Diego', 'Muertes confirmadas en municipio San Diego, Carabobo. Fuente: Wikipedia', 'structural', 'high', 'pending', ST_MakePoint(-67.960, 10.240)::geography, 'San Diego, Carabobo', 30, ARRAY[]::text[]),

-- YARACUY — Epicentro
('system', 'EPICENTRO — San Felipe, Yaracuy', 'A 23 km del epicentro del sismo Mw 7.2. Daño significativo en la ciudad. 300+ réplicas registradas. Fuente: USGS/Wikipedia', 'structural', 'critical', 'in_progress', ST_MakePoint(-68.740, 10.340)::geography, 'San Felipe, Estado Yaracuy', 5000, ARRAY[]::text[]),

-- FALCÓN
('system', '32 heridos, 15 atrapados — Estado Falcón', '32 heridos confirmados y 15 personas atrapadas en edificaciones del estado Falcón. Fuente: Wikipedia', 'trapped', 'high', 'in_progress', ST_MakePoint(-69.850, 11.180)::geography, 'Estado Falcón', 47, ARRAY[]::text[]),

-- MIRANDA
('system', 'Daños estructurales — Los Teques', 'Los Teques, capital del estado Miranda, entre las localidades con daños significativos. Fuente: Miyamoto International', 'structural', 'high', 'pending', ST_MakePoint(-67.044, 10.345)::geography, 'Los Teques, Miranda', 200, ARRAY[]::text[]),

-- ARAGUA
('system', 'Daños — Ocumare de la Costa', 'Ocumare de la Costa en estado Aragua con daños reportados. Fuente: Miyamoto International', 'structural', 'high', 'pending', ST_MakePoint(-67.775, 10.470)::geography, 'Ocumare de la Costa, Aragua', 100, ARRAY[]::text[]),

-- EMERGENCIAS MÉDICAS
('system', 'Hospital José María Vargas colapsado — La Guaira', 'Hospital principal de La Guaira completamente saturado. Estacionamientos convertidos en salas de emergencia improvisadas. Pacientes atendidos al aire libre. Fuente: Univision/CNN', 'medical', 'critical', 'in_progress', ST_MakePoint(-66.930, 10.600)::geography, 'Hospital José María Vargas, La Guaira', 3000, ARRAY[]::text[]),

('system', 'Hospital de Clínicas Caracas saturado', 'Hospital de Clínicas Caracas desbordado con heridos. Salas improvisadas en pasillos. Escasez crítica de medicamentos. Fuente: CNN/Wikipedia', 'medical', 'critical', 'in_progress', ST_MakePoint(-66.880, 10.500)::geography, 'Hospital de Clínicas Caracas', 2000, ARRAY[]::text[]),

('system', 'Hospital colapsado en Caracas', 'Al menos un hospital en Caracas sufrió colapso estructural. Pacientes evacuados. Fuente: CNN/Univision', 'medical', 'critical', 'in_progress', ST_MakePoint(-66.880, 10.505)::geography, 'Hospital colapsado, Caracas', 500, ARRAY[]::text[]),

('system', '50,000+ desaparecidos — Nacional', 'El jefe humanitario de la ONU reporta más de 50,000 personas desaparecidas a nivel nacional. Búsqueda activa en toda la zona afectada. Fuente: Univision/UN', 'missing', 'critical', 'in_progress', ST_MakePoint(-66.900, 10.500)::geography, 'Nacional - Venezuela', 50000, ARRAY[]::text[]),

('system', 'Bebé rescatado con vida de escombros', 'Bebé extraído con vida de entre los escombros tras horas de rescate. Símbolo de esperanza en medio de la tragedia. Fuente: Al Jazeera', 'trapped', 'critical', 'resolved', ST_MakePoint(-66.860, 10.500)::geography, 'Caracas (ubicación no especificada)', 1, ARRAY[]::text[]),

-- VÍAS BLOQUEADAS
('system', 'Autopista Caracas-La Guaira congestionada', 'Ruta principal de suministro de ayuda entre Caracas y La Guaira congestionada con convoyes civiles de suministros. Fuente: CNN', 'structural', 'high', 'in_progress', ST_MakePoint(-66.920, 10.550)::geography, 'Autopista Caracas-La Guaira', 100000, ARRAY[]::text[]),

-- 300+ RÉPLICAS
('system', '300+ réplicas registradas — riesgo continuo', 'FUNVISIS ha registrado más de 300 réplicas tras los sismos principales. Magnitudes entre 2.4 y 4.5. Concentradas entre Naiguatá, La Guaira y Caracas. Riesgo de colapsos adicionales. Fuente: Infobae/El Colombiano', 'structural', 'high', 'in_progress', ST_MakePoint(-66.880, 10.550)::geography, 'Franja costera Naiguatá-La Guaira-Caracas', 6800000, ARRAY[]::text[]),

-- CRISIS PREEXISTENTE AGRAVADA
('system', 'Crisis sanitaria agravada — 91 hospitales afectados', '91 hospitales de emergencia en zonas de intensidad afectada. 13 hospitales confirmados con daños. 20 hospitales expuestos a intensidad VII+. Escasez de agua, antibióticos, IV, anestésicos. Fuente: PAHO/Univision', 'medical', 'critical', 'in_progress', ST_MakePoint(-67.500, 10.200)::geography, 'Nacional - Sistema de salud Venezuela', 7900000, ARRAY[]::text[]);


-- =============================================
-- RECURSOS — Ayuda internacional verificada
-- =============================================

INSERT INTO resources (provider_id, type, name, description, quantity, unit, location, address, available, contact_phone) VALUES

-- ESTADOS UNIDOS
('system', 'personnel', 'Equipos USAR — Estados Unidos (Fairfax VA + Los Angeles)', 'Equipos de búsqueda y rescate urbano de Fairfax, Virginia y Los Angeles desplegados. Barcos de guerra, aviones de transporte y helicópteros. $150M en ayuda comprometidos. Fuente: Al Jazeera/CNN', 100, 'rescatistas', ST_MakePoint(-66.850, 10.500)::geography, 'Altamira y Los Palos Grandes, Caracas', true, 'USAID'),

-- BRASIL
('system', 'medicine', 'Hospital de campaña — Brasil', 'Hospital de campaña completo, 36 bomberos, 8 especialistas, 9 toneladas de equipo, 100 purificadores de agua y medicamentos. Fuente: Al Jazeera', 1, 'hospital de campaña', ST_MakePoint(-66.933, 10.603)::geography, 'La Guaira, zona de desastre', true, 'Embajada Brasil'),

-- COLOMBIA
('system', 'personnel', 'Equipo de rescate — Colombia', '60+ rescatistas colombianos con 12 toneladas de ayuda humanitaria. Fuente: Al Jazeera', 60, 'rescatistas', ST_MakePoint(-66.880, 10.500)::geography, 'Caracas, zonas de colapso', true, 'Embajada Colombia'),

-- EL SALVADOR
('system', 'personnel', 'Rescatistas y paramédicos — El Salvador', '300 rescatistas y paramédicos con 50 toneladas de equipo y medicinas. Fuente: Al Jazeera', 300, 'rescatistas', ST_MakePoint(-66.855, 10.498)::geography, 'Municipio Chacao, Caracas', true, 'Embajada El Salvador'),

-- TURQUÍA
('system', 'personnel', 'Equipo SAR — Turquía', 'Equipo de 67 miembros: búsqueda y rescate, médicos y trabajadores de ayuda. Fuente: Al Jazeera', 67, 'rescatistas', ST_MakePoint(-66.850, 10.615)::geography, 'Caraballeda, La Guaira', true, 'Embajada Turquía'),

-- SUIZA
('system', 'personnel', 'Equipo de rescate — Suiza', '80 rescatistas con perros de búsqueda y 18 toneladas de equipo especializado. Fuente: Al Jazeera', 80, 'rescatistas', ST_MakePoint(-66.840, 10.610)::geography, 'Playa Grande, La Guaira', true, 'Embajada Suiza'),

-- FRANCIA
('system', 'personnel', 'Equipo de rescate — Francia', '85 trabajadores de rescate franceses desplegados en zona de desastre. Fuente: Al Jazeera', 85, 'rescatistas', ST_MakePoint(-66.835, 10.618)::geography, 'Tanaguarenas, La Guaira', true, 'Embajada Francia'),

-- ESPAÑA
('system', 'personnel', 'Equipos SAR — España', 'Dos equipos de búsqueda y rescate españoles. Fuente: Al Jazeera', 40, 'rescatistas', ST_MakePoint(-66.830, 10.620)::geography, 'Los Corales, La Guaira', true, 'Embajada España'),

-- ALEMANIA
('system', 'transport', 'Aviones de transporte militar — Alemania', 'Seis aviones de transporte militar alemanes para logística de ayuda humanitaria. Fuente: Al Jazeera', 6, 'aviones', ST_MakePoint(-66.991, 10.601)::geography, 'Aeropuerto Simón Bolívar (cerrado, uso militar)', true, 'Embajada Alemania'),

-- INDIA
('system', 'medicine', 'Equipo médico y hospital — India', '2 aviones de la fuerza aérea, 41 médicos, hospital de campaña y 36 toneladas de suministros. Fuente: Al Jazeera', 41, 'médicos', ST_MakePoint(-66.930, 10.600)::geography, 'Hospital José María Vargas, La Guaira', true, 'Embajada India'),

-- MÉXICO
('system', 'personnel', 'Equipos militares de rescate — México', 'Equipos militares de rescate y personal médico. Embajada en CDMX como centro de suministros. Fuente: Al Jazeera', 50, 'rescatistas', ST_MakePoint(-66.905, 10.515)::geography, 'San Bernardino, Caracas', true, 'Embajada México'),

-- CHINA
('system', 'equipment', 'Ayuda humanitaria de emergencia — China', 'Ayuda humanitaria de emergencia, equipo de rescate y alivio médico. Fuente: Al Jazeera', 1, 'contingente', ST_MakePoint(-66.900, 10.500)::geography, 'Caracas, Venezuela', true, 'Embajada China'),

-- PAÍSES BAJOS
('system', 'equipment', 'Paquete de ayuda — Países Bajos', 'EUR 2 millones en ayuda y equipo de búsqueda y rescate. Fuente: Al Jazeera', 2, 'millones EUR', ST_MakePoint(-66.880, 10.495)::geography, 'Caracas, Venezuela', true, 'Embajada Países Bajos'),

-- IFRC / CRUZ ROJA
('system', 'personnel', 'Cruz Roja — Operación CHF 50M', 'IFRC lanzó apelación de emergencia por CHF 50 millones para asistir a 300,000 personas. $2.5M liberados inmediatamente. 1,600+ especialistas de rescate de 35 equipos USAR de 17+ países. 100+ perros de rescate. Fuente: IFRC', 300000, 'personas objetivo', ST_MakePoint(-66.933, 10.603)::geography, 'La Guaira y Gran Caracas', true, '+58 212-5715000'),

-- UNICEF
('system', 'water', 'Respuesta de emergencia — UNICEF', 'Respuesta de emergencia para niños afectados. Plantas potabilizadoras, kits de higiene, protección infantil. Fuente: World Vision/UNICEF', 10000, 'kits', ST_MakePoint(-66.880, 10.500)::geography, 'Caracas y La Guaira', true, 'UNICEF Venezuela'),

-- OPS/OMS
('system', 'medicine', 'Respuesta sanitaria — OPS/OMS (PAHO)', '91 hospitales monitoreados. Distribución de kits de trauma. Vigilancia epidemiológica activa. 13 hospitales confirmados con daños. Fuente: PAHO', 500, 'kits médicos', ST_MakePoint(-66.890, 10.495)::geography, 'Sede OPS, Caracas', true, 'OPS Venezuela'),

-- ACNUR
('system', 'shelter', 'Carpas y refugio — ACNUR', 'Carpas familiares, colchonetas y kits de dignidad para desplazados internos. Fuente: ACNUR', 3000, 'carpas', ST_MakePoint(-66.933, 10.603)::geography, 'La Guaira y Caracas', true, 'ACNUR Venezuela'),

-- DIRECT RELIEF
('system', 'medicine', 'Suministros médicos — Direct Relief', 'Respuesta de desastre con suministros médicos de emergencia para hospitales afectados. Fuente: Direct Relief', 1000, 'kits', ST_MakePoint(-66.880, 10.505)::geography, 'Hospitales de Caracas', true, 'Direct Relief'),

-- WORLD VISION
('system', 'food', 'Asistencia humanitaria — World Vision', 'Programa de asistencia alimentaria y protección infantil en zonas afectadas. Fuente: World Vision', 5000, 'familias', ST_MakePoint(-66.870, 10.490)::geography, 'Caracas, zonas vulnerables', true, 'World Vision'),

-- AGUA Y ALIMENTOS
('system', 'water', 'Purificadores de agua — Brasil', '100 purificadores de agua donados por Brasil para zonas sin suministro. Fuente: Al Jazeera', 100, 'purificadores', ST_MakePoint(-66.933, 10.603)::geography, 'La Guaira, puntos de distribución', true, 'Embajada Brasil'),

('system', 'water', 'Distribución de agua — Protección Civil', 'Cisternas y puntos de distribución de agua en La Guaira y Caracas. Suministro cortado en zonas afectadas. Fuente: CNN', 50000, 'litros', ST_MakePoint(-66.920, 10.550)::geography, 'Autopista Caracas-La Guaira, puntos de distribución', true, 'Protección Civil'),

-- SANGRE
('system', 'blood', 'Jornada nacional de donación de sangre', 'Jornada activa en todos los bancos de sangre del país. Prioridad: O negativo y O positivo para cirugías de emergencia. Fuente: Cruz Roja', 500, 'unidades', ST_MakePoint(-66.880, 10.500)::geography, 'Bancos de sangre a nivel nacional', true, 'Cruz Roja Venezuela'),

-- CENTROS DE ACOPIO INTERNACIONALES
('system', 'food', 'Centro de acopio — Bogotá para Venezuela', 'Centro de recolección de ayuda organizado en Bogotá, Colombia para envío a Venezuela. Fuente: Al Jazeera', 1000, 'paquetes', ST_MakePoint(-66.870, 10.440)::geography, 'En tránsito desde Bogotá', true, 'Cruz Roja Colombia'),

('system', 'equipment', 'Centro de suministros — Embajada México CDMX', 'Embajada de México en Ciudad de México operando como centro de suministros para Venezuela. Fuente: Al Jazeera', 1, 'centro logístico', ST_MakePoint(-66.935, 10.490)::geography, 'En tránsito desde México', true, 'Embajada México');
