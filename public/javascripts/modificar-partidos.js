let jugadoresLocal, jugadoresVisitante;

function getPartidoFromUrl()
{
    $("#loader-creador-partidos").hide();
    let url = document.location.href;
    let partido = url.substring(url.lastIndexOf("?partido=")+9);
    return partido;
}

function showModificarPartidos()
{
    hideAll();
    $("#modificar-partidos-content").show(300);
    $("#detail-title").html("Modificar partido");
    replaceIcon("back-icon");
    $("#add-inicio-boton").show()
    $("#add-final-boton").show();
    retrieveMatch();
}

function appendInicio(data)
{
    return '<div class="post-card">\n' +
        '                    <div class="note-icon square-partido-card yellow">\n' +
                                    data.minuto+
        '                    </div>\n' +
        '                    <div class="action-partido-card">\n' +
        '                        Inicio del partido\n' +
        '                    </div>\n' +
        '                    <div class="note-icon square-partido-card yellow">\n' +
        '                        <i class="zmdi zmdi-time-interval"></i>\n' +
        '                    </div>\n' +
        '                </div>'
}

function appendFinal(data)
{
    return '<div class="post-card">\n' +
        '                    <div class="note-icon square-partido-card red">\n' +
                                data.minuto+
        '                    </div>\n' +
        '                    <div class="action-partido-card">\n' +
        '                        Fin del partido\n' +
        '                    </div>\n' +
        '                    <div class="note-icon square-partido-card red">\n' +
        '                        <i class="zmdi zmdi-timer-off"></i> '+
        '                    </div>\n' +
        '                </div>'
}

function appendGol(data, idlocal)
{
    return '<div class="post-card">\n' +
        '                    <div class="note-icon square-partido-card '+(data.equipoid===idlocal?"blue":"gray")+'">\n' +
                                    data.minuto+
        '                    </div>\n' +
        '                    <div class="action-partido-card">\n' +
                                    data.nombre+' '+data.apellido+
        '                    </div>\n' +
        '                    <div class="note-icon square-partido-card '+(data.equipoid===idlocal?"blue":"gray")+'">\n' +
        '                        <i class="zmdi zmdi-dribbble"></i>\n' +
        '                    </div>\n' +
        '                </div>';

}

function escogerJugador(i,local,last)
{
    if(local)
    {
        jugadoresLocal[i].check = true;
        jugadoresLocal[i].goleador = !last;
        jugadoresLocal[i].asistente = last;
    }
    else
    {
        jugadoresVisitante[i].check = true;
        jugadoresVisitante[i].goleador = !last;
        jugadoresVisitante[i].asistente = last;
    }
    swal.clickConfirm()
}

function modalPlayersData(local, last)
{
    let s = "";
    let ax = local?jugadoresLocal:jugadoresVisitante;

    ax.forEach((i,k)=>
    {
        if(!i.check)
        {
            let imagen = i.imagen;
            let nombre = i.nombre;
            let apellido = i.apellido;
            let id = i.id;
            s+='<div class="create-equipo-card">' +
                '<div class="classification-player-image" style="background-image: url('+imagen+'); margin: auto auto;">' +
                '</div>' +
                '<div class="create-equipo-card-teamname" style="width: 60%">' + nombre+' '+apellido+
                '</div>' +
                '<div class="more-button-green team" onclick="escogerJugador('+k+','+local+','+last+')">' +
                '<i class="zmdi zmdi-check"></i>' +
                '</div>' +
                '</div>';
        }
    });
    return s;
}

function resetSelectedPlayers()
{
    jugadoresLocal.forEach((i)=>
    {
        i.check = false;
        i.goleador = false;
        i.asistente = false;
    });
    jugadoresVisitante.forEach((i)=>
    {
        i.check = false;
        i.goleador = false;
        i.asistente = false;
    })
}

async function insertarSituacion(tipo, minuto)
{

    let goleador, asistente;
    jugadoresLocal.forEach((i)=>
    {
        if(i.goleador)
        {
            goleador = i.id;
        }
        else if(i.asistente)
        {
            asistente = i.id;
        }
    });
    jugadoresVisitante.forEach((i)=>
    {
        if(i.goleador)
        {
            goleador = i.id;
        }
        else if(i.asistente)
        {
            asistente = i.id;
        }
    });
    let data = {
        partido: getPartidoFromUrl(),
        minuto: minuto,
        tipo: tipo,
        goleador: goleador,
        asistente: asistente
    };
    let req = await new PostRequest(data,"/api/v1/situations").execute();
    swal(
        'Éxito',
        'Se ha insertado satisfactoriamente',
        'success'
    );
    retrieveMatch();
}

