import React from "react";
import { Button, Divider } from 'antd';

class AMInstanceRgister extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    back = () => {
        this.props.nav('AMInstanceList');
    }

    renderPage = () => {
        return (
            <div>
                <h2>AMInstanceRgister</h2>
                <Divider />
                <Button onClick={this.back}>返回</Button>
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

export default AMInstanceRgister;