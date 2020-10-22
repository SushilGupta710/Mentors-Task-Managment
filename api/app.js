const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const {List,Task} = require("./db/modles");

const {mongoose} = require("./db/mongoose");

// CURD operation for mentors

// Load middleware
app.use(bodyparser.json());

// enabling cors middleware
// https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    
    //we have to allow cors header
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE "); // update to match the domain you will make the request from

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
  });


/* END MIDDLEWARE  */

/* ROUTE HANDLERS */

/* LIST ROUTES */

/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get("/lists",(req,res)=>{
    List.find({}).then((lists)=>{
        res.send(lists);
    }).catch((e)=>{
        res.send(e);
    })
})

/**
 * post /lists
 * Purpose: Create all lists
 */
app.post("/lists",(req,res)=>{
    let title = req.body.title;

    let newList = new List({
        title
    })

    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })
})

/**
 * patch /lists
 * Purpose: Update all lists
 */
app.patch("/lists/:id",(req,res)=>{
    List.findOneAndUpdate({_id:req.params.id},{
        $set:req.body //mongodb command
    }).then(()=>{
        res.send({'message':'updated successfully!!'})
    })
});

/**
 * delete /lists
 * Purpose: Delete all lists
 */
app.delete("/lists/:id",(req,res)=>{
    List.findByIdAndRemove({
        _id:req.params.id
    }).then((removedListDoc)=>{
        res.send(removedListDoc);
    })
})


/**
 * GET /lists/:listId/tasks
 * Purpose: Get all lists
 */
app.get("/lists/:listId/tasks",(req,res)=>{
    // here we want to return all the task which belongs to list
    Task.find({
        _listId:req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.send(e);
    })
})
app.get("/lists/:listId/tasks/:taskId",(req,res)=>{
    // here we want to return all the task which belongs to list
    Task.findOne({
        _id:req.params.taskId,
        _listId:req.params.listId
    }).then((task)=>{
        res.send(task);
    }).catch((e)=>{
        res.send(e);
    })
})
/**
 * post /lists/:listId/tasks
 * Purpose: Create all lists
 */
app.post("/lists/:listId/tasks",(req,res)=>{

    let newTask = new Task({
        title:req.body.title,
        _listId:req.params.listId
    })

    newTask.save().then((taskDoc)=>{
        res.send(taskDoc);
    })
})

/**
 * patch /lists/:listId/tasks
 * Purpose: Update all lists
 */
app.patch("/lists/:listId/tasks/:taskId",(req,res)=>{
    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.listId
    },{
        $set:req.body //mongodb command
    }).then(()=>{
        res.send({message:'updated successfully.'});
    })
});

/**
 * delete /lists/:listId/tasks
 * Purpose: Delete all lists
 */
app.delete("/lists/:listId/tasks/:taskId",(req,res)=>{
    Task.findOneAndRemove({
        _id:req.params.taskId,
        _listId:req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
})


app.listen(3000,()=>{
    console.log("Server is listining on port 3000");
})