function getEventFromURL()
{
    let url = document.location.href;
    return parseInt(url.substring(url.lastIndexOf("?evento=")+8));
}

function addEvents(events)
{
    let s="";
    events.forEach((i)=>
    {
        let fecha = dateSimple(new Date(i.fecha));
        s += "           <div onclick='openDetailsOf("+JSON.stringify(i)+")'"+' class="post-card clickeable">' +
            '                <div class="card-preview-image" ' +
            'style="background: url('+"'"+i.imagen+"'"+') center;background-size: cover">' +
            '                </div>' +
            '                <div class="card-content">' +
            '                    <div class="card-title">' +
            i.nombre+
            '                    </div>' +
            '                    <div class="card-data">' +
            '                        <div class="card-date-icon">' +
            '                            <div class="card-icon"><i class="zmdi zmdi-calendar"></i></div>' +
            '                        </div>' +
            '                        <div class="card-place-icon">' +
            '                            <div class="card-icon">' +
            '                                <i class="zmdi zmdi-pin"></i>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="card-date">' +
            '                            <div class="card-fulldate">'+fecha+'</div>' +
            '                        </div>' +
            '                        <div class="card-place">' +
            '                            <div class="location">' +
            i.lugar+
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '' +
            '                </div>' +
            '            </div>'
    });
    $("#eventos-content").empty();
    $("#eventos-content").append(s);
}

function openDetailsOf(event)
{
    window.history.pushState('DeportesUCAB', 'DeportesUCAB', '#detalles?evento='+event.id);
    viewSelection();
}

function showCompetitionDetail()
{
    let event = getEventFromURL();
    if(event)
    {
        hideAll();
        $("#competition-detail").show(300);
        replaceIcon("back-icon");
        retrieveStats(event)
        retrieveEventAllData(event)
        retrieveDetails(event);
        retrieveMatches(event);
        retrieveClassifications(event);
        retrieveQualifiers(event);
        retrievePlayers(event);
        changeViewTo({id: 'inicio'})
    }
    else
    {
        backLevel(true);
    }
}

function createResumeTable(data, title, ld)
{
    let players = "";
    data.forEach((i)=>
    {
        let imagen = i.imagen;
        let nombre = i.nombre+" "+i.apellido;
        let goles = i.goles;
        let nombreequipo = i.nombre_equipo;
        let escudoequipo = i.escudo_equipo;
        players+='<tr>\n' +
            '                            <td>\n' +
            '                                <div class="classification-player-image" style="background-image: url('+imagen+')">' +
            '                                </div>\n' +
            '                            </td>\n' +
            '                            <td>' +
                                            nombre+
            '                            </td>' +
            '                            <td class="classification-team-name mini">\n' +
            '                                <div class="classification-team-shield">\n' +
            '                                    <img src="'+escudoequipo+'" alt="">' +
            '                                </div>\n' +
            '                                <div>'+nombreequipo+'</div>\n' +
            '                            </td>\n' +
            '                            <td>'+goles+'</td>\n' +
            '                        </tr>'
    })
    let s = '<div class="post-card results">' +
        '                    <div class="result-title">' +
                                title+
        '                    </div>' +
        '                    <table class="classification-table">' +
        '                   <tr>' +
        '                            <th></th>\n' +
        '                            <th>NOMBRE</th>\n' +
        '                            <th>EQUIPO</th>\n' +
        '                            <th>'+ld+'</th>\n' +
        '                        </tr>'+
                                players+
        '                    </table>\n' +
        '            </div>';
    $("#estadisticas-content").append(s);
}

function createStatsView(goleadores, asistentes)
{
    $("#estadisticas-content").empty();
    createResumeTable(goleadores, "GOLEADORES", "GOLES");
    createResumeTable(asistentes, "ASISTENTES", "ASISTENCIAS");
}

async function retrieveStats(event)
{
    let stats = (await new GetRequest("/api/v1/events/stats/"+event).execute()).data;
    createStatsView(stats.goleadores,stats.asistentes);
}

function createPlayersView(players)
{
    $("#jugadores-content").empty();
    let cards = "";
    players.forEach((i)=>
    {
        let nombre = i.nombre;
        let id = i.id;
        let imagen = i.imagen;
        let apellido = i.apellido;
        cards+='<div class="player-card">\n' +
            '          <div class="player-image" style="background-image: url('+imagen+'")>\n' +
            '          </div>\n' +
            '          <div class="player-name">\n' +
                             nombre+" "+apellido+
            '          </div>\n' +
            ' </div>'
    });
    let s = '<div class="player-card-container">' + cards+ '</div>';
    $("#jugadores-content").append(s);
}

