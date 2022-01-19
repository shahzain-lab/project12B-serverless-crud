
const faunadb = require('faunadb');
const q = faunadb.query;



exports.handler = async() => {

    try{
        const client = new faunadb.Client({secret: process.env.GATSBY_FAUNADB_SECRET})
        const results = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index('title'))),
                q.Lambda('x', q.Get(q.Var('x')))
            )
        )
        console.log('all array\'s entries'+ results.data.map(x => x.data.title) );

        return{
            statusCode: 200,
            body: JSON.stringify(results.data)
        }
    }catch(err){
        return{
            statusCode: 400,
            body: err.toString()
        }
    }
}