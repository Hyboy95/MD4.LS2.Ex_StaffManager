const mysql = require('mysql');

class Database {
    constructor() {
        this.host = 'localhost',
        this.user = 'root',
        this.password = '123456',
        this.database = 'EmployeeManager',
        this.charset = 'utf8_general_ci'
    }

    connect() {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            charset: this.charset
        })
    }
}

module.exports = new Database();