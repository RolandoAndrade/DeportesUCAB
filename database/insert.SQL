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
(2,'Universidad Católica Andrés Bello','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045479/accounts/Escudo_UCAB.jpg',2),
(3,'Universidad Metropolitana','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045573/accounts/customLogo.png',1),
(4,'Universidad Metropolitana','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045573/accounts/customLogo.png',2),
(5,'Universidad Central de Venezuela','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045798/accounts/UCV.png',1),
(6,'Universidad Central de Venezuela','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045798/accounts/UCV.png',2),
(7,'Universidad Simón Bolívar','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045746/accounts/usb.jpg',1),
(8,'Universidad Simón Bolívar','https://res.cloudinary.com/rolandoandrade/image/upload/v1573045746/accounts/usb.jpg',2);

INSERT INTO COMPETICION VALUES
(1,'Liga Nacional de Fútbol Masculino','2019-09-01','2020-05-21','https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-1.2.1&w=1000&q=80','progreso',1),
(2,'Liga Nacional de Fútbol Femenino','2019-09-01','2020-05-21','https://telecentro.com.ar/images/futbol/main-banner.jpg','progreso',1);



