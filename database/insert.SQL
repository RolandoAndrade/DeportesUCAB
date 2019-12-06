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

INSERT INTO PARTICIPACION VALUES
(DEFAULT,1,1),
(DEFAULT,2,1),
(DEFAULT,3,1),
(DEFAULT,4,1),
(DEFAULT,5,2),
(DEFAULT,6,2),
(DEFAULT,7,2),
(DEFAULT,8,2);

INSERT INTO USUARIO VALUES
(DEFAULT,'Rolando', 'Andrade', 'rolandoandrade@gmail.com','12345678','masculino','26728918','1998-12-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575148700/accounts/photo_2019-11-21_17-24-37.jpg', null,'delantero',1,1),
(DEFAULT,'Cristiano', 'Ronaldo', 'ronaldo@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575230798/accounts/Cristiano_Ronaldo_Portugal.jpg', null,'delantero',3,null),
(DEFAULT,'Lionel', 'Messi', 'messi@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575230854/accounts/26622.jpg', null,'delantero',3,null),
(DEFAULT,'Mohamed', 'Salah', 'salah@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231060/accounts/173692.jpg', null,'delantero',3,null),
(DEFAULT,'Gareth', 'Bale', 'bale@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231260/accounts/1567427531_418411_1567427734_noticia_normal_recorte1.jpg', null,'delantero',3,null),
(DEFAULT,'Álvaro', 'Morata', 'morata@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231304/accounts/75.jpg', null,'delantero',3,null),
(DEFAULT,'Thibaut', 'Courtois', 'courtois@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231339/accounts/Futbol-La_Liga-Primera_Division-Futbol_437969555_135684174_1024x576.jpg', null,'portero',3,null),
(DEFAULT,'Toni', 'Kroos', 'kroos@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231412/accounts/15748092979155.jpg', null,'mediocampista',3,null),
(DEFAULT,'Mario', 'Gotze', 'gotze@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231499/accounts/157899.jpg', null,'mediocampista',3,null),
(DEFAULT,'Marco', 'Reus', 'reus@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231531/accounts/49775532_303.jpg', null,'delantero',3,null),
(DEFAULT,'Salomon', 'Rondón', 'rondon@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231581/accounts/PAFHRGWAAZETHDV74QJ26OYHGM.jpg', null,'delantero',3,null),
(DEFAULT,'Josef', 'Martínez', 'martinez@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231693/accounts/0001482475.jpg', null,'delantero',3,null),
(DEFAULT,'Oliver', 'Kahn', 'kahn@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231765/accounts/wf46ifpdrjendubartol.jpg', null,'portero',3,null),
(DEFAULT,'Alex', 'Morgan', 'morgan@gmail.com','12345678','femenino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231901/accounts/15599360986869.jpg', null,'mediocampista',3,null),
(DEFAULT,'Laure', 'Boulleau', 'laure@gmail.com','12345678','femenino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575231950/accounts/laure-boulleau-721x410-1.jpg', null,'mediocampista',3,null),
(DEFAULT,'Ellyse', 'Perry', 'perry@gmail.com','12345678','femenino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575232069/accounts/59f7d1acbf7cda755b2df60188fc6117.png', null,'defensa',3,null),
(DEFAULT,'Hope', 'Solo', 'solo@gmail.com','12345678','femenino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575232139/accounts/1535651157_259924_1535651225_noticia_normal.jpg', null,'portero',3,null),
(DEFAULT,'Kaylyn', 'Kyle', 'kk@gmail.com','12345678','femenino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575232206/accounts/ef2254a7648c56da606ee9ffbc058d75.jpg', null,'delantero',3,null),
(DEFAULT,'Ketlen', 'Wiggers', 'wiggers@gmail.com','12345678','femenino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575232359/accounts/4901099845_d2f3856ded_b.jpg', null,'mediocampista',3,null),
(DEFAULT,'Nayeli', 'Rangel', 'rangel@gmail.com','12345678','femenino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575232419/accounts/AAB5JKo.jpg', null,'defensa',3,null),
(DEFAULT,'Nicole', 'Regnier', 'regnier@gmail.com','12345678','femenino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575232488/accounts/58e43101de5a2.r_1508777432316.0-86-807-571.jpg', null,'mediocampista',3,null),
(DEFAULT,'Neymar', 'Da Silva', 'neymar@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629537/accounts/15655185764110.jpg', null,'delantero',3,null),
(DEFAULT,'Serge', 'Gnabri', 'gnabri@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629640/accounts/serge-gnabry-fc-bayern-munchen-1569996078-26223.jpg', null,'mediocampista',3,null),
(DEFAULT,'Eden', 'Hazard', 'hazard@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629677/accounts/1165284877_20190731112611425-kHQH-U464101136206ggG-992x558_LaVanguardia-Web.jpg', null,'mediocampista',3,null),
(DEFAULT,'Keylor', 'Navas', 'navas@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629719/accounts/1575245444_125960_1575245811_noticia_normal_recorte1.jpg', null,'portero',3,null),
(DEFAULT,'Sergio', 'Ramos', 'ramos@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629787/accounts/1550919555_521513_1550919850_noticia_normal.jpg', null,'defensa',3,null),
(DEFAULT,'Raphael', 'Varane', 'varane@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629861/accounts/raphael-varane-real-madrid-1552975750-21200.jpg', null,'portero',3,null),
(DEFAULT,'Davison', 'Boateng', 'boateng@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629988/accounts/765229_Rect169_600.jpg', null,'defensa',3,null),
(DEFAULT,'Mats', 'Hummels', 'hummels@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575629921/accounts/mats-hummels-im-einsatz-fur-borussia-dortmund-1563271076-23632.jpg', null,'defensa',3,null),
(DEFAULT,'Miroslav', 'Klose', 'klose@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575630295/accounts/miroslav-klose-whoateallthepies.jpg', null,'delantero',3,null),
(DEFAULT,'Juan', 'Arango', 'arango@gmail.com','12345678','masculino','26728918','1989-02-25','https://res.cloudinary.com/rolandoandrade/image/upload/v1575630340/accounts/1516573901_068442_1516573991_noticia_normal.jpg', null,'mediocampista',3,null),
(DEFAULT,'Alain', 'Baroja', 'baroja@gmail.com','12345678','masculino','26728918','1991-04-27','https://res.cloudinary.com/rolandoandrade/image/upload/v1575630414/accounts/lREzxp1z_400x400.jpg', null,'portero',3,null),
(DEFAULT,'Gabi', 'Fernández', 'fernandez@gmail.com','12345678','masculino','26728918','1996-10-10','https://res.cloudinary.com/rolandoandrade/image/upload/v1575630472/accounts/15301303426492.jpg', null,'defensa',3,null);
                           ;
