import { con } from '../config/connect.js'
import { User, sequelize } from '../model/user.js'
import { plans } from '../util/account-plane.util.js'
import generateToken from '../util/generateToken.js'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {

    let { email, password } = req.body

    let user = await User.findOne({ where: { email: email } })


    if (user) {

        let response = await bcrypt.compare(password, user.password)
        if (response) {

            return res.json({
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                token: generateToken(user.user_id)
            })
        }

    }
    res.status(400).json({
        message: "Invalid credentials"
    }
    )
}





export const registration = async (req, res) => {

    let { name, email, phone, password } = req.body
    // let first = con.query("insert into registration values(name,email,phone,password) ")
    console.log(name, email, phone, password)

    let user = await User.findOne({ where: { email: email } })
    if (!user) {

        password = await bcrypt.hash(password, 10)
        console.log(password)
        sequelize.sync().then(function () {
            return User.create({
                phone: phone,
                name: name,
                email: email,
                password: password,
                plan: 'Silver'
            });
        }).then(function (user) {
            res.json(user.get({
                plain: true,
                token: generateToken(user)
            }))
        });

    } else {
     
        res.json({
            user: "already Exist"
        })
    }
}

export const upgradePlan = async (req, res) => {

    const { userId } = req.params
    let user = await User.findOne({ where: { user_id: userId } })

    if (plans[user.plan]) {
        user.plan = plans[user.plan]

    } else {
        return res.status(404).json({
            messsage: "Already at the topmost level"
        })
    }

    const updatedUser = await user.save()
    res.json(updatedUser)

}

export const getUserDetails = async (req, res) => {

    res.json(req.user)
}

