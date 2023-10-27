import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../images/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

import styles from '../styles/Username.module.scss';

export default function Register() {
   const navigate = useNavigate();
   const [file, setFile] = useState();

   const formik = useFormik({
      initialValues: {
         email: 'doyol56239@cnogs.com',
         username: 'example123',
         password: 'admin@123',
      },
      validate: registerValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async (values) => {
         values = await Object.assign(values, { profile: file || '' });
         let registerPromise = registerUser(values);
         toast.promise(registerPromise, {
            loading: 'Creating...',
            success: <b>Register Successfully...!</b>,
            error: <b>Could not Register.</b>,
         });

         registerPromise.then(function () {
            navigate('/');
         });
      },
   });

   /** formik doensn't support file upload so we need to create this handler */
   const onUpload = async (e) => {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
   };

   return (
      <div className="container mx-auto">
         <Toaster position="top-center" reverseOrder={false}></Toaster>

         <div className="reg-container flex justify-center items-center h-screen">
            <div style={{ width: '100%', paddingTop: '3em' }}>
               <div className="title flex flex-col items-center">
                  <span className="py-4 text-xl w-2/3 text-center font-bold text-gray-500 mb--16 ">Welcome to Depresio!</span>
               </div>

               <form className="py-1" onSubmit={formik.handleSubmit}>
                  <div className="profile flex justify-center py-4">
                     <label htmlFor="profile">
                        <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                     </label>

                     <input onChange={onUpload} type="file" id="profile" name="profile" />
                  </div>

                  <div className="textbox flex flex-col items-center gap-6">
                     <input {...formik.getFieldProps('email')} type="text" placeholder="Email*" />
                     <input {...formik.getFieldProps('username')} type="text" placeholder="Username*" />
                     <input {...formik.getFieldProps('password')} type="text" placeholder="Password*" />
                     <button className="btn btn-secondary mb--16" type="submit">
                        Register
                     </button>
                  </div>

                  <div className="text-center py-4">
                     <span className="text-gray-500">
                        Already Sign Up?{' '}
                        <Link className="text-red-500 reg-link" to="/">
                           Login Now
                        </Link>
                     </span>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
