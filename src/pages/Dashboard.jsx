import React, { Fragment, useContext, useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { ActiveContext } from '../context/UserContext';
import Card from '../components/Card';
import Hr from '../components/Hr';
import DataTable from '../components/DataTable';
import { ActiveAdminContext } from '../context/adminContext';


const Dashboard = () => {

  const {userAuth} = useContext(ActiveContext);
  const { blogData, getAllblog, isLoggedIn } = userAuth;

  const {adminAuth} = useContext(ActiveAdminContext);
  const {getAllUser, adminData, allblogs, fetchAllBlog, fetchAllUsers} = adminAuth;

  const [activeCard, setActiveCard] = useState(0);

  let filter = [];
  filter = allblogs?.filter((element, key) => {
    return element.CompanyEmail === "balraj@crypto306.com";
  });
  
  const dashboardArray = [
    {
      Heading: "Total Blogs",
      SubHeading: blogData?.length,
      IconName: "message-fast"
    }
  ]

  const AdminDashboardArray = [
    {
      Heading: "Total Blogs",
      SubHeading: allblogs?.length,
      IconName: "message-fast"
    },
    {
      Heading: "Total Users",
      SubHeading: adminData?.length,
      IconName: "message-fast"
    },
    {
      Heading: "Total Admin Blogs",
      SubHeading: filter?.length,
      IconName: "message-fast"
    },
  ]

  const HandleActiveCard = (index) => {
    setActiveCard(index);
  }

  useEffect(()=>{
    if(isLoggedIn){
      getAllblog();
    }else{
      getAllUser();
      fetchAllBlog();
      fetchAllUsers();
    }
    // eslint-disable-next-line
  },[])
 
  let DashboardMapArray = isLoggedIn ? dashboardArray : AdminDashboardArray;

  return (
    <>
      <PageHeader>Dashboard</PageHeader>
      <div className="d-flex align-items-center gap-3">
        {DashboardMapArray.map((elem, index) => (
          <Fragment key={index}>
            <Card headingProps={elem.Heading} countProps={elem.SubHeading} iconProps={elem.IconName} onClick={() => HandleActiveCard(index)} />
          </Fragment>
        ))}
      </div>
      <Hr />
      <DataTable BlogData={isLoggedIn ? blogData : [allblogs, adminData, filter]}  activeCard={activeCard} />
    </>
  )
}

export default Dashboard
