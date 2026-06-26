-- ============================================
-- SEED: Datos de Venezuela - Emergencia sísmica
-- Hospitales, refugios, incidentes y recursos
-- ============================================

-- HOSPITALES DE VENEZUELA (datos reales)
INSERT INTO hospitals (name, location, address, phone, capacity, available_beds, has_emergency, specialties) VALUES
-- Caracas
('Hospital Universitario de Caracas', ST_MakePoint(-66.8833, 10.4880)::geography, 'Ciudad Universitaria, Los Chaguaramos, Caracas', '+58 212-6063111', 850, 120, true, ARRAY['trauma', 'cirugia', 'pediatria', 'cardiologia']),
('Hospital de Clínicas Caracas', ST_MakePoint(-66.8792, 10.4958)::geography, 'Av. Panteón, San Bernardino, Caracas', '+58 212-5088111', 300, 45, true, ARRAY['cirugia', 'emergencias', 'cardiologia']),
('Hospital Vargas de Caracas', ST_MakePoint(-66.9142, 10.5069)::geography, 'Esq. San Lázaro, La Pastora, Caracas', '+58 212-8625111', 500, 80, true, ARRAY['trauma', 'medicina interna', 'cirugia']),
('Hospital Militar Dr. Carlos Arvelo', ST_MakePoint(-66.8978, 10.5044)::geography, 'Av. José Ángel Lamas, San Martín, Caracas', '+58 212-6321111', 400, 60, true, ARRAY['trauma', 'ortopedia', 'cirugia']),
('Hospital de Niños J.M. de los Ríos', ST_MakePoint(-66.8908, 10.5017)::geography, 'Av. Vollmer, San Bernardino, Caracas', '+58 212-5747111', 250, 35, true, ARRAY['pediatria', 'neonatologia', 'cirugia pediatrica']),
('Hospital Pérez de León', ST_MakePoint(-66.8175, 10.4800)::geography, 'Petare, Municipio Sucre, Caracas', '+58 212-2711111', 200, 30, true, ARRAY['emergencias', 'medicina general', 'trauma']),

-- Valencia (Carabobo)
('Hospital Central de Valencia', ST_MakePoint(-68.0039, 10.1620)::geography, 'Av. Bolívar Norte, Valencia, Carabobo', '+58 241-8576111', 600, 90, true, ARRAY['trauma', 'cirugia', 'pediatria', 'ginecologia']),
('Ciudad Hospitalaria Dr. Enrique Tejera (CHET)', ST_MakePoint(-67.9980, 10.1750)::geography, 'Av. Lisandro Alvarado, Valencia, Carabobo', '+58 241-8686111', 700, 100, true, ARRAY['trauma', 'emergencias', 'cirugia', 'cardiologia']),

-- Maracaibo (Zulia)
('Hospital Universitario de Maracaibo', ST_MakePoint(-71.6125, 10.6544)::geography, 'Av. Goajira, Maracaibo, Zulia', '+58 261-7596111', 800, 110, true, ARRAY['trauma', 'cirugia', 'pediatria', 'neurologia']),
('Hospital Central Dr. Urquinaona', ST_MakePoint(-71.6306, 10.6417)::geography, 'Calle 96 con Av. 15, Maracaibo, Zulia', '+58 261-7236111', 400, 55, true, ARRAY['emergencias', 'medicina interna', 'ginecologia']),

-- Barquisimeto (Lara)
('Hospital Central Antonio María Pineda', ST_MakePoint(-69.3175, 10.0678)::geography, 'Av. Libertador, Barquisimeto, Lara', '+58 251-2526111', 550, 75, true, ARRAY['trauma', 'cirugia', 'cardiologia', 'pediatria']),

-- Mérida
('Hospital Universitario de Los Andes (HULA)', ST_MakePoint(-71.1433, 8.5897)::geography, 'Av. 16 de Septiembre, Mérida', '+58 274-2403111', 450, 65, true, ARRAY['trauma', 'cirugia', 'emergencias', 'pediatria']),

