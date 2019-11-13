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
    console.log(jornada);
    let q = "";
    jornada.forEach((i)=>{
        g+=addMatch(i);
    })
    let s = '<div class="post-card results">\n' +
        '         <div class="result-title">\n' +
                        jornada[0].partido_nombre+
        '         </div>\n'+
                g+
        '    </div>';
    $(".partidos-content").append(s);
}

function addMatch(data)
{
    let local = data.local;
    let visitante = data.visitante;
    let s = '<div class="score-data">\n' +
        '                            <div class="score-data-team">\n' +
        '                                <div class="score-data-team-row">\n' +
        '                                    <div class="data-team">\n' +
        '                                        <div class="data-team-shield">\n' +
        '                                            <img src="images/pic09.jpg" alt="">\n' +
        '                                        </div>\n' +
        '                                        <div class="data-team-name">\n' +
                                                        local+
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="data-score">0</div>\n' +
        '                                </div>\n' +
        '                                <div class="score-data-team-row">\n' +
        '                                    <div class="data-team">\n' +
        '                                        <div class="data-team-shield">\n' +
        '                                            <img src="images/pic09.jpg" alt="">\n' +
        '                                        </div>\n' +
        '                                        <div class="data-team-name">\n' +
                                                        visitante+
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="data-score">0</div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="score-data-date">\n' +
        '                                <div class="data-date">\n' +
        '                                    31/10\n' +
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
        if(r[i.nombre_partido])
            r[i.nombre_partido].push(i);
        else
            r[i.nombre_partido]=[i];
    });
    return r;
}

async function retrieveMatches(event)
{
    $(".partidos-content").empty();
    let partidos = await new GetRequest("/api/v1/events/"+event.id+"/partidos").execute();
    groupMatches(partidos.data).forEach((i)=>addJornada(i));
    console.log();
}