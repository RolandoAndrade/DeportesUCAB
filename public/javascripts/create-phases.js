let fasesList = [];

function showFaseador()
{
    hideAll();
    $("#creador-fases-content").show(300);
    $("#detail-title").html("Establecer fases");
    replaceIcon("creador-icon");
    let url = document.location.href;
    let eventoid = parseInt(url.substring(url.lastIndexOf("?evento=")+8));
}

function getFases()
{
    let req = new GetRequest("")
}
