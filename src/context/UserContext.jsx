import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const ActiveContext = createContext("")

const UserContext = ({ children }) => {

  const [blogData, SetBlogData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
  };

  const getAllblog = () => {
    const userEmail = JSON.parse(sessionStorage.getItem("user data")) ?? [0];
    if(userEmail){
      axios
      .post("http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/", userEmail)
      .then((resp) => {
        const apiResp = resp.data;
        if (apiResp.status === 200) {
          SetBlogData(apiResp.AllBlog)
        }
        else {
          toast.error(apiResp.message, toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
   
  }

  const DeleBlogHandler = (id) => {
    axios.delete(`http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/${id}`)
      .then((resp) => {
        const apiResp = resp.data;
        if (apiResp.status === 200) {
          toast.success(apiResp.message, toastOptions);
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
        else {
          toast.error(apiResp.message, toastOptions);
        }
      })
      .catch((error) => {
        toast.error("Connection Refuse");
      })

  }

  const AddBlog = (inputStats) => {
    axios.post("http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/addBlog", inputStats, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        const apiResp = resp.data;
        if (apiResp.status === 200) {
          toast.success(apiResp.message, toastOptions)
        }
        else {
          toast.error(apiResp.message, toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const UpdateBlogHandler = (id, inputStats) => {

    axios.patch(`http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/${id}`, inputStats, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        const apiResp = resp.data;
        if (apiResp.status === 200) {
          toast.success(apiResp.message, toastOptions);
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const UpdateUserProfile = (id, inputStats) => {
    axios.patch(`http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/admin/${id}`, inputStats, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        const apiResp = resp.data;
        if (apiResp.status === 200) {
          toast.success(apiResp.message, toastOptions);

          sessionStorage.removeItem("user data");
          sessionStorage.setItem("user data", JSON.stringify(apiResp.data))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAllblog();
    setIsLoggedIn(sessionStorage.getItem("login status"));
    setUserData((JSON.parse(sessionStorage.getItem("user data"))))
    // eslint-disable-next-line
  }, [])

  const userAuth = {
    toastOptions,
    isLoggedIn,
    setIsLoggedIn,
    blogData,
    DeleBlogHandler,
    userData,
    AddBlog,
    UpdateBlogHandler,
    getAllblog,
    UpdateUserProfile
  }
  return (
    <ActiveContext.Provider value={{ userAuth }}>{children}</ActiveContext.Provider>
  )
}

export default UserContext
