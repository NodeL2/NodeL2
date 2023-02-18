# NodeL2 ::: LINEAGE II Server Emulator

![GitHub Repo stars](https://img.shields.io/github/stars/dkoluris/nodel2?color=success) ![GitHub license](https://img.shields.io/github/license/dkoluris/nodel2?color=informational)

**LINEAGE II** Chronicle 2 server emulator for **NodeJS**. The structure is comprised of **ES6 JavaScript** (as much as possible), **SQL** via **MariaDB**, **JSON** for vast data, and **JSON Schema** for data structure validation.

## What to expect
✅ You are able to login into the server with credentials. The server recognizes a new account, and creates it; also recognizes an existing account and posts the right error message in case the password is mismatched.

✅ You are now in the server selection screen, that's where clicking on the default server redirects to the character selection hall. You can proceed and create a new character; the new character is being given the race class skills, and the newbie starter gear, such as weapon and armor according to race and class. Back to the character selection hall, the new character is selectable for entering the game. You can also delete a selected character.

✅ Entering the Lineage2 world, the character is able to move through the map; open the statistics screen, the right numbers are assigned to the character such as level, name, title, basic abilities, basic stats, pvp, pk etc. Moving to the skills screen, these are clickable to see the skill animation effect, as well as categorized after which ones are active, and which ones are passive. On the actions screen, the character can stand-up or rest, run or walk, and express their emotions with a social action.

✅ You can also see the attained items, which ones are equipped, and which ones are not. It is also possible to write text on the chat window and post it on the local, shout, or trade channel.

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

## License
Open-source under [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
