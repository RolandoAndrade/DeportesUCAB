let myWidget = cloudinary.createUploadWidget({
    cloudName: 'rolandoandrade',
    uploadPreset: 'rolando_andrade'}, (error, result) =>{
    if(result.event==="success")
    {
        image=result.info.url;
        $(".crear-imagen-competicion").css("background-image", "url('"+image+"')");
    }

});
$(".crear-imagen-competicion-etiqueta").on("click", function () {
    myWidget.open();
});
