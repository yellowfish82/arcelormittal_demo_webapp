import React from "react";
import './am.css';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, Spin, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

class ArcelorMittal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loading: true, };
    }

    async componentDidMount() {
        try {
            message.success('ArcelorMittal IIoT平台欢迎您！');
            this.setState({ loading: false, collapsed: false, });
            this.nav();

        } catch (error) {
            console.log(error);
        };
    }

    getItem = (label, key, icon, children) => {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    nav = (targetPageInfo, targetTagValue) => {
        this.setState({ loading: true });

        this.setState({ loading: false });

    }

    setBreadcrumb = (breadcrumb) => {
        this.setState({ breadcrumb });
    }

    setGlobalInfo = (globalInfo) => {
        this.setState({ globalInfo });
    }

    setCollapsed = (collapsed) => {
        this.setState({ collapsed });
    }

    renderMainPage = () => {
        const { loading, collapsed, } = this.state;

        if (loading) {
            return (
                <Spin />
            );
        }

        return (
            <Layout style={{ minHeight: '100vh', borderRadius: '10px', }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <img src='logo192.png' style={{ width: '100%', height: '95px' }} />

                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => this.setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            color: 'whitesmoke',
                            float: 'right'
                        }}
                    />

                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header style={{
                        padding: 0,
                        height: '95px',
                        backgroundColor: 'whitesmoke',
                        margin: '0 16px',
                    }}
                    >

                        <h1 style={{ textAlign: "center", backgroundColor: '#ffffff', margin: '16px 0' }}>Arcelor Mittal IIoT 演示</h1>
                    </Header>


                    <Breadcrumb
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            borderRadius: '10px',
                            background: '#ffffff'
                        }}
                    >
                        Content
                    </Content>

                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Arcelor Mittal Demo ©{new Date().getFullYear()} Created by Terry
                    </Footer>
                </Layout>
            </Layout>
        )
    }

    render() {
        const mainPage = this.renderMainPage();

        return (
            <div>
                {mainPage}
            </div>
        );
    }

}

export default ArcelorMittal;