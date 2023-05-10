'use strict';
export const config = {
    name: 'cauca',
    ver: '1.0.0',
    role: 0,
    author: ['D-Jukie'],
    viDesc: 'Câu cá ở một hành tinh khác, dựa theo tựa game Subnautica khiến bạn đái ra máu vì độ đa dạng của nó UwU.',
    enDesc: 'Fish in a different world, based on the game Subnautica, causes you to die because of its diversity.',
    usages: "",
    category: ["Game", "Game"],
    timestamp: 5
};

import path from 'node:path'
import axios from 'axios'
import fs, { writeFileSync, existsSync } from 'node:fs'
import { createRequire } from "module"
const require = createRequire(import.meta.url)

var pathItem = path.join(process.cwd(), 'caches', 'cauca', `item.json`);
var pathDataJson = path.join(process.cwd(), 'caches', 'cauca', `data.json`);

export function checkPath(type, senderID) {

    const pathUser = path.join(process.cwd(), 'caches', 'cauca', 'datauser', `${senderID}.json`);
    const pathUser_1 = require(pathUser);
    const pathItem_1 = require(pathItem);
    if (type == 1) return pathItem
    if (type == 2) return pathItem_1
    if (type == 3) return pathUser
    if (type == 4) return pathUser_1
}

export async function onLoad() {
    const dir = process.cwd() + `/caches/cauca/`;
    const dirCache = process.cwd() + `/caches/cauca/`;
    const dirData = process.cwd() + `/caches/cauca/datauser/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
        recursive: true
    });
    if (!fs.existsSync(dirData)) fs.mkdirSync(dirData, {
        recursive: true
    });
    if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, {
        recursive: true
    });

    if (!fs.existsSync(dir + "data.json")) (await axios({
        url: "https://raw.githubusercontent.com/trashcfc/fishing/main/data.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "data.json"));

    if (!fs.existsSync(dir + "item.json")) (await axios({
        url: "https://raw.githubusercontent.com/trashcfc/fishing/main/item.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "item.json"));
    return;
}

export async function onMessage({ api, event, args, Users }) {
    const { threadID, messageID, senderID } = event;
    const pathData = path.join(process.cwd(), 'caches', 'cauca', 'datauser', `${senderID}.json`);
    switch (args[0]) {
        case 'register':
        case '-r':
            {
                const nDate = new Date().toLocaleString('vi-VN', {
                    timeZone: 'Asia/Ho_Chi_Minh'
                });
                if (!existsSync(pathData)) {
                    var obj = {};
                    obj.name = (await Users.getData(senderID)).name;
                    obj.ID = senderID;
                    obj.mainROD = null,
                        obj.GPS = {};
                    obj.GPS.locate = null,
                        obj.GPS.area = null,
                        obj.fishBag = [];
                    obj.item = [];
                    obj.timeRegister = nDate
                    obj.fishBag.push({
                        ID: 0,
                        name: 'Cá Thách Đấu',
                        category: 'Legendary',
                        size: 999999,
                        sell: 0
                    });
                    writeFileSync(pathData, JSON.stringify(obj, null, 4));
                    var msg = { body: "(¯´•.•CÂU CÁ TRÊN 4546B•.•´¯)\n⚔️Đ𝔞̆𝔫𝔤 𝔨𝔦́ 𝔠𝔞̂𝔲 𝔠𝔞́ 𝔱𝔥𝔞̀𝔫𝔥 𝔠𝔬̂𝔫𝔤⚔️\nIt's time to duel!!!", attachment: await this.subnautica() }
                    return api.sendMessage(msg, threadID, messageID);
                } else return api.sendMessage({ body: "==[CÂU CÁ TRÊN 4546B]==\n⚔️Bạn đã có trong cơ sở dữ liệu⚔️", attachment: await this.subnautica() }, threadID, messageID);
            }
        case 'shop':
        case '-s':
            {
                if (!existsSync(pathData)) {
                    return api.sendMessage({ body: "(¯´•.•CÂU CÁ TRÊN 4546B•.•´¯)\n⚔️Bạn chưa đăng kí tài khoản câu cá!", attachment: await this.subnautica() }, threadID, messageID);
                }
                return api.sendMessage({ body: "===[𝖘𝖍𝖔𝖕]===\n1. Mua vật phẩm\n2. Bán vật phẩm câu được\n3. Nâng cấp/Sửa chửa vật phẩm\n\nReply tin nhắn này với lựa chọn của bạn", attachment: await this.subnautica() }, threadID, (error, info) => {
                    client.reply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "shop"
                    })
                }, messageID);
            }
        case 'bag':
        case '-b':
            {
                if (!existsSync(pathData)) {
                    return api.sendMessage({ body: "(¯´•.•CÂU CÁ TRÊN 4546B•.•´¯)\n⚔️Bạn chưa đăng kí tài khoản câu cá!", attachment: await this.subnautica() }, threadID, messageID);
                }
                var data = this.checkPath(4, senderID)

                return api.sendMessage({ body: `(¯´•.•CÂU CÁ TRÊN 4546B•.•´¯)\n\n1. Cá (SL: ${data.fishBag.length})\n2. Cần câu (SL: ${data.item.length})\nVui lòng reply vật phẩm cần xem!`, attachment: await this.subnautica() }, threadID, (error, info) => {
                    client.reply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choosebag"
                    })
                }, messageID);
            }
        case 'custom':
        case '-c':
            {
                if (!existsSync(pathData)) {
                    return api.sendMessage({ body: "(¯´•.•CÂU CÁ TRÊN 4546B•.•´¯)\n⚔️Bạn chưa đăng kí tài khoản câu cá!", attachment: await this.subnautica() }, threadID, messageID);
                }
                if (args[1] == 'rod') {
                    var data = this.checkPath(4, senderID)
                    var listItem = '(¯´•.•CÂU CÁ TRÊN 4546B•.•´¯)\n',
                        number = 1;
                    for (let i of data.item) {
                        listItem += `${number++}. ${i.name} - Thời gian chờ: ${i.countdown}s - Độ bền: ${i.durability}\n`
                    }
                    listItem += 'Vui lòng reply để chọn cần câu chính của bạn!'
                    return api.sendMessage(listItem, threadID, (error, info) => {
                        client.reply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "rodMain",
                            data: data,
                            item: data.item
                        })
                    }, messageID);
                }
                if (args[1] == 'locate') {
                    return api.sendMessage({ body: "==[ŁØĆΔŦƗØŇ]==\n1. The Crater\n2. Sector Zero", attachment: await this.subnautica() }, threadID, (error, info) => {
                        client.reply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "location"
                        })
                    }, messageID);
                }
            }
        case 'help':
            {
                return api.sendMessage({ body: "====[SUBNAUTICA]====\n- R: Đăng kí\n- CUSTOM: Lựa chọn khu vực câu cá\n- BAG: Xem túi đồ\n- SHOP: Cửa hàng\n\n=====D-Jukie=====", attachment: await this.subnautica() }, threadID, messageID);
            }
        default:
            {
                async function checkTime(cooldown, dataTime) {
                    if (cooldown - (Date.now() - dataTime) > 0) {

                        var time = cooldown - (Date.now() - dataTime),
                            minutes = Math.floor(time / 60000),
                            seconds = ((time % 60000) / 1000).toFixed(0);
                        return api.sendMessage(`⏰ Vui lòng mua cần câu cấp bậc cao hơn để câu liên tiếp trong thời gian ngắn!\n⌚Chờ gian chờ còn lại: ${minutes}:${seconds}!`, threadID, messageID);
                    }
                }
                if (!existsSync(pathData)) {
                    return api.sendMessage({ body: "(¯´•.•CÂU CÁ TRÊN 4546B•.•´¯)\n⚔️Bạn chưa đăng kí tài khoản câu cá!", attachment: await this.subnautica() }, threadID, messageID);
                }
                var data = this.checkPath(4, senderID)
                if (data.item.length == 0) return api.sendMessage(`Bạn chưa có cần câu, vui lòng vào shop để mua!`, threadID, messageID);
                if (data.mainROD == null) return api.sendMessage('Bạn chưa chọn cần câu để câu cá!\nVui lòng nhập `custom rod` để chọn cần câu!', threadID, messageID);
                if (data.GPS.locate == null || data.GPS.area == null) return api.sendMessage('Bạn chưa chọn địa điểm để câu cá!\nVui lòng nhập `custom locate` để chọn địa điểm câu!', threadID, messageID);
                var rod = data.mainROD
                var location = data.GPS.locate
                var area = data.GPS.area
                var type = this.getFish()
                var findRod = data.item.find(i => i.name == rod)
                if (findRod.durability <= 0) return api.sendMessage('Cần câu đã hỏng, bạn cần sửa chữa hoặc chọn cần câu mới!', threadID, messageID);
                await checkTime(findRod.countdown * 1000, findRod.countdownData)
                findRod.countdownData = Date.now();
                findRod.durability = findRod.durability - 10;
                writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
                if (type == false) return api.sendMessage('Oh, không dính gì cả', threadID, messageID);
                var fil = (await this.dataFish(location, area)).filter(i => i.category == type)
                if (fil.length == 0) return api.sendMessage('Oh, không dính gì cả', threadID, messageID);
                var getData = fil[Math.floor(Math.random() * fil.length)];
                var IDF = ((this.checkPath(4, senderID)).fishBag)[parseInt(((this.checkPath(4, senderID)).fishBag).length - 1)].ID + 1;
                (this.checkPath(4, senderID)).fishBag.push({
                    ID: IDF,
                    name: getData.name,
                    category: getData.category,
                    size: getData.size,
                    sell: getData.sell,
                    image: getData.image
                });
                writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
                var msg = { body: `(¯´•._.CÂU CÁ TRÊN 4546B._.•´¯)\nChúc mừng bạn đã câu dính cá\nTên: ${getData.name} (${getData.sell}$)\nLoại: ${getData.category}\nSize: ${getData.size}cm`, attachment: await this.image(getData.image) }
                return api.sendMessage(msg, threadID, messageID);
            }
    }
}

export async function data() {
    const data = (await axios.get(`https://raw.githubusercontent.com/trashcfc/fishing/main/data.json`)).data;
    return data
}

