function getEquipoFromURL()
{
    let url = document.location.href;
    return parseInt(url.substring(url.lastIndexOf("?equipoid=")+10));
}

function showConsultarEquipos()
{
    hideAll();
    $("#consultar-equipo-content").show(300);
    $("#detail-title").html("Datos del equipo");
    replaceIcon("back-icon");
    //retrievePlayersOfTeam();
}

async function retrievePlayersOfTeam()
{
    let data = (await new GetRequest("/api/v1/players/teams/"+getEquipoFromURL()).execute()).data;

}
