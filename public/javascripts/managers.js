class EventDAO
{
    async create(event)
    {
        /*const data ={
            author: 1,
            date: event.date,
            title: event.title,
            description: event.description,
            cover: event.cover,
            media: event.media,
            location: event.location,
            place: event.place
        };
        const request = new PostRequest(data,'../api/events/create');
        return await request.execute();*/
    }

    async getEventByID(id)
    {
        const request=new GetRequest('../api/v1/events/'+id);
        return await request.execute();
    }

    async getAll()
    {
        const request=new GetRequest('../api/v1/events/events');
        return await request.execute();
    }
}