-- San Cristóbal (Táchira)
('Hospital Central de San Cristóbal', ST_MakePoint(-72.2264, 7.7669)::geography, 'Av. Lucio Oquendo, San Cristóbal, Táchira', '+58 276-3568111', 350, 50, true, ARRAY['trauma', 'emergencias', 'cirugia', 'medicina interna']),

-- Puerto La Cruz (Anzoátegui)
('Hospital Universitario Dr. Luis Razetti', ST_MakePoint(-64.6306, 10.2150)::geography, 'Av. Intercomunal, Barcelona, Anzoátegui', '+58 281-2774111', 500, 70, true, ARRAY['trauma', 'cirugia', 'pediatria', 'emergencias']),

-- Cumaná (Sucre)
('Hospital Universitario Antonio Patricio de Alcalá', ST_MakePoint(-64.1753, 10.4500)::geography, 'Av. Universitaria, Cumaná, Sucre', '+58 293-4316111', 350, 45, true, ARRAY['trauma', 'emergencias', 'medicina interna']);


-- REFUGIOS
INSERT INTO shelters (name, location, address, capacity, current_occupancy, amenities, contact_phone, active) VALUES
-- Caracas
('Refugio Poliedro de Caracas', ST_MakePoint(-66.9256, 10.4603)::geography, 'Autopista Valle-Coche, Caracas', 5000, 1200, ARRAY['agua', 'baños', 'electricidad', 'cocina', 'colchonetas'], '+58 212-6821000', true),
('Refugio Estadio Universitario', ST_MakePoint(-66.8850, 10.4900)::geography, 'Ciudad Universitaria, Caracas', 3000, 800, ARRAY['agua', 'baños', 'electricidad', 'cancha'], '+58 212-6063000', true),
('Refugio Parque del Este', ST_MakePoint(-66.8547, 10.4953)::geography, 'Av. Francisco de Miranda, Caracas', 2000, 450, ARRAY['agua', 'espacios abiertos', 'baños'], '+58 212-2731000', true),
('Refugio Teatro Teresa Carreño', ST_MakePoint(-66.8964, 10.4981)::geography, 'Complejo Cultural Teresa Carreño, Caracas', 1500, 350, ARRAY['agua', 'baños', 'electricidad', 'techo'], '+58 212-5740000', true),
('Refugio Fuerte Tiuna', ST_MakePoint(-66.9100, 10.4600)::geography, 'Fuerte Tiuna, Caracas', 4000, 900, ARRAY['agua', 'baños', 'electricidad', 'cocina', 'seguridad', 'colchonetas'], '+58 212-6051000', true),

-- Valencia
('Refugio Estadio Misael Delgado', ST_MakePoint(-68.0100, 10.1680)::geography, 'Av. Bolívar, Valencia, Carabobo', 2500, 600, ARRAY['agua', 'baños', 'electricidad'], '+58 241-8230000', true),
('Refugio Forum de Valencia', ST_MakePoint(-67.9950, 10.1800)::geography, 'Av. Bolívar Norte, Valencia, Carabobo', 1800, 400, ARRAY['agua', 'baños', 'electricidad', 'techo'], '+58 241-8240000', true),

-- Maracaibo
('Refugio Estadio Pachencho Romero', ST_MakePoint(-71.6200, 10.6600)::geography, 'Av. Sabaneta, Maracaibo, Zulia', 3000, 700, ARRAY['agua', 'baños', 'electricidad'], '+58 261-7510000', true),

-- Barquisimeto
('Refugio Estadio Metropolitano', ST_MakePoint(-69.3200, 10.0600)::geography, 'Av. Libertador, Barquisimeto, Lara', 2000, 500, ARRAY['agua', 'baños', 'electricidad'], '+58 251-2540000', true),

-- Mérida
('Refugio Complejo Ferial de Mérida', ST_MakePoint(-71.1500, 8.5800)::geography, 'Av. Las Américas, Mérida', 1500, 350, ARRAY['agua', 'baños', 'electricidad', 'cocina'], '+58 274-2630000', true),

