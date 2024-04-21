import React from "react";

import AMModelList from './query';
import AMModelCreate from './create';

class AMModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { curPage: 'AMModelList', condition: '' };
    }

    nav = (curPage) => {
        console.log(curPage);
        this.setState({ curPage });
    }

    renderPage = () => {
        switch (this.state.curPage) {
            case 'AMModelCreate':
                this.props.setBreadcrumb([
                    '物模型',
                    '新增'
                ]);
                return (<AMModelCreate nav={this.nav} />);
            default:
                this.props.setBreadcrumb([
                    '物模型'
                ]);
                return (<AMModelList nav={this.nav} />);
        }

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

export default AMModel;