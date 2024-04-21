import React from "react";
import { Button, Divider, message, Table, Space, Drawer, Card, List } from 'antd';

import hub from '../../utilities/hub';
import CONSTANT from '../../utilities/constant';

class AMModelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
        this.modelsColms = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: '30%'
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
                width: '40%'
            },
            {
                title: 'Action',
                key: 'action',
                width: '20%',
                render: (_, record, i) => (
                    <Space size="middle">
                        <Button onClick={async () => await this.viewProperty(record, _, i)}>查看属性</Button>
                        <Button onClick={async () => await this.viewAlertCondition(record, _, i)}>查看报警</Button>
                    </Space>
                ),
            },
        ];
    }

    async componentDidMount() {
        try {
            // console.log(`AMModelList componentDidMount`);
            await this.query();
        } catch (error) {
            console.log(error);
            message.error(`${error}`);
        }
    }

    query = async () => {
        this.setState({ loading: true });
        const { ThingModels } = await hub.queryModels();

        this.setState({ loading: false, models: ThingModels });
    }

    viewProperty = async (model) => {
        try {
            const curModel = await this.queryModel(model.id);
            console.log(curModel);
            this.setState({ curModel, showProperties: true });
        } catch (error) {
            console.log(error);
            message.error(`${error}`);
        }
    }

    viewAlertCondition = async (model) => {
        try {
            const curModel = await this.queryModel(model.id);
            this.setState({ curModel, showAlertConditions: true });
        } catch (error) {
            console.log(error);
            message.error(`${error}`);
        }
    }

    queryModel = async (id) => {
        try {
            const { thingModel } = await hub.getModel(id);
            return thingModel;
        } catch (error) {
            console.log(error);
            message.error(`${error}`);
        }
    }

    closeProperties = () => this.setState({ showProperties: false });
    closeAlertConditions = () => this.setState({ showAlertConditions: false });

    add = () => {
        this.props.nav('AMModelCreate');
    }

    renderPage = () => {
        const { models, curModel, showProperties, showAlertConditions } = this.state;
        return (
            <div>
                <h2>物模型列表</h2>
                <Divider />
                <Button onClick={this.add}>新增</Button>
                <Table style={{ marginTop: '20px' }} dataSource={models} columns={this.modelsColms} rowKey={(record) => record._id} />

                <Drawer title={`查看${curModel ? curModel.name : ''}物模型，属性设置`} size="large" onClose={this.closeProperties} open={showProperties}>
                    {curModel ?
                        <List
                            grid={{
                                gutter: 16,
                                column: 1,
                            }}
                            dataSource={curModel.properties}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card title={item.name}>
                                        <ul>
                                            <li>
                                                最大值：{item.max}
                                            </li>
                                            <li>
                                                最小值：{item.min}
                                            </li>
                                        </ul>
                                    </Card>
                                </List.Item>
                            )}
                        /> : null}
                </Drawer>

                <Drawer title={`查看${curModel ? curModel.name : ''}物模型，报警设置`} size="large" onClose={this.closeAlertConditions} open={showAlertConditions}>
                    {curModel ?
                        <List
                            grid={{
                                gutter: 16,
                                column: 1,
                            }}
                            dataSource={curModel.alert_conditions}
                            renderItem={(item) => {
                                console.log(curModel);
                                const property = curModel.properties.find(p => p.id === item.property_id);

                                let expressionMark = '';
                                switch (item.expression) {
                                    case CONSTANT.CONDITION_EXPRESSION.LARGER:
                                        expressionMark = '>';
                                        break;
                                    case CONSTANT.CONDITION_EXPRESSION.LARGER_EQUAL:
                                        expressionMark = '>=';
                                        break;
                                    case CONSTANT.CONDITION_EXPRESSION.SMALLER_EQUAL:
                                        expressionMark = '<=';
                                        break;
                                    case CONSTANT.CONDITION_EXPRESSION.EQUAL:
                                        expressionMark = '=';
                                        break;
                                    case CONSTANT.CONDITION_EXPRESSION.SMALLER:
                                        expressionMark = '<';
                                        break;
                                    default:
                                }

                                return (
                                    <List.Item>
                                        <Card title={property.name}>
                                            {expressionMark}{item.threshold}
                                        </Card>
                                    </List.Item>
                                );
                            }}
                        /> : null}
                </Drawer>

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

export default AMModelList;