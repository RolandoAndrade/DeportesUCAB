class Cookie
{
    constructor(name, days)
    {
        this.name=name;
        this.days = days;
    }

    setCookie(value)
    {
        let expires = "";
        if (this.days)
        {
            let date = new Date();
            date.setTime(date.getTime() + (this.days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = this.name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie()
    {
        let cookieValue = null;
        if (document.cookie && document.cookie != '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {

                let cookie = cookies[i];
                cookie=cookie.trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, this.name.length + 1) == (this.name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(this.name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

     probarCookieLogin()
     {
         if(this.getCookie()!==null)
         {
             window.location = "../";
         }
     }

    probarCookieMain()
    {
        if(this.getCookie()===null)
        {
            window.location = "/login";
        }
    }


}



class GetRequest
{
    constructor(url)
    {
        this.url=url;
    }

    async execute()
    {
        return await fetch(this.url).then(response =>
            response.json()).then(json => {
            return json;}).catch(e => {return e});
    }
}

class PostRequest
{
    constructor(data, url)
    {
        this.data=JSON.stringify(data);
        this.url=url;
    }

    async execute()
    {
        const cookie = new Cookie("csrftoken");
        const token = cookie.getCookie();
        const location = window.location.hostname;
        const settings = {
            method: 'POST',
            body: this.data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "X-CSRFToken": token,
            }
        };
        return await fetch(this.url, settings)
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch(e => {
                return e
            });
    }
}

class DeleteRequest
{
    constructor(url, item)
    {
        this.url=url;
        this.item=item;
    }

    async execute()
    {
        const cookie = new Cookie("csrftoken");
        const token = cookie.getCookie();
        const settings={
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "X-CSRFToken": token,
            }
        }
        return await fetch(this.url+"/"+this.item,settings).then(response =>
            response.json()).then(json => {
            return json;}).catch(e => {return e});
    }
}
class PutRequest
{
    constructor(data, url)
    {
        this.data=JSON.stringify(data);
        this.url=url;
    }

    async execute()
    {
        const cookie = new Cookie("csrftoken");
        const token = cookie.getCookie();
        const location = window.location.hostname;
        const settings = {
            method: 'PUT',
            body: this.data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "X-CSRFToken": token,
            }
        };
        return await fetch(this.url, settings)
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch(e => {
                return e
            });
    }
}