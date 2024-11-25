const connection = require("../../connection");
module.exports=async function weekEvent(re,res){
    const sql = "SELECT COUNT(*) AS weekEvent FROM event WHERE `date` >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND `date` <= CURDATE();";
    
    connection.query(sql,(err,week)=>{
        if(err){
            console.log(err)
            return result.status(201).json({message:"err got Week event"});
        }
        
        return res.status(200).json(week);
    })
}