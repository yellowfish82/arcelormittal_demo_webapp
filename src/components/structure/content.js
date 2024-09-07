import React from "react";


import ComingSoon from '../comming';
import AMDashboard from '../dashboard';
import AMModel from '../model';
import AMInstance from '../instance';
import AMContract from '../contract';

class AMContent extends React.Component {
    constructor(props) {
        super(props);
        this.pages = {
            AMDashboard: (<AMDashboard />),
            AMModel: (<AMModel setBreadcrumb={this.props.setBreadcrumb} />),
            AMInstance: (<AMInstance setBreadcrumb={this.props.setBreadcrumb} />),
            AMContract: (<AMContract setBreadcrumb={this.props.setBreadcrumb} />),
        }
    }

    renderPage = () => {
        const pageContengt = this.pages[this.props.page];
        if (pageContengt) {
            return pageContengt;
        }

        return (
            <ComingSoon />
        );
    }

    render() {
        // console.log('AMContent', this.props.page);
        const page = this.renderPage();

        return (
            <div style={{ width: '100%', minHeight: 400 }}>
                {page}
            </div>
        );
    }

}

export default AMContent;