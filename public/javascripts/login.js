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

async function signin(user, password)
{
    let req = await new PostRequest({user: user, password: password},"/api/v1/login").execute();
    if (req.status === "success")
    {
        let userid = req.data[0].id;

    }
}