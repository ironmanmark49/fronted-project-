import React from 'react';
import PageHeader from './PageHeader';
import DataTableArray from '../data/DataTableArray';
import Button from './Button';
import { useContext } from 'react';
import { ActiveContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ActiveAdminContext } from '../context/adminContext';
import HTMLReactParser from 'html-react-parser';

const DataTable = ({ BlogData, activeCard }) => {
    const navigate = useNavigate();
    const { userAuth } = useContext(ActiveContext);
    const { DeleBlogHandler, isLoggedIn } = userAuth;

    const { adminAuth } = useContext(ActiveAdminContext);
    const { deleteUser } = adminAuth;

    const handleNavigate = (id, data) => {
        if(isLoggedIn && activeCard === 0){
            navigate(`/update-Blog/${id}`, { state: data });
        }
        else if(!isLoggedIn && activeCard === 1){
            navigate(`/dashboard/admin/update-user/${id}`, {state: data})
        }
        else if (!isLoggedIn && (activeCard === 0 || activeCard === 2)){
            navigate(`/dashboard/admin/update-blog/${id}`, {state: data});
        }
    };

    const deleteHandle = (id) => {
        if (window.confirm("Are You Sure??")) {
            if(activeCard === 0 || activeCard === 2){
                DeleBlogHandler(id);
            }
            else if(activeCard === 1){
                deleteUser(id);
            }
        }
        else {
            return false
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <PageHeader>Blogs</PageHeader>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    { isLoggedIn ? 
                                        DataTableArray[activeCard].map((elem, index) => (
                                            <th key={index}>{elem}</th>
                                        )): 
                                        DataTableArray[activeCard + 1].map((elem, index) => (
                                            <th key={index}>{elem}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isLoggedIn ?
                                        <>
                                            {BlogData?.map((data, key) => (
                                                <tr key={key}>
                                                    <td>
                                                        <img src={`http://ec2-3-109-32-46.ap-south-1.compute.amazonaws.com/api/images/coverimage/${data?.CoverImage}`} alt="errror-icon" />
                                                    </td>
                                                    <td>
                                                        <span className="">{data?.CompanyName}</span>
                                                    </td>
                                                    <td>{data?.CompanyEmail}</td>
                                                    <td className='BlogTitle'> {data?.blogTitle} </td>
                                                    <td> {data?.BlogCategory} </td>
                                                    <td className="content">{HTMLReactParser(data?.BlogContent)}</td>
                                                    <td>
                                                        <Button
                                                            className="btn p-0"
                                                            onClick={() => handleNavigate(data?._id, data)}
                                                        >
                                                            <i className="mdi mdi-pencil-box fs-4 text-primary"></i>
                                                        </Button>
                                                        |
                                                        <Button
                                                            className="btn p-0"
                                                            onClick={() => deleteHandle(data?._id)}
                                                        >
                                                            <i className="mdi mdi-delete fs-4 text-danger"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                        :
                                        <>
                                            {BlogData[activeCard]?.map((data, key) => (
                                                <tr key={key}>
                                                    <td>
                                                        <img src={`http://ec2-3-109-32-46.ap-south-1.compute.amazonaws.com/api/images/${data?.CoverImage? "coverimage" : "userprofile"}/${data?.CoverImage??data?.ProfilePicture}`} alt="errror-icon" />
                                                    </td>
                                                    <td>{data?.CompanyName}</td>
                                                    <td>{data?.CompanyEmail}</td>
                                                    {data?.blogTitle ?
                                                        <>
                                                            <td className='BlogTitle'>{data?.blogTitle}</td>
                                                            <td>{data?.BlogCategory}</td>
                                                            <td className="content">{HTMLReactParser(data?.BlogContent)}</td>
                                                        </>
                                                        :
                                                        <td>{data?.AccPassword}</td>
                                                    }
                                                    <td>
                                                        <Button
                                                            className="btn p-0"
                                                            onClick={() => handleNavigate(data?._id, data)}>
                                                            <i className="mdi mdi-pencil-box fs-4 text-primary"></i>
                                                        </Button>
                                                        |
                                                        <Button
                                                            className="btn p-0"
                                                            onClick={() => deleteHandle(data?._id)}>
                                                            <i className="mdi mdi-delete fs-4 text-danger"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
