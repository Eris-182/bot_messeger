'use strict';
export default function({ event, api }) {
    function send(text, callback) {
        if (callback && typeof callback == "function") return api.sendMessage(text, callback);
        else return api.sendMessage(text, event.threadID);
    }

    function user(text, id, callback) {
        if (callback && typeof callback == "function") return api.sendMessage(text, callback);
        else return api.sendMessage(text, id);
    }

    function reply(text, callback) {
        if (callback && typeof callback == "function") return api.sendMessage(text, event.threadID, callback, event.messageID);
        else return api.sendMessage(text, event.threadID, event.messageID);
    }

    function unsend(messageID, callback) {
        if (callback && typeof callback == "function") return api.unsendMessage(messageID, callback);
        else return api.unsendMessage(messageID);
    }

    function reaction(emoji, messageID) {
        return api.setMessageReaction(emoji, function() {}, true);
    }

    function unsendReaction(messageID, callback) {
        var reactionc = "😳";
        if (reactionc)
            if (callback && typeof callback == "function")
                return api.unsendMessage(messageID, callback);
            else return api.unsendMessage(messageID);
    };

    return {
        user,
        send,
        reply,
        unsend,
        reaction,
        unsendReaction
    }
}