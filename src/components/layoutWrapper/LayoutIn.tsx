/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Outlet, useNavigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Sidebar from './Side';
import { BreadCrumbCustom } from '../BreadCrumbCustom';
import { useVerifyQuery } from '../../redux/apiSlicers/Auth';

const { Content, Footer } = Layout;


const LayoutWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth)
  const { isSuccess } = useVerifyQuery()


  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken, isSuccess])

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
