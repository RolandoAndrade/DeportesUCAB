class Cookie
{
    constructor(name)
    {
        this.name=name;
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