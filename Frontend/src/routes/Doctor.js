import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ScheduleManage from '../containers/System/Doctor/ScheduleManage';
import Header from '../containers/Header/Header';
import PatientManage from '../containers/System/Doctor/PatientManage';

class Doctor extends Component {
    render() {

        const { isLoggedIn } = this.props;
        return (
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path='/doctor/schedule-manage' component={ScheduleManage} />
                            <Route path='/doctor/patient-manage' component={PatientManage} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
