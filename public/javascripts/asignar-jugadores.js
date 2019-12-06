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

function ficharJugador(id)
{
    swal({
        title: '¿Estás seguro?',
        text: "El jugador será transferido al equipo actual",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4f9bff',
        cancelButtonColor: '#bb4c41',
        confirmButtonText: 'Sí, deseo mover al jugador',
        cancelButtonText: 'No, cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new PostRequest({
                equipo: equipoParaJugadoresURL(),
                jugador: id
            },"/api/v1/players/teams").execute()
        },
        allowOutsideClick: () => !swal.isLoading()
    }).then(async function () {
        await retrieveFreeAgents();
        swal({
            title: 'Genial',
            text: "El jugador ha sido transferido exitosamente",
            type: 'success'}).catch((e)=>{})
    }).catch((e)=>{

    });
}


function showFreeAgents(data)
{
    let s = '';
    $("#agentes-libres").empty();

    data.forEach((i)=>
    {
        let id = i.id;
        let imagen = i.imagen;
        let posicion = capitalize(i.posicion);
        let nombre = i.nombre + " "+i.apellido;
        s+='                         <tr class="agent-edit" onclick="ficharJugador('+id+')">' +
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
        let id = i.id;
        let imagen = i.imagen;
        let posicion = capitalize(i.posicion);
        let nombre = i.nombre + " "+i.apellido;
        let nombreequipo = i.nombre_equipo;
        let escudoequipo = i.escudo;
        s+='                         <tr class="agent-edit" onclick="ficharJugador('+id+')">' +
            '                           <td>\n' +
            '                                <div class="classification-player-image" style="background-image: url('+imagen+');"></div>\n' +
            '                            </td>\n' +
            '                            <td>\n' +
            nombre+
            '                            </td> ' +
            '<td>' +
            posicion+
            '</td>' +
            '                            <td class="classification-team-name mini">\n' +
            '                                <div class="classification-team-shield">\n' +
            '                                    <img src="'+escudoequipo+'" alt="">' +
            '                                </div>\n' +
            '                                <div>'+nombreequipo+'</div>\n' +
            '                            </td>\n' +
            '</tr> '
    });
    if (s.length!==0)
    {
        s = '                    <div class="result-title">\n' +
            '                        AGENTES FIJOS\n' +
            '                    </div>\n' +
            '                    <table class="classification-table" >\n' +
            '                            <tr><th></th>\n' +
            '                            <th>NOMBRE</th> <th>POSICION</th><th>EQUIPO</th>\n' +
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