-- San Cristóbal
('Refugio Estadio Pueblo Nuevo', ST_MakePoint(-72.2300, 7.7700)::geography, 'San Cristóbal, Táchira', 2500, 550, ARRAY['agua', 'baños', 'electricidad'], '+58 276-3430000', true);


-- INCIDENTES (situación de emergencia sísmica en Venezuela)
INSERT INTO incidents (reporter_id, title, description, category, priority, status, location, address, affected_people, photos) VALUES
-- Caracas - zona más afectada
('system', 'Edificio colapsado - Av. Baralt', 'Edificio residencial de 8 pisos parcialmente colapsado. Se reportan personas atrapadas en los pisos 3 y 4. Vecinos escuchan voces pidiendo auxilio bajo los escombros.', 'trapped', 'critical', 'pending', ST_MakePoint(-66.9150, 10.5080)::geography, 'Av. Baralt, esquina de Peligro, La Pastora, Caracas', 35, ARRAY[]::text[]),

('system', 'Derrumbe parcial Hospital Vargas', 'Ala sur del Hospital Vargas presentó derrumbe parcial. Pacientes evacuados al estacionamiento. Se necesitan ambulancias para trasladar pacientes críticos.', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.9142, 10.5069)::geography, 'Hospital Vargas, La Pastora, Caracas', 120, ARRAY[]::text[]),

('system', 'Incendio post-sismo Petare', 'Incendio en zona de Petare tras ruptura de tubería de gas por el sismo. Bomberos en camino pero difícil acceso por escombros en las calles.', 'fire', 'critical', 'assigned', ST_MakePoint(-66.8100, 10.4850)::geography, 'Sector José Félix Ribas, Petare, Caracas', 200, ARRAY[]::text[]),

('system', 'Familias atrapadas en edificio Parque Central', 'Torre Este del Parque Central con daño estructural severo. Ascensores fuera de servicio. Familias en pisos altos sin poder evacuar, incluidos adultos mayores.', 'trapped', 'critical', 'pending', ST_MakePoint(-66.8978, 10.5025)::geography, 'Parque Central, Torre Este, Caracas', 80, ARRAY[]::text[]),

('system', 'Emergencia médica - Catia', 'Múltiples heridos por caída de fachada de edificio en el boulevard de Catia. Se necesitan ambulancias urgentes y equipos de primeros auxilios.', 'medical', 'high', 'pending', ST_MakePoint(-66.9350, 10.5100)::geography, 'Boulevard de Catia, Caracas', 25, ARRAY[]::text[]),

('system', 'Deslizamiento cerro El Ávila', 'Deslizamiento de tierra en ladera sur del cerro El Ávila. Varias viviendas informales sepultadas. Se escuchan personas pidiendo ayuda.', 'landslide', 'critical', 'pending', ST_MakePoint(-66.8700, 10.5200)::geography, 'Ladera sur cerro El Ávila, sector San José, Caracas', 45, ARRAY[]::text[]),

('system', 'Colapso vial Autopista Valle-Coche', 'Sección de la autopista Valle-Coche colapsó. Varios vehículos cayeron. Se necesitan equipos de rescate pesado.', 'structural', 'critical', 'in_progress', ST_MakePoint(-66.9250, 10.4650)::geography, 'Autopista Valle-Coche, tramo elevado, Caracas', 15, ARRAY[]::text[]),

('system', 'Refugio urgente - 200 familias Caricuao', 'Comunidad de Caricuao completamente desplazada. 200 familias sin techo necesitan refugio temporal, alimentos y agua.', 'shelter', 'high', 'pending', ST_MakePoint(-66.9600, 10.4400)::geography, 'UD-7, Caricuao, Caracas', 800, ARRAY[]::text[]),

('system', 'Fuga de agua potable - El Valle', 'Rotura de tubería principal de agua potable. Zona de El Valle sin suministro de agua. Miles de personas afectadas.', 'food_water', 'high', 'assigned', ST_MakePoint(-66.9100, 10.4700)::geography, 'Av. Intercomunal de El Valle, Caracas', 5000, ARRAY[]::text[]),

