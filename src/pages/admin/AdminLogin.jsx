import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ActiveAdminContext } from '../../context/adminContext';

const AdminLogin = () => {
    const [passwordType, setPasswordType] = useState(true);


    const { adminAuth } = useContext(ActiveAdminContext);
    const { toastOptions } = adminAuth;
    const navigate = useNavigate()
    const [inputField, setInputField] = useState({ textInput: "", password: "" });
    useEffect(() => {
        if (sessionStorage.getItem("adminInfo")) {
            navigate("/dashboard/admin")
        }
        // eslint-disable-next-line
    }, [])

    const loginArray = [
        {
            labelname: "Username Or Email",
            type: "text",
            placeholder: "Username or email",
            value: inputField.textInput,
            name: "textInput",
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
        setInputField({ ...inputField, [name]: value });
    }
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        if (inputField.password === "Balraj!123" && (inputField.textInput === "balraj@crypto306.com")) {
            toast.success("Login Successfully", toastOptions);
            sessionStorage.setItem("adminInfo", "balraj")
            navigate("/dashboard/admin");
        } else {
            toast.error("Credentials Do not Match", toastOptions);
        }
    }

    useEffect(() => {
        // if ((location.pathname === "/login" && sessionStorage.getItem("login status"))) {
        //     navigate("/");
        // }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="row w-100 m-0">
                        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                            <div className="card col-lg-4 mx-auto">
                                <div className="card-body px-5 py-5">
                                    <h3 className="card-title text-left mb-3">Admin Login</h3>
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

export default AdminLogin;
