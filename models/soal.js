import { Sequelize } from "sequelize";
import { db } from '../config/database.js'
import Mata_Pelajaran from "./mata_pelajaran.js";
const { DataTypes } = Sequelize

const Soal = db.define('soal', {
    kode_soal: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    mata_pelajaran: {
        type: DataTypes.STRING,
        required: true,
        FOREIGNKEYS: true,
        references: Mata_Pelajaran.kode_matapelajaran
    },
    soal: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
    },
    jawaban: {
        type: DataTypes.STRING,
        required: true,
    },
}, {
    freezeTableName: true
})

export default Soal