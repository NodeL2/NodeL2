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
    `hp`          int( 5)     NOT NULL DEFAULT 50,
    `maxHp`       int( 5)     NOT NULL,
    `mp`          int( 5)     NOT NULL DEFAULT 25,
    `maxMp`       int( 5)     NOT NULL,
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
    `locX`        float       NOT NULL,
    `locY`        float       NOT NULL,
    `locZ`        float       NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `skills`(
    `id`          int( 5)     NOT NULL,
    `name`        varchar(32) NOT NULL,
    `level`       int( 5)     NOT NULL,
    `characterId` int( 8)     NOT NULL
);
