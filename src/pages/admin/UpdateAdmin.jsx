import React, { useState, useContext } from "react";
import InputField from "../../components/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { ActiveContext } from "../../context/UserContext";


const UpdateAdmin = () => {
    const location = useLocation();
    const element = location.state;
    console.log(element)
    const navigate = useNavigate();
    const { userAuth } = useContext(ActiveContext)
    const { toastOptions } = userAuth

    const [inputStats, setInputStats] = useState({
        CompanyName: element?.CompanyName,
        CompanyEmail: element?.CompanyEmail,
        AccPassword: element?.AccPassword,
    });

    const [isChanged, setIsChanged] = useState(false);

    const TaskArray = [
        {
            labelname: "Name",
            name: "CompanyName",
            type: "text",
            placeholder: "Enter User Name",
            value: inputStats.CompanyName,
        },
        {
            labelname: "Email",
            name: "CompanyEmail",
            type: "text",
            placeholder: "Enter Email",
            value: inputStats.CompanyEmail,
        },
        {
            labelname: "Password",
            name: "AccPassword",
            type: "text",
            placeholder: "Enter Password",
            value: inputStats.AccPassword,
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputStats({
            ...inputStats,
            [name]: value,
        });

        setIsChanged(true);
    };

    const handleSubmit = (e, id) => {
        e.preventDefault();
        axios
            .patch(`http://ec2-3-109-32-46.ap-south-1.compute.amazonaws.com/api/admin/${id}`, inputStats)
            .then((response) => {
                const apiResponse = response.data;
                if (apiResponse.status === 200) {
                    toast.success(apiResponse.message, toastOptions);
                    navigate("/dashboard/admin");
                } else {
                    toast.error(apiResponse.message, toastOptions);
                }
            })
            .catch((e) => {
                toast.error("Server Error", toastOptions);
            });
    };
    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Update User</h4>
                        <form className="forms-sample">
                            {TaskArray.map((element, key) => (
                                <div className="form-group" key={key}>
                                    {element.type === "text" || element.type === "CompanyEmail" ? (
                                        <>
                                            <label htmlFor={element.labelname}>
                                                {element.labelname}
                                            </label>
                                            <InputField
                                                type={element.type}
                                                name={element.name}
                                                className="form-control"
                                                placeholder={element.placeholder}
                                                value={element.value}
                                                onChange={handleChange}
                                                required
                                            />
                                        </>
                                    ) : element.type === "file" ? (
                                        <>
                                            <div className="form-group">
                                                <label>{element.labelname}</label>
                                                <InputField
                                                    type={element.type}
                                                    name={element.name}
                                                    className="file-upload-default"
                                                    onChange={handleChange}
                                                />
                                                <div className="input-group col-xs-12">
                                                    <InputField
                                                        type="text"
                                                        className="form-control file-upload-info"
                                                        disabled
                                                        value={element.value}
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
                                    ) : element.type === "textarea" ? (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor={element.labelname}>
                                                    {element.labelname}
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    name={element.name}
                                                    onChange={handleChange}
                                                    required
                                                    value={element.value}
                                                ></textarea>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor={element.labelname}>
                                                    {element.labelname}
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name={element.name}
                                                    onChange={handleChange}
                                                    value={element.value}
                                                >
                                                    {element.optionsArrays?.map((opt, optkey) => (
                                                        <option key={optkey}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}

                            <button
                                className={`btn mr-2 ${isChanged ? "btn-primary " : "btn-dark"
                                    }`}
                                disabled={isChanged ? false : true}
                                onClick={(e) => handleSubmit(e, element._id)}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateAdmin;
