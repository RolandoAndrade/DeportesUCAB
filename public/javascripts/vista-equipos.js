function showVistaEquipos()
{
    hideAll();
    $("#vista-equipos-content").show(300);
    $("#detail-title").html("Equipos");
    replaceIcon("equipos-icon");
    retrieveTeamsForView();
}

function cambiarDetalleEquipo(id)
{
    let url = document.location.href+'#consultar-equipo?equipoid='+id;
    window.history.pushState('DeportesUCAB', 'DeportesUCAB', url);
    viewSelection()
}

function createViewVistaEquipos(teams)
{
    $("#teams-info-container").empty();
    let s = '';
    teams.forEach((i)=>
    {
        let id = i.id;
        let nombre = i.nombre;
        let escudo = i.escudo;
        let genero = i.genero;
        s += '              <div class="team-card-info '+genero+'" onclick="cambiarDetalleEquipo('+id+')">\n' +
            '                    <div class="team-card-info-image">\n' +
            '                        <img src="'+escudo+'" alt="">\n' +
            '                    </div>\n' +
            '                    <div class="player-name">\n' +
                                    nombre+
            '                    </div>\n' +
            '                </div>'
    });
    $("#teams-info-container").append(s);
}

async function retrieveTeamsForView()
{
    let teams = (await new GetRequest("/api/v1/teams").execute()).data;
    console.log(teams)
    createViewVistaEquipos(teams);
}

let generoT = null;
function changeGenderTeam(container)
{
    $("#team-gender").find(".seleccionado").removeClass("seleccionado");
    $(container).addClass("seleccionado");
    if($(container).hasClass("red"))
    {
        generoT = 2;
    }
    else
    {
        generoT = 1;
    }
}

async function addEquipo()
{
    let nombre = $("#crear-nombre-equipo").val();
    let imagen = ($("#crear-imagen-equipo").css("background-image").match(/\(([^)]+)\)/)[1]).replace(/['"]+/g,'')
    let data = {
        nombre: nombre,
        escudo: imagen,
        genero: generoT
    };

    let req = await new PostRequest(data,'/api/v1/teams').execute();
    cambiarDetalleEquipo(req.data);
    $("#crear-nombre-equipo").val("");
    $("#team-gender").find(".seleccionado").removeClass("seleccionado");
    $("#crear-nombre-equipo-label").removeClass("active");

}