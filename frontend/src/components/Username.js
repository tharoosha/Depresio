import React from 'react'
import avatar from '../images/profile.png'


import styles from '../styles/Username.module.scss';

const Username = () =>{
  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' /*onSubmit={formik.handleSubmit}*/>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input /*{...formik.getFieldProps('username')}*/ className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <a className='text-red-500' href="/register">Register Now</a></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Username;