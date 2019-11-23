function openDetailsOf(event)
{
    window.history.pushState('DeportesUCAB', 'DeportesUCAB', '#detalles?='+event.id);
    viewSelection(event);
}

function showCompetitionDetail(event)
{
    if(event)
    {
        hideAll();
        $("#competition-detail").show(300);
        replaceIcon("back-icon");
        $("#detail-title").html(event.nombre);
        $("#event-card-content-detail").find(".card-title").html(event.nombre);
        $("#event-card-content-detail").find(".card-fulldate").html(dateSimple(new Date(event.fecha)));
        $("#event-card-content-detail").find(".card-place").html(event.lugar);
        $("#event-card-content-detail").find(".card-preview-image").css({"background": "url("+event.imagen+") center"});
        retrieveDetails(event);
        retrieveMatches(event);
        retrieveClassifications(event);
    }
    else
    {
        backLevel(true);
    }
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
    let s = '<div class="score-data">\n' +
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
                                            fecha+
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>'
    return s;
}


async function retrieveDetails(event)
{
    $(".caracteristicas-content").empty();
    let caracteristicas = await new GetRequest("/api/v1/events/"+event.id+"/caracteristicas").execute();
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
    let partidos = await new GetRequest("/api/v1/events/"+event.id+"/partidos").execute();
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
        '      <td>'+(ganados*3+empatados)+'</td>\n' +
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
    let clasificacion = await new GetRequest("/api/v1/events/"+event.id+"/clasificacion").execute();
    clasificacion = groupMatches(clasificacion.data);
    for(let i in clasificacion)
    {
        addClasificacion(clasificacion[i]);
    }

}