import React from "react";
import { Button, Divider } from 'antd';

import AMHistory from './history';

class AMInstanceView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, showHistorydata: false, };
    }

    back = () => this.props.nav('AMInstanceList');

    viewHistory = () => this.viewNav(true);

    viewNav = (showHistorydata) => this.setState({ showHistorydata });

    renderPage = () => {
        if (this.state.showHistorydata) {
            return (
                <AMHistory viewNav={this.viewNav} />
            )
        }

        return (
            <div>
                <h2>AMInstanceView</h2>
                <Divider />
                <Button onClick={this.back}>返回</Button>
                <Button onClick={this.viewHistory}>历史记录</Button>

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

export default AMInstanceView;