const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const middleware = require("./middleware");

userRouter.get("/all", middleware.checkToken, userController.getUsers);
userRouter.get("/:email_user", userController.getUnUserEmail);
userRouter.get("/generate-password", userController.getGeneratedPassword);
userRouter.post('/reset-password', userController.requestPasswordReset);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/modify/:email_user", userController.updateUser);
userRouter.put("/modifyRol/:email_user", userController.updateRolUser);
userRouter.delete("/delete/:email_user", userController.remove);

module.exports = userRouter;