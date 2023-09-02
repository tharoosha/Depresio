import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import * as mlcontroller from "../controllers/mlController.js";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

// // endpoints

/** POST Methods */
router.route("/register").post(controller.register);
router.route("/analyze").post(mlcontroller.analyzer);
router.route("/registerMail").post(registerMail);
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);

/** GET Methods */
router.route("/user/:username").get(controller.getUser);
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);
router.route("/youtube_videos").get(mlcontroller.video_predict);
router.route("/spotify_recommend").get(mlcontroller.spotify_recommend);
// router.route('/break_time').get(mlcontroller.break_time);

/** PUT Methods */
router.route("/updateuser").put(Auth, controller.updateUser);
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword);

export default router;
