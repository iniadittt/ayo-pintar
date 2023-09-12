-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jun 2023 pada 16.48
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ayopintar`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `mata_pelajaran`
--

CREATE TABLE `mata_pelajaran` (
  `id` int(11) NOT NULL,
  `kode_matapelajaran` varchar(255) DEFAULT NULL,
  `mata_pelajaran` varchar(255) DEFAULT NULL,
  `link_foto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `mata_pelajaran`
--

INSERT INTO `mata_pelajaran` (`id`, `kode_matapelajaran`, `mata_pelajaran`, `link_foto`, `createdAt`, `updatedAt`) VALUES
(1, '0116c474-e7be-40ca-9091-014e280c2a65', 'indonesia', 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1', '2023-06-14 16:57:41', '2023-06-14 16:57:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `nilai`
--

CREATE TABLE `nilai` (
  `id` int(11) NOT NULL,
  `kode_nilai` varchar(255) DEFAULT NULL,
  `mata_pelajaran` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `nilai`
--

INSERT INTO `nilai` (`id`, `kode_nilai`, `mata_pelajaran`, `username`, `nilai`, `createdAt`, `updatedAt`) VALUES
(1, '9920d542-3e6d-4102-8767-ba5af8723e06', '0116c474-e7be-40ca-9091-014e280c2a65', 'ray1', 95, '2023-06-15 15:52:25', '2023-06-15 15:52:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `soal`
--

CREATE TABLE `soal` (
  `id` int(11) NOT NULL,
  `kode_soal` varchar(255) DEFAULT NULL,
  `mata_pelajaran` varchar(255) DEFAULT NULL,
  `soal` varchar(255) DEFAULT NULL,
  `jawaban` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `soal`
--

INSERT INTO `soal` (`id`, `kode_soal`, `mata_pelajaran`, `soal`, `jawaban`, `createdAt`, `updatedAt`) VALUES
(1, 'd0deab3e-1a2e-4b64-9e99-5bec7b1d5458', '0116c474-e7be-40ca-9091-014e280c2a65', 'Apakah tujuan dari teks negosiasi?', 'Tujuan teks negosiasi adalah untuk mencapai kesepakatan bersama antara dua belah pihak yang memiliki kepentingan berbeda.', '2023-06-14 16:58:35', '2023-06-14 16:58:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `namaSekolah` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `resetPasswordLink` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `nama`, `namaSekolah`, `foto`, `email`, `resetPasswordLink`, `createdAt`, `updatedAt`) VALUES
(1, 'ray1', '$2b$10$zVYlJ5.LjmLyX/wLv/A5tutVW9qGxIwhaiovzd2aagrpRtERoJ1Km', 'ray', 'SMA ', 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1', 'ray@md.com', '', '2023-06-15 15:05:55', '2023-06-15 15:05:55');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `mata_pelajaran`
--
ALTER TABLE `mata_pelajaran`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_matapelajaran` (`kode_matapelajaran`),
  ADD UNIQUE KEY `mata_pelajaran` (`mata_pelajaran`);

--
-- Indeks untuk tabel `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_nilai` (`kode_nilai`);

--
-- Indeks untuk tabel `soal`
--
ALTER TABLE `soal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_soal` (`kode_soal`),
  ADD UNIQUE KEY `soal` (`soal`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `mata_pelajaran`
--
ALTER TABLE `mata_pelajaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `nilai`
--
ALTER TABLE `nilai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `soal`
--
ALTER TABLE `soal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
