-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2025 at 03:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tech`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `catId` varchar(15) NOT NULL,
  `catPhoto` varchar(155) DEFAULT NULL,
  `title` varchar(155) NOT NULL,
  `parentCat` varchar(50) DEFAULT NULL,
  `slug` varchar(155) NOT NULL,
  `metaTitle` mediumtext DEFAULT NULL,
  `keyWord` mediumtext DEFAULT NULL,
  `descrip` longtext DEFAULT NULL,
  `featured` varchar(10) NOT NULL,
  `footer` varchar(10) NOT NULL,
  `sta` varchar(50) NOT NULL,
  `datestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `userid` varchar(155) DEFAULT NULL,
  `editon` timestamp NULL DEFAULT current_timestamp(),
  `catsn` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`catId`, `catPhoto`, `title`, `parentCat`, `slug`, `metaTitle`, `keyWord`, `descrip`, `featured`, `footer`, `sta`, `datestamp`, `userid`, `editon`, `catsn`) VALUES
('cat962847', NULL, 'kishan', 'fashion', 'New Cat', 'Kishan Shukla', 'Demo', 'Demo ', 'yes', 'no', 'active', '2025-07-01 04:56:12', '5039', '2025-07-03 06:49:47', 4),
('cat872551', NULL, 'Vishwa jagriti mission', 'electronics', 'VJM', '', '', '', 'no', 'no', 'active', '2025-07-01 11:40:22', '5039', '2025-07-01 11:40:22', 6),
('cat988913', '/uploads/1751552196095-WhatsApp Image 2025-06-27 at 3.50.53 PM.jpeg', 'anurag', 'fashion', 'Anuj', '', '', '', 'no', 'no', 'inactive', '2025-07-01 12:06:57', '5039', '2025-07-03 14:16:36', 18);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `sn` int(11) NOT NULL,
  `ordersId` int(11) NOT NULL,
  `SKU-id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `ordererID` int(11) NOT NULL,
  `orderDate` date NOT NULL DEFAULT current_timestamp(),
  `sta` varchar(255) NOT NULL,
  `descrip` mediumtext DEFAULT NULL,
  `dateOfDilevry` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reset_p`
--

CREATE TABLE `reset_p` (
  `rsn` int(11) NOT NULL,
  `remail` varchar(155) NOT NULL,
  `rcode` int(10) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reset_p`
--

INSERT INTO `reset_p` (`rsn`, `remail`, `rcode`, `time`) VALUES
(1, 'kishanshukla108@gmail.com', 160889, '2025-06-17 09:55:03'),
(2, 'kishanshukla108@gmail.com', 857615, '2025-06-17 10:23:24'),
(3, 'kishanshukla108@gmail.com', 866510, '2025-06-17 10:25:08'),
(4, 'kishanshukla108@gmail.com', 843214, '2025-06-17 10:27:31'),
(5, 'kishanshukla108@gmail.com', 727738, '2025-06-17 10:28:28'),
(6, 'kishanshukla108@gmail.com', 919620, '2025-06-17 10:32:36'),
(7, 'kishanshukla108@gmail.com', 129931, '2025-06-17 10:33:02'),
(8, 'kishanshukla108@gmail.com', 798260, '2025-06-17 10:35:07'),
(9, 'kishanshukla108@gmail.com', 819050, '2025-06-17 10:36:08'),
(10, 'kishanshukla108@gmail.com', 424640, '2025-06-17 10:45:00'),
(11, 'kishanshukla108@gmail.com', 943760, '2025-06-17 10:47:14'),
(12, 'kishanshukla108@gmail.com', 559395, '2025-06-17 10:49:49'),
(13, 'kishanshukla108@gmail.com', 976242, '2025-06-17 10:56:00'),
(14, 'kishanshukla108@gmail.com', 552957, '2025-06-17 11:23:40'),
(15, 'kishanshukla108@gmail.com', 448252, '2025-06-17 12:28:21'),
(16, 'kishan@gmail.com', 516675, '2025-06-17 12:33:50'),
(17, 'kishanshukla108@gmail.com', 569066, '2025-06-17 12:34:12'),
(18, 'kishanshukla108@gmail.com', 211316, '2025-06-17 12:38:16'),
(19, 'kishanshukla108@gmail.com', 471973, '2025-06-17 12:39:46'),
(20, 'chandrakantshukla108@gmail.com', 850987, '2025-06-27 07:04:38');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `sn` int(150) NOT NULL,
  `avatar` varchar(155) NOT NULL,
  `fname` varchar(155) NOT NULL,
  `lname` varchar(155) NOT NULL,
  `id` varchar(24) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` varchar(155) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `state` varchar(60) NOT NULL,
  `city` varchar(60) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `ac_sta` varchar(150) NOT NULL,
  `admin_re` varchar(155) NOT NULL,
  `roll` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`sn`, `avatar`, `fname`, `lname`, `id`, `email`, `password`, `phone`, `address`, `state`, `city`, `pincode`, `ac_sta`, `admin_re`, `roll`) VALUES
(1, '/uploads/1750940808101-258456.jpeg', 'Kishan', 'Shukla', 'USR-000', 'kishanshukla108@gmail.com', 'Kishan@1', '8178960918', 'Anand Dham Ashram, Bakkarwala Marg', 'UP', 'Kanpur', '208020', 'done', 'ok', 'admin'),
(2, 'png', 'kishan', 'shukla', '987', 'k@gmail.com', '12345', '0', '', '', '', '0', '', '', 'seller'),
(4, '02.jpg', 'anurag', 'ksjd', '01114', 'kishan@gmail.com', '1245', '0', '', '', '', '0', '', '', ''),
(5, '/uploads/1750945708832-985645.jpeg', 'CHANDRA KANT', 'SHUKLA', '5039', 'chandrakantshukla108@gmail.com', 'Kishan@1', '8575845698', 'EWS600', 'GJ', 'Vadodara', '254852', 'done', 'ok', 'seller'),
(6, '', 'Sunny', 'Kumar', '574976', '01.gurukul@gmail.com', 'Hariom@1', '', '', '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`catsn`),
  ADD UNIQUE KEY `catid` (`catId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`sn`),
  ADD UNIQUE KEY `ordersId` (`ordersId`);

--
-- Indexes for table `reset_p`
--
ALTER TABLE `reset_p`
  ADD PRIMARY KEY (`rsn`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`sn`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `catsn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `sn` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reset_p`
--
ALTER TABLE `reset_p`
  MODIFY `rsn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `sn` int(150) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
