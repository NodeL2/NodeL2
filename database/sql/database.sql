DROP DATABASE IF EXISTS `nodel2`;
CREATE DATABASE `nodel2` COLLATE utf8_unicode_ci;
use `nodel2`

CREATE TABLE `accounts` (
    `username`    varchar(16) NOT NULL,
    `password`    varchar(16) NOT NULL,
    PRIMARY KEY (`username`)
);

CREATE TABLE `characters`(
    `id`          int( 8)     NOT NULL AUTO_INCREMENT,
    `username`    varchar(16) NOT NULL,
    `name`        varchar(16) NOT NULL,
    `title`       varchar(32) NOT NULL DEFAULT "",
    `classId`     int( 5)     NOT NULL,
    `race`        int( 5)     NOT NULL,
    `level`       int( 5)     NOT NULL DEFAULT 1,
    `hp`          float       NOT NULL DEFAULT 50,
    `maxHp`       float       NOT NULL,
    `mp`          float       NOT NULL DEFAULT 25,
    `maxMp`       float       NOT NULL,
    `exp`         int(20)     NOT NULL DEFAULT 0,
    `sp`          int(10)     NOT NULL DEFAULT 0,
    `pk`          int(10)     NOT NULL DEFAULT 0,
    `pvp`         int(10)     NOT NULL DEFAULT 0,
    `sex`         int( 5)     NOT NULL,
    `face`        int( 5)     NOT NULL,
    `hair`        int( 5)     NOT NULL,
    `hairColor`   int( 5)     NOT NULL,
    `karma`       int(10)     NOT NULL DEFAULT 0,
    `evalScore`   int( 5)     NOT NULL DEFAULT 0,
    `recRemain`   int( 5)     NOT NULL DEFAULT 0,
    `isGM`        boolean     NOT NULL DEFAULT 0,
    `isOnline`    boolean     NOT NULL DEFAULT 0,
    `isActive`    boolean     NOT NULL DEFAULT 1,
    `locX`        int(10)     NOT NULL,
    `locY`        int(10)     NOT NULL,
    `locZ`        int(10)     NOT NULL,
    `head`        int( 5)     NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
);

ALTER TABLE `characters` AUTO_INCREMENT=2000000;

CREATE TABLE `skills`(
    `id`          int( 8)     NOT NULL AUTO_INCREMENT,
    `skillId`     int( 5)     NOT NULL,
    `characterId` int( 8)     NOT NULL,
    `name`        varchar(48) NOT NULL,
    `passive`     boolean     NOT NULL,
    `level`       int( 5)     NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `items`(
    `id`          int( 8)     NOT NULL AUTO_INCREMENT,
    `itemId`      int( 5)     NOT NULL,
    `characterId` int( 8)     NOT NULL,
    `name`        varchar(48) NOT NULL,
    `equipped`    boolean     NOT NULL,
    `slot`        int( 5)     NOT NULL,
    PRIMARY KEY (`id`)
);
