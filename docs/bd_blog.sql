-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-06-2024 a las 02:54:34
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_blog`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blogs`
--

CREATE TABLE `blogs` (
  `id` int NOT NULL,
  `TituloBlog` varchar(75) NOT NULL,
  `DescripcionBlog` varchar(255) NOT NULL,
  `UsuarioCedulaUsuario` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `blogs`
--

INSERT INTO `blogs` (`id`, `TituloBlog`, `DescripcionBlog`, `UsuarioCedulaUsuario`) VALUES
(1, 'Nueva Era', 'todo lo que paso aquel dia ', 1006);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int NOT NULL,
  `DescripcionComentario` varchar(255) NOT NULL,
  `FechaComentario` datetime NOT NULL,
  `like` int NOT NULL,
  `UsuarioCedulaUsuario` bigint NOT NULL,
  `EntradaId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `DescripcionComentario`, `FechaComentario`, `like`, `UsuarioCedulaUsuario`, `EntradaId`) VALUES
(1, 'nuevo comentarid', '2024-05-23 00:00:00', 0, 1006, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradas`
--

CREATE TABLE `entradas` (
  `id` int NOT NULL,
  `TituloEntrada` varchar(75) NOT NULL,
  `ContenidoEntrada` mediumtext NOT NULL,
  `ImagenEntrada` varchar(255) NOT NULL,
  `FechaCreacion` datetime NOT NULL,
  `BlogId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `entradas`
--

INSERT INTO `entradas` (`id`, `TituloEntrada`, `ContenidoEntrada`, `ImagenEntrada`, `FechaCreacion`, `BlogId`) VALUES
(1, 'lo que paso ayer ', 'voy a contar cada momento en que me acuerdo de ti y de todos losamosdel universo', 'pe-1716520292048-usuario.jpg', '2024-05-23 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int NOT NULL,
  `DescripcionImagen` varchar(255) DEFAULT NULL,
  `EntradaId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `CedulaUsuario` bigint NOT NULL,
  `NombreUsuario` varchar(255) NOT NULL,
  `ApellidoUsuario` varchar(255) DEFAULT NULL,
  `TelefonoUsurio` bigint DEFAULT NULL,
  `CorreoUsuario` varchar(255) NOT NULL,
  `PasswordUsuario` varchar(255) NOT NULL,
  `ImagenUsuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`CedulaUsuario`, `NombreUsuario`, `ApellidoUsuario`, `TelefonoUsurio`, `CorreoUsuario`, `PasswordUsuario`, `ImagenUsuario`) VALUES
(1006, 'hector', 'Restrepo', 31285488, 'hector.fabio@gmail.com', '$2b$10$X3WGciqb9njxdx7DKCu.yOuydAK2mzfecLTK/Epku4P0ViG8ryf82', 'pe-1716520237015-vegueta.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UsuarioCedulaUsuario` (`UsuarioCedulaUsuario`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UsuarioCedulaUsuario` (`UsuarioCedulaUsuario`),
  ADD KEY `EntradaId` (`EntradaId`);

--
-- Indices de la tabla `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BlogId` (`BlogId`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EntradaId` (`EntradaId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`CedulaUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `entradas`
--
ALTER TABLE `entradas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`UsuarioCedulaUsuario`) REFERENCES `usuarios` (`CedulaUsuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`UsuarioCedulaUsuario`) REFERENCES `usuarios` (`CedulaUsuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`EntradaId`) REFERENCES `entradas` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`BlogId`) REFERENCES `blogs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`EntradaId`) REFERENCES `entradas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
