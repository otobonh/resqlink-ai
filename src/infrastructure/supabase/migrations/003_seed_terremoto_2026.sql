-- ============================================
-- DATOS VERIFICADOS: Terremoto Venezuela 24-25 Junio 2026
-- Magnitud 7.2 + 7.5 | 920+ muertos | 3000+ heridos
-- Fuentes: NPR, CNN, Al Jazeera, PAHO, OCHA, IFRC
-- ============================================

-- Limpiar incidentes de seed anterior
DELETE FROM incidents WHERE reporter_id = 'system';
DELETE FROM resources WHERE provider_id = 'system';

-- =============================================
-- INCIDENTES VERIFICADOS — Terremoto 24-25 Jun 2026
-- =============================================

INSERT INTO incidents (reporter_id, title, description, category, priority, status, location, address, affected_people, photos) VALUES

-- LA GUAIRA (zona declarada desastre)
('system', 'ZONA DE DESASTRE — La Guaira costera', 'Zona declarada en desastre por el gobierno. 100+ edificios colapsados en la franja costera. Epicentro del daño del terremoto 7.5. Equipos de rescate de Francia y Suiza desplegados. IFRC activó apelación de emergencia por 50 millones CHF.', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.9300, 10.6000)::geography, 'La Guaira, Estado La Guaira (Vargas)', 70000, ARRAY[]::text[]),

('system', 'Hospital colapsado — La Guaira', 'Hospital principal de La Guaira sufrió colapso parcial durante el sismo de magnitud 7.5. Pacientes evacuados a carpas de emergencia. Personal médico operando al aire libre. Se necesitan suministros médicos urgentes.', 'structural', 'critical', 'pending', ST_MakePoint(-66.9350, 10.6050)::geography, 'Hospital de La Guaira, Estado La Guaira', 500, ARRAY[]::text[]),

('system', 'Edificios residenciales colapsados — Macuto', 'Múltiples edificios residenciales en la zona de Macuto colapsaron. Equipos de búsqueda y rescate franceses trabajan extrayendo sobrevivientes. Se escuchan voces bajo escombros.', 'trapped', 'critical', 'in_progress', ST_MakePoint(-66.8600, 10.6150)::geography, 'Macuto, Estado La Guaira', 200, ARRAY[]::text[]),

('system', 'Deslizamientos en cerro San José — La Guaira', 'Deslizamientos masivos en las laderas que rodean La Guaira. Viviendas informales sepultadas. Acceso por carretera parcialmente bloqueado.', 'landslide', 'critical', 'pending', ST_MakePoint(-66.9200, 10.5900)::geography, 'Cerro San José, La Guaira', 150, ARRAY[]::text[]),

('system', 'Familias desplazadas sin refugio — La Guaira', '70,000 familias afectadas según reportes oficiales. Miles durmiendo en calles y plazas. Se necesitan carpas, agua y alimentos urgentemente.', 'shelter', 'critical', 'in_progress', ST_MakePoint(-66.9400, 10.5950)::geography, 'Zona costera La Guaira', 70000, ARRAY[]::text[]),

-- CARACAS
('system', 'Hospital colapsado — Caracas', 'Un hospital en Caracas sufrió colapso estructural severo durante el sismo. Pacientes críticos siendo trasladados a otros centros. La ciudad tiene déficit de camas hospitalarias.', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.8900, 10.5050)::geography, 'Caracas, Distrito Capital', 300, ARRAY[]::text[]),

('system', 'Daños severos — Los Palos Grandes / Altamira', 'Zona de Los Palos Grandes y Altamira con múltiples edificios con daño estructural. Grietas visibles en torres residenciales. Evacuaciones masivas en curso.', 'structural', 'critical', 'pending', ST_MakePoint(-66.8500, 10.4980)::geography, 'Los Palos Grandes / Altamira, Caracas', 5000, ARRAY[]::text[]),

('system', 'Emergencia médica masiva — Caracas', '3,000+ heridos reportados en el área metropolitana. Hospitales saturados. Escasez crítica de antibióticos, solución intravenosa y anestésicos. 70% de la población ya tenía acceso limitado a salud antes del sismo.', 'medical', 'critical', 'in_progress', ST_MakePoint(-66.8833, 10.4880)::geography, 'Área Metropolitana de Caracas', 3000, ARRAY[]::text[]),

