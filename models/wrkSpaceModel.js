const mongoose=require('mongoose');
const validator=require('validator');
const cards=require('./cardsModel');

const wrkSpaceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Workspace must have a name'],
        unique:true
    },
    cards:[
        {
        type: mongoose.Types.ObjectId,
        ref: 'cards',
    },
   ] 
});

const wrkSpace = mongoose.model('wrkSpace',wrkSpaceSchema);

module.exports=wrkSpace;