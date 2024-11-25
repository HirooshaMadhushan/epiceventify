const connection  =require("../../connection")

module.exports = async function AdminDetails(req,res){
    const sql ="select * from users where role = 'Admin'";
    connection.query(sql,(err,result) =>{
        if(err){
            console.log(err)
            return result.status(201).json({message:"err got Admin Details"});

        }
        return res.status(200).json(result);
    })
}