('system', 'Incendios post-sismo — Petare', 'Incendios provocados por rotura de tuberías de gas en Petare, la barriada más grande de América Latina. Bomberos con dificultad de acceso por calles estrechas y escombros.', 'fire', 'high', 'assigned', ST_MakePoint(-66.8100, 10.4850)::geography, 'Petare, Municipio Sucre, Caracas', 1000, ARRAY[]::text[]),

('system', 'Colapso de viviendas informales — Catia', 'Zona popular de Catia con múltiples viviendas de construcción informal colapsadas. Familias atrapadas. Vecinos realizando rescate manual con palas.', 'trapped', 'critical', 'pending', ST_MakePoint(-66.9350, 10.5100)::geography, 'Catia, Parroquia Sucre, Caracas', 400, ARRAY[]::text[]),

('system', 'Desabastecimiento de agua — Caracas', 'Rotura de acueductos principales. 62% de la población ya tenía acceso restringido al agua antes del sismo. Situación ahora es crítica en toda el área metropolitana.', 'food_water', 'critical', 'pending', ST_MakePoint(-66.9000, 10.4900)::geography, 'Área Metropolitana de Caracas', 50000, ARRAY[]::text[]),

('system', 'Personas desaparecidas — Parque Central', 'Torres de Parque Central con daño estructural. Reportes de personas sin localizar en pisos altos. Ascensores fuera de servicio. Adultos mayores sin poder evacuar.', 'missing', 'high', 'in_progress', ST_MakePoint(-66.8978, 10.5025)::geography, 'Parque Central, Caracas', 50, ARRAY[]::text[]),

-- CARABOBO (Valencia)
('system', 'Daños estructurales — Valencia', 'Estado Carabobo reportado entre los más afectados. Múltiples edificios con daños. Puentes vehiculares con grietas. Evaluación de ingenieros en curso.', 'structural', 'high', 'in_progress', ST_MakePoint(-68.0039, 10.1620)::geography, 'Valencia, Estado Carabobo', 2000, ARRAY[]::text[]),

('system', 'Evacuación masiva — zonas bajas Valencia', 'Evacuación preventiva en zonas bajas de Valencia por riesgo de réplicas y posibles inundaciones. Miles de personas en refugios temporales.', 'shelter', 'high', 'assigned', ST_MakePoint(-68.0200, 10.1500)::geography, 'Zona sur de Valencia, Carabobo', 3000, ARRAY[]::text[]),

-- ARAGUA
('system', 'Colapso de viviendas — Maracay', 'Estado Aragua con daños significativos. Viviendas colapsadas en sectores populares de Maracay. Familias desplazadas a espacios abiertos.', 'structural', 'high', 'pending', ST_MakePoint(-67.5900, 10.2300)::geography, 'Maracay, Estado Aragua', 1500, ARRAY[]::text[]),

-- MIRANDA
('system', 'Deslizamientos — Guarenas/Guatire', 'Deslizamientos de tierra en zonas montañosas del estado Miranda. Carreteras bloqueadas. Comunidades aisladas sin comunicación.', 'landslide', 'high', 'pending', ST_MakePoint(-66.5800, 10.4700)::geography, 'Guarenas-Guatire, Estado Miranda', 800, ARRAY[]::text[]),

-- TRUJILLO
('system', 'Daños en zona rural — Trujillo', 'Estado Trujillo reporta daños en comunidades rurales. Viviendas de adobe colapsadas. Difícil acceso para equipos de rescate.', 'structural', 'medium', 'pending', ST_MakePoint(-70.4300, 9.3700)::geography, 'Estado Trujillo', 500, ARRAY[]::text[]),

-- EPICENTRO
('system', 'EPICENTRO — San Felipe / Yumare', 'Zona cercana al epicentro del terremoto 7.5 a 10-22 km de profundidad. Comunidades rurales devastadas. Comunicaciones cortadas. Sin evaluación completa de daños aún.', 'structural', 'critical', 'pending', ST_MakePoint(-68.7400, 10.3400)::geography, 'San Felipe / Yumare, Estado Yaracuy', 5000, ARRAY[]::text[]),

