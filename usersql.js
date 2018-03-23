module.exports = {
    UserSQL:{
        insert:'INSERT INFO User(uid,userName) VALUES(?,?)',
        queryAll:'SELECT * FROM User',
        getUserById:'SELECT * FROM User WHERE uid = ?'
    }
};