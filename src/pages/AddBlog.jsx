import React, { useContext, useMemo, useRef, useState } from 'react'
import InputField from '../components/InputField'
import Label from '../components/Label';
import { ActiveContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const AddBlog = () => {
    const { userAuth } = useContext(ActiveContext);
    const editorRef = useRef(null)
    const { toastOptions, AddBlog } = userAuth;
    const dDate = new Date();
    const userData = JSON.parse(sessionStorage.getItem("user data"));
    const [inputStats, setInputStats] = useState({
        title: "",
        metaDesc: "",
        blogContent: "",
        UploadedTime: `${dDate.getDate()}/${dDate.getMonth() + 1}/${dDate.getFullYear()}`,
        CoverImage: "",
        BlogCategory: "",
        CompanyEmail:  userData? userData[0] : "balraj@crypto306.com",
        CompanyName: userData ? userData[2] : "Crypto306"
    });

    const TaskArray = [
        {
            labelname: "Title",
            name: "title",
            type: "text",
            placeholder: "Enter Title",
            value: inputStats.title,
        },
        {
            labelname: "Meta Description",
            name: "metaDesc",
            type: "text",
            placeholder: "Enter Meta Description",
            value: inputStats.metaDesc,
        },
        {
            labelname: "Content",
            name: "blogContent",
            type: "textarea",
            placeholder: "Enter Content",
            value: inputStats.blogContent,
        },
        {
            labelname: "Cover Image",
            name: "CoverImage",
            type: "file",
            placeholder: "Select Cover Image",
            accept: ".jpg, .jpeg, .png",
            value: inputStats.CoverImage,
        },
        {
            labelname: "Category",
            name: "BlogCategory",
            type: "select",
            placeholder: "Select Category",
            value: inputStats.BlogCategory,
            optionsArrays: ["None", "Option 1", "Option 2"],
        },
    ];
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "CoverImage") {
            if (e.target.files[0].size / 1024 > 500) {
                toast.error("File Size should be less than 200KB", toastOptions);
            } else {
                setInputStats({
                    ...inputStats,
                    [name]: files[0]
                });
            }
        } else {
            setInputStats({
                ...inputStats,
                [name]: value,
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AddBlog(inputStats);
        setInputStats({
            title: "",
            metaDesc: "",
            blogContent: "",
            UploadedTime: `${dDate.getDate()}/${dDate.getMonth() + 1}/${dDate.getFullYear()}`,
            CoverImage: "",
            BlogCategory: "None",
            CompanyEmail:  userData? userData[0] : "balraj@crypto306.com",
            CompanyName: userData ? userData[2] : "Crypto306"
        })
        document.querySelector(".file-upload-info").value = "";
    }

    const options = ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'paragraph', 'fontsize', '|', 'outdent', 'indent', 'align', '|', 'hr', 'find', '|', 'fullsize', 'link', ];
     // eslint-disable-next-line
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: '',
            defaultLineHeight: 1.5,
            enter: 'div',
            // options that we defined in above step.
            buttons: options,
            buttonsMD: options,
            buttonsSM: options,
            buttonsXS: options,
            statusbar: false,
            beautyHTML: true,
            sizeLG: 900,
            sizeMD: 700,
            sizeSM: 400,
            toolbarAdaptive: false,
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            defaultActionOnPaste: "insert_clear_html",
        })
    )
    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Add Blog</h4>
                        <form
                            className="forms-sample"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            {TaskArray.map((element, key) => (
                                <div className="form-group" key={key}>
                                    {element.type === "text" ? (
                                        <>
                                            <Label>
                                                {element.labelname}
                                            </Label>
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
                                                <Label>{element.labelname}</Label>
                                                <InputField
                                                    type={element.type}
                                                    name={element.name}
                                                    className="file-upload-default"
                                                    onChange={handleChange}
                                                    required
                                                    accept=".jpg,.png,.jpeg"
                                                />
                                                <div className="input-group col-xs-12">
                                                    <InputField
                                                        type="text"
                                                        className="form-control file-upload-info"
                                                        disabled
                                                        value={element.value?.name}
                                                        placeholder={element.placeholder}
                                                        name={element.name}
                                                        required
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
                                                <Label htmlFor={element.labelname}>
                                                    {element.labelname}
                                                </Label>
                                                <JoditEditor
                                                ref={editorRef}
                                                    config={config}
                                                    className="form-control"
                                                    onBlur={(e)=> setInputStats({
                                                        ...inputStats, blogContent: e
                                                    })}
                                                    required
                                                    value={element.value} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group">
                                                <Label htmlFor={element.labelname}>
                                                    {element.labelname}
                                                </Label>
                                                <select
                                                    className="form-control"
                                                    name={element.name}
                                                    onChange={handleChange}
                                                    value={element.value}
                                                >
                                                    {element.optionsArrays?.map((opt, optkey) => (
                                                        <option key={optkey} value={opt}>
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}

                            <button type="submit" className="btn btn-primary mr-2">
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBlog
