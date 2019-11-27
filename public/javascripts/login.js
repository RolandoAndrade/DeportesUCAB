(function($){
    $(window).on("load",function(){
        if(new Cookie("usuario").getCookie()!==null)
        {
            window.location = "../";
        }
    });
})(jQuery);

function splitLabel(label)
{
    let l = document.getElementById(label);
    l.classList.add("min");
}
function unSplitLabel(label, input)
{
    let l = document.getElementById(label);
    if(input.value.length===0)
    {
        l.classList.remove("min");
    }
}

function sendLogin()
{
    signin($("#usermail").val(),$("#userpass").val());
}

async function signin(user, password)
{
    let req = await new PostRequest({user: user, password: password},"../api/v1/login").execute();
    if (req.status === "success")
    {
        let userid = req.data[0].id;
        new Cookie("usuario",10).setCookie(userid);
        window.location = "../";
    }
    else
    {
        swal(
            'Error',
            'Nombre de usuario o contraseña incorrecta',
            'error'
        )
    }
}