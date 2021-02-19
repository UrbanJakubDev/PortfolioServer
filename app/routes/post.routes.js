module.exports = app => {
    const blogposts = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", blogposts.create);
  
    // Retrieve all Tutorials
    router.get("/", blogposts.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", blogposts.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Create a new Tutorial
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/posts", router);
  };
  