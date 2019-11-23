INSERT INTO ROL VALUES
(1, 'administrador', 'Tiene todos los privilegios dentro del sistema'),
(2, 'entrenador', 'Puede asignar jugadores a equipos, crear y evaluar entrenamientos, añadir estadísticas de sus jugadores, etc'),
(3, 'atleta', 'Tiene acceso a información de los entrenamientos y equipos a los que pertenece'),
(4, 'visitante', 'Acceso limitado solo a conocer las competicioens');

INSERT INTO LUGAR VALUES
(1, 'Caracas','estado',null,null,null),
(2, 'Universidad Católica Andrés Bello','sede',null,null,1),
(3, 'Universidad Metropolitana','sede',null,null,1),
(4, 'Universidad Central de Venezuela','sede',null,null,1),
(5, 'Universidad Simón Bolívar','sede',null,null,1);


INSERT INTO DEPORTE VALUES
(1,'fútbol','masculino'),
(2,'fútbol','femenino'),
(3,'fútsal','masculino'),
(4,'fútsal','femenino'),
(5,'baloncesto','masculino'),
(6,'voleibol','masculino'),
(7,'voleibol','femenino'),
(8,'rugby','masculino'),
(9,'rugby','femenino'),
(10,'beísbol','masculino');

INSERT INTO EQUIPO VALUES
(1,'Universidad Católica Andrés Bello','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045479/accounts/Escudo_UCAB.jpg',1),
(5,'Universidad Católica Andrés Bello','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045479/accounts/Escudo_UCAB.jpg',2),
(2,'Universidad Metropolitana','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045573/accounts/customLogo.png',1),
(6,'Universidad Metropolitana','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045573/accounts/customLogo.png',2),
(3,'Universidad Central de Venezuela','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045798/accounts/UCV.png',1),
(7,'Universidad Central de Venezuela','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045798/accounts/UCV.png',2),
(4,'Universidad Simón Bolívar','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045746/accounts/usb.jpg',1),
(8,'Universidad Simón Bolívar','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045746/accounts/usb.jpg',2);

INSERT INTO COMPETICION VALUES
(1,'Liga Nacional de Fútbol Masculino','2019-09-01','2020-05-21','https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-1.2.1&w=1000&q=80','progreso',1),
(2,'Liga Nacional de Fútbol Femenino','2019-09-01','2020-05-21','https://telecentro.com.ar/images/futbol/main-banner.jpg','progreso',1);


INSERT INTO CARACTERISTICA VALUES
(1,'Restricciones', 'Este torneo estará disponible para hombres de 16 a 25 años que cursen en alguna de las universidades indicadas a continuación','pregunta',1),
(2,'Equipos', 'Los equipos los conforman las Universidades más prestigiosas del país. UCAB, UCV, USB y la Unimet de invitada','info',1),
(3,'Tiempo', 'Los partidos se jugarán en 90 minutos sin prórroga','tiempo',1),
(4,'Fechas', 'Los partidos se jugarán cada fin de semana a partir del 1 de Septiembre','fecha',1),
(5,'Restricciones', 'Este torneo estará disponible para mujeres de 16 a 25 años que cursen en alguna de las universidades indicadas a continuación','pregunta',2),
(6,'Equipos', 'Los equipos los conforman las Universidades más prestigiosas del país. UCAB, UCV, USB y la Unimet de invitada','info',2),
(7,'Tiempo', 'Los partidos se jugarán en 90 minutos sin prórroga','tiempo',2),
(8,'Fechas', 'Los partidos se jugarán cada fin de semana a partir del 1 de Septiembre','fecha',2);

INSERT INTO EVENTO VALUES
(1,'progreso',1,1),
(2,'progreso',2,2);

INSERT INTO ELIMINATORIA VALUES
(1, 'FINAL',1),
(2, 'FINAL',1);

INSERT INTO CLASIFICACION VALUES
(1,'GRUPO A',3,0,1,1),
(2,'GRUPO A',3,0,1,2);

INSERT INTO TABLA_CLASIFICACION VALUES
(1,1,1),
(2,2,1),
(3,3,1),
(4,4,1),
(5,5,2),
(6,6,2),
(7,7,2),
(8,8,2);

INSERT INTO PARTIDO VALUES
(1,'JORNADA 1','2019-09-17',2,0,2,1,2,'finalizado',null,1),
(2,'JORNADA 1','2019-09-17',2,1,2,3,4,'finalizado',null,1),
(3,'JORNADA 2','2019-09-26',3,1,2,1,3,'finalizado',null,1),
(4,'JORNADA 2','2019-09-26',1,1,2,2,4,'finalizado',null,1),
(5,'JORNADA 3','2019-10-02',5,0,2,1,4,'finalizado',null,1),
(6,'JORNADA 3','2019-10-02',2,1,2,2,3,'finalizado',null,1),
(7,'FINAL','2019-10-02',2,1,2,1,2,'finalizado',1,null);

