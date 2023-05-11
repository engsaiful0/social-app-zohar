import React, { useState } from 'react';

//header
import Header from '../../components/partials/dashboard/HeaderStyle/header'

//sidebar
import RightSidebar from '../../components/partials/dashboard/SidebarStyle/rightsidebar'

//sidebar
import Sidebar from '../../components/partials/dashboard/SidebarStyle/sidebar'

//footer
import Footer from '../../components/partials/dashboard/FooterStyle/footer'

//default 
// import DefaultRouter from '../../router/default-router'

// share-offcanvas
// import ShareOffcanvas from '../../components/share-offcanvas'

//settingoffCanvas
import SettingOffCanvas from '../../components/setting/SettingOffCanvas';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkIfUserIsLoggedIn } from '../../checkIfUserIsLoggedIn';

const Default = () => {
    let navigate = useNavigate();
    useEffect(() => {
        // check if the user is logged in
        const isLoggedIn = checkIfUserIsLoggedIn();
        console.log(isLoggedIn);
        // if the user is not logged in, redirect to the sign-in page
        if (!isLoggedIn) {
            navigate('/auth/sign-in');
        }
    }, [navigate]);
    return (
        <>
                <Sidebar />
                <Header />
                <div className="main-content">
                    {/* <div id="content-page" className="content-page"> */}
                    {/* <DefaultRouter/> */}
                    <Outlet/>
                    {/* </div> */}
                </div>
                <RightSidebar />
            <Footer />
            <SettingOffCanvas/>
        </>
    )
}

export default Default
