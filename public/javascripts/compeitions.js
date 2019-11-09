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

async function retrieveDetails(event)
{
    $(".caracteristicas-content").empty();
    let caracteristicas = await new GetRequest("/api/v1/events/"+event.id+"/caracteristicas").execute();
    let k = 0;
    console.log(caracteristicas)
    caracteristicas.data.forEach((i)=>addDetailDescription(i,k++));
}