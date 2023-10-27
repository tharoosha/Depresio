import { FunctionComponent } from 'react';
import styles from './Thumbnail.module.css';
const Thumbnail: FunctionComponent = () => {
   return (
      <div className={styles.thumbnail}>
         <div className={styles.thumbnailChild} />
         <div className={styles.notRegisteredYetParent}>
            <div className={styles.mailabccom}>Not Registered Yet?</div>
            <div className={styles.forgotPassword}>Create an account</div>
         </div>
         <div className={styles.illustration}>
            <div className={styles.illustrationChild} />
            <img className={styles.rectangleIcon} alt="" src="Rectangle.png" />
            <img className={styles.vectorIcon27} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon28} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon29} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon30} alt="" src="Vector.svg" />
            <img className={styles.illustrationItem} alt="" src="Group 3.svg" />
            <img className={styles.illustrationInner} alt="" src="Group 4.svg" />
            <img className={styles.illustrationChild1} alt="" src="Group 6.svg" />
            <div className={styles.turnYourIdeas1}>Turn your ideas into reality.</div>
            <div className={styles.startForFree1}>Start for free and get attractive offers from the community</div>
            <img className={styles.vectorIcon31} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon32} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon33} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon34} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon35} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon36} alt="" src="Vector.svg" />
            <img className={styles.groupIcon1} alt="" src="Group.svg" />
            <img className={styles.vectorIcon37} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon38} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon39} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon40} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon41} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon42} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon43} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon44} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon45} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon46} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon47} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon48} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon49} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon50} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon51} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon52} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon53} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon54} alt="" src="Vector.svg" />
            <img className={styles.vectorIcon55} alt="" src="Vector.svg" />
            <img className={styles.illustrationChild2} alt="" src="Group 1.svg" />
            <img className={styles.illustrationChild3} alt="" src="Group 2.svg" />
         </div>
         <img className={styles.thumbnailItem} alt="" src="Group 1686550876.svg" />
         <div className={styles.frameParent}>
            <div className={styles.frameGroup}>
               <div className={styles.loginToYourAccountParent}>
                  <b className={styles.mailabccom}>Login to your Account</b>
                  <div className={styles.seeWhatIs1}>See what is going on with your business</div>
               </div>
               <div className={styles.image2Parent}>
                  <img className={styles.image2Icon1} alt="" src="image 2.png" />
                  <b className={styles.mailabccom}>Continue with Google</b>
               </div>
            </div>
            <div className={styles.orSignInContainer}>
               <span>-------------</span>
               <span className={styles.orSignIn1}>{` or Sign in with Email `}</span>
               <span>{`------------- `}</span>
            </div>
            <div className={styles.frameDiv}>
               <div className={styles.frameParent1}>
                  <div className={styles.emailParent}>
                     <div className={styles.email}>Email</div>
                     <div className={styles.mailabccomWrapper}>
                        <div className={styles.mailabccom}>mail@abc.com</div>
                     </div>
                  </div>
                  <div className={styles.frameParent2}>
                     <div className={styles.emailParent}>
                        <div className={styles.email}>Password</div>
                        <div className={styles.wrapper}>
                           <div className={styles.mailabccom}>*****************</div>
                        </div>
                     </div>
                     <div className={styles.checkboxParent}>
                        <div className={styles.checkbox}>
                           <div className={styles.check}>
                              <div className={styles.iconcheckboxunfilled} />
                              <img className={styles.checkSolid2Icon1} alt="" src="check-solid 2.svg" />
                           </div>
                           <div className={styles.mailabccom}>Remember Me</div>
                        </div>
                        <div className={styles.forgotPassword}>Forgot Password?</div>
                     </div>
                  </div>
               </div>
               <div className={styles.loginWrapper}>
                  <div className={styles.login}>Login</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Thumbnail;
