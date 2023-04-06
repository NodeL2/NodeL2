const ServerResponse = invoke('GameServer/Network/Response');

function adminPanel(session, actor) {
    session.dataSendToMe(
        ServerResponse.npcHtml(actor.fetchId(), utils.parseRawFile('data/Html/Admin/main.html'))
    );
}

module.exports = adminPanel;
