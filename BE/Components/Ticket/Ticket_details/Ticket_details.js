const connection = require('../../../connection');

module.exports= async function Ticket_details(req,res){
    const sql = "select * from ticket where Eid= ?"

    connection.query(sql,req.params.id,(err,result)=>{
        if (err){
            console.log(err)
            return result.status(201).json({message:"Errors in Ticket"})
        }
        return res.status(200).json(result)
    })
}