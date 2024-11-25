const connection = require("../../connection");

module.exports=async function organizerDetails(req,res){
    const sql="select * from organizer";
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            return res.status  (201).json({message: "Error get organizer details"});
        }
        return res.status(200).json(result)
    });
}


    
