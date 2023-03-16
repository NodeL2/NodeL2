# NodeL2 ::: LINEAGE II Server Emulator

![GitHub Repo stars](https://img.shields.io/github/stars/dkoluris/nodel2?color=success) ![GitHub license](https://img.shields.io/github/license/dkoluris/nodel2?color=informational)

**LINEAGE II** Chronicle 2 server emulator for **NodeJS**. The structure is comprised of **ES6 JavaScript** (as much as possible), **SQL** via **MariaDB**, **JSON** for vast data, and **JSON Schema** for data structure validation.

⚠️ Careful, this is not to be used as a private server **at all**.

## YouTube Showcase
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/9-lBvxaXDnM/0.jpg)](https://www.youtube.com/watch?v=9-lBvxaXDnM)

## Prerequisites
* Install **[NodeJS LTS](https://nodejs.org/en/download)**, and **[MariaDB 16](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.12)**
* For convenience, also install **[MS Visual Studio Code](https://code.visualstudio.com/download)**, and **[TablePlus](https://tableplus.com/download)**
* Download **[LINEAGE II C2 Splendor Client](https://drive.google.com/drive/folders/1kdVS2ymqmK3vzufEt5hUnij6pWS8BcZb?usp=sharing)** that features `485` API protocol
* You can also download **LINEAGE II C4 Scions Client** that features `660` API protocol, and use branch `feature/c4`.

## Setup
* Fix database credentials in `database/install` script, and `config/default.ini`
* Run `database/install.bat` for **Windows**, or `database/install.sh` for **Linux** and **macOS**
* Run `npm install -i`

## Run
⚠️ It is advised to reset the database with the `database/install` script after **each pull** from the repo. A lot of quintessential implementation is worked on.
* Launch server with `npm run --silent NodeL2`
* Fire-up **LINEAGE II Client** and authenticate
* In order to access the Admin panel, use this in the chat prompt: `.admin`

## What to expect
✅ Authentication, with error parse\
✅ Server selection\
✅ Character selection hall\
✅ Character creation for 5 races\
✅ Character deletion (instant)\
✅ Enter world\
✅ Statistics for level, base abilities, etc.\
✅ Npc spawns\
✅ Basic attack\
✅ Level-up, experience, sp, load

## WIP/Experimental
✴️ Attained weapon, armor, items\
✴️ Monster spawns\
✴️ Skill use\
✴️ Calculation formulas\
✴️ Npc interaction, quests

## Unimplemented
⛔️ Around 65% of mechanics\
⛔️ 80% of datapack

## License
Open-source under [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
