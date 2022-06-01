//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose")


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB")

//create a Schema
const itemsSchema=({
  name:String
})
//create a model
const Item=mongoose.model("item",itemsSchema)

//create document with the help of model
const item1=new  Item({
  name:"welcome to Todollist",
})
const item2=new  Item({
  name:"Note your today",
})
const item3=new  Item({
  name:"Write something",
})
const defaultItems=[item1,item2,item3]

/*Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("sucessfully inserted")
  }
})*/

app.get("/", function(req, res) {

  Item.find(function(err, foundItems){
    if(foundItems.length===0){
       Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("sucessfully inserted")
  }
})
res.redirect("/");
    }else{
      res.render("list", {listTitle:"Today", newListItems: foundItems});
    }
})
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item=new Item({
    name:itemName
  })
item.save()
res.redirect("/");
  
});
app.post("/delete",function(req,res){
  console.log(req.body)
})


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
