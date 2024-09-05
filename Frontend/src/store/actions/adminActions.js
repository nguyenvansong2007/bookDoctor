import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctorsService, saveDetailDoctorService,
    getAllSpecialtyService, getAllClinicService
} from '../../services/userService';
import { toast } from 'react-toastify';

//fetch gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail())
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error', error)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

//fetch position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail())
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log('fetchPositionStart error', error)
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_SUCCESS
})

//fetch role
export const fetchRoleStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail())
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log('fetchRoleFail error', error)
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_SUCCESS
})

//create user
export const createNewUser = (data) => {

    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('check create user: ', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(createUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(createUserFail())
            }
        } catch (error) {
            dispatch(createUserFail());
            console.log('create new user error', error)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

//get all user
export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFail())
            }
        } catch (error) {
            toast.error("fetch users error!")
            dispatch(fetchGenderFail());
            console.log('fetch users error', error)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

//delete user
export const deleteUser = (userId) => {

    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log('check res>>>>>.', res)
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Delete the user error!")
                dispatch(deleteUserFail())
            }
        } catch (error) {
            toast.error("Delete the user error!")
            dispatch(deleteUserFail());
            console.log('delete user error', error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

//edit user
export const editUser = (data) => {

    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            console.log('check res>>>>>.', res)
            if (res && res.message.errCode === 0) {
                toast.success("Update the user succeed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Update the user error!")
                dispatch(editUserFail())
            }
        } catch (error) {
            toast.error("Update the user error!")
            dispatch(editUserFail());
            console.log('Update user error', error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

//fetch top doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
                })
            }
        } catch (e) {
            console.log('Fetch top doctors fail: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL
            })
        }
    }
}

//fetch All doctor
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
                })
            }

        } catch (e) {
            console.log('Fetch doctors fail: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL
            })
        }
    }
}

//save detail doctor
export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            console.log('check data>>>', data)
            console.log('check res>>>', res)
            if (res && res.errCode === 0) {
                toast.success("save detail doctor success!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {

                toast.error("save detail doctor error!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
                })
            }

        } catch (e) {
            toast.error("save detail doctor error!")
            console.log('save detail doctor fail: ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
            })
        }
    }
}

//fetch all hour
export const fetchAllScheduleTimes = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_FAIL
                })

            }
        } catch (e) {
            console.log('Fetch allcode schedule times: ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIMES_FAIL
            })
        }
    }
}

//fetch schedule price / payment / province
export const fetchRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialtyService();
            let resClinic = await getAllClinicService();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInfoFail())
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInfoFail());
            console.log('fetchGenderStart error', error)
        }
    }

}

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInfoFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL
})
