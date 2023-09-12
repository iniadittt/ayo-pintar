import Nilai from '../models/nilai.js'
import Mata_Pelajaran from '../models/mata_pelajaran.js'
import { utilMessage, utilError, utilData } from '../utils/message.js'
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from 'sequelize';

export const createNilai = async(req, res) => {
    try {
        const {
            nilai,
            username,
            mata_pelajaran
        } = req.body
        const kode_nilai = uuidv4()
        const postNilai = await Nilai.create({ kode_nilai, nilai, username, mata_pelajaran })
        if (postNilai) return utilMessage(res, 200, 'Post Nilai berhasil')
        return utilMessage(res, 403, 'Post Nilai gagal')
    } catch (error) {
        return utilError(res, error)
    }
}

export const showNilai = async(req, res) => {
    try {
        const {
            kode_nilai
        } = req.body
        const cekNilai = await Nilai.findOne({ where: { kode_nilai } })
        if (!cekNilai) return utilMessage(res, 400, 'Nilai tidak ada')
        if (cekNilai) return res.status(200).json({
            status: true,
            username: Nilai.username,
            mata_pelajaran: Nilai.mata_pelajaran,
            nilai: Nilai.nilai,
        })
        return utilMessage(res, 403, 'Nilai gagal ditampilkan')
    } catch (error) {
        return utilError(res, error)
    }
}
export const showTertinggi = async(req, res) => {
    //mengambil 3 matpel berdasarkan nilai tertinggi dari username
    try {
        const {
            username
        } = req.body
            //const cekNilai = await Sequelize.query("SELECT * FROM `Nilai` ORDER BY `nilai` DESC LIMIT 3", { type: QueryTypes.SELECT })
            // const cekNilai = await Nilai.findAll({
            //     order: [Sequelize.literal('max(nilai) DESC')] , 
            //     limit: 4,
            //     where: {username}
            //     }
            //   )
        const cekNilai = await Nilai.findAll({
                where: { username },
                attributes: ['mata_pelajaran'],
                distinct: true,
                order: [
                    ['nilai', 'DESC']
                ],
                limit: 3,
            })
            .then((results) => {
                const nilaiTertinggi = results.map((result) => result.mata_pelajaran);
                console.log(nilaiTertinggi);
                return utilData(res, 200, { nilaiTertinggi })
            })
            .catch((error) => {
                return utilError(res, error)
            });
        if (!cekNilai) return utilMessage(res, 400, 'Nilai tidak ada')

    } catch (error) {
        return utilError(res, error)
    }
}
export const showTerendah = async(req, res) => {
    //mengambil 7 matpel berdasarkan nilai terendah dari username
    try {
        const {
            username
        } = req.body
        const cekNilai = await Nilai.findAll({
                where: { username },
                attributes: ['mata_pelajaran'],
                distinct: true,
                order: [
                    ['nilai']
                ],
                limit: 5,
            })
            .then((results) => {
                const nilaiTerendah = results.map((result) => result.mata_pelajaran);
                utilData(res, 200, { nilaiTerendah })
            })
            .catch((error) => {
                return utilError(res, error)
            });
        if (!cekNilai) return utilMessage(res, 400, 'Nilai tidak ada')
    } catch (error) {
        return utilError(res, error)
    }
}
export const showAll = async(req, res) => {
    //mengambil semua nilai berdasarkan username
    try {
        const {
            username
        } = req.body
        const cekNilai = await Nilai.findAll({ where: { username } })
        if (!cekNilai) return utilMessage(res, 400, 'Nilai tidak ada')
        return utilData(res, 200, { cekNilai })
    } catch (error) {
        return utilError(res, error)
    }
}

export const showHistory = async(req, res) => {
    try {
        const {
            username
        } = req.body
        const cekNilai = await
            //Nilai.findAll({
            //     where: { username },
            //     order: [['updatedAt', 'DESC']],
            //     limit: 3
            //   })
            //     .then((results) => {
            //       const dataTerbaru = results.map((result) => ({
            //         mata_pelajaran: result.mata_pelajaran,
            //         nilai: result.nilai,
            //         tanggal: result.tanggal
            //       }));

        //       console.log(`3 data terbaru untuk pengguna ${username}:`, dataTerbaru);
        //     })
        //     .catch((error) => {
        //       console.error('Terjadi kesalahan:', error);
        //     });
            Nilai.findAll({
                where: { username },
                attributes: ['mata_pelajaran', 'nilai'],
                order: [
                    ['updatedAt', 'DESC']
                ],
                group: ['mata_pelajaran'],
            })
            .then((results) => {
                const nilaiTerbaruPerMapel = [];

                results.forEach((result) => {
                    const mapel = result.mata_pelajaran;

                    if (!nilaiTerbaruPerMapel[mapel]) {
                        nilaiTerbaruPerMapel[mapel] = [];
                    }
                    if (nilaiTerbaruPerMapel[mapel].length < 3) {
                        console.log(result.nilai)
                        nilaiTerbaruPerMapel[mapel].push(result.nilai);
                    }
                    //   if (nilaiTerbaruPerMapel[mapel].length < 3) {
                    //     for(var i = 0; i < nilaiTerbaruPerMapel[mapel].length; i++){
                    //         nilaiTerbaruPerMapel[mapel].push(result.nilai)
                    //     }
                    //   }
                });
                return utilData(res, 200, { nilaiTerbaruPerMapel })
            })
            .catch((error) => {
                console.error('Terjadi kesalahan:', error);
            });
        if (!cekNilai) return utilMessage(res, 400, 'Nilai tidak ada')
    } catch (error) {
        return utilError(res, error)
    }
}

export const editNilai = async(req, res) => {
    try {
        const {
            nilai,
            username,
            mata_pelajaran
        } = req.body
        const cekNilai = await Nilai.findOne({ where: { username, mata_pelajaran } })
        if (!cekNilai) return utilMessage(res, 400, 'Nilai tidak ada')
        const editNilai = await Nilai.edit({ username: username, nilai: nilai, mata_pelajaran: mata_pelajaran }, { where: { username, mata_pelajaran } })
        if (editNilai) return utilMessage(res, 200, 'Edit Nilai berhasil')
        return utilMessage(res, 403, 'Edit Nilai gagal')
    } catch (error) {
        return utilError(res, error)
    }
}

export const deleteNilai = async(req, res) => {
    try {
        const {
            username,
            mata_pelajaran
        } = req.body
        const cekNilai = await Nilai.findOne({ where: { username, mata_pelajaran } })
        if (!cekNilai) return utilMessage(res, 400, 'Nilai tidak ada')
        const deleteNilai = await Nilai.delete({ where: { username, mata_pelajaran } })
        if (deleteNilai) return utilMessage(res, 200, 'Post Nilai berhasil')
        return utilMessage(res, 403, 'Post Nilai gagal')
    } catch (error) {
        return utilError(res, error)
    }
}