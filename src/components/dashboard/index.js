import React from "react";
import {
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Divider, Spin, message, Row, Col, Card, Statistic, Input, Button } from 'antd';
import ReactMarkdown from 'react-markdown/with-html';

import hub from '../../utilities/hub';

const { TextArea } = Input;
class AMDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, ollama_chat: '' };
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

    setValue = (c) => {
        this.setState({ chat: c });
    }

    chat = async () => {
        try {
            this.setState({ chat_loading: true });
            const { chat } = this.state;
            message.info(chat);
            const resp = await hub.chatWithOllama(chat);
            const ollama_chat_resp = { __html: JSON.stringify(resp.response).replace(/\n/g, '<br>') };
            message.success(ollama_chat_resp);

            this.setState({ ollama_chat: ollama_chat_resp, chat_loading: false, });

        } catch (error) {
            console.log(error);
            this.setState({ chat_loading: true });
        };
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

                <Row gutter={16}>
                    <Col span={12}>
                        <TextArea
                            onChange={(e) => this.setValue(e.target.value)}
                            placeholder="Controlled autosize"
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />
                        <Divider>使用前确认本地已运行Ollama</Divider>
                        <Button onClick={this.chat}>提问LLM</Button>
                    </Col>
                    <Col span={12}>
                        <p>Ollama Robot</p>
                        <Divider />
                        {this.state.chat_loading ? <Spin /> : <div dangerouslySetInnerHTML={this.state.ollama_chat} />}
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