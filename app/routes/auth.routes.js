module.exports = app => {
    const users = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Register a new User
    router.post("/auth/register", users.register);

    //Login user
    router.post("/auth/login", users.signIn);

     // Retrieve all Tutorials
    //router.get("/", users.findAll);
  
    app.use("/api", router);
  };
