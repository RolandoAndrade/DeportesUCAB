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
    retrieveMatch();
}

function showPartidoData(partido)
{
    let idlocal = partido.resultado.lo
}

async function retrieveMatch()
{
    let id = getPartidoFromUrl();
    let partido = (await new GetRequest("/api/v1/matches/"+id).execute()).data;
    console.log(partido)
}