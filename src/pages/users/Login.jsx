import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import Label from '../../components/Label';
import Button from '../../components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ActiveContext } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [passwordType, setPasswordType] = useState(true);

    const [inputField, setInputField] = useState({ email: "", password: "", });


    const {userAuth} = useContext(ActiveContext);
    const {toastOptions} = userAuth;
    const location = useLocation();
    const navigate = useNavigate()

    const loginArray = [
        {
            labelname: "Username or email",
            type: "text",
            placeholder: "Username or email",
            value: inputField.email,
            name: "email",
        },
        {
            labelname: "Password",
            type: "text",
            placeholder: "Password",
            value: inputField.password,
            name: "password",
        },
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputField({...inputField, [name]: value});
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://-65-0-132-17.ap-south-1.compute.amazonaws.com/api/login', inputField)
        .then((resp)=>{
            const apiResp = resp.data;
            if(apiResp.status === 200) {
                sessionStorage.setItem("login status", JSON.stringify(apiResp.isLoggedin));
                sessionStorage.setItem("user data", JSON.stringify(apiResp.data));
                toast.success(apiResp.message, toastOptions)
                navigate("/", {replace:true});
            }
        })
        .catch((error) => {
            toast.error("server error")
        })
    }

    useEffect(() => {
        if ((location.pathname === "/login" && sessionStorage.getItem("login status"))) {
            navigate("/");
        }
        // eslint-disable-next-line
    },[])
    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="row w-100 m-0">
                        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                            <div className="card col-lg-4 mx-auto">
                                <div className="card-body px-5 py-5">
                                    <h3 className="card-title text-left mb-3">User Login</h3>
                                    <form onSubmit={HandleSubmit} method=''>
                                        {loginArray.map((element, key) => (
                                            <div className="form-group position-relative" key={key}>
                                                <Label>{element.labelname} </Label>
                                                <InputField
                                                    type={
                                                        element.name === "password" && passwordType
                                                            ? "password"
                                                            : element.type
                                                    }
                                                    className="form-control p_input "
                                                    placeholder={element.placeholder}
                                                    value={element.value}
                                                    name={element.name}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                {element.name === "password" && (
                                                    <i
                                                        className={`mdi ${passwordType ? "mdi-eye" : "mdi-eye-off"
                                                            } position-absolute eye-class`}
                                                        onClick={() => setPasswordType(!passwordType)}
                                                    ></i>
                                                )}
                                            </div>
                                        ))}

                                        <div className="text-center">
                                            <Button
                                                type="submit"
                                                className="btn btn-primary btn-block enter-btn"
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
