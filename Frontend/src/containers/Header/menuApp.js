export const adminMenu = [
    { //quản lý ngdùng
        name: 'menu.admin.user-manage', menus: [
            // {
            //     name: 'menu.admin.admin-manage', link: '/system/admin-manage',
            //     subMenus: [
            //         { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //         { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            //     ]
            // },
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.doctor-manage', link: '/system/doctor-manage'
            },
            { //quản lý kế hoạch khám bệnh của bác sĩ
                name: 'menu.doctor.schedule-manage', link: '/doctor/schedule-manage'
            },

        ]
    },

    { //quản lý phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.clinic-manage', link: '/system/clinic-manage',
            },
        ]
    },

    { //quản lý chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.specialty-manage', link: '/system/specialty-manage',
            },
        ]
    },

    { //quản lý cẩm nang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.handbook-manage', link: '/system/handbook-manage',
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.doctor.schedule-manage', menus: [
            {//quản lý kế hoạch khám bệnh của bác sĩ
                name: 'menu.doctor.schedule-manage', link: '/doctor/schedule-manage',

            },
            {//quản lý bệnh nhân của bác sĩ
                name: 'menu.doctor.patient-manage', link: '/doctor/patient-manage',

            },
        ]
    },
];