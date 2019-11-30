INSERT INTO ROL VALUES
(DEFAULT, 'administrador', 'Tiene todos los privilegios dentro del sistema'),
(DEFAULT, 'entrenador', 'Puede asignar jugadores a equipos, crear y evaluar entrenamientos, añadir estadísticas de sus jugadores, etc'),
(DEFAULT, 'atleta', 'Tiene acceso a información de los entrenamientos y equipos a los que pertenece'),
(DEFAULT, 'visitante', 'Acceso limitado solo a conocer las competicioens');

INSERT INTO LUGAR VALUES
(DEFAULT, 'Caracas','estado',null,null,null),
(DEFAULT, 'Universidad Católica Andrés Bello','sede',null,null,1),
(DEFAULT, 'Universidad Metropolitana','sede',null,null,1),
(DEFAULT, 'Universidad Central de Venezuela','sede',null,null,1),
(DEFAULT, 'Universidad Simón Bolívar','sede',null,null,1);


INSERT INTO DEPORTE VALUES
(DEFAULT,'fútbol','masculino'),
(DEFAULT,'fútbol','femenino'),
(DEFAULT,'fútsal','masculino'),
(DEFAULT,'fútsal','femenino'),
(DEFAULT,'baloncesto','masculino'),
(DEFAULT,'voleibol','masculino'),
(DEFAULT,'voleibol','femenino'),
(DEFAULT,'rugby','masculino'),
(DEFAULT,'rugby','femenino'),
(DEFAULT,'beísbol','masculino');

INSERT INTO EQUIPO VALUES
(DEFAULT,'Universidad Católica Andrés Bello','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045479/accounts/Escudo_UCAB.jpg',1),
(DEFAULT,'Universidad Metropolitana','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045573/accounts/customLogo.png',1),
(DEFAULT,'Universidad Central de Venezuela','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045798/accounts/UCV.png',1),
(DEFAULT,'Universidad Simón Bolívar','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045746/accounts/usb.jpg',1),
(DEFAULT,'Universidad Católica Andrés Bello (F)','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045479/accounts/Escudo_UCAB.jpg',2),
(DEFAULT,'Universidad Metropolitana (F)','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045573/accounts/customLogo.png',2),
(DEFAULT,'Universidad Central de Venezuela (F)','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045798/accounts/UCV.png',2),
(DEFAULT,'Universidad Simón Bolívar (F)','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045746/accounts/usb.jpg',2),
(DEFAULT,'Por definir','images/desconocido.png',1),
(DEFAULT,'Por definir','images/desconocido.png',2);

INSERT INTO COMPETICION VALUES
(DEFAULT,'Liga Nacional de Fútbol Masculino','2019-09-01','2020-05-21','https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-1.2.1&w=1000&q=80','progreso',1),
(DEFAULT,'Liga Nacional de Fútbol Femenino','2019-09-01','2020-05-21','https://telecentro.com.ar/images/futbol/main-banner.jpg','progreso',1);


INSERT INTO CARACTERISTICA VALUES
(DEFAULT,'Restricciones', 'Este torneo estará disponible para hombres de 16 a 25 años que cursen en alguna de las universidades indicadas a continuación','pregunta',1),
(DEFAULT,'Equipos', 'Los equipos los conforman las Universidades más prestigiosas del país. UCAB, UCV, USB y la Unimet de invitada','info',1),
(DEFAULT,'Tiempo', 'Los partidos se jugarán en 90 minutos sin prórroga','tiempo',1),
(DEFAULT,'Fechas', 'Los partidos se jugarán cada fin de semana a partir del 1 de Septiembre','fecha',1),
(DEFAULT,'Restricciones', 'Este torneo estará disponible para mujeres de 16 a 25 años que cursen en alguna de las universidades indicadas a continuación','pregunta',2),
(DEFAULT,'Equipos', 'Los equipos los conforman las Universidades más prestigiosas del país. UCAB, UCV, USB y la Unimet de invitada','info',2),
(DEFAULT,'Tiempo', 'Los partidos se jugarán en 90 minutos sin prórroga','tiempo',2),
(DEFAULT,'Fechas', 'Los partidos se jugarán cada fin de semana a partir del 1 de Septiembre','fecha',2);

INSERT INTO EVENTO VALUES
(DEFAULT,'progreso',1,1),
(DEFAULT,'progreso',2,2);

INSERT INTO ELIMINATORIA VALUES
(DEFAULT, 'FINAL',1),
(DEFAULT, 'FINAL',2);

INSERT INTO CLASIFICACION VALUES
(DEFAULT,'GRUPO A',3,0,1,1),
(DEFAULT,'GRUPO A',3,0,1,2);

INSERT INTO PARTIDO VALUES
(DEFAULT,'JORNADA 1','2019-09-17',2,0,2,1,2,'finalizado',null,1),
(DEFAULT,'JORNADA 1','2019-09-17',2,1,2,3,4,'finalizado',null,1),
(DEFAULT,'JORNADA 2','2019-09-26',3,1,2,1,3,'finalizado',null,1),
(DEFAULT,'JORNADA 2','2019-09-26',1,1,2,2,4,'finalizado',null,1),
(DEFAULT,'JORNADA 3','2019-10-02',5,0,2,1,4,'finalizado',null,1),
(DEFAULT,'JORNADA 3','2019-10-02',2,1,2,2,3,'finalizado',null,1),
(DEFAULT,'FINAL','2019-10-30',2,1,2,1,2,'finalizado',1,null);

INSERT INTO USUARIO VALUES
(DEFAULT,'Rolando', 'Andrade', 'rolandoandrade@gmail.com','12345678','masculino','26728918','1998-12-10',null, null,1);