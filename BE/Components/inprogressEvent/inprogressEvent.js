const connection= require("../../connection");

module.exports= async function inprogressEvent(req,res){
    const sql = "select count(*) As inprogressEvent from event where event_status='pending'";

    connection.query(sql,(err,result)=>{
        if (err){
            console.log(err)
            return result.status(201).json({message:"err got inprogress event"});

        }
        return res.status(200).json(result);
    })
}