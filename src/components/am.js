import React from "react";
import './am.css';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    DashboardOutlined,
    VideoCameraOutlined,
    CopyOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, Spin, message } from 'antd';

import AMBreadcrumb from './structure/breadcrumb';
import AMContent from './structure/content';

const { Header, Content, Footer, Sider } = Layout;

class ArcelorMittal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            items: [
                {
                    key: 'dashboard',
                    icon: <DashboardOutlined />,
                    label: '看板',
                },
                {
                    key: 'model',
                    icon: <UploadOutlined />,
                    label: '物模型',
                },
                {
                    key: 'instance',
                    icon: <VideoCameraOutlined />,
                    label: '物实例',
                },
                {
                    key: 'contract',
                    icon: <CopyOutlined />,
                    label: '合同管理',
                },
            ]
        };

        this.navMap = {
            dashboard: {
                page: 'AMDashboard',
                breadcrumb: ['看板']
            },
            model: {
                page: 'AMModel',
                breadcrumb: ['物模型']
            },
            instance: {
                page: 'AMInstance',
                breadcrumb: ['物实例']
            },
            contract: {
                page: 'AMContract',
                breadcrumb: ['合同管理']
            },
        }
    }

    async componentDidMount() {
        try {
            message.success('IIoT平台欢迎您！');
            const { page, breadcrumb } = this.navMap[this.state.items[3].key];
            this.setState({ loading: false, collapsed: false, page, breadcrumb });

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

    nav = (page, breadcrumb) => {
        this.setState({ page, breadcrumb });
    }

    setBreadcrumb = (breadcrumb) => {
        this.setState({ breadcrumb });
    }

    onClickMenu = async (e) => {
        // console.log(e);
        const { page, breadcrumb } = this.navMap[e.key];
        this.nav(page, breadcrumb);
    }

    setCollapsed = (collapsed) => {
        this.setState({ collapsed });
    }

    renderMainPage = () => {
        const { loading, collapsed, breadcrumb, items, page } = this.state;

        if (loading) {
            return (
                <Spin />
            );
        }

        return (
            <Layout style={{ minHeight: '100vh', borderRadius: '10px', }}>
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            borderRadius: '10px',
                            background: '#ffffff'
                        }}
                    >
                        <AMContent page={page} setBreadcrumb={this.setBreadcrumb}/>
                    </Content>

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