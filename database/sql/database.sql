DROP DATABASE IF EXISTS `nodel2`;
CREATE DATABASE `nodel2` COLLATE utf8_unicode_ci;
use `nodel2`

CREATE TABLE `accounts` (
    `username`   varchar(16) NOT NULL,
    `password`   varchar(16) NOT NULL,
    PRIMARY KEY (`username`)
);
