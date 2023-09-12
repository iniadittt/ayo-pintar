import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { utilMessage, utilData, utilError } from '../utils/message.js'
import bcrypt from 'bcrypt'
import { kirimEmail } from '../utils/nodemailer.js'

export const register = async(req, res) => {
    try {
        const {
            username,
            password,
            confirmPassword,
            nama,
            namaSekolah = null, // optional
            email,
            foto = 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1'
        } = req.body
        const dataUser = await User.findOne({ where: { username } })
        if (dataUser) return utilMessage(res, 400, 'Username sudah digunakan')
            // cek, apakah nomer tlpn valid? +62821 OK / +50? OK ATAU GAGAL?
        
        //if (cekEmail===false) return (res, 400, 'Email tidak valid')
        const dataEmail = await User.findOne({ where: { email } })
        if(dataEmail) return utilMessage(res, 400, 'Email sudah digunakan')
        const matchPassword = password === confirmPassword ? true : false
        if (!matchPassword) return utilMessage(res, 400, 'Password dan Confirm password tidak sesuai')
        const saltRound = Number(process.env.SALT_ROUND) || 10
        const hashPassword = await bcrypt.hash(password, saltRound)
        const postUser = await User.create({ username, password: hashPassword, nama, namaSekolah, foto, email })
        if (postUser) return utilMessage(res, 200, 'Registrasi berhasil')
        return utilMessage(res, 403, 'Registrasi gagal, Access ditolak')
    } catch (error) {
        return utilError(res, error)
    }
}
export const getProfile = async(req, res) => {
    try {
        const { username } = req.body
        const dataUser = await User.findOne({ where: { username } })
        return utilData(res, 200, dataUser)
    } catch (error) {
        return utilError(res, error)
    }
}
export const login = async(req, res) => {
    try {
        const { username, password } = req.body
        const dataUser = await User.findOne({ where: { username } })
        if (!dataUser) return utilMessage(res, 404, 'Username/password salah')
        const userUsername = dataUser.username
        const userPassword = dataUser.password
        const matchPassword = await bcrypt.compare(password, userPassword)
        if (!matchPassword) return utilMessage(res, 404, 'Username/password salah')
        const accessToken = jwt.sign({ userUsername }, process.env.PRIVATE_KEY)
        return utilData(res, 200, { accessToken })
    } catch (error) {
        return utilError(res, error)
    }
}

export const forgotPassword = async(req,res) => {
    try{
        const { email } = req.body
        
        const user = await User.findOne({ where: { email } })
        if (!user) return utilMessage(res, 404, 'Email tidak tersedia')
        
        const token = jwt.sign({
            username: user.dataValues.username
        }, process.env.PRIVATE_KEY)
  
        const templateEmail = {
            from: 'Ayo Pintar',
            to: email,
            subject: 'Link Reset Password',
            html: `<p>Silahkan klik link dibawah untuk reset password </p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
        }

        await kirimEmail(templateEmail)

        return res.status(200).json({
            status: true,
            message: "Link reset password berhasil dikirim"
        })
    }catch(error){
        return utilError(res, error)
    }
}

export const resetPassword = async(req,res) => {
    const { password} = req.body
    const { token } = req.params
    
    const user = jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
        if (error) return utilMessage(res, 401, 'Token expired')
        return decoded.userUsername
    })

    if(user){
        const saltRound = Number(process.env.SALT_ROUND) || 10
        const hashPassword = await bcrypt.hash(password, saltRound)
        const updatedUser = await User.update({ password: hashPassword }, { where: { username: user } })
        if (updatedUser.length === 0) return utilMessage(res, 400, 'Password gagal diubah')
        return res.status(200).json({
            status: true,
            message: 'Password berhasil diganti'
        })
     }
}

export const changePassword = async(req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body
        const username = req.username
        if (newPassword !== confirmNewPassword) return utilMessage(res, 400, 'Password dan Confirm Password tidak sesuai')
        const user = await User.findOne({ where: { username } })
        if (!user) return utilMessage(res, 400, 'User tidak ditemukan')
        const userPassword = await user.dataValues.password
        const matchPassword = await bcrypt.compare(oldPassword, userPassword)
        if (!matchPassword) return utilMessage(res, 400, 'Password salah')
        const saltRound = Number(process.env.SALT_ROUND) || 10
        const hashPassword = await bcrypt.hash(newPassword, saltRound)
        const updatedUser = await User.update({ password: hashPassword }, { where: { username } })
        if (updatedUser.length === 0) return utilMessage(res, 400, 'Password gagal diubah')
        return utilMessage(res, 200, 'Password berhasil diubah')
    } catch (error) {
        return utilError(res, error)
    }
}