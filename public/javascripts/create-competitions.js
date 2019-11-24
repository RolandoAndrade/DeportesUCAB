function changeGender(container)
{
    $(".gender-selector").find(".seleccionado").removeClass("seleccionado");
    $(container).addClass("seleccionado");

}

let create = 0;
function addCaracteristica()
{
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
    $('select').formSelect();
}

function deleteCard(container)
{
    $(container).parent().remove();
}

function addTeam(name='Lorem ipsum',logo='images/pic09.jpg')
{
    let s = "";
    for(let i = 0;i<5;i++)
    {
        s+='<div class="create-equipo-card">' +
            '<div class="create-equipo-card-shield">' +
            '<img src="'+logo+'" alt="">' +
            '</div>' +
            '<div class="create-equipo-card-teamname">' + name+
            '</div>' +
            '<div class="more-button-green team" onclick="addTeamFromModal(\'' + name + '\',\'' + logo + '\',this)">' +
            '<i class="zmdi zmdi-check"></i>' +
            '</div>' +
            '</div>';
    }

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

function addTeamFromModal(name,logo,container)
{
    if($(container).hasClass("selected"))
    {
        return;
    }
    else
    {
        $(container).addClass("selected");
        $("#create-equipos-container").append('<div class="create-equipo-card">' +
            '<div class="create-equipo-card-shield">' +
            '<img src="'+logo+'" alt="">' +
            '</div>' +
            '<div class="create-equipo-card-teamname">' + name+
            '</div>' +
            '<div class="more-button-red team" onclick="deleteTeam(this)">' +
            '<i class="zmdi zmdi-delete"></i>' +
            '</div>' +
            '</div>').hide().fadeIn(300);
    }

}

function deleteTeam(container)
{
    $(container).parent().remove();
}

function addEvents(events)
{
    let s="";
    events.forEach((i)=>
    {
        let fecha = dateSimple(new Date(i.fecha));
        s += "           <div onclick='openDetailsOf("+JSON.stringify(i)+")'"+' class="post-card clickeable">' +
            '                <div class="card-preview-image" ' +
            'style="background: url('+"'"+i.imagen+"'"+') center;background-size: cover">' +
            '                </div>' +
            '                <div class="card-content">' +
            '                    <div class="card-title">' +
            i.nombre+
            '                    </div>' +
            '                    <div class="card-data">' +
            '                        <div class="card-date-icon">' +
            '                            <div class="card-icon"><i class="zmdi zmdi-calendar"></i></div>' +
            '                        </div>' +
            '                        <div class="card-place-icon">' +
            '                            <div class="card-icon">' +
            '                                <i class="zmdi zmdi-pin"></i>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="card-date">' +
            '                            <div class="card-fulldate">'+fecha+'</div>' +
            '                        </div>' +
            '                        <div class="card-place">' +
            '                            <div class="location">' +
            i.lugar+
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '' +
            '                </div>' +
            '            </div>'
    });
    $("#eventos-content").empty();
    $("#eventos-content").append(s);
}