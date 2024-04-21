import React from "react";
import {
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Divider, Spin, message, Row, Col, Card, Statistic } from 'antd';

import hub from '../../utilities/hub';

class AMDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const { ThingModels } = await hub.queryModels();
            const modelNum = ThingModels.length;
            console.log(ThingModels);

            const { things } = await hub.queryInstances({});
            const instanceNum = things.length;
            console.log(things);

            this.setState({ loading: false, modelNum, instanceNum });
        } catch (error) {
            console.log(error);
            message.error(`${error}`);
        }
    }

    renderPage = () => {
        const { modelNum, instanceNum, loading } = this.state;

        if (loading) {
            return (
                <Spin />
            )
        }
        return (
            <div>
                <h2>Dashboard</h2>
                <Divider />
                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="物模型数量"
                                value={modelNum}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<UploadOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="物实例数量"
                                value={instanceNum}
                                precision={0}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<VideoCameraOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

            </div>
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