async function retrievePlayers(event)
{
    let players = (await new GetRequest("/api/v1/players/events/"+event).execute()).data;
    createPlayersView(players)
}

async function retrieveEventAllData(event)
{
    event = (await new GetRequest("/api/v1/events/"+event).execute()).data;
    $("#detail-title").html(event.nombre);
    $("#event-card-content-detail").find(".card-title").html(event.nombre);
    $("#event-card-content-detail").find(".card-fulldate").html(dateSimple(new Date(event.fecha)));
    $("#event-card-content-detail").find(".card-place").html(event.lugar);
    $("#event-card-content-detail").find(".card-preview-image").css({"background": "url("+event.imagen+") center","background-size":"cover"});
}

const COLORS = ["blue","red","green","yellow"];
const TYPES = {"pregunta":"zmdi zmdi-help","info":"zmdi zmdi-info","tiempo":"zmdi zmdi-time", "fecha":"zmdi zmdi-calendar"}

function addDetailDescription(data,i)
{
    let title = data.titulo;
    let description = data.descripcion;
    let color = COLORS[i%COLORS.length];
    let type = TYPES[data.tipo];
    s = '<div class="post-card">\n' +
        '                    <div class="note-icon '+color+'">\n' +
        '                        <div class="card-icon"><i class="'+type+'"></i></div>\n' +
        '                    </div>\n' +
        '                    <div class="note-more">\n' +
        '                        <div class="card-title '+color+'">\n' +
                                    title+
        '                        </div>\n' +
        '                        <div class="card-text">\n' +
                                    description+
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>'
    $(".caracteristicas-content").append(s);
}
function addJornada(jornada)
{
    let aaa = "";
    jornada.forEach((i)=>{
        aaa+=addMatch(i);
    })
    let s = '<div class="post-card results">\n' +
        '         <div class="result-title">\n' +
                        jornada[0].nombre_partido+
        '         </div>\n'+
                aaa+
        '    </div>';
    $(".partidos-content").append(s);
}

function addMatch(data)
{
    let local = data.local;
    let visitante = data.visitante;
    let rlocal = data.resultado_local;
    let rvisitante = data.resultado_visitante;
    let escudo_local = data.escudo_local;
    let escudo_visitante = data.escudo_visitante;
    let fecha = datePair(new Date(data.fecha));
    let estado = data.estado;
    let s = '<div class="score-data preview">\n' +
        '                            <div class="score-data-team">\n' +
        '                                <div class="score-data-team-row">\n' +
        '                                    <div class="data-team">\n' +
        '                                        <div class="data-team-shield">\n' +
        '                                            <img src="'+escudo_local+'" alt="">\n' +
        '                                        </div>\n' +
        '                                        <div class="data-team-name">\n' +
                                                        local+
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="data-score">'+rlocal+'</div>\n' +
        '                                </div>\n' +
        '                                <div class="score-data-team-row">\n' +
        '                                    <div class="data-team">\n' +
        '                                        <div class="data-team-shield">\n' +
        '                                            <img src="'+escudo_visitante+'" alt="">\n' +
        '                                        </div>\n' +
        '                                        <div class="data-team-name">\n' +
                                                        visitante+
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="data-score">'+rvisitante+'</div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="score-data-date">\n' +
        '                                <div class="data-date">\n' +
                                            fecha+"\n"+'<div class="partido-estado">'+estado+'</div>'+
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>'
    return s;
}


async function retrieveDetails(event)
{
    $(".caracteristicas-content").empty();
    let caracteristicas = await new GetRequest("/api/v1/events/"+event+"/caracteristicas").execute();
    let k = 0;
    caracteristicas.data.forEach((i)=>addDetailDescription(i,k++));
}


function groupMatches(matches)
{
    let r = {};
    matches.forEach((i)=>
    {
        if(r[i.nombre_partido||i.nombre])
            r[i.nombre_partido||i.nombre].push(i);
        else
            r[i.nombre_partido||i.nombre]=[i];
    });
    return r;
}

