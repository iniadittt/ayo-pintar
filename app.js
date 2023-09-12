import express from 'express'
import dotenv from 'dotenv'
import { database } from './config/connection.js'
import ayoPintar from './routes/app.js'
import User from './models/user.js'
import Soal from './models/soal.js'
import Nilai from './models/nilai.js'
import Mata_Pelajaran from './models/mata_pelajaran.js'

dotenv.config()
database()

const app = express()
const PORT = process.env.PORT || 5000

// try {
//     await User.sync({ force: true })
//     await Nilai.sync({ force: true })
//     await Soal.sync({ force: true })
//     await Mata_Pelajaran.sync({ force: true })
// } catch (error) {
//     console.log(`error : ${error.message}`)
// }

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(ayoPintar)

app.listen(PORT, () => console.log(`Server berjalan pada port: ${PORT}`))