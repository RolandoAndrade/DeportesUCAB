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
}

function showPlayersOfTeam(data)
{
    let s = '';


    $("#tabla-juadores").empty();

    data.forEach((i)=>
    {
        let imagen = i.imagen;
        let nombre = i.nombre + " "+i.apellido;
        s+='                         <tr>' +
            '                           <td>\n' +
            '                                <div class="classification-player-image" style="background-image: url('+imagen+'); width: 80px; height: 80px"></div>\n' +
            '                            </td>\n' +
            '                            <td>\n' +
                                            nombre+
            '                            </td></tr> '
    });

    s = '                        <tr>\n' +
        '                            <th></th>\n' +
        '                            <th>NOMBRE</th>\n' +
        '                        </tr>'+s;
    $("#tabla-juadores").append(s);
}

async function retrievePlayersOfTeam()
{
    let data = (await new GetRequest("/api/v1/players/teams/"+getEquipoFromURL()).execute());
    console.log(data)
    showPlayersOfTeam(data.data);

}