('system', 'Personas desaparecidas - Chacao', 'Edificio residencial en Chacao con daños. 12 personas reportadas como desaparecidas por familiares. No responden llamadas.', 'missing', 'high', 'in_progress', ST_MakePoint(-66.8550, 10.4950)::geography, 'Av. Francisco de Miranda, Chacao, Caracas', 12, ARRAY[]::text[]),

-- Valencia
('system', 'Colapso puente sobre Río Cabriales', 'Puente peatonal sobre el Río Cabriales colapsó. Personas que transitaban cayeron al río. Equipos de rescate acuático necesarios.', 'structural', 'critical', 'pending', ST_MakePoint(-68.0050, 10.1700)::geography, 'Puente peatonal Río Cabriales, Valencia, Carabobo', 8, ARRAY[]::text[]),

('system', 'Emergencia en Centro Comercial Metrópolis', 'Techo del centro comercial Metrópolis parcialmente colapsado. Personas atrapadas en tiendas del segundo piso.', 'trapped', 'high', 'assigned', ST_MakePoint(-68.0100, 10.1750)::geography, 'CC Metrópolis, Av. Bolívar Norte, Valencia', 30, ARRAY[]::text[]),

('system', 'Inundación por rotura de represa Pao-Cachinche', 'Fisura en represa Pao-Cachinche causando inundación progresiva en zonas bajas de Valencia. Evacuación preventiva en curso.', 'flood', 'critical', 'in_progress', ST_MakePoint(-68.0200, 10.1500)::geography, 'Zona sur de Valencia, Carabobo', 3000, ARRAY[]::text[]),

-- Maracaibo
('system', 'Daño estructural en edificios de Bella Vista', 'Múltiples edificios en Bella Vista con grietas visibles y riesgo de colapso. Evacuación necesaria.', 'structural', 'high', 'pending', ST_MakePoint(-71.6200, 10.6500)::geography, 'Sector Bella Vista, Maracaibo, Zulia', 150, ARRAY[]::text[]),

('system', 'Escasez de agua y alimentos - La Guajira', 'Comunidades indígenas Wayúu en La Guajira sin acceso a agua ni alimentos tras el sismo. Caminos bloqueados.', 'food_water', 'high', 'pending', ST_MakePoint(-71.9500, 11.4000)::geography, 'Municipio Guajira, Zulia', 2000, ARRAY[]::text[]),

-- Mérida
('system', 'Deslizamiento en vía Mérida-Ejido', 'Gran deslizamiento de tierra bloqueó completamente la vía Mérida-Ejido. Vehículos atrapados. Posibles heridos.', 'landslide', 'high', 'assigned', ST_MakePoint(-71.2000, 8.5500)::geography, 'Carretera Mérida-Ejido, Mérida', 20, ARRAY[]::text[]),

('system', 'Colapso de viviendas en Pueblo Nuevo', 'Sector popular de Pueblo Nuevo con múltiples viviendas colapsadas. Familias durmiendo a la intemperie.', 'shelter', 'medium', 'pending', ST_MakePoint(-71.1500, 8.5850)::geography, 'Pueblo Nuevo, Mérida', 60, ARRAY[]::text[]),

-- San Cristóbal
('system', 'Daños en Puente Internacional Simón Bolívar', 'Puente internacional con daños estructurales visibles. Tránsito suspendido. Personas varadas en ambos lados de la frontera.', 'structural', 'high', 'in_progress', ST_MakePoint(-72.3100, 7.8900)::geography, 'Puente Internacional Simón Bolívar, Táchira', 500, ARRAY[]::text[]),

-- Cumaná
('system', 'Tsunami menor en costa de Cumaná', 'Oleaje anormal reportado en costa de Cumaná post-sismo. Evacuación de zona costera. Pescadores desaparecidos.', 'missing', 'critical', 'pending', ST_MakePoint(-64.1700, 10.4600)::geography, 'Malecón de Cumaná, Sucre', 40, ARRAY[]::text[]),

