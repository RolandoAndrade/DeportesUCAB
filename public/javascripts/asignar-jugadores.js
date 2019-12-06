function accederAsignarJugadores()
{
    let id = getEquipoFromURL();
    let url = document.location.href+'#asignar-jugadores';
    window.history.pushState('DeportesUCAB', 'DeportesUCAB', url);
    viewSelection()
}

function equipoParaJugadoresURL()
{
    let url = document.location.href;
    return parseInt(url.substring(url.lastIndexOf("?equipoid=")+10, url.lastIndexOf("#")));
}

function showAsignarJugadores()
{
    hideAll();
    $("#asignar-jugadores-content").show(300);
    $("#detail-title").html("Asignar jugadores");
    replaceIcon("back-icon");
    retrieveFreeAgents();
}

function showFreeAgents(data)
{
    let s = '';
    $("#agentes-libres").empty();

    data.forEach((i)=>
    {
        let imagen = i.imagen;
        let posicion = capitalize(i.posicion);
        let nombre = i.nombre + " "+i.apellido;
        s+='                         <tr class="agent-edit">' +
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
    if (s.length!==0)
    {
        s = '                    <div class="result-title">\n' +
            '                        AGENTES LIBRES\n' +
            '                    </div>\n' +
            '                    <table class="classification-table" >\n' +
            '                            <tr><th></th>\n' +
            '                            <th>NOMBRE</th> <th>POSICION</th>\n' +
            '                        </tr>'+s+
            '                    </table>';
    }

    $("#agentes-libres").append(s);
}

function showPrivateAgents(data)
{
    let s = '';
    $("#agentes-fijos").empty();

    data.forEach((i)=>
    {
        let imagen = i.imagen;
        let posicion = capitalize(i.posicion);
        let nombre = i.nombre + " "+i.apellido;
        s+='                         <tr class="agent-edit">' +
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
    if (s.length!==0)
    {
        s = '                    <div class="result-title">\n' +
            '                        AGENTES FIJOS\n' +
            '                    </div>\n' +
            '                    <table class="classification-table" >\n' +
            '                            <tr><th></th>\n' +
            '                            <th>NOMBRE</th> <th>POSICION</th>\n' +
            '                        </tr>'+s+
            '                    </table>';
    }

    $("#agentes-fijos").append(s);
}


async function retrieveFreeAgents()
{
    let libres = (await new GetRequest("/api/v1/freeagents/"+equipoParaJugadoresURL()).execute()).data;
    showFreeAgents(libres);

    let ocupados = (await new GetRequest("/api/v1/privateagents/"+equipoParaJugadoresURL()).execute()).data;
    showPrivateAgents(ocupados);
}