function selectPlayers(local)
{
    let s = modalPlayersData(local,false);
    if (s.length > 0)
    {
        swal({
            title: 'Selecciona al goleador',
            cancelButtonText: '<i class="zmdi zmdi-close"></i>  CANCELAR',
            cancelButtonColor: '#03A9F4',
            showConfirmButton: false,
            showCancelButton: true,
            html: s
        }).then(function () {
            swal({
                title: 'Selecciona al asistente',
                confirmButtonText: '<i class="zmdi zmdi-check"></i>  SALTAR',
                cancelButtonText: '<i class="zmdi zmdi-close"></i>  CANCELAR',
                confirmButtonColor: '#03A9F4',
                cancelButtonColor: '#bb4c41',
                showConfirmButton: true,
                showCancelButton: true,
                html: modalPlayersData(local,true)
            }).then(function () {
                swal({
                    title: 'Indique el minuto del gol',
                    confirmButtonText: '<i class="zmdi zmdi-check"></i>  ACEPTAR',
                    cancelButtonText: '<i class="zmdi zmdi-close"></i>  CANCELAR',
                    confirmButtonColor: '#03A9F4',
                    cancelButtonColor: '#bb4c41',
                    showConfirmButton: true,
                    showCancelButton: true,
                    html: '<input id="crear-minuto-situacion" type="number" class="create-input validate" style="text-align: center" min="1" value="1">'
                }).then(function () {
                    insertarSituacion("gol", $("#crear-minuto-situacion").val());
                }).catch((e)=>{
                    swal(
                        'Cancelado',
                        'El proceso ha sido cancelado',
                        'error'
                    );
                    resetSelectedPlayers();
                });
            }).catch((e)=>{
                swal(
                    'Cancelado',
                    'El proceso ha sido cancelado',
                    'error'
                );
                resetSelectedPlayers();
            });
        }).catch((e)=>{
            swal(
                'Cancelado',
                'El proceso ha sido cancelado',
                'error'
            );
            resetSelectedPlayers();
        });
    }
}

async function retrievePlayersOfGame(local,visitante)
{
    jugadoresLocal = (await new GetRequest("/api/v1/players/teams/"+local).execute()).data;
    jugadoresVisitante = (await new GetRequest("/api/v1/players/teams/"+visitante).execute()).data;
}

function showPartidoData(partido)
{
    $("#resultado-actual").empty();
    let idlocal = partido.resultado.id_local;
    let idvisitante = partido.resultado.id_visitante;
    let fecha = partido.resultado.fecha;
    let lugar = partido.resultado.lugar;
    let local = partido.resultado.nombre_local;
    let visitante = partido.resultado.nombre_visitante;
    let rlocal = partido.resultado.resultado_local;
    let rvisitante = partido.resultado.resultado_visitante;
    let elocal = partido.resultado.escudo_local;
    let evisitante = partido.resultado.escudo_visitante;
    retrievePlayersOfGame(idlocal,idvisitante);
    let s = '<div class="post-card results partidos-modificar">\n' +
        '                    <div class="final-section">\n' +
        '                        <div class="final-team-shield">\n' +
        '                            <img src="'+elocal+'" alt="">\n' +
        '                        </div>\n' +
        '                        <div class="final-team-name">\n' +
                                        local+
        '</div>\n' +
        '                        <div class="final-team-score">\n' +
                                        rlocal+' - '+rvisitante+'                        </div>\n' +
        '                        <div class="final-team-name">\n'+
                                    visitante+
                                '</div>\n' +
        '                        <div class="final-team-shield">\n' +
        '                            <img src="'+evisitante+'" alt="">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>';
    partido.situaciones.forEach((i)=>
    {
        if(i.tipo === "inicio")
        {
            $("#add-inicio-boton").hide();
            s+=appendInicio(i);
        }
        else if(i.tipo === 'fin')
        {
            $("#add-final-boton").hide();
            s+=appendFinal(i);
        }
        else
        {

            s+=appendGol(i, idlocal);
        }
    })

    $("#resultado-actual").append(s);

}

async function retrieveMatch()
{
    let id = getPartidoFromUrl();
    let partido = (await new GetRequest("/api/v1/matches/"+id).execute()).data;
    showPartidoData(partido)
}