const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function dateSimple(date)
{
    return (date.getDay()+1)+" de "+months[date.getMonth()]
}