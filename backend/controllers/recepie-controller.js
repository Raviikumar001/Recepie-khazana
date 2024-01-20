
const Recepie = require('../models/recepie');
const {recepiesDefault} = require('../utils/recepie');


const getRecepies = async(req,res,next)=> {
    // console.log('hello', req.query);

    try {

        const recepies = await Recepie.find({creator:req.query.id})
        console.log(recepies);
        const combinedRecepies = [...recepiesDefault,...recepies]
        return res.status(200).json({recepies: combinedRecepies, message:"Recepies fetched successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to fetch Recepies"})
    }
    
}

const getRecepiesById = async (req,res,next)=> {
    // console.log('hello', req.query.id);

    try {
        const recepie = await Recepie.findOne({recepieId:req.query.id});
        // console.log(recepie, "Recepie fetched");
        res.status(200).json({recepie:recepie, message:"Recepie fetched successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to fetch recepie."})
    }
}


const updateRecepie = async (req,res,next)=> {
    // console.log('in update')
   
    const id = req.query.id;
    const title = req.body.title;
    const description = req.body.description;
    const ingredients = req.body.ingredients;
    const recepieSteps = req.body.recepieSteps;

    console.log(req.body)
    try {
        const updateRecepie = await Recepie.findOneAndUpdate({_id:id}, {title:title, description:description,ingredients:ingredients,recepieSteps:recepieSteps },{new: true})
        console.log(updateRecepie)
   res.status(200).json({updateRecepie ,message:"Recepie updated succefully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to Update recepie."})
    }
}

const deleteRecepie =async (req,res,next)=> {
    console.log('in update')
    const id = req.query.id;
    
    try {
        const result = await Recepie.deleteOne({ _id: id });
        console.log(result);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Recepie not found" });
        }
        
        res.status(200).json({ message: "Successfully removed Recepie" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to Update recepie."})
    }
}

module.exports = {
    updateRecepie,
     getRecepies,
     getRecepiesById,
     deleteRecepie
}