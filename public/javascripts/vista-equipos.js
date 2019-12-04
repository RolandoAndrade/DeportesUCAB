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