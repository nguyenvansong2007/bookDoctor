import axios from '../axios'

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctors`, data)
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointmentService = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)

}
const postVerifyBookAppointmentService = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createSpecialtyService = (data) => {
    return axios.post(`/api/create-specialty`, data)
}

const getAllSpecialtyService = () => {
    return axios.get('/api/get-all-specialty')

}
const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createClinicService = (data) => {
    return axios.post(`/api/create-clinic`, data)
}

const getAllClinicService = () => {
    return axios.get('/api/get-all-clinic')
}

const getDetailClinicByIdService = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getListPatientService = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}

const getMedicalHistoryService = (data) => {
    return axios.get(`/api/get-medical-history?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedyService = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

const postCancelStatusService = (data) => {
    return axios.post('api/post-cancel-status', data)
}

export {
    handleLogin,
    getAllUsers,
    getAllCodeService,
    createNewUserService,
    deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctorsService,
    saveDetailDoctorService, getDetailInfoDoctor,
    saveBulkScheduleDoctor,
    getScheduleByDateService,
    getExtraInfoDoctorByIdService,
    getProfileDoctorByIdService,
    postPatientBookAppointmentService,
    postVerifyBookAppointmentService,
    createSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyByIdService,
    createClinicService,
    getAllClinicService,
    getDetailClinicByIdService,
    getListPatientService, getMedicalHistoryService,
    postSendRemedyService, postCancelStatusService,
}