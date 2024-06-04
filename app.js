const express=require('express');
const app=express();
const morgan=require("morgan");
const userRouter=require('./routes/userRoutes');
const wrkSpaceRouter=require('./routes/wrkSpaceRoutes');

app.use(morgan('dev'));
app.use(express.json());

app.use('/workspace',wrkSpaceRouter);
app.use('/trello',userRouter);

module.exports = app;


