import React from "react";
import { Button, Divider } from 'antd';

class AMModelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    add = () => {
        this.props.nav('AMModelCreate');
    }

    renderPage = () => {
        return (
            <div>
                <h2>AMModelList</h2>
                <Divider />
                <Button onClick={this.add}>新增</Button>
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