-- CRISIS SANITARIA
('system', 'Brotes de sarampión y difteria — Nacional', 'Pre-existencia de brotes de sarampión, difteria y malaria. El terremoto agrava la crisis sanitaria. 70% de la población sin acceso regular a salud. Hospitales sin agua ni electricidad.', 'medical', 'high', 'in_progress', ST_MakePoint(-66.9000, 10.5000)::geography, 'Nacional - Venezuela', 7900000, ARRAY[]::text[]),

-- INSEGURIDAD ALIMENTARIA
('system', 'Crisis alimentaria agravada por sismo', '40% de la población con inseguridad alimentaria moderada a severa antes del sismo. Cadenas de suministro interrumpidas. 56% en pobreza extrema. Se necesita asistencia alimentaria masiva.', 'food_water', 'critical', 'in_progress', ST_MakePoint(-67.0000, 10.0000)::geography, 'Nacional - Venezuela', 7900000, ARRAY[]::text[]);


-- =============================================
-- RECURSOS — Ayuda internacional desplegada
-- =============================================

INSERT INTO resources (provider_id, type, name, description, quantity, unit, location, address, available, contact_phone) VALUES

-- CRUZ ROJA / IFRC
('system', 'personnel', 'Cruz Roja Venezolana — Operación de emergencia', 'IFRC activó apelación de emergencia por CHF 50 millones. Objetivo: asistir a 300,000 personas. Equipos de búsqueda y rescate, primeros auxilios, distribución de agua y alimentos.', 300000, 'personas objetivo', ST_MakePoint(-66.9300, 10.6000)::geography, 'La Guaira y Gran Caracas', true, '+58 212-5715000'),

-- FRANCIA
('system', 'personnel', 'Equipo de rescate — Francia', 'Equipo de búsqueda y rescate urbano (USAR) desplegado por el gobierno de Francia. Especialistas con perros de rescate y equipo pesado.', 50, 'rescatistas', ST_MakePoint(-66.9300, 10.6000)::geography, 'La Guaira, zona de desastre', true, 'Embajada Francia'),

-- SUIZA
('system', 'personnel', 'Equipo de rescate — Suiza', 'Equipo de búsqueda y rescate suizo desplegado en zona del epicentro. Tecnología de detección de vida bajo escombros.', 40, 'rescatistas', ST_MakePoint(-66.9350, 10.6050)::geography, 'La Guaira, zona de desastre', true, 'Embajada Suiza'),

-- ESTADOS UNIDOS
('system', 'equipment', 'Ayuda humanitaria — Estados Unidos', 'Compromiso de $150 millones USD en ayuda humanitaria para Venezuela. Incluye suministros médicos, agua, alimentos y equipos de rescate.', 150, 'millones USD', ST_MakePoint(-66.8833, 10.4880)::geography, 'Nacional - Venezuela', true, 'USAID'),

-- UNIÓN EUROPEA
('system', 'equipment', 'Ayuda humanitaria — Unión Europea (ECHO)', 'EUR 52 millones asignados para respuesta humanitaria en Venezuela 2026. Fondos para salud, agua, saneamiento y protección.', 52, 'millones EUR', ST_MakePoint(-66.8900, 10.4950)::geography, 'Nacional - Venezuela', true, 'ECHO'),

-- UNICEF
('system', 'water', 'Respuesta de emergencia — UNICEF', 'UNICEF desplegó respuesta de emergencia para niños afectados. Plantas potabilizadoras, kits de higiene, protección infantil y espacios seguros para niños.', 5000, 'kits', ST_MakePoint(-66.8850, 10.4950)::geography, 'Caracas y La Guaira', true, '+58 212-2840000'),

-- OPS/OMS (PAHO/WHO)
('system', 'medicine', 'Respuesta sanitaria — OPS/OMS', 'OPS/OMS coordinando respuesta sanitaria al terremoto. Distribución de kits de emergencia para trauma. Vigilancia epidemiológica activa por brotes.', 500, 'kits médicos', ST_MakePoint(-66.8900, 10.4950)::geography, 'Sede OPS, Caracas', true, '+58 212-2065000'),

-- ACNUR
('system', 'shelter', 'Carpas y refugio — ACNUR', 'ACNUR movilizando recursos para familias desplazadas internas. Carpas familiares, colchonetas y kits de dignidad. 611,000 desplazados internos pre-sismo.', 2000, 'carpas', ST_MakePoint(-66.9256, 10.4603)::geography, 'La Guaira y Caracas', true, '+58 212-9010000'),

