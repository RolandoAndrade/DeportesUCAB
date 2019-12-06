function accederAsignarJugadores()
{
    let id = getEquipoFromURL();
    let url = document.location.href+'#asignar-jugadores';
    window.history.pushState('DeportesUCAB', 'DeportesUCAB', url);
    viewSelection()
}

function equipoParaJugadoresURL()
{
    let url = document.location.href;
    return parseInt(url.substring(url.lastIndexOf("?equipoid=")+10, url.lastIndexOf("#")));
}

function showAsignarJugadores()
{
    hideAll();
    $("#asignar-jugadores-content").show(300);
    $("#detail-title").html("Asignar jugadores");
    replaceIcon("back-icon");
    retrieveFreeAgents();
}

async function retrieveFreeAgents()
{
    console.log(await new GetRequest("/api/v1/freeagents/"+equipoParaJugadoresURL()).execute())
}