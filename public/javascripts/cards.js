function splitLabel(container)
{
    $(container).find(".text-label").addClass("min");
}
function unSplitLabel(container)
{
    if($(container).find(".create-input")[0].value.length===0)
        $(container).find(".text-label").removeClass("min");
}

$(document).ready(function(){
    $('.fecha-input').datepicker({firstDay:1, format: 'dd-mm-yyyy', i18n:{cancel: "Cancelar", months: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ], monthsShort:
                [
                    'Ene',
                    'Feb',
                    'Mar',
                    'Abr',
                    'May',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dic'
                ], weekdays: [
                'Domingo',
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado'
            ], weekdaysShort: [
                'Dom',
                'Lun',
                'Mar',
                'Mié',
                'Jue',
                'Vie',
                'Sáb'
            ], weekdaysAbbrev: ['D','L','M','X','J','V','S'],

    }});
});