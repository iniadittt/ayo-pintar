import { utilMessage, utilError, utilData } from '../utils/message.js'
import axios from 'axios'
import Nilai from '../models/nilai.js'
import Soal from '../models/soal.js'
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';

export const getAnswer = async(req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return utilMessage(res, 401, 'Token invalid')
        jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) return utilMessage(res, 401, 'Token expired')
            req.username = decoded.userUsername
        })
        const username = req.username
        const { kode_soal, soal, jawaban} = req.body

      const dataJawaban = await Soal.findOne({
        where: {
          kode_soal
        }
      })
      console.log(dataJawaban)
    if(!dataJawaban) return utilMessage(res,404,'Data jawaban tidak ada')
    const predict = {
      data: dataJawaban.jawaban,
      answer: jawaban}
    const { data } = await axios.post(
      "https://api-model-sentences-t7eb73gi3q-et.a.run.app/predict",
         predict,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = parseInt(data.result*100)
    const kode_nilai = uuidv4()
    const updatedNilai = Nilai.create({ nilai: result, kode_nilai, mata_pelajaran: dataJawaban.mata_pelajaran, username })
    if (!updatedNilai) return utilMessage(res, 400, 'Nilai gagal ditambahkan')
    return utilData(res, 200, result)
    // axios(config)
    //   .then((response) => {
    //     for (let i = 0; i < hasil.length; i++) {
    //       const updatedNilai = Nilai.update({ nilai: response.data }, { where: { username, mata_pelajaran } })
    //       if (!updatedNilai) return utilMessage(res, 400, 'Nilai gagal diunggah')
    //       }
    //         return utilData(res, 200, response.data)
    //   })
    //   .catch((error) => {
    //   return utilError(res, error)
    //   })
    // axios.post('https://api-model-sentences-t7eb73gi3q-et.a.run.app/', res.json(hasil))
    // .then((response) => {
    //   for (let i = 0; i < response.length; i++) {
    //   const updatedNilai = Nilai.save({ nilai: data.nilai }, { where: { username, mata_pelajaran: mata_pelajaran } })
    //   if (!updatedNilai) return utilMessage(res, 400, 'Nilai gagal diunggah')
    //   }
    //     return utilData(res, 200, response.data)
    // })
    // .catch((error) => {
    // return utilError(res, error)
    // })
  }catch (error) {
        return utilError(res, error)
    }}