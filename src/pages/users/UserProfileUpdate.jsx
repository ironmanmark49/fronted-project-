import React, { useEffect, useState } from 'react'
import InputField from '../../components/InputField';
import axios from 'axios';
import { useContext } from 'react';
import { ActiveContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserProfileUpdate = () => {
    const {userAuth} = useContext(ActiveContext);
    const { UpdateUserProfile, toastOptions } = userAuth;
    const [detailArray,] = useState(JSON.parse(sessionStorage.getItem("user data")));
    const navigate = useNavigate();
    const [inputStats, setInputStats] = useState({
        CompanyName: "",
        AccPassword: "",
        ProfilePicture: ""
    });

    const [passwordType, setPasswordType] = useState(true);
    const [fileChange, setFileChange] = useState(false);

    const TaskArray = [
        {
            labelname: "User Name",
            name: "CompanyName",
            type: "text",
            placeholder: "Enter User Name",
            value: inputStats?.CompanyName,
        },
        {
            labelname: "Password",
            name: "AccPassword",
            type: "text",
            placeholder: "Enter Password",
            value: inputStats?.AccPassword,
        },
        {
            labelname: "Profile Image",
            name: "ProfilePicture",
            type: "file",
            placeholder: "Select Profile Image",
            value: inputStats?.ProfilePicture != null ? inputStats.ProfilePicture : "",
        },
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === "ProfilePicture") {
          if(e.target.files[0].size/1024 > 50){
            toast.error("File size should be less then 50KB", toastOptions)
          }
          else {
            setInputStats({
              ...inputStats,
              [name]: files[0],
            });
          }
          setFileChange(true)
    
        } else {
          setInputStats({
            ...inputStats,
            [name]: value,
          });
        }
      };

    useEffect(()=>{
        axios.post("http://ec2-3-109-32-46.ap-south-1.compute.amazonaws.com/api/personalAdmin", {id : detailArray[3]} )
        .then((resp) => {
            const apiResp = resp.data;
            if(apiResp.status === 200){
                const data = resp.data.databaseData;
                setInputStats({...inputStats, CompanyName : data.CompanyName, AccPassword : data.AccPassword, ProfilePicture : data.ProfilePicture });
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        // eslint-disable-next-line
      },[])

      const handleSubmit = (e) => {
        e.preventDefault();
        UpdateUserProfile( detailArray[3], inputStats);
        setTimeout(()=>{
            navigate("/");
            window.location.reload();
        }, 1000)
      }

    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Profile</h4>
                        <p className="card-description"> Profile </p>
                        <form
                            className="forms-sample"
                            encType="multipart/form-data"
                        onSubmit={handleSubmit}
                        >
                            {TaskArray.map((element, key) => (
                                <div className="form-group position-relative" key={key}>
                                    {element.type === "text" || element.type === "email" ? (
                                        <>
                                            <label htmlFor={element.labelname}>
                                                {element.labelname}
                                            </label>
                                            <InputField
                                                type={
                                                    element.name === "AccPassword" && passwordType
                                                        ? "password"
                                                        : element.type
                                                }
                                                name={element.name}
                                                className="form-control "
                                                placeholder={element.placeholder}
                                                value={element.value}
                                                onChange={handleChange}
                                                required
                                            />
                                            {element.name === "AccPassword" && (
                                                <i
                                                    className={`mdi ${passwordType ? "mdi-eye" : "mdi-eye-off"
                                                        } position-absolute eye-class`}
                                                    onClick={() => setPasswordType(!passwordType)}
                                                ></i>
                                            )}
                                        </>
                                    ) : (
                                        element.type === "file" && (
                                            <>
                                                <div className="form-group">
                                                    <label>{element.labelname}</label>
                                                    <InputField
                                                        type={element.type}
                                                        name="ProfilePicture"
                                                        className="file-upload-default"
                                                        onChange={handleChange}
                                                        accept=".jpg,.png,.jpeg"
                                                    />
                                                    <div className="input-group col-xs-12">
                                                        <InputField
                                                            type="text"
                                                            className="form-control file-upload-info"
                                                            disabled
                                                            name="ProfilePicture"
                                                            value={fileChange ? element.value?.name : element.value}
                                                            placeholder={element.placeholder}

                                                        />
                                                        <span className="input-group-append">
                                                            <button
                                                                className="file-upload-browse btn btn-primary"
                                                                type="button"
                                                            >
                                                                Upload
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    )}
                                </div>
                            ))}

                            <button type="submit" className="btn btn-primary mr-2" >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileUpdate
