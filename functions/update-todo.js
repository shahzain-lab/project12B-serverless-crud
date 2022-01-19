
const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async(event, context) => {
    try{
        
        const reqObj = JSON.parse(event.body);
        const client = new faunadb.Client({secret: process.env.GATSBY_FAUNADB_SECRET})

        const results = await client.query(
            q.Update(
                q.Ref(q.Collection('todos'), reqObj.id),
                {data: {title: reqObj.title}}
            )
        )

        return{
            statusCode: 200,
            body: JSON.stringify(
                {id: `${results.ref.id}`,
                title: "Title updated successfully"}
                )
        }

    }catch(err)
     {
         console.log('error***')
         return {statusCode: 400, body: err.toString()}
    }
}