const cards = require('../models/cardsModel');
const wrkSpace=require('./../models/wrkSpaceModel');
const tasks=require('../models/taskModels');

exports.createWrkSpace = async (req,res,next) => {
    const newWrkSpace=await wrkSpace.create({
        name:req.body.name,
        cards:[]
    });

    res.status(201).json({
        status: 'success',
        data: {
          workspace: newWrkSpace,
        },
      });
};

exports.createCard = async (req,res,next) => {
    const {cardName,wrkSpaceId} = req.body;
    const newCard = await cards.create({
        name:cardName,
        list:[],
        workSpace:wrkSpaceId
    });
    const cardId=newCard._id;
    const newWorkSpace=await wrkSpace.findById(wrkSpaceId);
     console.log(newWorkSpace);
     newWorkSpace.cards.push(cardId);
     await newWorkSpace.save();

     res.status(201).json({
        status: 'success',
        data: {
          workSpace: newWorkSpace,
        },
      });
};

exports.createTask = async (req,res,next) => {
  const {task,cardId} = req.body;
  const newTask = await tasks.create({
      tasks: task,
      cards: cardId
  });
  const taskId=newTask._id;
  const newCard=await cards.findById(cardId);
   console.log(newCard);
   newCard.list.push(taskId);
   await newCard.save();

   res.status(201).json({
      status: 'success',
      data: {
        card: newCard,
      },
    });
};

// exports.addCards=async(req,res,next)=>{
//      const {wrkSpaceId,cardId} = req.body;
//      const newWorkSpace=await wrkSpace.findById(wrkSpaceId);
//      console.log(newWorkSpace);
//      newWorkSpace.cards.push(cardId);
//      await newWorkSpace.save();
//      res.status(201).json({
//         status: 'success',
//         data: {
//           workSpace: newWorkSpace,
//         },
//       });
// };