async function retrieveMatches(event)
{
    $(".partidos-content").empty();
    let partidos = await new GetRequest("/api/v1/events/"+event+"/partidos").execute();
    partidos = groupMatches(partidos.data);
    for(let i in partidos)
    {
        addJornada(partidos[i]);
    }

}

function addTeamToClassification(i, pos)
{
    let nombre = i.equipo;
    let escudo = i.escudo;
    let jugados = i.jugados;
    let ganados = i.ganados;
    let perdidos = i.perdidos;
    let empatados = i.empatados;
    let gf = i.goles_favor;
    let gc = i.goles_contra;
    let puntos = i.puntos;
    let s = '<tr>\n' +
    '         <td>'+pos+'</td>\n' +
    '         <td class="classification-team-name"><div class="classification-team-shield"><img src="'+escudo+'" alt=""></div>\n' +
    '             <div>'+nombre+'</div></td>\n' +
    '         <td>'+jugados+'</td>\n' +
    '         <td>'+ganados+'</td>\n' +
    '         <td>'+empatados+'</td>\n' +
    '         <td>'+perdidos+'</td>\n' +
    '         <td>'+gf+'</td>\n' +
    '         <td>'+gc+'</td>\n' +
        '      <td>'+puntos+'</td>\n' +
    '      </tr>';
    return s;
}

function addClasificacion(tablero)
{
    let teamsPositions = "";
    let j = 1;
    let titulo = tablero[0].nombre;
    tablero.forEach((i)=>{
        teamsPositions+=addTeamToClassification(i,j++);
    })
    let s = '<div class="post-card results">\n' +
        '      <div class="result-title">\n' +
                    titulo+
        '       </div>'+
                '<table class="classification-table">\n' +
                    '                        <tr>\n' +
                    '                            <th></th>\n' +
                    '                            <th>EQUIPO</th>\n' +
                    '                            <th>PJ</th>\n' +
                    '                            <th>G</th>\n' +
                    '                            <th>E</th>\n' +
                    '                            <th>P</th>\n' +
                    '                            <th>GF</th>\n' +
                    '                            <th>GC</th>\n' +
                    '                            <th>PTOS</th>\n' +
                    '                        </tr>'+
                    teamsPositions+'</table></div>';
    $(".clasificacion-content").append(s);
}

async function retrieveClassifications(event)
{
    $(".clasificacion-content").empty();
    let clasificacion = await new GetRequest("/api/v1/events/"+event+"/clasificacion").execute();
    clasificacion = groupMatches(clasificacion.data);
    for(let i in clasificacion)
    {
        addClasificacion(clasificacion[i]);
    }
}

function addTeamToQualifier(i)
{
    let local = i.equipolocal;
    let visitante = i.equipovisitante;
    let rlocal = i.resultadolocal;
    let rvisitante = i.resultadovisitante;
    let escudo_local = i.escudolocal;
    let escudo_visitante = i.escudovisitante;
    let s = '<div class="final-section">\n' +
        '                        <div class="final-team-shield">\n' +
        '                            <img src="'+escudo_local+'" alt="">\n' +
        '                        </div>\n' +
        '                        <div class="final-team-name">\n' +
                                    local+
        '                        </div>\n' +
        '                        <div class="final-team-score">\n' +
                                    rlocal+' - '+rvisitante+
        '                        </div>\n' +
        '                        <div class="final-team-name">\n' +
                                visitante+
        '                        </div>\n' +
        '                        <div class="final-team-shield">\n' +
        '                            <img src="'+escudo_visitante+'" alt="">\n' +
        '                        </div>\n' +
        '                    </div>';
    return s;
}

function addEliminatoria(eliminatoria)
{
    let teams = "";
    let titulo = eliminatoria[0].nombre;
    eliminatoria.forEach((i)=>{
        teams+=addTeamToQualifier(i);
    })
    let s = '<div class="post-card results">\n' +
'                    <div class="result-title">\n' +
                            titulo+

'                   </div>\n' +
                    teams+
        '   </div>'
    $(".clasificacion-content").append(s);
}

async function retrieveQualifiers(event)
{
    let eliminatoria = await new GetRequest("/api/v1/events/"+event+"/eliminatoria").execute();
    eliminatoria = groupMatches(eliminatoria.data);

    for(let i in eliminatoria)
    {
        addEliminatoria(eliminatoria[i]);
    }
}