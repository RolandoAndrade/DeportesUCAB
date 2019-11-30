function getFaseFromUrl()
{
    let url = document.location.href;
    let id = parseInt(url.substring(url.lastIndexOf("?faseid=")+8,url.lastIndexOf("&")));
    let tipo = url.substring(url.lastIndexOf("tipo=")+5);
    return {id: id, tipo: tipo};
}


function showCrearPartidos()
{
    hideAll();
    $("#creador-partidos-content").show(300);
    $("#detail-title").html("Crear partidos");
    replaceIcon("back-icon");
    console.log(getFaseFromUrl())
}