export async function dataFish(a, b) {
    const data = await this.data()
    //console.log(data)
    var loc = data.find(i => i.location == a)
    var are = loc.area.find(i => i.name == b)

    return are.creature
}

export async function image(link) {
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(process.cwd() + `/caches/cauca/subnautica.png`, Buffer.from(download, "utf-8"));
    images.push(fs.createReadStream(process.cwd() + `/caches/cauca/subnautica.png`));
    return images
}

export async function subnautica() {
    var images = [];
    let download = (await axios.get('https://i.imgur.com/pTrrcQB.png', { responseType: "arraybuffer" })).data;
    fs.writeFileSync(process.cwd() + `/caches/cauca/subnauticapage.png`, Buffer.from(download, "utf-8"));
    images.push(fs.createReadStream(process.cwd() + `/caches/cauca/subnauticapage.png`));
    return images
}

export function getFish() {
    var rate = Math.floor(Math.random() * 100) + 1
    if (rate <= 4) return false
    if (rate > 4 && rate <= 34) return 'Common';
    if (rate > 34 && rate <= 59) return 'Uncommon';
    if (rate > 59 && rate <= 79) return 'Rare';
    if (rate > 79 && rate <= 94) return 'Epic';
    if (rate > 94 && rate <= 99) return 'Legendary';
    if (rate > 99 && rate <= 100) return 'Mythical';
}

