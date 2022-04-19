module.exports = class User {
    constructor(email, password) {
       this.email = email,
       this.password = password
    }
}


// email: {
//     type: String,
//         required: true,
//             unique: true
// },
// password: {
//     type: String,
//         required: true,
//     }