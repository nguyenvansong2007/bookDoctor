import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import DoctorManage from '../containers/System/Admin/DoctorManage';
import SpecialtyManage from '../containers/System/Specialty/SpecialtyManage';
import ClinicManage from '../containers/System/Clinic/ClinicManage';
import HandbookManage from '../containers/System/Admin/HandbookManage';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        console.log('check login', this.props)
        return (
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/doctor-manage" component={DoctorManage} />
                            <Route path="/system/specialty-manage" component={SpecialtyManage} />
                            <Route path="/system/clinic-manage" component={ClinicManage} />
                            <Route path="/system/handbook-manage" component={HandbookManage} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
