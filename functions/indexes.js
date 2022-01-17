
const faunadb = require('faunadb');
const q = faunadb.query;
require('dotenv').config()

exports.handler = async () => {
    try{
        const client = new faunadb.Client({secret: process.env.GATSBY_FAUNADB_SECRET});
        const results = await client.query(
            q.CreateIndex({
                name: 'todos_by_title',
                source: q.Collection('todos'),
                terms: [{field: ['data', 'title']}]
            })
        )
        console.log(results);
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