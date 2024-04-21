import React from "react";
import { Divider } from 'antd';

class AMDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    renderPage = () => {
        return (
            <div>
                <h2>Dashboard</h2>
                <Divider />
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