let teamsOfCompetition = [];
let partidosConseguidos = [];
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
    retrieveCreatedMatches();
    retrieveTeamsOfCompetition(getFaseFromUrl());
}

async function retrieveTeamsOfCompetition(fase)
{
    //let req = await new GetRequest("/api/v1/phases/"+fase.id+"/matches?tipo="+fase.tipo).execute();
    let req = await new GetRequest("/api/v1/teams/events/"+fase.id).execute();
    teamsOfCompetition= req.data;
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

            $("#crear-partido-local-nombre").text(teamsOfCompetition[i].nombre);
            $('#crear-partido-local-imagen').attr("src",teamsOfCompetition[i].escudo)
        }
        else
        {
            teamsOfCompetition.forEach((i)=>
            {
                if(i.visitante) i.check=false;
                i.visitante = false;
            });
            $("#crear-partido-local-visitante").text(teamsOfCompetition[i].nombre);
            $('#crear-partido-visitante-imagen').attr("src",teamsOfCompetition[i].escudo)
        }

        teamsOfCompetition[i].check=true;
        teamsOfCompetition[i].local=caso===1;
        teamsOfCompetition[i].visitante=caso===2;
    }
}

function showMatch(data,k)
{
    let local = data.local;
    let visitante = data.visitante;
    let rlocal = data.resultado_local;
    let rvisitante = data.resultado_visitante;
    let escudo_local = data.escudo_local;
    let escudo_visitante = data.escudo_visitante;
    let fecha = datePair(new Date(data.fecha));
    let s = '\n' +
        '                        <div class="score-data">\n' +
        '                            <div class="score-data-team">\n' +
        '                                <div class="score-data-team-row">\n' +
        '                                    <div class="data-team">\n' +
        '                                        <div class="data-team-shield">\n' +
        '                                            <img src="'+escudo_local+'" alt="">\n' +
        '                                        </div>\n' +
        '                                        <div class="data-team-name">\n' +
                                                        local+
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="data-score"></div>\n' +
        '                                </div>\n' +
        '                                <div class="score-data-team-row">\n' +
        '                                    <div class="data-team">\n' +
        '                                        <div class="data-team-shield">\n' +
        '                                            <img src="'+escudo_visitante+'" alt="">\n' +
        '                                        </div>\n' +
        '                                        <div class="data-team-name">\n' +
                                                    visitante+
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="score-data-date">\n' +
        '                                <div class="data-date">\n' +
                                            fecha+
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="partido-deleter">\n' +
        '                                <div class="more-button-red mini" onclick="dropMatch(this,'+k+',\''+data.nombre_partido+'\')">\n' +
        '                                    <i class="zmdi zmdi-delete"></i>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n';
    return s;
}

function dropMatch(container, i, index)
{
    swal({
        title: '¿Está seguro?',
        text: "El partido será eliminado",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar la fase',
        cancelButtonText: 'No, cancelar',
        cancelButtonColor: "#e74a3b"
    }).then(()=>{
        if(partidosConseguidos[index][i].save)
        {
            new PostRequest({partido: partidosConseguidos[index][i].id},"/api/v1/matches/delete").execute();
        }
        (partidosConseguidos[index]).splice(i,1);
        showPartidos();
    }).catch((e)=>{});
}

function showJornadas(jornada)
{
    let s = '';
    if (jornada.length > 0)
    {
        let partidos = "";

        jornada.forEach((i,k)=>{
            i.save = true;
            partidos+=showMatch(i,k);
        });
        s = '<div class="post-card results">\n' +
            '         <div class="result-title">\n' +
            jornada[0].nombre_partido+
            '          </div>'+
            partidos+
            '     </div>';
    }

    $("#partidos-creados").append(s);
}

function showPartidos()
{
    $("#partidos-creados").empty();
    for(let i in partidosConseguidos)
    {
        showJornadas(partidosConseguidos[i])
    }
}

async function retrieveCreatedMatches()
{
    $("#partidos-creados").empty();
    let fase = getFaseFromUrl();
    let partidos = await new GetRequest("/api/v1/phases/"+fase.id+"/matches?tipo="+fase.tipo).execute();
    partidos = groupMatches(partidos.data);
    partidosConseguidos = partidos;
    showPartidos();
}

function createPartido()
{
    let fase = getFaseFromUrl();
    let nombre = $("#crear-partido-partido").val();
    let fecha =  $("#crear-fecha-partido-partido").val();
    let sede =  $("#crear-lugar-partido").val();
    let local, visitante;
    partidosConseguidos.forEach((i)=>
    {
        if(i.local)
            local = i;
        else if(i.visitante)
            visitante = i;
    });
    if(nombre.length>0&&fecha.length>0&&sede.length>0&&local&&visitante)
    {
        let data = {
            fase: fase.id,
            tipo: fase.tipo,
            nombre: nombre,
            local: local,
            visitante: visitante,
            fecha: fecha,
            lugar: sede,
        }
        console.log(data)
    }
    else
    {
        swal(
            'Error',
            'No has completado los datos',
            'error'
        )
    }
}