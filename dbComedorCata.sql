-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-12-2022 a las 06:16:51
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbComedorCata`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `name`, `author`, `created_at`, `updated_at`) VALUES
(13, 'asa', 'asaasaaaaaa', '2022-12-11 20:56:36', '2022-12-11 23:22:27'),
(14, 'aaaa', 'aaaaa', '2022-12-11 20:56:44', '2022-12-11 20:56:44'),
(17, 'A', 'b', '2022-12-11 21:48:23', '2022-12-11 22:40:32'),
(18, 'aAaQWQWQWQ', 'QWQWQW', '2022-12-11 21:48:31', '2022-12-11 21:48:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idx` int(11) NOT NULL,
  `usuario` varchar(20) DEFAULT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `nivel` tinyint(4) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `marca` varchar(20) DEFAULT NULL,
  `compañia` varchar(20) DEFAULT NULL,
  `saldo` float DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idx`, `usuario`, `nombre`, `sexo`, `nivel`, `email`, `telefono`, `marca`, `compañia`, `saldo`, `activo`) VALUES
(1, 'BRE2271', 'BRENDA', 'M', 2, 'brenda@live.com', '655-330-5736', 'LG', 'IUSACELL', 10, 1),
(2, 'OSC4677', 'OSCAR', 'H', 3, 'oscar@gmail.com', '655-143-4181', 'LG', 'TELCEL', 0, 1),
(3, 'JOS7086', 'JOSE', 'H', 3, 'francisco@gmail.com', '655-143-3922', 'NOKIA', 'MOVISTAR', 150, 1),
(4, 'LUI6115', 'LUIS', 'H', 0, 'enrique@outlook.com', '655-137-1279', 'LG', 'TELCEL', 50, 1),
(5, 'LUI7072', 'LUIS', 'H', 1, 'luis@hotmail.com', '655-100-8260', 'NOKIA', 'IUSACELL', 50, 0),
(6, 'DAN2832', 'DANIEL', 'H', 0, 'daniel@outlook.com', '655-145-2586', 'SONY', 'UNEFON', 100, 1),
(7, 'JAQ5351', 'JAQUELINE', 'M', 0, 'jaqueline@outlook.com', '655-330-5514', 'BLACKBERRY', 'AXEL', 0, 1),
(8, 'ROM6520', 'ROMAN', 'H', 2, 'roman@gmail.com', '655-330-3263', 'LG', 'IUSACELL', 50, 1),
(9, 'BLA9739', 'BLAS', 'H', 0, 'blas@hotmail.com', '655-330-3871', 'LG', 'UNEFON', 100, 1),
(10, 'JES4752', 'JESSICA', 'M', 1, 'jessica@hotmail.com', '655-143-6861', 'SAMSUNG', 'TELCEL', 500, 1),
(11, 'DIA6570', 'DIANA', 'M', 1, 'diana@live.com', '655-143-3952', 'SONY', 'UNEFON', 100, 0),
(12, 'RIC8283', 'RICARDO', 'H', 2, 'ricardo@hotmail.com', '655-145-6049', 'MOTOROLA', 'IUSACELL', 150, 1),
(13, 'VAL6882', 'VALENTINA', 'M', 0, 'valentina@live.com', '655-137-4253', 'BLACKBERRY', 'AT&T', 50, 0),
(14, 'BRE8106', 'BRENDA', 'M', 3, 'brenda2@gmail.com', '655-100-1351', 'MOTOROLA', 'NEXTEL', 150, 1),
(15, 'LUC4982', 'LUCIA', 'M', 3, 'lucia@gmail.com', '655-145-4992', 'BLACKBERRY', 'IUSACELL', 0, 1),
(16, 'JUA2337', 'JUAN', 'H', 0, 'juan@outlook.com', '655-100-6517', 'SAMSUNG', 'AXEL', 0, 0),
(17, 'ELP2984', 'ELPIDIO', 'H', 1, 'elpidio@outlook.com', '655-145-9938', 'MOTOROLA', 'MOVISTAR', 500, 1),
(18, 'JES9640', 'JESSICA', 'M', 3, 'jessica2@live.com', '655-330-5143', 'SONY', 'IUSACELL', 200, 1),
(19, 'LET4015', 'LETICIA', 'M', 2, 'leticia@yahoo.com', '655-143-4019', 'BLACKBERRY', 'UNEFON', 100, 1),
(20, 'LUI1076', 'LUIS', 'H', 3, 'luis2@live.com', '655-100-5085', 'SONY', 'UNEFON', 150, 1),
(21, 'HUG5441', 'HUGO', 'H', 2, 'hugo@live.com', '655-137-3935', 'MOTOROLA', 'AT&T', 500, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cronograma_menu`
--

