import { Router } from "express";
const router = Router();


/** import all controllers */
import * as controller from '../controllers/appController.js'

// // endpoints

/** POST Methods */
router.route ('/register').post(controller.register);
// router.route ('/registerMail').post();
router.route ('/authenticate').post((req,res) => res.end());
router.route ('/login').post(controller.verifyUser, controller.login);

/** GET Methods */
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

/** PUT Methods */
router.route('/updateuser').put(controller.updateUser);
router.route("/resetPassword").put(controller.resetPassword);

export default router;