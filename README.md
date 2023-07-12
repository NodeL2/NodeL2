# NodeL2 :: LINEAGE II Server Emulator

![GitHub Repo stars](https://img.shields.io/github/stars/nodel2/nodel2?color=success) ![GitHub license](https://img.shields.io/github/license/nodel2/nodel2?color=informational)

**LINEAGE II** Chronicle 2 server emulator for **NodeJS**. The structure is comprised of **ES6 JavaScript** (as much as possible), **SQL** via **MariaDB**, **JSON** for vast data, and **JSON Schema** for data structure validation.

⚠️ Careful, this is not to be used as a private server **at all**.

## YouTube Showcase
[![YouTube Thumbnail](https://img.youtube.com/vi/jSHAAKAnfCQ/0.jpg)](https://www.youtube.com/watch?v=jSHAAKAnfCQ)

## Prerequisites
* Install **[NodeJS LTS](https://nodejs.org/en/download)**, and **[MariaDB 16](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.12)**
* For convenience, also install **[MS Visual Studio Code](https://code.visualstudio.com/download)**, and **[TablePlus](https://tableplus.com/download)**
* Download **[LINEAGE II C2 Splendor Client](https://drive.google.com/file/d/1NVA4XY3bC2xD_Jejggo_b0fuMFChsZqe/view?usp=sharing)** that features `485` API protocol

📌 You could also download **[LINEAGE II C1 Client](https://drive.google.com/file/d/1Wo0KnHJfRgKgnrxtm0qdVHUgPWV7tK9M/view?usp=sharing)** that features `419` API protocol, and use branch `feature/c1`. Final option, download **[LINEAGE II C4 Client](https://drive.google.com/file/d/1jYP9WG943_sdpX7kaQ5aHJU0L8MLX5yz/view?usp=sharing)** with `656` API protocol, and use `feature/c4`.

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
✅ Authentication, and Server selection\
✅ Character Creation for 5 Races, also Deletion\
✅ NPC & Monster Spawns\
✅ Attack, Cast, other Basic Actions\
✅ Mob Combat, Gain Experience, SP\
✅ Level-up, Pick-up items\
✅ Admin panel (Shop & Teleport)

## WIP/Experimental
✴️ Skill Animation & Launch, Skill trees\
✴️ NPC interaction, Quests\
✴️ Calculation Formulas

## Unimplemented
⛔️ Skills Purpose & Mechanics (a real bummer)\
⛔️ Broadcast Packets to others\
⛔️ 50% of datapack

## License
Open-source under [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
