import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
const { Op } = require("sequelize");

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}

let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName || !data.selectedGenders) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required param'
                })
            } else {

                let token = uuidv4();

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        lastName: data.fullName,
                        gender: data.selectedGenders,
                        phonenumber: data.phoneNumber,
                        address: data.address,
                    },
                });

                //create a booking record
                if (user && user[0]) {
                    let booking = await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            [Op.or]: [
                                { statusId: 'S1' },
                                { statusId: 'S2' }
                            ]
                            // date: new Date(data.date).toLocaleDateString().slice(0, 19).replace('T', ' ')
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            reason: data.reason,
                            token: token
                        }
                    })
                    if (booking) {
                        //send email
                        await emailService.sendSimpleEmail({
                            receiverEmail: data.email,
                            patientName: data.fullName,
                            time: data.timeString,
                            doctorName: data.doctorName,
                            language: data.language,
                            redirectLink: buildUrlEmail(data.doctorId, token)

                        })

                        //delete scheduleTime
                        let schedule = await db.Schedule.findOne({
                            where: {
                                doctorId: data.doctorId,
                                timeType: data.timeType,
                                date: data.date,
                            },
                        })
                        if (schedule) {
                            await schedule.destroy();
                        }
                    }
                    resolve({
                        data: booking,
                        errCode: 0,
                        errMessage: 'Create patient and booking success!'
                    })
                }

            }
        } catch (e) {
            reject(e);
        }
    })
}

let postVerifyBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Confirm the appointment success!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'The appointment has been activated or does not exist!'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointmentService,
    buildUrlEmail,
    postVerifyBookAppointmentService
}