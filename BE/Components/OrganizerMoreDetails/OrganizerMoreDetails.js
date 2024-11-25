const connection = require('../../connection');    

module.exports= async function OrganizerMoreDetails(req,res){
    console.log(req.params.id);
    const sql = "select * from organizer where organizer_id= ?"
    
    connection.query(sql,req.params.id,(err,result)=>{
        if (err){
            console.log(err)
            return result.status(201).json({message:"Errors in Gallery"})
        }
        return res.status(200).json(result)
    })
}