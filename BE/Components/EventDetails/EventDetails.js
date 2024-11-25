const connection  =require("../../connection")

module.exports = async function EventDetails(req,res){
    const sql ="select * from event ";
    connection.query(sql,(err,result) =>{
        if(err){
            console.log(err)
            return result.status(201).json({message:"err got event details"});

        }
        return res.status(200).json(result);
    })
}