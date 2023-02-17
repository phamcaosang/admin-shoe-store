/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Outlet, useNavigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { verifyUserAuth } from '../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import Sidebar from './Side';
import { BreadCrumbCustom } from '../BreadCrumbCustom';

const { Content, Footer } = Layout;


const LayoutWrapper: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authenticated, accessToken, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    verifyUserAuth(dispatch)

    // if (authenticated === true && accessToken != null && user != null){
    if (accessToken != null) {
      // console.log("Authenicated");
    } else {
      navigate("/login")
    }
  }, [authenticated, accessToken, user?.username])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        {/* <Head /> */}
        <Content style={{ margin: '16px', overflow: 'hidden' }}>
          <div className="site-layout-background">
            <BreadCrumbCustom />
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Toaster />
    </Layout>
  )
}


export default LayoutWrapper;
