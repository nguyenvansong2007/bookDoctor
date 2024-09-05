import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allRequiredDoctorInfo: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state = { ...state }
            state.isLoadingGender = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.genders = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state = { ...state }
            state.genders = [];
            return {
                ...state,
            }

        //position
        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:

            state.positions = [];
            return {
                ...state,
            }

        //role
        case actionTypes.FETCH_ROLE_SUCCESS:

            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:

            state.roles = [];
            return {
                ...state,
            }

        //fetch user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:

            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:

            state.users = [];
            return {
                ...state,
            }

        //fetch top doctor
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:

            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:

            state.topDoctors = [];
            return {
                ...state,
            }

        //fetch all doctor
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:

            state.allDoctors = action.dataDr;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:

            state.allDoctors = [];
            return {
                ...state,
            }
        //fetch allcode schedule times
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_SUCCESS:

            state.allScheduleTimes = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_FAIL:

            state.allScheduleTimes = [];
            return {
                ...state,
            }
        //fetch required doctor info
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:

            state.allRequiredDoctorInfo = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL:

            state.allRequiredDoctorInfo = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;