import { utilMessage, utilError, utilData } from "../utils/message.js";
import axios from "axios";
import Nilai from "../models/nilai.js";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import Mata_Pelajaran from "../models/mata_pelajaran.js";

export const getProfesi = async(req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return utilMessage(res, 401, "Token invalid");
        jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) return utilMessage(res, 401, "Token expired");
            req.username = decoded.userUsername;
        });
        const username = req.username;
        // const cekNilai = await Nilai.findAll({
        //   where: { username },
        //   attributes: ["nilai"],
        //   distinct: true,
        //   order: [
        //     Sequelize.literal(`FIELD(mata_pelajaran,
        //             'indonesia',
        //             'biologi',
        //             'kimia',
        //             'fisika',
        //             'geo',
        //             'sosiologi',
        //             'ekonomi',
        //             'sejarah',
        //             'pkn',
        //             'kewirausahaan',
        //             'seni',
        //             'tik',	
        //             'inggris',
        //             'pai',
        //             'penjas'
        //         )`),
        //   ],
        // });
        // const nilaiMapel = cekNilai.map((result) => result.nilai);

        const resultMataPelajaran = await Mata_Pelajaran.findAll({
            attributes: ['kode_matapelajaran']
        })
        const dataMatapelajaran = []
        for (const kode in resultMataPelajaran) {
            dataMatapelajaran.push(resultMataPelajaran[kode].dataValues.kode_matapelajaran)
        }
        // const resultNilai = await 

        const { data } = await axios.post(
            "https://api-model-t7eb73gi3q-et.a.run.app/predict", {
                input: nilaiMapel,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return utilData(res, 200, data);
    } catch (error) {
        return utilError(res, error);
    }
};