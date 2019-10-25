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