const connection = require('../../connection');    

module.exports= async function completedEvent(req,res){
    const sql = "select * from event where event_status='complete'";

    connection.query(sql,(err,result)=>{
        if (err){
            console.log(err)
            return result.status(201).json({message:"Errors in Gallery"})
        }
        return res.status(200).json(result)
    })
}