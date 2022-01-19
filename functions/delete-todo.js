

const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async(event) => {
    try{
        
        const reqId = JSON.parse(event.body)
        const client = new faunadb.Client({secret: process.env.GATSBY_FAUNADB_SECRET})
        const results =await client.query(
            q.Delete(q.Ref(q.Collection('todos'), reqId))
        )
        console.log(results);

        return{
            statusCode: 200,
            body: JSON.stringify({message: "Deleted successfully"})
        }
    }catch(err){
        return{
            statusCode: 400,
            body: err.toString()
        }
    }

}