-- Barquisimeto
('system', 'Escuela Nacional colapsada', 'Escuela Nacional Bolivariana en Barquisimeto con techo colapsado. No había clases pero vigilante podría estar atrapado.', 'trapped', 'medium', 'assigned', ST_MakePoint(-69.3100, 10.0650)::geography, 'Av. Vargas, Barquisimeto, Lara', 2, ARRAY[]::text[]);


-- RECURSOS (ayuda disponible en Venezuela)
INSERT INTO resources (provider_id, type, name, description, quantity, unit, location, address, available, contact_phone) VALUES
-- Agua
('system', 'water', 'Cisterna de agua potable - Caracas', 'Camión cisterna con 10.000 litros de agua potable disponible para distribución en zonas afectadas de Caracas.', 10000, 'litros', ST_MakePoint(-66.9000, 10.4900)::geography, 'Plaza Bolívar, Caracas', true, '+58 212-8601000'),
('system', 'water', 'Punto de distribución de agua - Valencia', 'Punto de distribución de agua potable en bidones. Cruz Roja operando.', 5000, 'litros', ST_MakePoint(-68.0039, 10.1620)::geography, 'Frente al Hospital Central, Valencia', true, '+58 241-8570000'),
('system', 'water', 'Planta potabilizadora móvil - UNICEF', 'Planta potabilizadora móvil donada por UNICEF. Capacidad de 2000 litros/hora.', 2000, 'litros/hora', ST_MakePoint(-66.8850, 10.4950)::geography, 'Parque del Este, Caracas', true, '+58 212-2840000'),

-- Alimentos
('system', 'food', 'Centro de acopio CLAP - Caracas', 'Centro de acopio con cajas CLAP y alimentos no perecederos. Arroz, pasta, granos, aceite, harina.', 2000, 'cajas', ST_MakePoint(-66.9256, 10.4603)::geography, 'Poliedro de Caracas', true, '+58 212-6820000'),
('system', 'food', 'Donación Empresas Polar', 'Camión con alimentos Empresas Polar: harina PAN, pasta, arroz, margarina. Para distribución gratuita.', 500, 'paquetes', ST_MakePoint(-66.8750, 10.5000)::geography, 'Sede Empresas Polar, Los Cortijos, Caracas', true, '+58 212-2021000'),
('system', 'food', 'Cocina comunitaria - Petare', 'Cocina comunitaria operando 24/7. Capacidad para 500 platos por turno. Desayuno, almuerzo y cena.', 1500, 'platos/día', ST_MakePoint(-66.8175, 10.4800)::geography, 'Mercado de Petare, Caracas', true, '+58 212-2710000'),
('system', 'food', 'Alimentos Cruz Roja - Maracaibo', 'Centro de distribución de alimentos de Cruz Roja Venezolana. Raciones individuales listas para consumir.', 3000, 'raciones', ST_MakePoint(-71.6125, 10.6544)::geography, 'Cruz Roja, Av. Bella Vista, Maracaibo', true, '+58 261-7980000'),

-- Medicinas
('system', 'medicine', 'Farmacia de emergencia - Hospital Universitario', 'Punto de distribución de medicamentos esenciales: analgésicos, antibióticos, vendas, suero, antisépticos.', 5000, 'unidades', ST_MakePoint(-66.8833, 10.4880)::geography, 'Hospital Universitario de Caracas', true, '+58 212-6063000'),
('system', 'medicine', 'Donación OPS/OMS - Medicamentos', 'Kit de emergencia de la OPS con medicamentos para trauma, quemaduras y enfermedades respiratorias.', 100, 'kits', ST_MakePoint(-66.8900, 10.4950)::geography, 'Sede OPS Venezuela, Caracas', true, '+58 212-2065000'),
('system', 'medicine', 'Botiquines comunitarios - Barquisimeto', 'Distribución de botiquines de primeros auxilios en zonas afectadas de Barquisimeto.', 200, 'botiquines', ST_MakePoint(-69.3175, 10.0678)::geography, 'Hospital Central, Barquisimeto', true, '+58 251-2530000'),

