import React from "react";
import { Button } from 'antd';

class AMHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    back = () => {
        this.props.viewNav(false);
    }

    renderPage = () => {
        return (
            <div>
                <h2>AMHistory</h2>
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

export default AMHistory;