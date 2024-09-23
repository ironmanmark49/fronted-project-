import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";

export const ActiveAdminContext = createContext("")

const AdminContext = ({children}) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [adminData, setAdminData] = useState();
    const [allblogs, setAllBlogs] = useState([]);
    // const [adminArray, setAdminArray] = useState([]);
    const [allAdminUser, setAllAdminUser] = useState([]);
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

      const getAllUser = () => {
        axios.get("http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/admin")
        .then((resp) => {
            const apiResp = resp.data;
            if(apiResp.status === 200){
                toast.success(apiResp.message, toastOptions);
                setAdminData(apiResp.AllAdmin);
            }else{
                toast.error(apiResp.message, toastOptions);
            }
        })
        .catch((error) => {
            console.log(error);
        })
      }

      const AddUser = (inputStats) => {
        console.log(inputStats);
        axios.post("http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/admin", inputStats)
        .then((resp) => {
            const apiResp = resp.data;
            if(apiResp.status === 200){
                toast.success(apiResp.message, toastOptions);
            }
            else{
                toast.error(apiResp.message, toastOptions);
            }
        })
        .catch((error) => {
            console.log(error);
        })
      }

      const fetchAllBlog = () => {
        axios.get("http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/allblogs")
        .then((resp) => {
            const apiResp = resp.data
            if(apiResp.status === 200){
                toast.success(apiResp.message, toastOptions);
                setAllBlogs(apiResp.AllBlog);
            }
            else{
                toast.error(apiResp.message, toastOptions);
            }
        })
        .catch((error) => {
            console.log(error);
        }) 
      }

      const fetchAllUsers = () => {
        axios.get("http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/admin")
        .then((resp) => {
            const apiResp = resp.data
            if(apiResp.status === 200){
                toast.success(apiResp.message, toastOptions);
                setAllAdminUser(apiResp.AllAdmin)
            }
            else{
                toast.error(apiResp.message, toastOptions);
            }
        })
      }

      const deleteUser = (id) => {
        axios.delete(`http://ec2-65-0-132-17.ap-south-1.compute.amazonaws.com/api/admin${id}`)
        .then((resp) => {
            const apiResp = resp.data;
            if(apiResp.status === 200){
                toast.success(apiResp.message, toastOptions);
                setTimeout(() => {
                    window.location.reload();
                  }, 1000)
            }
            else{
                toast.error(apiResp.message, toastOptions);
            }
        })
        .catch((error) => {
            toast.error("Connection Refuse");
          })
      }

      useEffect(() => {
        getAllUser();
        // eslint-disable-next-line
      },[])

    const adminAuth = {
        toastOptions,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        allAdminUser,
        getAllUser,
        adminData,
        fetchAllBlog,
        allblogs,
        AddUser,
        deleteUser,
        fetchAllUsers
    }

    return(
        <ActiveAdminContext.Provider value={{adminAuth}}>{children}</ActiveAdminContext.Provider>
    )
}

export default AdminContext;