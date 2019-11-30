let equiposList = [];
let caracteristicasList = [];

function showCreador()
{
    hideAll();
    $("#creador-content").show(300);
    $("#detail-title").html("Crear competición");
    replaceIcon("creador-icon");
}

async function getEquiposList()
{
    let data = await new GetRequest("/api/v1/teams/sports/"+genero).execute();
    equiposList = data.data;
    showTeamsToRegister();
}


let genero = null;
function changeGender(container)
{
    $(".gender-selector").find(".seleccionado").removeClass("seleccionado");
    $(container).addClass("seleccionado");
    if($(container).hasClass("red"))
    {
        genero = 2;
    }
    else
    {
        genero = 1;
    }
    getEquiposList();
}

let create = 0;
function addCaracteristica()
{
    caracteristicasList.push({titulo: "", descripcion: "", tipo: "info"})
    actualizarCaracteristicas();
    /*
    $("#caracteristicas-container").append('<div class="create-caracteristica-card">' +
        '<div class="create-content-container">' +
            '<div class="create-data-container">' +
                '<div class="input-container">' +
                '<div class="input-field">' +
                '<input id="caracteristica-type'+create+'" type="text" class="create-input validate">' +
                '<label for="caracteristica-type'+create+'">Título</label>' +
                '</div>' +
                '</div>' +
                '<div class="input-field">' +
                '<select>' +
                '<option value="info">Información</option>' +
                '<option value="fecha">Fecha</option>' +
                '<option value="tiempo">Tiempo</option>' +
                '<option value="peligro">Advertencia</option>' +
                '</select>' +
                '<label>Descripción</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="create-content-container">' +
                '<div class="create-data-container">' +
                '<div class="input-container">' +
                '<div class="input-field">' +
                '<textarea id="textarea1" class="create-input materialize-textarea validate"></textarea>' +
                '<label for="textarea1">Datos específicos de la competición</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="more-button-red" onclick="deleteCard(this)">' +
                '<i class="zmdi zmdi-delete"></i>' +
            '</div>' +
        '</div>').hide().fadeIn(300);
    create++;
    $('select').formSelect();*/
}

function cambiandoCaracteristica(i, container)
{
    caracteristicasList[i]['titulo']=$("#caracteristica-type"+i).val();
    if(container)
    {
        caracteristicasList[i]['tipo']=$(container).val();
    }
    caracteristicasList[i]['descripcion']=$("#textarea"+i).val();
}

function actualizarCaracteristicas()
{
    $("#caracteristicas-container").empty();
    let s = "";
    caracteristicasList.forEach((i,k)=>
    {
        s+='<div class="create-caracteristica-card">' +
            '<div class="create-content-container">' +
            '<div class="create-data-container">' +
            '<div class="input-container">' +
            '<div class="input-field">' +
            '<input id="caracteristica-type'+k+'" type="text" class="create-input validate" oninput="cambiandoCaracteristica('+k+')" value="'+i.titulo+'">' +
            '<label class="'+(i.titulo.length>0?"active":"")+'" for="caracteristica-type'+k+'">Título</label>' +
            '</div>' +
            '</div>' +
            '<div class="input-field">' +
            '<select onchange="cambiandoCaracteristica('+k+',this)">' +
            '<option value="info">Información</option>' +
            '<option value="fecha">Fecha</option>' +
            '<option value="tiempo">Tiempo</option>' +
            '<option value="peligro">Advertencia</option>' +
            '</select>' +
            '<label>Descripción</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="create-content-container">' +
            '<div class="create-data-container">' +
            '<div class="input-container">' +
            '<div class="input-field">' +
            '<textarea id="textarea'+k+'" class="create-input materialize-textarea validate" oninput="cambiandoCaracteristica('+k+')">'+i.descripcion+'</textarea>' +
            '<label class="'+(i.descripcion.length>0?"active":"")+'" for="textarea'+k+'" >Datos específicos de la competición</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="more-button-red" onclick="deleteCard(this,'+k+')">' +
            '<i class="zmdi zmdi-delete"></i>' +
            '</div>' +
            '</div>'
    })

    $("#caracteristicas-container").append(s);

    $('select').formSelect();
}

function deleteCard(container,i)
{
    caracteristicasList = caracteristicasList.splice(i,1);
    actualizarCaracteristicas();
}

function addTeam()
{
    let s = "";
    equiposList.forEach((i,k)=>
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
            '<div class="more-button-green team'+(i.check?" selected":"")+'" onclick="addTeamFromModal('+k+',this)">' +
            '<i class="zmdi zmdi-check"></i>' +
            '</div>' +
            '</div>';
    })

    if (equiposList.length > 0)
    {
        swal({
            title: 'Selecciona los equipos',
            confirmButtonText: '<i class="zmdi zmdi-check"></i>  Ok',
            confirmButtonColor: '#03A9F4',
            showCancelButton: false,
            html: s
        }).then(function () {
            swal(
                'Excelente',
                'Los equipos han sido añadidos',
                'success'
            )
        });
    }
    else
    {
        swal(
            'Error',
            'Debes elegir un género primero',
            'error'
        )
    }

}

function addTeamFromModal(i,container)
{
    if($(container).hasClass("selected"))
    {
        $(container).removeClass("selected");
    }
    else
    {
        $(container).addClass("selected");
    }
    equiposList[i]["check"]=!equiposList[i]["check"];
    showTeamsToRegister();
}

function showTeamsToRegister()
{
    $("#create-equipos-container").empty();
    let s = "";
    equiposList.forEach((i,k)=>
    {
        let escudo = i.escudo;
        let nombre = i.nombre;
        if(i.check)
        {
            s+='<div class="create-equipo-card">' +
                '<div class="create-equipo-card-shield">' +
                '<img src="'+escudo+'" alt="">' +
                '</div>' +
                '<div class="create-equipo-card-teamname">' + nombre+
                '</div>' +
                '<div class="more-button-red team" onclick="deleteTeam('+k+',this)">' +
                '<i class="zmdi zmdi-delete"></i>' +
                '</div>' +
                '</div>';
        }
    });
    $("#create-equipos-container").append(s);
}

function deleteTeam(i,container)
{
    $(container).parent().remove();
    equiposList[i]["check"] = false;
}

async function createCompetition()
{
    let nombre = $("#crear-titulo-competicion").val();
    let fechainicio = $("#crear-fecha-inicio-competicion").val();
    let fechafin = $("#crear-fecha-fin-competicion").val();
    let imagen = ($("#crear-imagen-competicion").css("background-image").match(/\(([^)]+)\)/)[1]).replace(/['"]+/g,'');
    let sede =  $("#lugar-realizacion").val();
    let equipos = [];
    equiposList.forEach((i)=>{
        if(i.check)
            equipos.push({id: i.id})
    });
    let data = {
        nombre: nombre,
        fechainicio: fechainicio,
        fechafin: fechafin,
        imagen: imagen,
        genero: genero,
        caracteristicas: caracteristicasList,
        lugar: sede,
        equipos: equipos
    };
    let req = await new PostRequest(data, "/api/v1/events").execute();
    let url = document.location.href+'#crear-fases?'+req.data;
    window.history.pushState('DeportesUCAB', 'DeportesUCAB', url);
    viewSelection()
}