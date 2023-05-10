export const config = {
    name: "slot",
    version: "1.0.1",
    role: 0,
    author: "Sky",
    viDesc: "Đánh bạc bằng hình thức hoa quả",
    enDesc: "Gambling with fruit",
    category: ["Game", "Game"],
    usages: "<money>",
    timestamp: 5,
};

export const languages = {
    "vi_VN": {
        "missingInput": "[ SLOT ] Số tiền đặt cược không được để trống hoặc là số âm",
        "moneyBetNotEnough": "[ SLOT ] Số tiền bạn đặt lớn hơn hoặc bằng số dư của bạn!",
        "limitBet": "[ SLOT ] Số coin đặt không được dưới 50$!",
        "returnWin": "🎰 %1 | %2 | %3 🎰\nBạn đã thắng với %4$",
        "returnLose": "🎰 %1 | %2 | %3 🎰\nBạn đã thua và mất %4$"
    },
    "en_US": {
        "missingInput": "[ SLOT ] The bet money must not be blank or a negative number",
        "moneyBetNotEnough": "[ SLOT ] The money you betted is bigger than your balance!",
        "limitBet": "[ SLOT ] Your bet is too low, the minimum is 50$",
        "returnWin": "🎰 %1 | %2 | %3 🎰\nYou won with %4$",
        "returnLose": "🎰 %1 | %2 | %3 🎰\nYou lost and loss %4$"
    }
}

export async function onMessage({ api, event, args, Users, getText }) {
    const { threadID, messageID, senderID } = event;
    const { getData, increaseMoney, decreaseMoney } = Users;
    const slotItems = ["🍇", "🍉", "🍊", "🍏", "7⃣", "🍓", "🍒", "🍌", "🥝", "🥑", "🌽"];
    const moneyUser = (await getData(senderID)).money;

    var moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage(getText("missingInput"), threadID, messageID);
    if (moneyBet > moneyUser) return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);
    if (moneyBet < 50) return api.sendMessage(getText("limitBet"), threadID, messageID);
    var number = [],
        win = false;
    for (let i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
    if (number[0] == number[1] && number[1] == number[2]) {
        moneyBet *= 9;
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
        moneyBet *= 2;
        win = true;
    }
    switch (win) {
        case true:
            {
                api.sendMessage(getText("returnWin", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
                await increaseMoney(senderID, moneyBet);
                break;
            }
        case false:
            {
                api.sendMessage(getText("returnLose", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
                await decreaseMoney(senderID, moneyBet);
                break;
            }
    }
}
