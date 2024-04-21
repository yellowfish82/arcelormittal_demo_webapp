import React from "react";
import { Button, Divider } from 'antd';

class AMModelCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    back = () => {
        this.props.nav('AMModelList');
    }

    renderPage = () => {
        return (
            <div>
                <h2>AMModelCreate</h2>
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

export default AMModelCreate;