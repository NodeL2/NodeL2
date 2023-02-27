# NodeL2 ::: LINEAGE II Server Emulator

![GitHub Repo stars](https://img.shields.io/github/stars/dkoluris/nodel2?color=success) ![GitHub license](https://img.shields.io/github/license/dkoluris/nodel2?color=informational)

**LINEAGE II** Chronicle 2 server emulator for **NodeJS**. The structure is comprised of **ES6 JavaScript** (as much as possible), **SQL** via **MariaDB**, **JSON** for vast data, and **JSON Schema** for data structure validation.

⚠️ Careful, this is not to be used as a private server **at all**.

## YouTube Showcase
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/R7-62GR-w-E/0.jpg)](https://www.youtube.com/watch?v=R7-62GR-w-E)

## Prerequisites
* Install [NodeJS LTS](https://nodejs.org/en/download), and [MariaDB 16](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.12)
* For convenience, also install [MS Visual Studio Code](https://code.visualstudio.com/download), and [TablePlus](https://tableplus.com/download)
* Download [LINEAGE II C2 Splendor Client](https://drive.google.com/drive/folders/1kdVS2ymqmK3vzufEt5hUnij6pWS8BcZb?usp=sharing) that features `485` API protocol

## Setup
* Fix database credentials in `database/install` script, and `config/connection.ini`
* Run `database/install.bat` for **Windows**, or `database/install.sh` for **Linux** and **macOS**
* Run `npm install -i`

## Run
⚠️ It is advised to reset the database with the `database/install` script after **each pull** from the repo. A lot of quintessential implementation is worked on.
* Launch server with `npm run --silent NodeL2`
* Fire-up **LINEAGE II C2 Splendor** and authenticate
* In order to unstuck a character, use this in the chat prompt: `.unstuck`

## What to expect
✅ Authentication, with error parse\
✅ Server selection\
✅ Character selection hall\
✅ Character creation for 5 races\
✅ Character deletion (instant)\
✅ Enter world\
✅ Statistics for level, base abilities, etc.

## WIP/Experimental
✴️ Attained weapon, armor, items\
✴️ Npc & Monster spawns\
✴️ Attack (Force attack too)\
✴️ Skill use

## Unimplemented
⛔️ Around 75% of mechanics\
⛔️ 95% of datapack

## License
Open-source under [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
