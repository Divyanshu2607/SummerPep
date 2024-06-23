const express=require('express');
const app=express();
const Book=require('./models/Book');
const PORT=3000;
const bodyParser = require('body-parser');
require("./connect-db");
app.use(express.json());
app.use(bodyParser.json());


// adding book 
app.post("/add-book",async (req,res)=>{
    try{
        const bookInfo=req.body;
        const book=new Book(bookInfo);
        await book.save();
        console.log("Sucessfully saved book info");
        return res.status(200).send({
            message:"Book saved",
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).send({
            message:"Error occured",
            error:err.message,
        });
    }
});

//get the info of the book
app.get("/get-book-info/:ISBN",async (req,res)=>{
    try{
        let ISBN =req.params.ISBN;
        const bookInfo=await Book.findOne({ISBN});
        if(bookInfo){
           console.info(
             `Book with ISBN ${ISBN}was successfully found.`
           )
           return res.status(200).send(bookInfo);
        }
        console.info(
            `Book with ISBN ${ISBN} was not found.`
           );
           return res.status(404).send({
            message:"Invalid ISBN ",
           });
       
    }
    catch(err){
        console.error(err);
        return res.status(500).send({
            message :"An error occured",
        })
    }
})

 //to update the info of book
 app.put("/book/:ISBN",async(req,res)=>{
    try{
        let  ISBN =req.params;
        let { Author }=req.body;
        const updateResult=await Book.updateOne(
            {ISBN},
            { $set : {Author}}
        );
        if(!updateResult.matchedCount){
            console.info(
                `Update failed:Book with ISBN : ${ISBN} does not exist`
            );
            return res.status(404).send({
                message:"Update failed: book not found"
            });
        }
       
        console.info(
            `Update :Success:Book with ISBN :${ISBN} was updated`
        );
        return res.status(200).send({message:"Update Sucess!"});
    }
    catch(err){
        console.error(err);
        return res.status(500).send({message:'An error occured'});
    }
 });
 
 //to delete 
app.delete("/book/:ISBN",async (req,res)=>{
    try{
        const {ISBN}=req.params;
        const deleteResult= await Book.deleteOne({ISBN});
        if(deleteResult.matchedCount){
            console.info(
                `Delete failed:Book with ISBN :${ISBN} does not exist`
            );
            return res.status(404).send({
                message:"Delete failed:Book not found"
            });
        }
        console.info(
            `Delete:Success:Book with ISBN :${ISBN} was deleted`
        );
        return res.status(200).send({
            message:"Delete Sucess"
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).send({
            message:"An error occured"
        });
    }
})

app.listen(PORT,(err)=>{
    if(err){
        console.error(err);
    }else{
        console.log("Server is running sucessfully");
    }
});