-- Refugio
('system', 'shelter', 'Carpas ACNUR - Caracas', '100 carpas familiares (6 personas c/u) donadas por ACNUR. Incluyen kit de higiene.', 100, 'carpas', ST_MakePoint(-66.9256, 10.4603)::geography, 'Poliedro de Caracas', true, '+58 212-9010000'),
('system', 'shelter', 'Colchonetas y cobijas - Protección Civil', 'Lote de colchonetas inflables y cobijas térmicas de Protección Civil.', 500, 'kits', ST_MakePoint(-66.9100, 10.4600)::geography, 'Fuerte Tiuna, Caracas', true, '+58 212-6050000'),

-- Transporte
('system', 'transport', 'Ambulancias Cruz Roja', 'Flota de 8 ambulancias de Cruz Roja disponibles para traslado de heridos en Caracas.', 8, 'ambulancias', ST_MakePoint(-66.8900, 10.5000)::geography, 'Cruz Roja Venezolana, Caracas', true, '+58 212-5715000'),
('system', 'transport', 'Autobuses evacuación - TransCarabobo', 'Flota de autobuses disponible para evacuación masiva en Valencia y alrededores.', 15, 'autobuses', ST_MakePoint(-68.0039, 10.1620)::geography, 'Terminal de pasajeros, Valencia', true, '+58 241-8580000'),

-- Equipamiento
('system', 'equipment', 'Generadores eléctricos - CORPOELEC', 'Generadores portátiles disponibles para hospitales y refugios sin electricidad.', 20, 'generadores', ST_MakePoint(-66.9000, 10.5000)::geography, 'Sede CORPOELEC, Caracas', true, '+58 212-2190000'),
('system', 'equipment', 'Equipo de rescate pesado - Bomberos', 'Grúas, cortadoras hidráulicas y equipo de búsqueda y rescate de los Bomberos de Caracas.', 5, 'equipos', ST_MakePoint(-66.9050, 10.5050)::geography, 'Comandancia de Bomberos, Caracas', true, '+58 212-5451000'),
('system', 'equipment', 'Linternas y baterías', 'Donación de 1000 linternas LED con baterías para zonas sin electricidad.', 1000, 'unidades', ST_MakePoint(-66.8700, 10.4850)::geography, 'Centro de acopio La Carlota, Caracas', true, '+58 212-2390000'),

-- Personal
('system', 'personnel', 'Brigada médica cubana', 'Equipo de 30 médicos y enfermeros especializados en trauma y emergencias.', 30, 'profesionales', ST_MakePoint(-66.8833, 10.4880)::geography, 'Hospital Universitario de Caracas', true, '+58 212-6063500'),
('system', 'personnel', 'Voluntarios Protección Civil', 'Equipo de 50 voluntarios capacitados en búsqueda y rescate urbano.', 50, 'voluntarios', ST_MakePoint(-66.9100, 10.4600)::geography, 'Fuerte Tiuna, Caracas', true, '+58 212-6050500'),
('system', 'personnel', 'Ingenieros estructurales - Colegio de Ingenieros', 'Grupo de 15 ingenieros voluntarios para evaluación de daños estructurales en edificios.', 15, 'ingenieros', ST_MakePoint(-66.8850, 10.4950)::geography, 'Colegio de Ingenieros, Caracas', true, '+58 212-5712000'),

-- Sangre
('system', 'blood', 'Banco de sangre - Hospital Universitario', 'Jornada de donación de sangre activa. Se necesitan todos los tipos, especialmente O- y O+.', 200, 'unidades', ST_MakePoint(-66.8833, 10.4880)::geography, 'Banco de Sangre, Hospital Universitario de Caracas', true, '+58 212-6063200'),
('system', 'blood', 'Banco de sangre - CHET Valencia', 'Donación de sangre activa en Ciudad Hospitalaria de Valencia. Urgente tipo O negativo.', 100, 'unidades', ST_MakePoint(-67.9980, 10.1750)::geography, 'CHET, Valencia, Carabobo', true, '+58 241-8686200');
