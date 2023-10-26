import { Router } from "express";
import multer from "multer";
const router = Router();

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

/** import all controllers */
import * as controller from "../controllers/appController.js";
import * as ml_controller from "../controllers/mlController.js";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

// // endpoints

/** POST Methods */
router.route("/register").post(controller.register);
router.route("/analyze").post(ml_controller.analyzer);
router.route("/voice-input").post(upload.single('audio'), ml_controller.speech_to_text);
router.route("/emotion_analyze").post(ml_controller.emotion_analyzer);
router.route("/youtube_list").post(ml_controller.youtube_lists);
router.route("/registerMail").post(registerMail);
router.route("/authenticate").post(controller.verifyUser, (req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);


/** GET Methods */
router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.verifyUser, localVariables, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);
// router.route("/youtube_videos").get(ml_controller.video_predict);
router.route("/spotify_recommend").get(ml_controller.spotify_recommend);

/** PUT Methods */
router.route("/updateuser").put(Auth, controller.updateUser);
router.route("/resetPassword").put(controller.verifyUser, controller.resetPassword);

export default router;
