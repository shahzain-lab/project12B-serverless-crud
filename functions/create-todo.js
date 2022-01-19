

const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async(event, context) => {
    try{
        if( event.httpMethod !== 'POST' ){
            return{statusCode: 405, body: 'Method not Allowed.'}
        }
        const reqObj = JSON.parse(event.body);
        const client = new faunadb.Client({secret: process.env.GATSBY_FAUNADB_SECRET})

        const results = await client.query(
            q.Create(
                q.Collection('todos'),
                {data: {title: reqObj.title}}
            )
        )
        console.log('cretead and inserted in container', results.ref.id);

        return{
            statusCode: 200,
            body: JSON.stringify({id: `${results.ref.id}`})
        }

    }catch(err)
     {
         console.log('error***')
         return {statusCode: 400, body: err.toString()}
    }
}