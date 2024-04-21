import React from "react";

import AMInstanceList from './query';
import AMInstanceRgister from './register';
import AMInstanceView from './view';

class AMInstance extends React.Component {
    constructor(props) {
        super(props);
        this.state = { curPage: 'AMModelList', condition: '' };
    }

    nav = (curPage, info) => {
        console.log(curPage, info);
        this.setState({ curPage, info });
    }

    renderPage = () => {
        const { info } = this.state;
        switch (this.state.curPage) {
            case 'AMInstanceRgister':
                this.props.setBreadcrumb([
                    '物实例',
                    '注册'
                ]);
                return (<AMInstanceRgister nav={this.nav} info={info} />);
            case 'AMInstanceView':
                this.props.setBreadcrumb([
                    '物实例',
                    info.name
                ]);
                return (<AMInstanceView setBreadcrumb={this.props.setBreadcrumb} nav={this.nav} info={info} />);
            default:
                this.props.setBreadcrumb([
                    '物实例'
                ]);
                return (<AMInstanceList nav={this.nav} info={info} />);
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

export default AMInstance;