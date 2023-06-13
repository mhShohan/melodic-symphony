import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../utils/firebase.config';
import Swal from 'sweetalert2';
import { baseUrl } from '../utils/config';
import useAxios from '../hooks/useAxios';
import axios from 'axios';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider(auth);

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);

  //login with google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  // email/password register
  const registerUser = (body) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, body.email, body.password)
      .then((currentUser) => {
        axios.post(`${baseUrl}/user/register`, body).then((res) => {
          console.log(res.data);
          updateProfile(currentUser.user, {
            displayName: body.displayName,
            photoURL: body.photoURL,
          })
            .then(() => {
              setLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Registered!',
              });
              logOut();
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          Swal.fire({
            icon: 'error',
            title: 'Email Already in Use!',
          });
          return;
        }
      });
  };

  // email/password login
  const logIn = ({ email, password }) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const authHandler = {
    user,
    loading,
    setLoading,
    setUpdate,
    googleLogin,
    registerUser,
    logIn,
    logOut,
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axiosSecure.post('/user/check-token', {});
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setLoading(false);
        }
      } catch (error) {
        setUser(null);
        setLoading(false);
        console.log(error);
      }
    })();
  }, [update]);

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
