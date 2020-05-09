-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 08, 2020 at 05:48 PM
-- Server version: 5.6.41-84.1-log
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamesett_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `join_match`
--

CREATE TABLE `join_match` (
  `id` int(11) NOT NULL,
  `match_id` int(255) NOT NULL,
  `user` varchar(500) NOT NULL,
  `kill_count` int(255) NOT NULL DEFAULT '0',
  `winner` enum('true','false') NOT NULL DEFAULT 'false',
  `placement` int(255) DEFAULT NULL,
  `phone` varchar(500) DEFAULT NULL,
  `log_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(100) NOT NULL,
  `roomid` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `roompassword` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `type` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `version` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `map` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `banner` longtext NOT NULL,
  `iconimg` varchar(250) DEFAULT NULL,
  `matchtype` varchar(10) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `totalplayer` int(255) DEFAULT NULL,
  `totalplayerjoined` int(255) DEFAULT NULL,
  `entryfee` int(255) DEFAULT NULL,
  `winprice` int(255) DEFAULT NULL,
  `perkill` int(255) DEFAULT NULL,
  `joinstatus` int(10) DEFAULT '0',
  `matchstatus` varchar(10) NOT NULL DEFAULT 'P',
  `matchschedule` varchar(500) NOT NULL,
  `rule` longtext,
  `livelink` varchar(5000) DEFAULT NULL,
  `log_entdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `refer`
--

CREATE TABLE `refer` (
  `id` int(11) NOT NULL,
  `user` varchar(500) NOT NULL,
  `referrer` varchar(500) NOT NULL,
  `log_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` varchar(500) NOT NULL,
  `amount` int(255) NOT NULL,
  `user` varchar(500) NOT NULL,
  `number` varchar(500) NOT NULL,
  `type` varchar(500) DEFAULT 'CREDIT',
  `status` varchar(250) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `ext_gateway` varchar(500) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `eVerified` enum('true','false') NOT NULL DEFAULT 'false',
  `phone` varchar(500) NOT NULL,
  `pVerified` enum('true','false') NOT NULL DEFAULT 'false',
  `password` varchar(500) NOT NULL,
  `gamertag` varchar(500) NOT NULL,
  `signup` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paytm` varchar(500) DEFAULT NULL,
  `bank` varchar(5000) DEFAULT NULL,
  `googlepay` varchar(500) DEFAULT NULL,
  `amazonpay` varchar(500) DEFAULT NULL,
  `doctype` varchar(500) DEFAULT NULL,
  `docverified` varchar(500) NOT NULL DEFAULT 'false',
  `docfront` longtext,
  `docback` longtext,
  `refercode` varchar(500) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `user` varchar(500) NOT NULL,
  `balance` int(255) NOT NULL DEFAULT '0',
  `bonus` int(255) NOT NULL DEFAULT '0',
  `last_updated` varchar(5000) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `withdraw`
--

CREATE TABLE `withdraw` (
  `id` int(11) NOT NULL,
  `txnid` varchar(500) NOT NULL,
  `user` varchar(500) NOT NULL,
  `amount` varchar(500) NOT NULL,
  `gateway` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL DEFAULT 'PENDING',
  `log_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `join_match`
--
ALTER TABLE `join_match`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refer`
--
ALTER TABLE `refer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`user`),
  ADD UNIQUE KEY `user` (`user`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `join_match`
--
ALTER TABLE `join_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refer`
--
ALTER TABLE `refer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `withdraw`
--
ALTER TABLE `withdraw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
