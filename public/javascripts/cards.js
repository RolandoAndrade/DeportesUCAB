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
        s+='<div class="create-equipo-card">\n' +
            '<div class="create-equipo-card-shield">\n' +
            '<img src="'+logo+'" alt="">\n' +
            '</div>\n' +
            '<div class="create-equipo-card-teamname">\n' + name+
            '</div>\n' +
            '<div class="more-button-green team" onclick="">\n' +
            '<i class="zmdi zmdi-check"></i>\n' +
            '</div>\n' +
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
    $("#create-equipos-container").append('<div class="create-equipo-card">\n' +
        '<div class="create-equipo-card-shield">\n' +
        '<img src="'+logo+'" alt="">\n' +
        '</div>\n' +
        '<div class="create-equipo-card-teamname">\n' + name+
        '</div>\n' +
        '<div class="more-button-red team" onclick="deleteTeam(this)">\n' +
        '<i class="zmdi zmdi-delete"></i>\n' +
        '</div>\n' +
        '</div>').hide().fadeIn(300);
}

function deleteTeam(container)
{
    $(container).parent().remove();
}