function openDetailsOf(event)
{
    window.history.pushState('DeportesUCAB', 'DeportesUCAB', '#detalles?='+event.id);
    viewSelection(event);
}

function showCompetitionDetail(event)
{
    if(event)
    {
        hideAll();
        $("#competition-detail").show(300);
        replaceIcon("back-icon");
        $("#detail-title").html(event.nombre);
        $("#event-card-content-detail").find(".card-title").html(event.nombre);
        $("#event-card-content-detail").find(".card-fulldate").html(event.fecha);
        $("#event-card-content-detail").find(".card-place").html(event.lugar);
        $("#event-card-content-detail").find(".card-preview-image").css({"background": "url("+event.imagen+") center"});
    }
    else
    {
        backLevel(true);
    }
}