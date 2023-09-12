import Mata_Pelajaran from '../models/mata_pelajaran.js'
import { utilMessage, utilError, utilData } from '../utils/message.js'
import { v4 as uuidv4 } from 'uuid';

export const createMataPelajaran = async(req, res) => {
    try {
        const {
            mata_pelajaran,
            link_foto = 'https://th.bing.com/th/id/OIP.yn9tVHjmYVXLzHHKE0EVcwHaFZ?pid=ImgDet&rs=1'
        } = req.body
        const kode_matapelajaran = uuidv4()
        const postmataPelajaran = await Mata_Pelajaran.create({ kode_matapelajaran, mata_pelajaran, link_foto })
        if (postmataPelajaran) return utilMessage(res, 200, 'Post Mata Pelajaran berhasil')
        return utilMessage(res, 403, 'Post mata pelajaran gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const showMataPelajaran = async(req, res) => {
    try {
        const cekmataPelajaran = await Mata_Pelajaran.findAll()
        if (!cekmataPelajaran) return utilMessage(res,400, 'mata pelajaran gagal ditampilkan')
        return utilData(res,200,cekmataPelajaran)
    }catch (error) {
        return utilError(res, error)
    }
}

export const editMataPelajaran = async(req, res) => {
    try {
        const {
            mata_pelajaran,
            kelas
        } = req.body
        const cekmataPelajaran = await Mata_Pelajaran.findOne({ where: { mata_pelajaran }})
        if (!cekmataPelajaran) return utilMessage(res,400, 'mata pelajaran tidak ada')
        const editmataPelajaran = await Mata_Pelajaran.edit({mata_pelajaran: mata_pelajaran, kelas: kelas},{ where: { mata_pelajaran } })
        if (editmataPelajaran) return utilMessage(res, 200, 'Edit mata pelajaran berhasil')
        return utilMessage(res, 403, 'Editmata pelajaran gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const deleteMataPelajaran = async(req, res) => {
    try {
        const {
        mata_pelajaran
        } = req.body
        const cekmataPelajaran = await Mata_Pelajaran.findOne({ where: { mata_pelajaran }})
        if (!cekmataPelajaran) return utilMessage(res,400, 'mata pelajaran tidak ada')
        const deletemataPelajaran = await Mata_Pelajaran.delete({ where: { mata_pelajaran } })
        if (deletemataPelajaran) return utilMessage(res, 200, 'Post mata pelajaran berhasil')
        return utilMessage(res, 403, 'Post mata pelajaran gagal')
    }catch (error) {
        return utilError(res, error)
    }
}