-- WFP / PMA
('system', 'food', 'Asistencia alimentaria — Programa Mundial de Alimentos', 'PMA movilizando asistencia alimentaria de emergencia. Raciones listas para consumir y galletas energéticas para zonas de difícil acceso.', 50000, 'raciones', ST_MakePoint(-66.9000, 10.4900)::geography, 'La Guaira, Caracas y estados afectados', true, 'PMA Venezuela'),

-- OIM
('system', 'personnel', 'Coordinación — OIM', 'Organización Internacional para las Migraciones brindando servicios de alojamiento para agencias de la ONU. Coordinación en Caracas, San Cristóbal y Puerto Ayacucho.', 100, 'personal', ST_MakePoint(-66.8800, 10.4900)::geography, 'Caracas, San Cristóbal, Puerto Ayacucho', true, 'OIM Venezuela'),

-- OCHA
('system', 'personnel', 'Coordinación humanitaria — OCHA', 'OCHA coordinando el Plan de Respuesta Humanitaria 2026. Necesidad de $606 millones para 5.4 millones de personas. Solo 17% del financiamiento 2025 fue cubierto.', 5400000, 'personas objetivo', ST_MakePoint(-66.9000, 10.5000)::geography, 'Caracas, Venezuela', true, 'OCHA Venezuela'),

-- AGUA
('system', 'water', 'Cisternas de agua — Protección Civil', 'Cisternas de agua desplegadas en La Guaira y Caracas. Puntos de distribución en refugios y plazas principales.', 20000, 'litros', ST_MakePoint(-66.9300, 10.6000)::geography, 'La Guaira - puntos de distribución', true, '+58 212-8601000'),

('system', 'water', 'Planta potabilizadora móvil — Cruz Roja', 'Cruz Roja desplegó plantas potabilizadoras móviles en La Guaira. Capacidad de 5000 litros/hora.', 5000, 'litros/hora', ST_MakePoint(-66.9350, 10.5950)::geography, 'La Guaira, zona costera', true, '+58 212-5715000'),

-- MEDICINA
('system', 'medicine', 'Suministros médicos de emergencia — Cruz Roja', 'Kits de trauma, antibióticos, solución IV, anestésicos, material de sutura. Distribución en hospitales operativos de Caracas y La Guaira.', 1000, 'kits', ST_MakePoint(-66.8833, 10.4880)::geography, 'Hospital Universitario de Caracas', true, '+58 212-6063000'),

('system', 'blood', 'Banco de sangre — Jornada nacional de donación', 'Jornada nacional de donación de sangre activada. Se necesitan todos los tipos. Prioridad: O negativo y O positivo para cirugías de emergencia.', 500, 'unidades', ST_MakePoint(-66.8833, 10.4880)::geography, 'Bancos de sangre a nivel nacional', true, '+58 212-6063200'),

-- TRANSPORTE
('system', 'transport', 'Helicópteros de rescate — FANB', 'Fuerza Armada Nacional Bolivariana desplegó helicópteros para rescate y evacuación médica en zonas de difícil acceso.', 10, 'helicópteros', ST_MakePoint(-66.9100, 10.4600)::geography, 'Base aérea Caracas', true, '+58 212-6050000'),

('system', 'transport', 'Ambulancias — Cruz Roja + hospitales', 'Flota de ambulancias coordinadas para traslado de heridos. Prioridad: pacientes con trauma severo hacia hospitales operativos.', 25, 'ambulancias', ST_MakePoint(-66.8900, 10.5000)::geography, 'Caracas y La Guaira', true, '+58 212-5715000'),

-- EQUIPAMIENTO
('system', 'equipment', 'Equipo de rescate pesado — Bomberos + internacional', 'Grúas, cortadoras hidráulicas, detectores de vida, perros de rescate. Equipos nacionales e internacionales trabajando 24/7 en La Guaira.', 15, 'equipos completos', ST_MakePoint(-66.9300, 10.6000)::geography, 'La Guaira, zona de rescate', true, '+58 212-5451000'),

('system', 'equipment', 'Generadores eléctricos — emergencia', 'Generadores desplegados en hospitales y refugios sin electricidad. Red eléctrica dañada en múltiples estados.', 30, 'generadores', ST_MakePoint(-66.9000, 10.5000)::geography, 'Hospitales y refugios a nivel nacional', true, '+58 212-2190000');
