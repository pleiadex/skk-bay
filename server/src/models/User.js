const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user) {
    const SALT_FACTOR = 8
    
    if (!user.changed('password')) {
        return ;
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        name: {
            type: DataType.STRING,
            primaryKey: true
        },
        password: DataType.STRING,
        phonenumber: DataType.STRING,
        isAdmin: DataType.BOOLEAN
    }, 
    {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        },
        timestamps: false
    })
    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }
    return User
}
