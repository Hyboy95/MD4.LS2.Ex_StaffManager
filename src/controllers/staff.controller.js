const StaffModel = require("../models/staff.model");

class StaffController {
    static async getDisplayPage(req, res) {
        const size = 3;
        let page = req.query.page ? +req.query.page : 1;
        let countStaff = await StaffModel.getStaffQuantity().catch(err => console.log(err.message));
        let totalStaff = countStaff[0].totalStaff;
        let totalPage = Math.ceil(totalStaff / size);
        let offset = (page - 1) * size;
        let dataPerPage = await StaffModel.getLimitStaff(size, offset).catch(err => console.log(err.message));
        res.render('index', {staffs: dataPerPage[0], totalPage: totalPage, pageCurrent: page});
    }

    static getCreateStaff(req, res) {
        res.render('create');
    }

    static async addStaff(req, res) {
        let {name, age, department} = req.body;
        let avatarUrl = '/upload/avatar.jpg';
        if (req.files) {
            let avatar = req.files.avatar;
            avatar.mv('./public/upload/' + avatar.name);
            avatarUrl = '/upload/' + avatar.name;
        }
        await StaffModel.addStaff(name, +age, department, avatarUrl).catch(err => console.log(err.message));
        res.redirect('/');
    }

    static async deleteStaff(req, res) {
        let {id, page} = req.query;
        if (id && page) {
            await StaffModel.deleteStaffByID(+id).catch(err => console.log(err.message));
            res.redirect(`/?page=${page}`);
        } else res.redirect('/');
    }

    static async getUpdatePage(req, res) {
        let {id, page} = req.query;
        if (id && page) {
            let data = await StaffModel.getDetailStaff(+id).catch(err => console.log(err.message));
            res.render('update', {staff: data[0][0], pageCurrent: page});
        } else res.redirect('/');
    }

    static async updateStaff(req, res) {
        let {id, page} = req.query;
        if (id && page) {
            let {name, age, department} = req.body;
            let avatarUrl;
            if (req.files) {
                let avatar = req.files.avatar;
                avatar.mv('./public/upload/' + avatar.name);
                avatarUrl = '/upload/' + avatar.name;
            } else {
                let image = await StaffModel.getAvatarStaff(+id).catch(err => console.log(err.message));
                avatarUrl = image[0].avatar;
            }
            await StaffModel.updateStaffByID(+id, name, +age, +department, avatarUrl).catch(err => console.log(err.message));
            res.redirect(`/?page=${page}`); 
        } else res.redirect('/');
    }
}

module.exports = StaffController;