CREATE TABLE `cronograma_menu` (
  `crm_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `crm_tipo` varchar(20) NOT NULL,
  `crm_dia` varchar(10) NOT NULL,
  `crm_fechaInicio` date NOT NULL,
  `crm_fechaFin` date NOT NULL,
  `crm_codigo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositos`
--

CREATE TABLE `depositos` (
  `dep_id` int(11) NOT NULL,
  `dep_importe` decimal(10,2) NOT NULL,
  `dep_serie` varchar(10) NOT NULL,
  `dep_numero` decimal(10,2) NOT NULL,
  `dep_medio_pago` varchar(2) DEFAULT NULL COMMENT 'E = EFECTIVO\r\nV = TARJETA VISA',
  `dep_descripcion` varchar(100) DEFAULT NULL,
  `dep_numero_transaccion` varchar(10) DEFAULT NULL,
  `dep_vta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `prod_nombre` varchar(100) NOT NULL,
  `prod_codigo` varchar(10) NOT NULL,
  `prod_unidad_precio` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`prod_id`, `prod_nombre`, `prod_codigo`, `prod_unidad_precio`) VALUES
(1, 'Lomo saltados', '2', '7'),
(2, 'logro de Zapallo', '23', '7'),
(3, 'Estofado de Pollo', '123', '8'),
(4, 'Tallarin Verde', '122', '7'),
(8, 'Pastel de Papas', '11', '6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_asistencia`
--

CREATE TABLE `registro_asistencia` (
  `reg_id` int(11) NOT NULL,
  `reg_fecha_registro` date NOT NULL,
  `reg_fecha_salida` date NOT NULL,
  `reg_estado` varchar(1) DEFAULT NULL COMMENT 'P=Presente\r\nT=tarde\r\nf=falta\r\nj=justificado',
  `reg_tra_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusuarios`
--

CREATE TABLE `tblusuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `nivel` varchar(250) NOT NULL,
  `email` varchar(69) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblusuarios`
--

INSERT INTO `tblusuarios` (`id`, `nombre`, `sexo`, `nivel`, `email`) VALUES
(1, 'Alex Alaya Torres mamani', 'H', '1', 'alex@gmail.com'),
(2, 'Kathia Alaya Torres mamani', 'M', '2', 'Kathia@gmail.com'),
(3, 'Ester Alaya Torres mamani', 'H', '3', 'Ester@gmail.com'),
(4, 'Maria Alaya Torres mamani', 'M', '3', 'Maria@gmail.com'),
(5, 'Alex Alaya Mamani mamani', 'H', '4', 'alex@gmail.com'),
(6, 'Juan Alaya Torres mamani', 'H', '5', 'Juan@gmail.com'),
(7, 'Martha Alaya Quispe mamani', 'M', '3', 'Martha@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `tra_id` int(11) NOT NULL,
  `tra_nombre` varchar(30) NOT NULL,
  `tra_ap_paterno` varchar(30) NOT NULL,
  `tra_ap_materno` varchar(30) NOT NULL,
  `tra_direccion` varchar(50) NOT NULL,
  `tra_nro_documento` varchar(15) NOT NULL,
  `tra_telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `trabajador`
--

INSERT INTO `trabajador` (`tra_id`, `tra_nombre`, `tra_ap_paterno`, `tra_ap_materno`, `tra_direccion`, `tra_nro_documento`, `tra_telefono`) VALUES
(1, 'Maria Griselda ', 'Torres', 'Mamani', 'jr Brasil nª123', '72323232', '932323231'),
(2, 'Sara Mia ', 'Socas', 'Puma', 'jr Peru', '72332323', '99999999');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `vta_id` int(11) NOT NULL,
  `vta_fecha` date NOT NULL,
  `vta_tipo_comprobante` varchar(10) DEFAULT NULL COMMENT 'tiket control',
  `vta_total` decimal(10,2) NOT NULL,
  `vta_serie` varchar(10) NOT NULL,
  `vta_numero` varchar(10) NOT NULL,
  `vta_tra_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta_detalle_boleta`
--

CREATE TABLE `venta_detalle_boleta` (
  `vta_detalle_id` int(11) NOT NULL,
  `vta_detalle_TipoBoleta` varchar(3) DEFAULT NULL COMMENT '001-002',
  `vta_detalle_descripcion` varchar(50) NOT NULL,
  `vta_detalle_cantidad` int(11) NOT NULL,
  `vta_detalle_precio_unit` decimal(10,2) NOT NULL,
  `vta_detalle_importe` decimal(10,2) NOT NULL,
  `vta_detalle_vta_id` int(11) NOT NULL,
  `vta_detalle_prod_id` int(11) NOT NULL,
  `vta_detalle_Nombre` varchar(50) DEFAULT NULL,
  `vta_detalle_grado` varchar(19) DEFAULT NULL,
  `vta_detalle_seccion` varchar(10) DEFAULT NULL,
  `vta_detalle_total` decimal(2,0) NOT NULL,
  `vta_detalle_nivel` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idx`);

--
-- Indices de la tabla `cronograma_menu`
--
ALTER TABLE `cronograma_menu`
  ADD PRIMARY KEY (`crm_id`),
  ADD KEY `productos_cronograma_menu_fk` (`prod_id`);

--
-- Indices de la tabla `depositos`
--
ALTER TABLE `depositos`
  ADD PRIMARY KEY (`dep_id`),
  ADD KEY `venta_depositos_fk` (`dep_vta_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indices de la tabla `registro_asistencia`
--
ALTER TABLE `registro_asistencia`
  ADD PRIMARY KEY (`reg_id`),
  ADD KEY `trabajador_registro_asistencia_fk` (`reg_tra_id`);

--
-- Indices de la tabla `tblusuarios`
--
ALTER TABLE `tblusuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`tra_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`vta_id`),
  ADD KEY `trabajador_venta_fk` (`vta_tra_id`);

--
-- Indices de la tabla `venta_detalle_boleta`
--
ALTER TABLE `venta_detalle_boleta`
  ADD PRIMARY KEY (`vta_detalle_id`),
  ADD KEY `venta_venta_detalle_fk` (`vta_detalle_vta_id`),
  ADD KEY `productos_venta_detalle_fk` (`vta_detalle_prod_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `cronograma_menu`
--
ALTER TABLE `cronograma_menu`
  MODIFY `crm_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `depositos`
--
ALTER TABLE `depositos`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `registro_asistencia`
--
ALTER TABLE `registro_asistencia`
  MODIFY `reg_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblusuarios`
--
ALTER TABLE `tblusuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  MODIFY `tra_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `vta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `venta_detalle_boleta`
--
ALTER TABLE `venta_detalle_boleta`
  MODIFY `vta_detalle_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cronograma_menu`
--
ALTER TABLE `cronograma_menu`
  ADD CONSTRAINT `productos_cronograma_menu_fk` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `depositos`
--
ALTER TABLE `depositos`
  ADD CONSTRAINT `venta_depositos_fk` FOREIGN KEY (`dep_vta_id`) REFERENCES `venta` (`vta_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `registro_asistencia`
--
ALTER TABLE `registro_asistencia`
  ADD CONSTRAINT `trabajador_registro_asistencia_fk` FOREIGN KEY (`reg_tra_id`) REFERENCES `trabajador` (`tra_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `trabajador_venta_fk` FOREIGN KEY (`vta_tra_id`) REFERENCES `trabajador` (`tra_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `venta_detalle_boleta`
--
ALTER TABLE `venta_detalle_boleta`
  ADD CONSTRAINT `productos_venta_detalle_fk` FOREIGN KEY (`vta_detalle_prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `venta_venta_detalle_fk` FOREIGN KEY (`vta_detalle_vta_id`) REFERENCES `venta` (`vta_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
