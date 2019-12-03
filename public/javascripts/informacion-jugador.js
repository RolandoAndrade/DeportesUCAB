function getPlayerFromURL()
{
    let url = document.location.href;
    return parseInt(url.substring(url.lastIndexOf("?jugador=")+9));
}

function showJugadorInfo()
{
    hideAll();
    $("#jugador-info-content").show(300);
    $("#detail-title").html("Información de");
    replaceIcon("back-icon");
    retrievePlayerInfo();
}

function createInfoPlayerView(data)
{
    $("#detail-title").html("Información de "+data.nombre+" "+data.apellido);
    $("#profile-image-card").attr("src",data.imagen);
    $("#username-stat").text(data.correo);
    $("#cedula-stat").text(dateTriple(new Date(data.fecha_nac)));
    $("#fecha-stat").text(data.cedula);
}

async function retrievePlayerInfo()
{
    let id = getPlayerFromURL();
    let data = (await new GetRequest("/api/v1/users/"+id).execute()).data[0];
    createInfoPlayerView(data);
}