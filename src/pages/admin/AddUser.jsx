import React, { useContext, useState } from 'react'
import InputField from '../../components/InputField'
import { ActiveAdminContext } from '../../context/adminContext';

const AddUser = () => {
    const {adminAuth} = useContext(ActiveAdminContext);
    const { AddUser} = adminAuth;

    const [passwordType, setPasswordType] = useState(true);
    const [inputStats, setInputStats] = useState({
        CompanyName: "",
        CompanyEmail: "",
        AccPassword: "",
      });
      
    const TaskArray = [
        {
            labelname: "Company name",
            name: "CompanyName",
            type: "text",
            placeholder: "Enter UserName",
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
    ]
    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputStats({
          ...inputStats,
          [name]: value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        AddUser(inputStats);
        setInputStats({
            CompanyName: "",
            CompanyEmail: "",
            AccPassword: "",
        })
    }

    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Add User</h4>
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            {TaskArray.map((element, key) => (
                                <div className="form-group position-relative" key={key}>
                                    <label htmlFor={element.labelname}>{element.labelname}</label>
                                    <InputField
                                        type={ element.name === "AccPassword" && passwordType
                                                ? "password"
                                                : element.type
                                        }
                                        name={element.name}
                                        className="form-control"
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
                                </div>
                            ))}

                            <button type="submit" className="btn btn-primary mr-2">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser
