import './styles/Base.scss';
import './styles/Clerk.scss';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Link } from 'react-router-dom';


import Home from './Home';
import MusicTherapy from './pages/MusicTherapy';
import TreatmentPlan from './pages/TreatmentPlan';
import AI from './pages/AI_Assistant';

// import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';

// if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//    throw 'Missing Publishable Key';
// }

// const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

/* import all components */
import Register from './components/Register'
import Username from './components/Username'
import Password from './components/Password'
import Profile from './components/Profile'
import Reset from './components/Reset'
import Recovery from './components/Recovery'
import PageNotFound from './components/PageNotFound'



/* root routes */
const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/">
         <Route index element={<Home />} />
         <Route path="/assistant" element={<AI />} />
         <Route path="/music-therapy" element={<MusicTherapy />} />
         <Route path="/treatment-plan" element={<TreatmentPlan />} />

         <Route path='/register' element={<Register />} />
         <Route path='/username' element={<Username />} />
         <Route path='/password' element={<Password />} />
         <Route path='/profile' element={<Profile />} />
         <Route path='/reset' element={<Reset />} />
         <Route path='/recovery' element={<Recovery />} />
         <Route path='/pagenotfound' element={<PageNotFound />} />

      </Route>
   )
);

function App() {
   return (
      <>
         {/* <ClerkProvider publishableKey={clerkPubKey}> */}
         <RouterProvider router={router} />
         {/* </ClerkProvider> */}
      </>
   );
}

export default App;
