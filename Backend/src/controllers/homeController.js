import { json } from 'body-parser';
import db from '../models/index';
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log('-------------')
        // console.log(data)
        // console.log('.............')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}

//hiển thị
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

//tạo user
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('Tạo mới thành công')
}

//hiển thị
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log('----------------')
    // console.log(data)
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

//edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check userId not found

        // console.log(userData)
        return res.render('editCRUD.ejs',
            {
                userData: userData
            });
    }
    else {
        return res.send('user not found!')
    }
}

//put
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

//delete
let deleteCRUD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete user success!')
    }
    return res.send('User not found!')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}