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
    retrievePlayersOfTeam();
    retrieveMatchesOfTeam();
}

function showPlayersOfTeam(data)
{
    let s = '';
    $("#tabla-juadores").empty();

    data.forEach((i)=>
    {
        let imagen = i.imagen;
        let posicion = capitalize(i.posicion);
        let nombre = i.nombre + " "+i.apellido;
        s+='                         <tr>' +
            '                           <td>\n' +
            '                                <div class="classification-player-image" style="background-image: url('+imagen+');"></div>\n' +
            '                            </td>\n' +
            '                            <td>\n' +
                                            nombre+
            '                            </td> ' +
            '<td>' +
                posicion+
            '</td>' +
            '</tr> '
    });
    if (s.length===0)
    {
        s=' <div class="result-title">No hay jugadores disponibles</div>';
        s = '                    <div class="result-title">\n' +
        '                        JUGADORES\n' +
        '                    </div>\n' +
        '                    <table class="classification-table" >\n' +s+
        '                    </table>'
    }
    else
    {
        s = '                    <div class="result-title">\n' +
            '                        JUGADORES\n' +
            '                    </div>\n' +
            '                    <table class="classification-table" >\n' +
            '                            <tr><th></th>\n' +
            '                            <th>NOMBRE</th> <th>POSICION</th>\n' +
            '                        </tr>'+s+
            '                    </table>';
    }

    $("#tabla-juadores").append(s);
}

function showMatchesOfTeam(data)
{
    let s = '';
    $("#tabla-partidos").empty();
    data.forEach((i)=>
    {
        let id = i.id;
        let local = i.local;
        let visitante = i.visitante;
        let rlocal = i.resultado_local;
        let rvisitante = i.resultado_visitante;
        let escudo_local = i.escudo_local;
        let escudo_visitante = i.escudo_visitante;
        let fecha = datePair(new Date(i.fecha));
        let estado = i.estado;
        s+='<div class="score-data">\n' +
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
        '                                    <div class="data-score">'+rlocal+'</div>\n' +
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
        '                                    <div class="data-score">'+rvisitante+'</div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="score-data-date">\n' +
        '                                <div class="data-date">\n' +
        fecha+"\n"+'<div class="partido-estado">'+estado+'</div>'+
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>'
    });
    if (s.length===0)
    {
        s=' <div class="result-title">No hay partidos disponibles</div>';
    }
    s = '                    <div class="result-title">\n' +
        '                        PARTIDOS\n' +
        '                    </div>'+s;
    $("#tabla-partidos").append(s);
}


async function retrievePlayersOfTeam()
{
    let data = (await new GetRequest("/api/v1/players/teams/"+getEquipoFromURL()).execute());
    showPlayersOfTeam(data.data);

}


async function retrieveMatchesOfTeam()
{
    let data = (await new GetRequest("/api/v1/matches/teams/"+getEquipoFromURL()).execute());
    showMatchesOfTeam(data.data);

}
