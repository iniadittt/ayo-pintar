import express from 'express'
import { register, login, forgotPassword, resetPassword, changePassword, getProfile } from '../controllers/user.js'
import { runValidation, validationRegister } from '../utils/validation.js'
import { createMataPelajaran, showMataPelajaran, deleteMataPelajaran, editMataPelajaran } from "../controllers/mata_pelajaran.js"
import { createNilai, showNilai, deleteNilai, editNilai, showTertinggi, showTerendah, showAll, showHistory } from '../controllers/nilai.js'
import { createSoal, showSoal, deleteSoal, editSoal } from '../controllers/soal.js'
import { authenticateToken } from '../controllers/verification.js'
import { getProfesi } from '../controllers/profesi.js'
import { getAnswer } from '../controllers/sentence.js'

const ayoPintar = express.Router()

ayoPintar.post('/register', validationRegister, runValidation, register)
ayoPintar.post('/login', login)
ayoPintar.post('/forgotPassword', forgotPassword)
ayoPintar.post('/profile', authenticateToken, getProfile)
ayoPintar.put('/resetPassword/:token', resetPassword)
ayoPintar.put('/changePassword/',authenticateToken, changePassword)

ayoPintar.get('/mataPelajaran', authenticateToken, showMataPelajaran)
ayoPintar.post('/mataPelajaran', authenticateToken, createMataPelajaran)
ayoPintar.delete('/mataPelajaran', authenticateToken, deleteMataPelajaran)
ayoPintar.put('/mataPelajaran', authenticateToken, editMataPelajaran)

ayoPintar.get('/nilai', authenticateToken, showNilai)
ayoPintar.post('/nilai', authenticateToken, createNilai)
ayoPintar.delete('/nilai', authenticateToken, deleteNilai)
ayoPintar.put('/nilai', authenticateToken, editNilai)
ayoPintar.get('/nilaiTertinggi', authenticateToken, showTertinggi)
ayoPintar.get('/nilaiTerendah', authenticateToken, showTerendah)
ayoPintar.get('/allNilai', authenticateToken, showAll)
ayoPintar.get('/historyNilai', authenticateToken, showHistory)

ayoPintar.get('/soal/:mata_pelajaran', authenticateToken, showSoal)
ayoPintar.post('/soal', authenticateToken, createSoal)
ayoPintar.delete('/soal', authenticateToken, deleteSoal)
ayoPintar.put('/soal', authenticateToken, editSoal)

ayoPintar.post('/profesi', getProfesi)
ayoPintar.post('/sentence', getAnswer)

export default ayoPintar