export async function onReply({ event, api, reply, Users }) {
    const { body, threadID, messageID, senderID } = event;
    const dataMoney = await Users.getData(senderID);
    const moneyUser = dataMoney.money;
    const pathItem = this.checkPath(2, senderID);
    async function checkDur(a, b, c) {
        var data = require(pathItem);
        var find = data.find(i => i.name == a)
        if (c == 'rate') return (b / find.durability) * 100
        if (c == 'reset') return find.durability
        return `${b}/${find.durability} (${((b / find.durability) * 100).toFixed(0)}%)`
    }
    switch (reply.type) {
        case 'shop':
            {
                if (body == 1) {
                    api.unsendMessage(reply.messageID)
                    var listItem = '===[𝖘𝖍𝖔𝖕]===\n',
                        number = 1;
                    for (let i of pathItem) {
                        listItem += `${number++}. ${i.name} (${i.price}$) - Thời gian chờ ${i.countdown} (Độ bền: ${i.durability})\n\n`
                    }
                    return api.sendMessage(listItem + 'Reply tin nhắn này để chọn cần câu cho bạn. Mỗi lần câu trừ 10 độ bền!', threadID, (error, info) => {
                        client.reply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "buyfishingrod"
                        })
                    }, messageID);
                }
                if (body == 2) {
                    api.unsendMessage(reply.messageID)
                    var data = this.checkPath(4, senderID).fishBag;
                    if (data.length == 0) return api.sendMessage('Túi của bạn không có gì cả!', threadID, messageID);
                    var Common = data.filter(i => i.category == 'Common')
                    var Uncommon = data.filter(i => i.category == 'Uncommon')
                    var Rare = data.filter(i => i.category == 'Rare')
                    var Epic = data.filter(i => i.category == 'Epic')
                    var Legendary = data.filter(i => i.category == 'Legendary')
                    var Mythical = data.filter(i => i.category == 'Mythical')
                    var listCategory = [Common, Uncommon, Rare, Epic, Legendary, Mythical];
                    return api.sendMessage(`Chọn loại cá muốn bán:\n1. Common - ${Common.length}\n2. Uncommon - ${Uncommon.length}\n3. Rare - ${Rare.length}\n4. Epic - ${Epic.length}\n5. Legendary - ${Legendary.length}\n6. Mythical - ${Mythical.length}`, threadID, (error, info) => {
                        client.reply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "chooseFish",
                            listCategory
                        })
                    }, messageID);
                }
                if (body == 3) {
                    api.unsendMessage(reply.messageID)
                    var data = this.checkPath(4, senderID).item;
                    var msg = `===𝓕𝓘𝓧 𝓘𝓣𝓔𝓜===\n`,
                        number = 1;
                    for (let i of data) {
                        msg += `${number++}. ${i.name} - Độ bền: ${await checkDur(i.name, i.durability, 0)}\n`
                    }
                    return api.sendMessage(msg + 'Vui lòng reply vật phẩm muốn sửa!, giá sửa bằng 1/3 giá vật phẩm', threadID, (error, info) => {
                        client.reply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "fixfishingrod",
                            list: data
                        })
                    }, messageID);
                } else return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
            }
        case 'choosebag':
            {
                api.unsendMessage(reply.messageID)
                var data = this.checkPath(4, senderID)
                if (body == 1) {
                    if (data.fishBag.length == 0) return api.sendMessage('Trong túi của bạn không có con cá nào!', threadID, messageID);
                    var listFish = `===𝓲𝓷𝓿𝓮𝓷𝓽𝓸𝓻𝔂===\n`,
                        number = 1;
                    for (let i of data.fishBag) {
                        listFish += `${number++}. ${i.name} (${i.size}cm) - ${i.category} (${i.sell}$)\n`
                    }
                    return api.sendMessage(listFish, threadID, messageID);
                }
                if (body == 2) {
                    api.unsendMessage(reply.messageID)
                    if (data.item.length == 0) return api.sendMessage('Trong túi của bạn không có vật phẩm nào!', threadID, messageID);
                    var listItemm = `===𝓲𝓷𝓿𝓮𝓷𝓽𝓸𝓻𝔂===\n`,
                        number = 1;
                    for (let i of data.item) {
                        listItemm += `${number++}. ${i.name} (${i.price}$) - Độ bền: ${i.durability} (${i.countdown}s)\n`
                    }
                    return api.sendMessage(listItemm, threadID, messageID);
                } else return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
            }
        case 'rodMain':
            {
                var data = reply.data;
                var item = reply.item;
                if (parseInt(body) > item.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
                api.unsendMessage(reply.messageID)
                data.mainROD = item[parseInt(body) - 1].name
                writeFileSync(this.checkPath(3, senderID), JSON.stringify(data, null, 2));
                return api.sendMessage(`===МĂĨŃ ŴĔĂРŐŃ===\n- Đặt '${item[parseInt(body) - 1].name}' thành cần câu chính thành công!`, threadID, messageID);
            }
        case 'location':
            {
                const data = require(pathDataJson);
                if (body != 1 && body != 2) return api.sendMessage("Lựa chọn không hợp lệ!", threadID, messageID);
                api.unsendMessage(reply.messageID)
                var listLoca = '==[ŁØĆΔŦƗØŇ]==\n',
                    number = 1;
                for (let i of data[parseInt(body) - 1].area) {
                    listLoca += `${number++}. ${i.name}\n`
                };
                (this.checkPath(4, senderID)).GPS.locate = data[parseInt(body) - 1].location
                writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
                if (body == 1) var images = 'https://i.imgur.com/SJewp15.png'
                if (body == 2) var images = 'https://i.imgur.com/FtB2vWi.png'
                return api.sendMessage({ body: listLoca + 'Vui lòng chon vùng bạn muốn câu!', attachment: await this.image(images) }, threadID, (error, info) => {
                    client.reply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "chooseArea",
                        area: data[parseInt(body) - 1]
                    })
                }, messageID);
            }
        case 'chooseArea':
            {
                var area = reply.area;
                var pathh = this.checkPath(4, senderID)
                var pathhh = this.checkPath(3, senderID)
                if (parseInt(body) > area.area.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
                api.unsendMessage(reply.messageID)
                pathh.GPS.area = area.area[parseInt(body) - 1].name
                writeFileSync(pathhh, JSON.stringify(pathh, null, 2));
                return api.sendMessage(`==[ŁØĆΔŦƗØŇ]==\nChuyển tới vùng '${area.location} - ${area.area[parseInt(body) - 1].name}' thành công`, threadID, messageID);
            }
        case 'fixfishingrod':
            {
                if (parseInt(body) > reply.list.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
                var rod = reply.list[parseInt(body) - 1]
                if (await checkDur(rod.name, rod.durability, 'rate') > 75) return api.sendMessage('Chỉ sửa được cần câu có độ bền dưới 75%', threadID, messageID);
                api.unsendMessage(reply.messageID)
                await checkMoney(senderID, parseInt((rod.price * (1 / 3)).toFixed(0)))
                await Users.setData(senderID, { money: moneyUser + parseInt((rod.price * (1 / 3)).toFixed(0)) });
                rod.durability = await checkDur(rod.name, rod.durability, 'reset')
                writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
                return api.sendMessage(`===ŦĨЖ ŴĔĂРŐŃ===\n- Sửa thành công ${rod.name} (${parseInt((rod.price * (1 / 3)).toFixed(0))}$)`, threadID, messageID);
            }
        case 'buyfishingrod':
            {
                if (parseInt(body) > pathItem.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
                var data = pathItem[parseInt(body) - 1]
                var checkM = await checkMoney(senderID, data.price);
                if ((this.checkPath(4, senderID)).item.some(i => i.name == data.name)) return api.sendMessage('Bạn đã sở hữu vật phẩm này rồi!', threadID, messageID);
                (this.checkPath(4, senderID)).item.push({
                    name: data.name,
                    price: data.price,
                    durability: data.durability,
                    countdown: data.countdown,
                    countdownData: null,
                    image: data.image
                })
                writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
                api.unsendMessage(reply.messageID)
                var msg = { body: `Mua thành công ${data.name}\nGiá mua: ${data.price}$\nĐộ bền: ${data.durability}\nThời gian chờ: ${data.countdown}`, attachment: await this.image(data.image) }
                return api.sendMessage(msg, threadID, messageID);
            }
        case 'chooseFish':
            {
                if (parseInt(body) > reply.listCategory.length || parseInt(body) <= 0) return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
                api.unsendMessage(reply.messageID);
                if (reply.listCategory[parseInt(body) - 1].length == 0) return api.sendMessage('Không có con cá nào hết á, hmmm!', threadID, messageID);
                var fish = "=====ғιsн=====\n",
                    number = 1;
                for (let i of reply.listCategory[parseInt(body) - 1]) {
                    fish += `${number++}. ${i.name} (${i.size}cm) - Loại: ${i.category} - ${i.sell}$\n`
                }
                return api.sendMessage(fish + "Reply số thứ tự để bán (có thể rep nhiều số) hoặc reply 'all' để bán tất cả cá!", threadID, (error, info) => {
                    client.reply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "sell",
                        list: reply.listCategory[parseInt(body) - 1]
                    })
                }, messageID);
            }
        case 'sell':
            {
                if ((parseInt(body) > reply.list.length || parseInt(body) <= 0) && body.toLowerCase() != 'all') return api.sendMessage('Lựa chọn hong hợp lệ!', threadID, messageID);
                api.unsendMessage(reply.messageID)
                var bag = (this.checkPath(4, senderID)).fishBag
                var coins = 0;
                if (body.toLowerCase() == 'all') {
                    for (let i of reply.list) {
                        await Users.setData(senderID, { money: moneyUser + parseInt(i.sell) });
                        coins += parseInt(i.sell)
                        //console.log(i.ID)
                        var index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == i.ID);
                        bag.splice(index, 1);
                        writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
                    }
                    return api.sendMessage(`Bán thành công ${reply.list.length} con cá và thu về được ${coins}$`, threadID, messageID);
                } else {
                    var msg = 'Code_By_D-Jukie ' + body
                    var chooses = msg.split(" ").map(n => parseInt(n));
                    chooses.shift();
                    var text = `=====SELL=====\n`,
                        number = 1;
                    for (let i of chooses) {
                        const index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == reply.list[i - 1].ID);
                        text += `${number++}. ${bag[index].name} +${bag[index].sell}$\n`
                        coins += parseInt(bag[index].sell)
                        await Users.setData(senderID, { money: moneyUser + parseInt(bag[index].sell) });
                        bag.splice(index, 1);
                        writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
                    }
                    return api.sendMessage(text + `\nThu về được ${coins}$`, threadID, messageID);
                }
            }
        default:
            {
                api.unsendMessage(reply.messageID)
                return api.sendMessage('Lựa chọn không hợp lệ!', threadID, messageID);
            }
    }
    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Users.getData(senderID)) || {};
        w = i.money || 0
        if (w < parseInt(maxMoney)) return api.sendMessage('Bạn không đủ tiền để thực hiện giao dịch này!', threadID, messageID);
    }
}