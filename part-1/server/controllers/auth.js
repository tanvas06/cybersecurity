const bcrypt = require(`bcrypt`)
const users = []

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existPw = bcrypt.compareSync(password, users[i].passHash)
        if (users[i].username === username && existPw) {

          let exisitingUser = {...users[i]}
          delete exisitingUser.passHash
          res.status(200).send(exisitingUser)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const {username, email, firstName, lastName, password, cPassword} = req.body
        // console.log('Registering User')
        // console.log(req.body)
        const salt = bcrypt.genSaltSync(6)
        const passHash = bcrypt.hashSync(password, salt)

        const newUser = {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          passHash,
          cPassword: cPassword
        }

        // users.push(req.body)
        users.push(newUser)

        let filtered = {...newUser}
        delete filtered.passHash

        // res.status(200).send(req.body)
        res.status(200).send(filtered)
    }
}