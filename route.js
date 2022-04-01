//

const { Router } = require("express");

const route = Router();

route.get("/", (req, res, next) => {
  //if my user had authorized then it allow to go in next phase
  // if(){
  //     next();
  // }
  console.log("I'm inside the frontend");
});

// adminRoutes.post('/',(req,res,next) => {

// });

// /getUser
// /updateUser

module.exports = route;
