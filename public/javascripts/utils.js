const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function dateSimple(date)
{
    return (date.getDate())+" de "+months[date.getMonth()]
}

function datePair(date)
{
    return (date.getDate())+"/"+(date.getMonth()+1);
}

function dateTriple(date)
{
    return (date.getDate())+" de "+months[date.getMonth()]+" de "+date.getFullYear();
}

function capitalize(s)
{
    return s.charAt(0).toUpperCase() + s.slice(1);
}