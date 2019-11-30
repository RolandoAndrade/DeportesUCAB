let teamsOfCompetition = [];

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
    retrieveTeamsOfCompetition(getFaseFromUrl())
}

async function retrieveTeamsOfCompetition(fase)
{
    //let req = await new GetRequest("/api/v1/phases/"+fase.id+"/matches?tipo="+fase.tipo).execute();
    let req = await new GetRequest("/api/v1/teams/events/"+fase.id).execute();
    teamsOfCompetition= req.data;
    console.log(teamsOfCompetition);
}


function addTeams()
{

}