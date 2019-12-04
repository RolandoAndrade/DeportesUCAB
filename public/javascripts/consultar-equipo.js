function showConsultarEquipos()
{
    hideAll();
    $("#consultar-equipo-content").show(300);
    $("#detail-title").html("");
    replaceIcon("back-icon");
    retrieveTeamsForView();
}
