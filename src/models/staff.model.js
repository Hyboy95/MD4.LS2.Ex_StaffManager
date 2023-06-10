const baseModel = require("./base.model");

class StaffModel {
    static async getStaffQuantity() {
        let sql = `SELECT count(id) as totalStaff FROM Staffs`;
        return baseModel.querySql(sql);
    }

    static async getLimitStaff(size, startWith) {
        let sql = `CALL getLimitStaff(${size}, ${startWith})`;
        return baseModel.querySql(sql);
    }
    
    static async addStaff(name, age, department, avatar) {
        let sql = `INSERT INTO Staffs(name, age, department, avatar)
        values ('${name}', ${age}, ${department}, '${avatar}')`;
        await baseModel.querySql(sql);
    }

    static async deleteStaffByID(id) {
        let sql = `DELETE FROM Staffs WHERE id = ${id}`;
        await baseModel.querySql(sql);
    }

    static async getDetailStaff(id) {
        let sql = `CALL getDetailStaff(${id})`;
        return baseModel.querySql(sql);
    }
    static async updateStaffByID(id, name, age, department, avatar) {
        let sql = `UPDATE Staffs
        SET name = '${name}', age = ${age}, department = ${department}, avatar = '${avatar}'
        WHERE id = ${id}`;
        await baseModel.querySql(sql);
    }

    static async getAvatarStaff(id) {
        let sql = `SELECT avatar FROM Staffs WHERE id = ${id}`;
        return baseModel.querySql(sql);
    }

}

module.exports = StaffModel;