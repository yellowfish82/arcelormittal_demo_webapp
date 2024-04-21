import React from "react";
import { Button } from 'antd';

class AMInstanceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    register = () => {
        this.props.nav('AMInstanceRgister');
    }

    detail = () => {
        // this.props.nav('AMInstanceView', this.state.curInstance);
        this.props.nav('AMInstanceView', { name: '设备名称' });
    }

    renderPage = () => {
        return (
            <div>
                <h2>AMInstanceList</h2>
                <Button onClick={this.register}>注册</Button>
                <Button onClick={this.detail}>明细</Button>

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

export default AMInstanceList;