--2,3,4 5,6,7 8,9,10 11,12,13
INSERT INTO HABILIDAD VALUES
(DEFAULT, 1,1),
(DEFAULT, 2,1),
(DEFAULT, 3,1),
(DEFAULT, 4,1),
(DEFAULT, 5,1),
(DEFAULT, 6,1),
(DEFAULT, 7,1),
(DEFAULT, 8,1),
(DEFAULT, 9,1),
(DEFAULT, 10,1),
(DEFAULT, 11,1),
(DEFAULT, 12,1),
(DEFAULT, 13,1),
(DEFAULT, 14,2),
(DEFAULT, 15,2),
(DEFAULT, 16,2),
(DEFAULT, 17,2),
(DEFAULT, 18,2),
(DEFAULT, 19,2),
(DEFAULT, 20,2),
(DEFAULT, 21,2),
(DEFAULT, 22,1),
(DEFAULT, 23,1),
(DEFAULT, 24,1),
(DEFAULT, 25,1),
(DEFAULT, 26,1),
(DEFAULT, 27,1),
(DEFAULT, 28,1),
(DEFAULT, 29,1),
(DEFAULT, 30,1),
(DEFAULT, 31,1),
(DEFAULT, 32,1),
(DEFAULT, 33,1);

INSERT INTO ATLETA VALUES
(DEFAULT, 'activo','2019-05-05',null,2,1),
(DEFAULT, 'activo','2019-05-05',null,3,1),
(DEFAULT, 'activo','2019-05-05',null,4,1),
(DEFAULT, 'activo','2019-05-05',null,5,2),
(DEFAULT, 'activo','2019-05-05',null,6,2),
(DEFAULT, 'activo','2019-05-05',null,7,2),
(DEFAULT, 'activo','2019-05-05',null,8,3),
(DEFAULT, 'activo','2019-05-05',null,9,3),
(DEFAULT, 'activo','2019-05-05',null,10,3),
(DEFAULT, 'activo','2019-05-05',null,11,4),
(DEFAULT, 'activo','2019-05-05',null,12,4),
(DEFAULT, 'activo','2019-05-05',null,13,4),
(DEFAULT, 'activo','2019-05-05',null,14,5),
(DEFAULT, 'activo','2019-05-05',null,15,5),
(DEFAULT, 'activo','2019-05-05',null,16,6),
(DEFAULT, 'activo','2019-05-05',null,17,6),
(DEFAULT, 'activo','2019-05-05',null,18,7),
(DEFAULT, 'activo','2019-05-05',null,19,7),
(DEFAULT, 'activo','2019-05-05',null,20,8),
(DEFAULT, 'activo','2019-05-05',null,21,8),
(DEFAULT, 'activo','2019-05-05',null,22,1),
(DEFAULT, 'activo','2019-05-05',null,23,1),
(DEFAULT, 'activo','2019-05-05',null,24,2),
(DEFAULT, 'activo','2019-05-05',null,25,2),
(DEFAULT, 'activo','2019-05-05',null,26,3),
(DEFAULT, 'activo','2019-05-05',null,27,3),
(DEFAULT, 'activo','2019-05-05',null,28,4),
(DEFAULT, 'activo','2019-05-05',null,29,4);

