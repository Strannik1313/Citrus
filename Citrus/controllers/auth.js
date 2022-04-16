module.exports.login = (req, res) => {
    res.status(200).json({
        login: {
            email: req.body
        }
    })
}

module.exports.register = (req, res) => {
    res.status(200).json({
        register: true
    })
}