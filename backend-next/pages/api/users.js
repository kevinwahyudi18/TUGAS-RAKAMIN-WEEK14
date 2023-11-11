import User from "@/sequelize/models/user";

export default async function handler(req, res){
    // if(req.method === 'GET'){
        const data = await User.findAll()
        res.status(200).json(data)
    // } else{
    //     res.status(405).end()
    // }
}