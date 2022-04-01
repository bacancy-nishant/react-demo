//

const { Router } = require("express");

const adminRoutes = Router();

adminRoutes.get("/", (req, res, next) => {
  //if my user had authorized then it allow to go in next phase
  // if(){
  //     next();
  // }
  console.log("I'm inside the admin");
});

// adminRoutes.post('/',(req,res,next) => {

// });

// /getUser
// /updateUser

module.exports = adminRoutes;
