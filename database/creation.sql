CREATE DATABASE `DigitalHospital` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `DigitalHospital`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Hospitals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `names` varchar(100) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `second_last_name` varchar(50) NOT NULL,
  `sex` enum('M','F') NOT NULL,
  `birthday` date NOT NULL,
  `inscription_date` date NOT NULL,
  `id_hospital` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_hospital` (`id_hospital`),
  CONSTRAINT `Patients_ibfk_1` FOREIGN KEY (`id_hospital`) REFERENCES `Hospitals` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Guardians` (
  `id_patient` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  PRIMARY KEY (`id_patient`),
  CONSTRAINT `Guardians_ibfk_1` FOREIGN KEY (`id_patient`) REFERENCES `Patients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


