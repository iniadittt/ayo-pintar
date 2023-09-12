import Soal from '../models/soal.js'
import { utilMessage, utilError, utilData } from '../utils/message.js'
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from 'sequelize';


export const createSoal = async(req, res) => {
    try {
        const {
            soal,
            jawaban,
            mata_pelajaran
        } = req.body
        console.log(soal)
        const kode_soal = uuidv4()
        const postSoal = await Soal.create({ kode_soal, soal, jawaban, mata_pelajaran })
        if (postSoal) return utilMessage(res, 200, 'Post soal berhasil')
        return utilMessage(res, 403, 'Post soal gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const showSoal = async(req, res) => {
    try {
        const{
            mata_pelajaran
        } = req.params
        const soal = await Soal.findOne({
            where: {mata_pelajaran: mata_pelajaran},
            attributes: ['kode_soal','soal'],
            order: Sequelize.literal('RAND()'), // Menggunakan fungsi RAND() untuk pengurutan acak
          });
        if (!soal) return utilMessage(res,400, 'Soal tidak ada')
        return utilData(res,200, {soal})

    }catch (error) {
        return utilError(res, error)
    }
}

export const editSoal = async(req, res) => {
    try {
        const {
            soal,
            jawaban,
            mata_pelajaran
        } = req.body
        const cekSoal = await Soal.findOne({ where: { soal }})
        if (!cekSoal) return utilMessage(res,400, 'Soal tidak ada')
        const editSoal = await Soal.edit({soal: soal, jawaban: jawaban, mata_pelajaran: mata_pelajaran},{ where: { soal } })
        if (editSoal) return utilMessage(res, 200, 'Edit soal berhasil')
        return utilMessage(res, 403, 'Edit soal gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const deleteSoal = async(req, res) => {
    try {
        const {
            soal
        } = req.body
        const cekSoal = await Soal.findOne({ where: { soal }})
        if (!cekSoal) return utilMessage(res,400, 'Soal tidak ada')
        const deleteSoal = await Soal.delete({ where: { soal } })
        if (deleteSoal) return utilMessage(res, 200, 'Post soal berhasil')
        return utilMessage(res, 403, 'Post soal gagal')
    }catch (error) {
        return utilError(res, error)
    }
}