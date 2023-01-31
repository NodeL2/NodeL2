# NodeL2
Classic L2 server emulator in NodeJS

## Prerequisites
* Install [NodeJS 14+](https://nodejs.org/en/), [MariaDB 16+](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.11)
* For convenience, also install [MS Visual Studio Code](https://code.visualstudio.com/download), and [TablePlus](https://tableplus.com/download)
* Download [L2Classic Splendor 1.5 Client](https://drive.google.com/file/d/1gESVzhTnRUG08y9Yl0pyhiDGQhbGOg0m/view?usp=sharing) that features `28` API protocol

## Setup
* Fix `USER`, and `PASS` in `/database` scripts, and run `database/db-install.bat` for **Windows**, or `database/db-install.sh` for **Linux** and **macOS**
* Furthermore, fix database credentials in `config/config.ini`
* Run `npm install -i`

## Run
* Launch with `npm run node` for **NodeJS** <= 16, or `npm run node17+` for newer **NodeJS** >= 17 versions.

## Credits
Main source of inspiration is <a href="https://github.com/lineage2js/lineage2js">L2JS</a>, please support it!

## License
Open-source under [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