INSERT INTO PARTIDO VALUES
(DEFAULT,'JORNADA 1','2019-09-17',0,0,2,1,2,'finalizado',null,1),
(DEFAULT,'JORNADA 1','2019-09-17',0,0,2,3,4,'finalizado',null,1),
(DEFAULT,'JORNADA 2','2019-09-26',0,0,2,1,3,'finalizado',null,1),
(DEFAULT,'JORNADA 2','2019-09-26',0,0,2,2,4,'finalizado',null,1),
(DEFAULT,'JORNADA 3','2019-10-02',0,0,2,1,4,'finalizado',null,1),
(DEFAULT,'JORNADA 3','2019-10-02',0,0,2,2,3,'finalizado',null,1),
(DEFAULT,'FINAL','2019-10-30',0,0,2,1,2,'finalizado',1,null);
CREATE OR REPLACE FUNCTION insertsituaciones() RETURNS VOID AS
$$
BEGIN
    PERFORM crearsituacion(1,0,'inicio',null,null);
    PERFORM crearsituacion(1,90,'fin',null,null);
    PERFORM crearsituacion(2,0,'inicio',null,null);
    PERFORM crearsituacion(2,90,'fin',null,null);
    PERFORM crearsituacion(3,0,'inicio',null,null);
    PERFORM crearsituacion(3,90,'fin',null,null);
    PERFORM crearsituacion(4,0,'inicio',null,null);
    PERFORM crearsituacion(4,90,'fin',null,null);
    PERFORM crearsituacion(5,0,'inicio',null,null);
    PERFORM crearsituacion(5,90,'fin',null,null);
    PERFORM crearsituacion(6,0,'inicio',null,null);
    PERFORM crearsituacion(6,90,'fin',null,null);
    PERFORM crearsituacion(7,0,'inicio',null,null);
    PERFORM crearsituacion(7,90,'fin',null,null);

    PERFORM crearsituacion(1,20,'gol',2,3);
    PERFORM crearsituacion(1,62,'gol',2,NULL);
    PERFORM crearsituacion(2,10,'gol',8,10);
    PERFORM crearsituacion(2,25,'gol',9,8);
    PERFORM crearsituacion(2,15,'gol',11,NULL);
    PERFORM crearsituacion(3,70,'gol',2,3);
    PERFORM crearsituacion(3,72,'gol',3,2);
    PERFORM crearsituacion(3,84,'gol',4,NULL);
    PERFORM crearsituacion(3,70,'gol',9,10);
    PERFORM crearsituacion(4,27,'gol',7,5);
    PERFORM crearsituacion(4,46,'gol',13,12);
    PERFORM crearsituacion(5,5,'gol',2,3);
    PERFORM crearsituacion(5,10,'gol',2,3);
    PERFORM crearsituacion(5,15,'gol',2,4);
    PERFORM crearsituacion(5,45,'gol',3,4);
    PERFORM crearsituacion(5,70,'gol',4,2);
    PERFORM crearsituacion(6,20,'gol',6,7);
    PERFORM crearsituacion(6,40,'gol',7,5);
    PERFORM crearsituacion(6,30,'gol',9,NULL);
    PERFORM crearsituacion(7,10,'gol',2,4);
    PERFORM crearsituacion(7,90,'gol',4,NULL);
    PERFORM crearsituacion(7,80,'gol',7,NULL);
END;
$$ LANGUAGE 'plpgsql';

SELECT insertsituaciones()
