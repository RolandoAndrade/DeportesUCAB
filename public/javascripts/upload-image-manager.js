let myWidget = cloudinary.createUploadWidget({
    cloudName: 'rolandoandrade',
    uploadPreset: 'rolando_andrade'}, (error, result) =>{
    if(result.event==="success")
    {
        let image=result.info.url;
        $("#crear-imagen-competicion").css("background-image", "url('"+image+"')");
    }

});
$("#crear-imagen-competicion-etiqueta").on("click", function () {
    myWidget.open();
});


let myWidgetequipo = cloudinary.createUploadWidget({
    cloudName: 'rolandoandrade',
    uploadPreset: 'rolando_andrade'}, (error, result) =>{
    if(result.event==="success")
    {
        let image=result.info.url;
        $("#crear-imagen-equipo").css("background-image", "url('"+image+"')");
    }

});
$("#crear-imagen-equipo-etiqueta").on("click", function () {
    myWidgetequipo.open();
});