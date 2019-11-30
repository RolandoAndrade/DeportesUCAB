let fasesList = [];

function getEventoFaseFormUrl()
{
    let url = document.location.href;
    return parseInt(url.substring(url.lastIndexOf("?evento=")+8));
}

function showFaseador()
{
    hideAll();
    $("#loader-fases").hide();
    $("#creador-fases-content").show(300);
    $("#detail-title").html("Establecer fases");
    replaceIcon("creador-icon");
    let url = document.location.href;
    let eventoid = getEventoFaseFormUrl();
    getFases(eventoid)
}

async function getFases(evento)
{
    let req = await new GetRequest("/api/v1/events/"+evento+"/phases").execute();
    fasesList = req.data;
    showFases();
}

function showFases()
{
    $('.fases-creadas').empty();
    let s = "";
    console.log(fasesList)
    fasesList.forEach((i)=>
    {
        let nombre = i.nombre;
        let tipo = i.tipo == 'clasificacion';
        s += '<div class="post-card">\n' +
            '                <div class="fase-left '+(tipo?"blue":" purple")+'">\n' +
            '                </div>\n' +
            '                <div class="fase-more">\n' +
            '                    <div class="card-title blue">\n' +
                                    nombre+
            '                    </div>\n' +
            '                    <div class="agregar-container">\n' +
            '                        <div class="more-button" onclick="addFase()">\n' +
            '                            <i class="zmdi zmdi-plus"></i>\n' +
            '                        </div>\n' +
            '                        <div class="more-button-red" onclick="addFase()">\n' +
            '                            <i class="zmdi zmdi-delete"></i>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
    })
    $(".fases-creadas").append(s);
}

let tipofase = null;
function changeFase(container)
{
    $(".fase-selector").find(".seleccionado").removeClass("seleccionado");
    $(container).addClass("seleccionado");
    if($(container).hasClass("clasificacion"))
    {
        tipofase = "clasificacion";
    }
    else
    {
        tipofase = "eliminatoria";
    }
}

async function addFase()
{
    let nombre = $("#crear-fase-competicion").val();
    if(nombre.length>0&&tipofase!==null)
    {
        $("#loader-fases").fadeIn(300);
        let evento = getEventoFaseFormUrl();
        let tipo = tipofase;

        let data = {
            evento: evento,
            tipo: tipo,
            nombre: nombre
        };
        let req = await new PostRequest(data,"/api/v1/phases").execute();
        swal(
            'Perfecto',
            'La fase fue añadida con éxito',
            'success'
        );
        $("#loader-fases").fadeOut(300);
        $("#crear-fase-competicion").val("");
        tipofase = null;
        $(".fase-selector").find(".seleccionado").removeClass("seleccionado");
        fasesList.push({id:req.data, nombre: nombre, tipo: tipo});
        showFases();
    }
    else
    {
        swal(
            'Error',
            'No has completado los datos',
            'error'
        )
    }

}
