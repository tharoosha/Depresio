import React, { useState } from 'react'
import avatar from '../images/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.scss';
import extend from '../styles/Profile.module.scss';
import Header from './Header';
import BarChart from './chart';


import '../styles/Base.scss';
import '../styles/Profile.scss';

export default function Profile() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate('/')
 
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <>
    <Header/>
    <div className="container">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className = "Profile_Wrapper" >
          <div className = "Profile_topbar" >
            <div className="wrapper_container">
            <h3>Good Evening, {apiData?.firstName || apiData?.username}!🥳</h3>
            </div>
            <div className="wrapper_container">
                   <button onClick={userLogout} className='btn' to="/">Logout</button>
                
            </div>
          </div>
          <div className='profile_inner_wrapper'>
              <form className='profile_info_form' onSubmit={formik.handleSubmit}>

              <div className="form_wrapper_container_title">
                <h3>Profile Details</h3>
                  <span className='py-4 text-xl w-2/3 text-center text-gray-500 custom-class-2'>
                      You can update the details.
                  </span>
                </div>

                <div className='form_wrapper'>
                  <div className='profile_image'>
                      <label htmlFor="profile">
                        <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                      </label>
                      
                      <input onChange={onUpload} type="file" id='profile' name='profile' />
                  </div>
                </div>
                  <div className="form_text_fields">
                    <div className="field_group">
                      <input {...formik.getFieldProps('firstName')} className='inputText' type="text" placeholder='First Name' />
                      <input {...formik.getFieldProps('lastName')} className='inputText' type="text" placeholder='Last Name' />
                    
                      <input {...formik.getFieldProps('mobile')} className='inputText' type="tel" placeholder='Contact Number' />
                      <input {...formik.getFieldProps('email')} className='inputText' type="email" placeholder='Email' />
                    
                      <textarea {...formik.getFieldProps('address')} className='inputText' row='5' type="Textarea" placeholder='Address' />
                      <button className='btn' type='submit'>Update</button>
                      <button className='btn delete-btn' type='delete'>Delete Account</button>
                    </div>
                  </div>
                  
              </form>
              <div className='profile_info_form'>
              <div className="form_wrapper_container_title">
                <h3>Personal Reports</h3>
                  <span className='py-4 text-xl w-2/3 text-center text-gray-500 custom-class-2'>
                  Emotion Changing Frequency Over Months
                  </span>
                </div>
                <div className="App">
                  <BarChart />
                </div>

              </div>

            </div>
        </div>
      
    </div>
    </>
    
  )
}