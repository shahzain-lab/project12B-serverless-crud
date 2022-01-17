
const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async () => {
    try{
        const client = new faunadb.Client({secret: process.env.GATSBY_FAUNADB_SECRET});
        const results = await client.query(
            q.Delete(q.Ref(
                q.Collection('todos'), '320886490716441161'
            ))
        )
        console.log(results);
        return{
            statusCode: 200,
            body: 'deleted'
        }
    }
    catch(err){
        return{
            statusCode: 400,
            body: err.toString()
        }
    }
}