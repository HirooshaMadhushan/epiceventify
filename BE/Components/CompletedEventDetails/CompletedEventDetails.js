const connection = require('../../connection');    

module.exports= async function CompletedEventDetails(req,res){
    console.log(req.params.id);
    const sql = "select * from event where event_id= ?"
    connection.query(sql,req.params.id,(err,result)=>{
        if (err){
            console.log(err)
            return result.status(201).json({message:"Errors in Gallery"})
        }
        return res.status(200).json(result)
    })
}