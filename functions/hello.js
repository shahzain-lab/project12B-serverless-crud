
const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async () => {
    try{
        const client = new faunadb.Client({secret: process.env.GATSBY_FAUNADB_SECRET});
        const results = await client.query(
            q.CreateCollection({name: 'todos'})
        )
        return{
            statusCode: 200,
            body: results.name
        }
    }
    catch(err){
        return{
            statusCode: 400,
            body: err.toString()
        }
    }
}