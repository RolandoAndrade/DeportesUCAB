const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function dateSimple(date)
{
    return (date.getDate())+" de "+months[date.getMonth()]
}

function datePair(date)
{
    return (date.getDate())+"/"+(date.getMonth()+1);
}