import React from "react";
import {
    PlusOutlined,
    WalletOutlined,
    TransactionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Divider, Spin, message, Row, Col, Card, List, Upload, Form, Button } from 'antd';

import hub from '../../utilities/hub';

class AMDashboard extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = { loading: true };
        this.uploadProps = {
            beforeUpload: () => false,
            // onPreview: this.handlePreview,
            maxCount: 1,
            listType: "picture-card"
        };

        this.formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        this.fileList = [];
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const { ThingModels } = await hub.queryModels();
            const modelNum = ThingModels.length;
            // console.log(ThingModels);

            const { things } = await hub.queryInstances({});
            const instanceNum = things.length;
            // console.log(things);

            this.setState({ loading: false, modelNum, instanceNum });
        } catch (error) {
            console.log(error);
            message.error(`${error}`);
        }
    }

    submitContract = async (values) => {
        try {
            this.setState({ loading: true });
            values['createtime'] = new Date().getTime() + "";
            delete values.image;
            console.log('Received values of form: ', values, this.fileList);

            const resp = await hub.uploadContract(values, this.fileList);
            const contract_info = this.assemble(resp);

            this.setState({ loading: false, contract_info });

        } catch (error) {
            message.error('解析合同出错，请联系管理员。');
            console.log(error);
        }
    };

    assemble = (resp) => {
        const data = resp.contract_info;
        return {
            title: data.title,
            detail: [
                {
                    title: '甲方',
                    value: data.co_A,
                    avatar: <UserOutlined />
                },
                {
                    title: '供应商',
                    value: data.co_B,
                    avatar: <UserOutlined />
                },
                {
                    title: '合同金额',
                    value: data.amount,
                    avatar: <WalletOutlined />
                },
                {
                    title: '付款周期',
                    value: data.terms,
                    avatar: <TransactionOutlined />
                },
            ]
        }
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        this.fileList = e.fileList;
        return e && e.fileList;
    };

    parseContractInfo = (loading, contract_info) => {
        if (!loading && contract_info) {
            return (
                <Card
                    title={contract_info.title}
                    bordered={false}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={contract_info.detail}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.avatar}
                                    title={item.title}
                                    description={<div dangerouslySetInnerHTML={{ __html: item.value }} />}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            );
        } else if (loading) {
            return (
                <Card title={<Spin />} bordered={false} >
                    <Spin />
                </Card>
            );
        }

        return (
            <Card
                title="暂无合同"
                bordered={false}
            ></Card>
        );
    }

    renderPage = () => {
        const { loading, contract_info } = this.state;
        // console.log(contract_info);
        const info = this.parseContractInfo(loading, contract_info);

        return (
            <div>
                <h2>合同管理</h2>
                <Divider />

                <Row gutter={16}>
                    <Col span={8} >
                        <Card title="上传合同" bordered={false}>
                            {loading ? <Spin /> :
                                <Form
                                    ref={this.formRef}
                                    name="validate_other"
                                    {...this.formItemLayout}
                                    onFinish={this.submitContract}
                                >
                                    <Form.Item name="image" valuePropName="fileList" getValueFromEvent={this.normFile} noStyle>
                                        <Upload {...this.uploadProps}>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </Upload>
                                    </Form.Item>

                                    <Divider />

                                    <Form.Item wrapperCol={{ span: 24, offset: 20 }}>
                                        <Button htmlType="submit">上传</Button>
                                    </Form.Item>
                                </Form>}
                        </Card>
                    </Col>
                    <Col span={16}>
                        {info}
                    </Col>
                </Row>
            </div >
        )

    }

    render() {
        const page = this.renderPage();
        return (
            <div>
                {page}
            </div>
        );
    }

}

export default AMDashboard;