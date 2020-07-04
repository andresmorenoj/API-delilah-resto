-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 04, 2020 at 07:04 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Delilah_Resto`
--

-- --------------------------------------------------------

--
-- Table structure for table `estados`
--

CREATE TABLE `estados` (
  `idEstado` int(11) NOT NULL,
  `nuevo` tinyint(1) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `preparacion` tinyint(1) DEFAULT NULL,
  `enviando` tinyint(1) DEFAULT NULL,
  `entregado` tinyint(1) DEFAULT NULL,
  `cancelado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estados`
--

INSERT INTO `estados` (`idEstado`, `nuevo`, `confirmado`, `preparacion`, `enviando`, `entregado`, `cancelado`) VALUES
(1, 1, 0, 0, 0, 0, 0),
(2, 0, 1, 0, 0, 0, 0),
(3, 0, 0, 1, 0, 0, 0),
(4, 0, 0, 0, 1, 0, 0),
(5, 0, 0, 0, 0, 1, 0),
(6, 0, 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pago`
--

CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL,
  `efectivo` tinyint(1) DEFAULT NULL,
  `tarjeta` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pago`
--

INSERT INTO `pago` (`idPago`, `efectivo`, `tarjeta`) VALUES
(1, 1, 0),
(2, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `plato`
--

CREATE TABLE `plato` (
  `idPlato` int(11) NOT NULL,
  `nombreLargo` varchar(30) NOT NULL,
  `nombreCorto` varchar(10) NOT NULL,
  `foto` varchar(200) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `plato`
--

INSERT INTO `plato` (`idPlato`, `nombreLargo`, `nombreCorto`, `foto`, `precio`) VALUES
(1, 'Pollo frito con papitas', 'pollo f p', 'https://static3.depositphotos.com/1000363/104/i/450/depositphotos_1040616-stock-photo-chicken-and-french-fries.jpg', 8500),
(2, 'Lasagnia Vegetariana', 'Lasg veg', 'https://dam.cocinafacil.com.mx/wp-content/uploads/2018/10/lasana-vegetariana-.jpg', 10500),
(3, 'Lasagnia Carnivora', 'Lasg car', 'https://t1.rg.ltmcdn.com/es/images/2/0/7/img_lasana_vegetariana_56702_600.jpg', 12500),
(4, 'Salchipapa Especial', 'Salch esp', 'https://cdn.colombia.com/sdi/2017/01/25/salchipapas-536299.jpg', 20000),
(5, 'Sopa de guineo', 'Sopa G', 'https://caqueta.travel/sites/default/files/styles/nodo_m_s_de_caquet__750_x_650/public/guineo.jpg?itok=K_f8fm88', 15000),
(6, 'Bandeja paisa', 'B paisa', 'https://cdn.colombia.com/gastronomia/2011/08/02/bandeja-paisa-1616.gif', 20000);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `administrador` tinyint(1) NOT NULL DEFAULT '0',
  `usuario` varchar(20) NOT NULL,
  `nombreApellido` varchar(30) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(70) NOT NULL,
  `contrasenia` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `administrador`, `usuario`, `nombreApellido`, `correo`, `telefono`, `direccion`, `contrasenia`) VALUES
(1, 1, 'andresmorenojf', 'Andres Moreno', 'andresmorenojf@gmail.com', '+57 4 345 67 89', 'Calle 100 # 20 - 45', '12s3s4s2'),
(2, 0, 'caliche', 'Carlos Algo', 'caliche@gmail.com', '1232413132', 'carrera 05 N 52 - 10', 'wdecfwedf234'),
(3, 0, 'joselitooooo', 'Jose Mora Editado', 'jmoraeditado225@gmail.com', '0002225556', 'carrera 100 N 52 - 10', 'asdfsaefsdg54'),
(4, 0, 'juanita', 'Juana de Arco', 'dearco@gmail.com', '8523697', '', '1223fdrsd'),
(5, 0, 'pipe', 'Felipe Mesa', 'pipemesa@gmail.com', '8585960', '', '1223fdrsd'),
(6, 0, 'pipe00', 'Felipe Mesa', 'pipe00@gmail.com', '8585960', '', '1223fdrsd'),
(7, 0, 'pipeMe', 'Felipe Mesa', 'pipeme@gmail.com', '890 78 65', 'carrera 50 N 56 - 10', 'asda232sw'),
(8, 0, 'Camila10', 'Camila Morales Editada', 'camila@gmail.com', '8526932', 'Calle 56 # 50 00', 'camila10');

-- --------------------------------------------------------

--
-- Table structure for table `usuariosPedidos`
--

CREATE TABLE `usuariosPedidos` (
  `idUsuario` int(11) DEFAULT NULL,
  `idPlato` int(11) DEFAULT NULL,
  `idPago` int(11) DEFAULT NULL,
  `IdEstado` int(11) DEFAULT NULL,
  `idPedido` int(11) NOT NULL,
  `fechaModificacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuariosPedidos`
--

INSERT INTO `usuariosPedidos` (`idUsuario`, `idPlato`, `idPago`, `IdEstado`, `idPedido`, `fechaModificacion`) VALUES
(1, 1, 1, 5, 1, '2020-07-04 05:26:17'),
(1, 3, 1, 1, 6, '2020-06-27 07:04:53'),
(1, 1, 0, 1, 7, '2020-06-27 07:05:41'),
(1, 1, 0, 1, 8, '2020-06-27 07:06:42'),
(1, 1, 0, 1, 9, '2020-06-27 07:19:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indexes for table `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idPago`);

--
-- Indexes for table `plato`
--
ALTER TABLE `plato`
  ADD PRIMARY KEY (`idPlato`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indexes for table `usuariosPedidos`
--
ALTER TABLE `usuariosPedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idPlato` (`idPlato`),
  ADD KEY `idPago` (`idPago`),
  ADD KEY `IdEstado` (`IdEstado`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `estados`
--
ALTER TABLE `estados`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pago`
--
ALTER TABLE `pago`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plato`
--
ALTER TABLE `plato`
  MODIFY `idPlato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `usuariosPedidos`
--
ALTER TABLE `usuariosPedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `usuariosPedidos`
--
ALTER TABLE `usuariosPedidos`
  ADD CONSTRAINT `usuariospedidos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `usuariospedidos_ibfk_2` FOREIGN KEY (`idPlato`) REFERENCES `plato` (`idPlato`),
  ADD CONSTRAINT `usuariospedidos_ibfk_3` FOREIGN KEY (`idPago`) REFERENCES `pago` (`idPago`),
  ADD CONSTRAINT `usuariospedidos_ibfk_5` FOREIGN KEY (`IdEstado`) REFERENCES `estados` (`idEstado`);
