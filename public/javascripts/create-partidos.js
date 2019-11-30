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


function addTeamsToMatch(caso)
{
    let s = "";
    teamsOfCompetition.forEach((i,k)=>
    {
        let escudo = i.escudo;
        let nombre = i.nombre;
        let id = i.id;
        s+='<div class="create-equipo-card">' +
            '<div class="create-equipo-card-shield">' +
            '<img src="'+escudo+'" alt="">' +
            '</div>' +
            '<div class="create-equipo-card-teamname">' + nombre+
            '</div>' +
            '<div class="more-button-green team'+(i.check?" selected":"")+'" onclick="selectTeamToMatch('+k+','+caso+')">' +
            '<i class="zmdi zmdi-check"></i>' +
            '</div>' +
            '</div>';
    })

    if (teamsOfCompetition.length > 0)
    {
        swal({
            title: 'Selecciona los equipos',
            confirmButtonText: '<i class="zmdi zmdi-close"></i>  CANCELAR',
            confirmButtonColor: '#03A9F4',
            showCancelButton: false,
            html: s
        }).then(function () {

        }).catch((e)=>{});
    }
}

function selectTeamToMatch(i, caso)
{
    swal.closeModal();
    if(!teamsOfCompetition[i].check)
    {
        if(caso===1)
        {
            teamsOfCompetition.forEach((i)=>
            {
                if(i.local) i.check=false;
                i.local = false;
            });


        }
        else
        {
            teamsOfCompetition.forEach((i)=>
            {
                if(i.visitante) i.check=false;
                i.visitante = false;
            });
        }

        teamsOfCompetition[i].check=true;
        teamsOfCompetition[i].local=caso===1;
        teamsOfCompetition[i].visitante=caso===2;
    }



}