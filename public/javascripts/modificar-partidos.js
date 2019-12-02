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

function appendInicio(data)
{
    return '<div class="post-card">\n' +
        '                    <div class="note-icon square-partido-card yellow">\n' +
                                    data.minuto+
        '                    </div>\n' +
        '                    <div class="action-partido-card">\n' +
        '                        Inicio del partido\n' +
        '                    </div>\n' +
        '                    <div class="note-icon square-partido-card yellow">\n' +
        '                        <i class="zmdi zmdi-time-interval"></i>\n' +
        '                    </div>\n' +
        '                </div>'
}

function appendFinal(data)
{
    return '<div class="post-card">\n' +
        '                    <div class="note-icon square-partido-card red">\n' +
                                data.minuto+
        '                    </div>\n' +
        '                    <div class="action-partido-card">\n' +
        '                        Fin del partido\n' +
        '                    </div>\n' +
        '                    <div class="note-icon square-partido-card red">\n' +
        '                        <i class="zmdi zmdi-time-interval"></i>\n' +
        '                    </div>\n' +
        '                </div>'
}

function appendGol(data, idlocal)
{
    return '<div class="post-card">\n' +
        '                    <div class="note-icon square-partido-card '+(data.equipoid===idlocal?"blue":"gray")+'">\n' +
                                    data.minuto+
        '                    </div>\n' +
        '                    <div class="action-partido-card">\n' +
                                    data.nombre+' '+data.apellido+
        '                    </div>\n' +
        '                    <div class="note-icon square-partido-card '+(data.equipoid===idlocal?"blue":"gray")+'">\n' +
        '                        <i class="zmdi zmdi-dribbble"></i>\n' +
        '                    </div>\n' +
        '                </div>';

}

function showPartidoData(partido)
{
    $("#resultado-actual").empty();
    let idlocal = partido.resultado.id_local;
    let idvisitante = partido.resultado.id_visitante;
    let fecha = partido.resultado.fecha;
    let lugar = partido.resultado.lugar;
    let local = partido.resultado.nombre_local;
    let visitante = partido.resultado.nombre_visitante;
    let rlocal = partido.resultado.resultado_local;
    let rvisitante = partido.resultado.resultado_visitante;
    let elocal = partido.resultado.escudo_local;
    let evisitante = partido.resultado.escudo_visitante;
    let s = '<div class="post-card results partidos-modificar">\n' +
        '                    <div class="final-section">\n' +
        '                        <div class="final-team-shield">\n' +
        '                            <img src="'+elocal+'" alt="">\n' +
        '                        </div>\n' +
        '                        <div class="final-team-name">\n' +
                                        local+
        '</div>\n' +
        '                        <div class="final-team-score">\n' +
                                        rlocal+' - '+rvisitante+'                        </div>\n' +
        '                        <div class="final-team-name">\n'+
                                    visitante+
                                '</div>\n' +
        '                        <div class="final-team-shield">\n' +
        '                            <img src="'+evisitante+'" alt="">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>';
    partido.situaciones.forEach((i)=>
    {
        if(i.tipo === "inicio")
        {
            s+=appendInicio(i);
        }
        else if(i.tipo === 'fin')
        {
            s+=appendFinal(i);
        }
        else
        {
            s+=appendGol(i, idlocal);
        }
    })

    $("#resultado-actual").append(s);

}

async function retrieveMatch()
{
    let id = getPartidoFromUrl();
    let partido = (await new GetRequest("/api/v1/matches/"+id).execute()).data;
    console.log(partido)
    showPartidoData(partido)
}