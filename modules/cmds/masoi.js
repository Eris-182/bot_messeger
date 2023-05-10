export const config = {
  name: 'masoi',
  version: '1.0.0',
  role: 0,
  author: ['Horizon'],
  viDesc: 'Game Ma Sói',
  enDesc: "Game MaSoi",
  category: ['Game', 'Game'],
  usages: 'masoi [create 9,status,leave,join,delete]',
  timestamp: 1
}

import axios from 'axios'
import request from 'request'
import { join } from 'path'
import { unlinkSync, createReadStream, readFileSync, writeFileSync, existsSync, createWriteStream } from 'fs'

export async function onLoad() {
  if (!existsSync(process.cwd() + '/caches/werewolf.json')) {
    var { data } = await axios.get('https://manhkhac.github.io/data/json/werewolf.json', { method: 'GET' })
    writeFileSync(process.cwd() + '/caches/werewolf.json', JSON.stringify(data, null, 1 ? 2 : 9), 'utf8')
  }
  if (!existsSync(process.cwd() + '/caches/DanLang.png')) {
    request('https://manhkhac.github.io/data/img/masoi/DanLang.png')['pipe'](createWriteStream(process.cwd() + '/caches/DanLang.png'))
  }
  if (!existsSync(process.cwd() + '/caches/TienTri.png')) {
    request('https://manhkhac.github.io/data/img/masoi/TienTri.png')['pipe'](createWriteStream(process.cwd() + '/caches/TienTri.png'))
  }
  if (!existsSync(process.cwd() + '/caches/BaoVe.png')) {
    request('https://manhkhac.github.io/data/img/masoi/BaoVe.png')['pipe'](createWriteStream(process.cwd() + '/caches/BaoVe.png'))
  }
  if (!existsSync(process.cwd() + '/caches/ThoSan.png')) {
    request('https://manhkhac.github.io/data/img/masoi/ThoSan.png')['pipe'](createWriteStream(process.cwd() + '/caches/ThoSan.png'))
  }
  if (!existsSync(process.cwd() + '/caches/PhuThuy.png')) {
    request('https://manhkhac.github.io/data/img/masoi/PhuThuy.png')['pipe'](createWriteStream(process.cwd() + '/caches/PhuThuy.png'))
  }
  if (!existsSync(process.cwd() + '/caches/Cupid.png')) {
    request('https://manhkhac.github.io/data/img/masoi/Cupid.png')['pipe'](createWriteStream(process.cwd() + '/caches/Cupid.png'))
  }
  if (!existsSync(process.cwd() + '/caches/GiaLang.png')) {
    request('https://manhkhac.github.io/data/img/masoi/GiaLang.png')['pipe'](createWriteStream(process.cwd() + '/caches/GiaLang.png'))
  }
  if (!existsSync(process.cwd() + '/caches/CoBe.png')) {
    request('https://manhkhac.github.io/data/img/masoi/CoBe.png')['pipe'](createWriteStream(process.cwd() + '/caches/CoBe.png'))
  }
  if (!existsSync(process.cwd() + '/caches/CanhSatTruong.png')) {
    request('https://manhkhac.github.io/data/img/masoi/CanhSatTruong.png')['pipe'](createWriteStream(process.cwd() + '/caches/CanhSatTruong.png'))
  }
  if (!existsSync(process.cwd() + '/caches/SoiThuong.png')) {
    request('https://manhkhac.github.io/data/img/masoi/SoiThuong.png')['pipe'](createWriteStream(process.cwd() + '/caches/SoiThuong.png'))
  }
  if (!existsSync(process.cwd() + '/caches/SoiCon.png')) {
    request('https://manhkhac.github.io/data/img/masoi/SoiCon.png')['pipe'](createWriteStream(process.cwd() + '/caches/SoiCon.png'))
  }
}

let Global_ArrayChoose = {
  MaSoi: new Object(),
  BaoVe: new Array(),
  TienTri: new Object(),
  DanLang: new Object(),
}
let DataGM = {
  Die: '',
  NeedNumber: ''
}
let Block_Action = false;
let Block_Vote = false;
let Days = 0;

export async function onReply({ api, event, reply, Users }) {
  let values = global.moduleData.werewolf.get(global.AuthThread);
  let SoiT = values.player.filter(i => i.phe == "Ma Sói");
  if (Block_Action) return api.sendMessage("〉 Quá Trễ Rồi 🙉", event.threadID);
  if (reply.author && event.senderID != reply.author) return;
  else switch (parseInt(values.type)) {
    case 9: {
      switch (reply.type) {
        case "SoiChoose": {
          if (isNaN(event.body)) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
          if (event.body > reply.Listuser.length) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
          var Choose = reply.Listuser[event.body - 1].id;
          let NanNhan = await Users.getName(Choose) || (await api.getUserInfo(Choose)).name;
          let name = await Users.getName(event.senderID) || (await api.getUserInfo(event.senderID)).name;
          var Find = SoiT.find(i => i.id == reply.author);
          if (Find.vote == 0 || Find.vote == '') {
            Global_ArrayChoose.MaSoi[Choose] == undefined ? Global_ArrayChoose.MaSoi[Choose] = 1 : Global_ArrayChoose.MaSoi[Choose]++;
          }
          else {
            Global_ArrayChoose.MaSoi[Find.vote] == undefined ? Global_ArrayChoose.MaSoi[Find.vote] = 0 : Global_ArrayChoose.MaSoi[Find.vote] - 1;
            if (Global_ArrayChoose.MaSoi[Find.vote] == 0) {
              delete Global_ArrayChoose.MaSoi[Find.vote];
            }
            Global_ArrayChoose.MaSoi[Choose] == undefined ? Global_ArrayChoose.MaSoi[Choose] = 1 : Global_ArrayChoose.MaSoi[Choose]++;
          }
          Find.vote = Choose;
          let Values = global.moduleData.werewolf.get(global.AuthThread);
          for (let i of reply.TeamSoi) {
            api.sendMessage('〉 Ma Sói: ' + name + ' Vừa Vote ' + NanNhan + '\x0aTổng Vote: ' + Global_ArrayChoose['MaSoi'][Choose] + '/' + Values['player']['filter'](_0x32101b => _0x32101b['phe'] == 'Ma Sói')['length'], i);
          }
          api.sendMessage('〉 Bạn Đã Vote: ' + NanNhan + '\x0aTổng Vote: ' + Global_ArrayChoose['MaSoi'][Choose] + '/' + Values['player']['filter'](_0x402a9e => _0x402a9e['phe'] == 'Ma Sói')['length'] + '\x0aBạn Có Thể Thay Đổi Đối Tượng', reply.author);
        }
          break;
        case "Another_Role_Async": {
          switch (reply.role) {
            case "Tiên Tri": {
              if (isNaN(event.body)) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
              if (event.body > reply.Listuser.length) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
              var Choose = reply.Listuser[event.body - 1];
              let NanNhan = await Users.getName(Choose.id) || (await api.getUserInfo(Choose.id)).name;
              Global_ArrayChoose.TienTri.Choose = Choose;
              Global_ArrayChoose.TienTri.Owner = event.senderID;
              return api.sendMessage('〉 Bạn Đã Chọn Tiên Tri: ' + NanNhan + ' Trong Đêm Nay, Bạn Có Thể Chọn Lại !', event.threadID);
            }
            case "Bảo Vệ": {
              if (isNaN(event.body)) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
              if (event.body > reply.Listuser.length) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
              var Choose = reply.Listuser[event.body - 1];
              let NanNhan = await Users.getName(Choose.id) || (await api.getUserInfo(Choose.id)).name;
              Global_ArrayChoose.BaoVe[0] = Choose.id;
              return api.sendMessage('〉 Bạn đã chọn bảo vệ ' + NanNhan + ', người chơi này sẽ bất tử trong đêm nay 💀, bạn có thể chọn lại !', event.threadID);
            }
          }
        }
        case "VillageVoting": {
          if (Block_Vote) return api.sendMessage("〉 Quá Trễ Rồi 🙉", event.threadID);
          if (isNaN(event.body)) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
          if (event.body > reply.Listuser.length) return api.sendMessage("〉 Sai Rồi, Hãy Nhập Một Con Số !", event.threadID);
          if (!reply.Listuser.some(i => i.id == event.senderID)) return api.sendMessage("〉 Bạn Không Có Quyền Vote !", event.threadID);
          var Choose = reply.Listuser[event.body - 1];
          Global_ArrayChoose.DanLang[Choose.id] == undefined ? Global_ArrayChoose.DanLang[Choose.id] = 1 : Global_ArrayChoose.DanLang[Choose.id]++;
          var Find = reply.Listuser.find(i => i.id == event.senderID);
          if (Find.vote == 0 || Find.vote == '') {
            Global_ArrayChoose.DanLang[Choose.id] == undefined ? Global_ArrayChoose.DanLang[Choose.id] = 1 : Global_ArrayChoose.DanLang[Choose.id]++;
          }
          else {
            Global_ArrayChoose.DanLang[Find.vote] == undefined ? Global_ArrayChoose.DanLang[Find.vote] = 0 : Global_ArrayChoose.DanLang[Find.vote] - 1;
            if (Global_ArrayChoose.DanLang[Find.vote] == 0) {
              delete Global_ArrayChoose.DanLang[Find.vote];
            }
            Global_ArrayChoose.MaSoi[Choose] == undefined ? Global_ArrayChoose.DanLang[Choose] = 1 : Global_ArrayChoose.DanLang[Choose]++;
          }
          Find.vote = Choose;
          var name = await Users.getName(Choose.id) || (await api.getUserInfo(Choose.id)).name;
          api.sendMessage('〉 Vote: ' + name + '(' + event['body'] + ') Thành Công ! \x0aTổng Vote: ' + Global_ArrayChoose['DanLang'][Choose['id']] + '/' + (reply['Listuser']['length'] - SoiT['length'] - 0x1), event.threadID);
        }
          break;
      }
    }
  }
}

export async function MaSoiChoose(api, event, Users, Data, TeamSoi) {
  var values = Data.get(event.threadID)
  var sus = values.player.filter(i => i.phe == 'Ma Sói')
  for (let i of sus) {
    var values = Data.get(event.threadID)
    var playerfilter = values.player.filter(i => i.phe != 'Ma Sói')
    var Player = [];
    var Objection = "";
    var stt = 1;
    api.sendMessage("〉 Phản Hồi Và Chọn 1 trong (tin nhắn chứa) các tên được liệt kê dưới đây, chú ý : bản cần chọn đúng và chỉ đc chọn 1 lần", i.id);
    for (let ii of playerfilter) {
      var name = await Users.getName(ii.id) || (await api.getUserInfo(ii.id)).name;
      Player.push({ id: ii.id, name: name, stt: stt, role: ii.vai });
      Objection += 'Đối Tượng Số: ' + stt + '\x0aTên: ' + name + '\x0aUID: ' + ii['id'] + '\x0aFacebook: Facebook.com/' + ii['id'] + '\x0a\x0a';
      if (ii == playerfilter[playerfilter.length - 1]) {
        api.sendMessage(Objection, i.id, (err, info) => global.client.reply.push({
          type: "SoiChoose",
          name: this.config.name,
          author: i.id,
          messageID: info.messageID,
          Listuser: Player,
          TeamSoi
        }));
        api.sendMessage('Bạn Có 30 Giây Để Lựa Chọn Để Vote Kill 1 Người !', i.id)
      }
      stt++;
    }
  }

}

export async function Another_Role_Async(api, event, Users, Data) {
  let values = Data.get(event.threadID)
  var playerfilter = values.player;
  for (let i of playerfilter) {
    switch (i.vai) {
      case "Dân Làng": {
        api.sendMessage('〉 Không Có Việc Gì Làm, Đi Ngủ Thôi 🐧', i.id);
      }
        break;
      case "Tiên Tri": {
        let Player = [];
        let Objection = "";
        let stt = 1;
        for (let i of playerfilter) {
          var name = await Users.getName(i.id) || (await api.getUserInfo(i.id)).name;
          Player.push({ id: i.id, name: name, stt: stt, role: i.vai });
          Objection += 'Đối Tượng Số: ' + stt + '\x0aTên: ' + name + '\x0aUID: ' + i['id'] + '\x0aFacebook: Facebook.com/' + i['id'] + '\x0a\x0a';
          stt++;
        }
        api.sendMessage('〉 Hãy Chọn 1 Trong Những Đối Tượng Dưới Đây Để Xem Có Phải Là Sói Hay Không !', i.id);
        api.sendMessage(Objection, i.id, (err, info) => global.client.reply.push({
          type: "Another_Role_Async",
          name: this.config.name,
          author: i.id,
          messageID: info.messageID,
          Listuser: Player,
          role: i.vai,
        }));
      }
        break;
      case "Bảo Vệ": {
        let Player = [];
        let Objection = "";
        let stt = 1;
        for (let i of playerfilter) {
          var name = await Users.getName(i.id) || (await api.getUserInfo(i.id)).name;
          Player.push({ id: i.id, name: name, stt: stt, role: i.vai });
          Objection += 'Đối Tượng Số: ' + stt + '\x0aTên: ' + name + '\x0aUID: ' + i['id'] + '\x0aFacebook: Facebook.com/' + i['id'] + '\x0a\x0a';
          stt++
        }
        api.sendMessage('〉 Hãy Chọn 1 Trong Những Đối Tượng Dưới Đây Để Bảo Vệ !', i.id);
        api.sendMessage(Objection, i.id, (err, info) => global.client.reply.push({
          type: "Another_Role_Async",
          name: this.config.name,
          author: i.id,
          messageID: info.messageID,
          Listuser: Player,
          role: "Bảo Vệ"
        }));
      }
        break;
    }
  }
}

export async function VillageVoting(api, event, Users, Data, TeamSoi) {
  api.sendMessage('〉 Đã Hết Thời Gian Thảo Luận !, Và Bây Giờ Các Bạn Có 1 Phút Để Vote Treo Cổ !', event.threadID);
  await new Promise(resolve => setTimeout(resolve, 1000));
  Block_Action = false;
  var values = Data.get(event.threadID)
  var playerfilter = values.player;
  var Player = [];
  var Objection = "";
  var stt = 1;
  for (let i of playerfilter) {
    var name = await Users.getName(i.id) || (await api.getUserInfo(i.id)).name;
    Player.push({ id: i.id, name: name, stt: stt, role: i.vai });
    Objection += 'Đối Tượng Số: ' + stt + '\x0aTên: ' + name + '\x0aUID: ' + i['id'] + '\x0aFacebook: Facebook.com/' + i['id'] + '\x0a\x0a';
    stt++;
  }
  api.sendMessage('〉 Hãy Chọn 1 Trong Những Đối Tượng Dưới Đây Để Vote Treo Cổ !', event.threadID);
  api.sendMessage(Objection, event.threadID, (err, info) => global.client.reply.push({
    type: "VillageVoting",
    name: this.config.name,
    messageID: info.messageID,
    Listuser: Player,
    TeamSoi
  }));
}

export async function VillageLogic_Sort(api, event, Users, Data, TeamSoi) {
  Block_Vote = true;
  var values = Data.get(event.threadID)
  var playerfilter = values.player;
  var list = [];
  api.sendMessage('〉 Đã Hết Thời Gian,Đang Tính Toán Các Thuật Toán ...', event.threadID);
  await new Promise(resolve => setTimeout(resolve, 1000));
  for (let i of Object.keys(Global_ArrayChoose.DanLang)) {
    var NeedNumber = playerfilter.length - playerfilter.filter(i => i.phe == "Ma Sói").length - 1;
    var NumberU = Global_ArrayChoose.DanLang[i];
    if (NumberU >= NeedNumber) {
      list.push(i);
    }
  }
  if (list.length < 1) {
    api.sendMessage('〉 Không Có Ai Treo Bị Treo Cổ Trong Ngày Hôm Nay !', event.threadID);
    return;
  }
  else if (list.length == 1) {
    var index = list[0];
    var Find = playerfilter.find(i => i.id == index);
    var name = await Users.getName(Find.id) || (await api.getUserInfo(Find.id)).name;
    api.sendMessage('〉 Người Bị Treo Cổ: ' + name + '\x0aChức Năng: ' + Find['vai'], event.threadID);
    playerfilter.splice(playerfilter.findIndex(i => i.id == index), 1);
    if (Find.vai == "Ma Sói") {
      TeamSoi.splice(TeamSoi.findIndex(i => i.id == index), 1);
      return;
    }
  }
  else {
    return api.sendMessage('〉 Dân Làng Đã Không Chọn Được Ai Để Treo Cổ !', event.threadID);
  }
}

export async function Morning_Time(api, event, Users, Data, TeamSoi) {
  Days += 1;
  let values = Data.get(event.threadID)
  let All = values.player;
  try {
    let Values = Data.get(global.AuthThread);
    var WereWolf = Values.player.filter(i => i.phe == "Ma Sói");
    var Villager = Values.player.filter(i => i.phe == "Dân");
    if (Villager.length <= WereWolf.length) {
      return await EndGame(api, event, Data, "Werewolf", Users);
    }
    else {
      api.sendMessage("〉 Màn đêm kết thúc, và đây là thông tin của ngày hôm nay !", event.threadID);
      api.sendMessage('Ngày Thứ: ' + Days + '\x0aCòn Sống: ' + All['length'] + '\x0aNgười Chết: ' + (DataGM['Die'] ? DataGM['Die'] : 'Không Có Ai') + '\x0aTổng Sói: ' + Data['get'](event['threadID'])['player']['filter'](_0xb674f8 => _0xb674f8['phe'] == 'Ma Sói')['length'] + '\x0aTổng Dân: ' + Data['get'](event['threadID'])['player']['filter'](_0x97b918 => _0x97b918['phe'] == 'Dân')['length'], event.threadID);
      await new Promise(resolve => setTimeout(resolve, 3000));
      api.sendMessage('〉 Các Bạn Có 1 Phút Để Thảo Luận Treo Cổ Ai !', event.threadID);
      await new Promise(resolve => setTimeout(resolve, 60 * 1000));
      await VillageVoting(api, event, Users, Data, TeamSoi);
      await new Promise(resolve => setTimeout(resolve, 60 * 1000));
      await VillageLogic_Sort(api, event, Users, Data, TeamSoi);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await ResetData(api, event, Users, Data, TeamSoi);
    }
  }
  catch (e) {
    console.log(e);
  }
}

export async function Check_Win_Loop(api, event, Users, Data, TeamSoi) {
  var Values = Data.get(event.threadID);
  var VillageFilter = Values.player.filter(i => i.phe != "Ma Sói");
  var WolfFilter = Values.player.filter(i => i.phe == "Ma Sói");
  if (WolfFilter.length == 0) {
    return await EndGame(api, event, Data, "Village", Users);
  }
  else if (parseInt(VillageFilter.length) <= parseInt(WolfFilter.length) || parseInt(VillageFilter.length) == 0) {
    return await EndGame(api, event, Data, "Werewolf", Users);
  }
  else {
    return await start(api, event, Users, Data, TeamSoi);
  }
}

export async function ResetData(api, event, Users, Data, TeamSoi) {
  global.client.reply = [];
  DataGM = new Object({
    Die: '',
    NeedNumber: ''
  });
  Block_Action = false;
  Block_Vote = false;

  for (let i of Object.keys(Global_ArrayChoose)) {
    if (i == 'BaoVe')
      Global_ArrayChoose[i] = [];
    else
      Global_ArrayChoose[i] = {};
  }
  return await Check_Win_Loop(api, event, Users, Data, TeamSoi);
}

export async function EndGame(api, event, Data, winner, Users) {
  switch (winner) {
    case "Village": {
      api.sendMessage('〉 Chúc Mừng Dân Làng Đã Tiêu Diệt Được Tất Cả Sói ! Và Phần Thắng Thuộc Về Dân Làng !!!', event.threadID);
      var values = Data.get(event.threadID);
      var All = values.player;
      var Objection = '';
      for (let i of All) {
        var name = (await Users.getName(i.id)) || (await api.getUserInfo(i.id)).name;
        Objection += 'Tên: ' + name + '\x0aRole: ' + i['vai'] + '\x0aUID: ' + i['id'] + '\x0aFacebook: Facebook.com/' + i['id'] + '\x0a\x0a';
      }
      global.moduleData.werewolf = new Map();
      return api.sendMessage('〉 Tổng Ngày Trôi Qua: ' + Days + '\x0aTổng Người Còn Sống: ' + All['length'] + '\x0a\x0a' + Objection, event.threadID);
    }
    case "Werewolf": {
      api.sendMessage('〉 Chúc Mừng Sói Đã Tiêu Diệt Được Tất Cả Dân Làng ! Và Phần Thắng Thuộc Về Sói !!!', event.threadID);
      var values = Data.get(event.threadID);
      var All = values.player;
      var Objection = '';
      for (let i of All) {
        var name = (await Users.getName(i.id)) || (await api.getUserInfo(i.id)).name;
        Objection += 'Tên: ' + name + '\x0aRole: ' + i['vai'] + '\x0aUID: ' + i['id'] + '\x0aFacebook: Facebook.com/' + i['id'] + '\x0a\x0a';
      }
      global.moduleData.werewolf = new Map();
      return api.sendMessage('〉 Tổng Ngày Trôi Qua: ' + Days + '\x0aTổng Người Còn Sống: ' + All['length'] + '\x0a\x0a' + Objection, event.threadID);
    }
  }
}

export async function Logic_Sort(api, event, Users, Data, TeamSoi) {
  //Về Phần Respone cho sói khi hết time
  if (Global_ArrayChoose.MaSoi.hasOwnProperty(Global_ArrayChoose.BaoVe[0])) {
    if (Object.keys(Global_ArrayChoose.MaSoi).length == 2) {
      var RandomTarget = Object.keys(Global_ArrayChoose.MaSoi)[Math.floor(Math.random() * Object.keys(Global_ArrayChoose.MaSoi).length)];
      var name = (await Users.getName(RandomTarget)) || (await api.getUserInfo(RandomTarget)).name;
      for (let i of TeamSoi) {
        api.sendMessage(`〉 Vì Không Cùng Mục Tiêu, Nên Hệ Thống Sẽ Random Đối Tượng Mà 2 Bên Đã Chọn !`, i);
        api.sendMessage(`〉 Đối Tượng Được Chọn Là: ${name}`, i);
      }
      if (Global_ArrayChoose.MaSoi.hasOwnProperty(Global_ArrayChoose.BaoVe[0])) {
        var values = Data.get(global.AuthThread)
        var find = values.player.find(i => i.vai == "Bảo Vệ");
        for (let i of TeamSoi) {
          api.sendMessage(`〉 ${name} Đã Bị Bảo Vệ !`, i, (err, info) => { Global_ArrayChoose.MaSoi = {}; });
        }
        api.sendMessage(`〉 Bạn Vừa Bảo Vệ ${name} Thành Công !`, find.id);
      }
      else {
        for (let i of TeamSoi) {
          api.sendMessage(`〉 Đã Thủ Tiêu Thành Công: ${name}`, i, (err, info) => { Global_ArrayChoose.MaSoi = {}; });
        }
        DataGM.Die = name;
        var values = Data.get(global.AuthThread)
        values.player.splice(values.player.findIndex(i => i.id == RandomTarget), 1);
        return api.sendMessage('〉 Bạn Đã Bị Ma Sói Thủ Tiêu Tối Qua !', RandomTarget);
      }
    }
    else if (Global_ArrayChoose.MaSoi.hasOwnProperty(Global_ArrayChoose.BaoVe[0])) {
      var values = Data.get(global.AuthThread)
      var find = values.player.find(i => i.vai == "Bảo Vệ");
      var name = (await Users.getName(Global_ArrayChoose.BaoVe[0])) || (await api.getUserInfo(Global_ArrayChoose.BaoVe[0])).name;
      for (let i of TeamSoi) {
        api.sendMessage(`〉 ${name} Đã Bị Bảo Vệ !`, i, (err, info) => { Global_ArrayChoose.MaSoi = {}; });
      }
      api.sendMessage(`〉 Bạn Vừa Bảo Vệ ${name} Thành Công !`, find.id);
    }
  }
  else {
    let Values = Data.get(global.AuthThread);
    let WereWolf = Values.player.filter(i => i.phe == "Ma Sói");
    if (Object.keys(Global_ArrayChoose.MaSoi).length == 0 || Object.keys(Global_ArrayChoose.MaSoi).length == 1 && Global_ArrayChoose.MaSoi[Object.keys(Global_ArrayChoose.MaSoi)[0]] < WereWolf.length) {
      for (let i of TeamSoi) {
        api.sendMessage(`〉 Không Có Đối Tượng Nào Được Chọn Hoặc Không Đủ Vote !`, i);
      }
    }
    else {
      if (Object.keys(Global_ArrayChoose.MaSoi).length == 2) {
        var RandomTarget = Object.keys(Global_ArrayChoose.MaSoi)[Math.floor(Math.random() * Object.keys(Global_ArrayChoose.MaSoi).length)];
        var name = (await Users.getName(RandomTarget)) || (await api.getUserInfo(RandomTarget)).name;
        for (let i of TeamSoi) {
          api.sendMessage(`〉 Vì Không Cùng Mục Tiêu, Nên Hệ Thống Sẽ Random Đối Tượng Mà 2 Bên Đã Chọn !`, i);
          api.sendMessage(`〉 Đối Tượng Được Chọn Là: ${name}`, i);
        }
        if (Global_ArrayChoose.MaSoi.hasOwnProperty(Global_ArrayChoose.BaoVe[0])) {
          var values = Data.get(global.AuthThread)
          var find = values.player.find(i => i.vai == "Bảo Vệ");
          for (let i of TeamSoi) {
            api.sendMessage(`〉 ${name} Đã Bị Bảo Vệ !`, i, (err, info) => { Global_ArrayChoose.MaSoi = {}; });
          }
          api.sendMessage(`〉 Bạn Vừa Bảo Vệ ${name} Thành Công !`, find.id);
        }
        else {
          for (let i of TeamSoi) {
            api.sendMessage(`〉 Đã Thủ Tiêu Thành Công: ${name}`, i, (err, info) => { Global_ArrayChoose.MaSoi = {}; });
          }
          DataGM.Die = name;
          var values = Data.get(global.AuthThread)
          values.player.splice(values.player.findIndex(i => i.id == RandomTarget), 1);
          return api.sendMessage('〉 Bạn Đã Bị Ma Sói Thủ Tiêu Tối Qua !', RandomTarget);
        }
      }
      else {
        var values = Data.get(global.AuthThread)
        var name = (await Users.getName(Object.keys(Global_ArrayChoose.MaSoi)[0])) || (await api.getUserInfo(Object.keys(Global_ArrayChoose.MaSoi)[0])).name;
        for (let i of TeamSoi) {
          api.sendMessage(`〉 Đã Thủ Tiêu Thành Công: ${name}`, i, (err, info) => { Global_ArrayChoose.MaSoi = {}; });
        }
        DataGM.Die = name;
        values.player.splice(values.player.findIndex(i => i.id == Object.keys(Global_ArrayChoose.MaSoi)[0]), 1);
        return api.sendMessage('〉 Bạn Đã Bị Ma Sói Thủ Tiêu Tối Qua !', Object.keys(Global_ArrayChoose.MaSoi)[0]);
      }
    }
  }
  //tiên tri
  if (getType(Global_ArrayChoose.TienTri.Choose) == "Object" && Global_ArrayChoose.TienTri.Choose != "String") {
    var name = (await Users.getName(Global_ArrayChoose.TienTri.Choose.id)) || (await api.getUserInfo(Global_ArrayChoose.TienTri.Choose.id)).name;
    api.sendMessage('〉 Chức Vụ Của ' + name + " Là: " + Global_ArrayChoose.TienTri.Choose.role, Global_ArrayChoose.TienTri.Owner);
  }
}

export function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

async function start(api, event, Users, Data, TeamSoi) {
  await new Promise(resolve => setTimeout(resolve, 3 * 1000));
  var out = async (msg) => api.sendMessage("〉 " + msg, event.threadID);
  try {
    out("〉 Màn đêm bắt đầu buông xuống !, bây giờ là thời gian của sói hoạt động...");
    await MaSoiChoose(api, event, Users, Data, TeamSoi);
    await Another_Role_Async(api, event, Users, Data);
    await new Promise(resolve => setTimeout(resolve, 45 * 1000));
    Block_Action = true;
    await Logic_Sort(api, event, Users, Data, TeamSoi);
    await Morning_Time(api, event, Users, Data, TeamSoi);
  }
  catch (e) {
    console.log(e);
    return out("Đã Xảy Ra Lỗi Trong Quá Trình Thực Thi Game !")
  }
}

export async function onEvent({ api, event, Users }) {
  const pathData = join(process.cwd() + '/caches/werewolf.json')
  let dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  const { senderID, threadID, body, messageID } = event; var Team1 = [], LOI = [];
  if (!global.moduleData.werewolf) global.moduleData.werewolf = new Map();
  if (!global.moduleData.werewolf.get(threadID)) return;
  var values = global.moduleData.werewolf.get(threadID);
  global.moduleData.werewolf.set(threadID, values);
  if (values.start != 1) return;
  var content = body.toUpperCase();
  switch (content) {
    case "CHIA VAI":
    case "CHIAVAI": {
      switch (parseInt(values.type)) {
        case 9: {
          var role = ["Dân Làng", "Sói thường", "Tiên Tri", "Bảo Vệ", "Sói thường", "Dân Làng", "Dân Làng", "Dân Làng", "Dân Làng"];
          for (let i = 0; i < values.player.length; i++) {
            var vai = role[Math.floor(Math.random() * role.length)];
            var is = dataJson.find(data => data.Name == vai);
            values.player[i].vai = is.Name;
            values.player[i].phe = is.Type;
            role.splice(role.indexOf(vai), 1);
            if (vai == "Sói thường") Team1.push(values.player[i].id);
            await new Promise(resolve => setTimeout(resolve, 500));
            api.sendMessage({
              body: '〉 Vai Trò Của Bạn Là: ' + is['Name'] + '\x0aChi Tiết: ' + is['Description'] + '\x0aThuộc Phe: ' + is['Type'] + ' !',
              attachment: createReadStream(process.cwd() + is.File)
            }, values.player[i].id, (ee, inf) => {
              if (ee) { LOI.push(values.player[i].id); }
            });
          }
          values.phanvai = 1; global.moduleData.werewolf.set(threadID, values);
          api.sendMessage("〉 Đã Phân Vai Thành Công !, Hãy Kiểm Tra Tin Nhắn Riêng Của Bot, Lưu Ý Nếu Acc Dưới 18 Tuổi Không Được Tham Gia !", event.threadID, event.messageID);
          if (LOI.length != 0) {
            for (let love of LOI) {
              var name = (await Users.getName(love)) || (await api.getUserInfo(love)).name;
              api.sendMessage("〉 Check Hệ Thống Và Phát Hiện Rằng Không Thể Gửi Tin Nhắn Đến : " + name, threadID);
            }
            return api.sendMessage("〉 Không gửi Được Tin Nhắn Đồng Nghĩa Player Đã Chặn Bot Hoặc Acc Dưới 18+,Game Sẽ Không Thực Hiện Được, Tiến Hành Restart Bot, Hủy Game Tránh Lỗi ( bấm werewolf help để biết chi tiết )", threadID, (err, info) => {
              global.moduleData.werewolf.delete(event.threadID)
              return api.sendMessage(`〉 Tự động huỷ bàn ma sói thành công`, threadID)
              //process.exit(1); 
            });
          }
          if (Team1.length != 0) {
            try {
              for (let check of Team1) {
                if (check == Team1[0]) {
                  var name = (await Users.getName(Team1[1])) || (await api.getUserInfo(Team1[1])).name;
                  api.sendMessage("〉 Đồng Đội Của Bạn Là : " + name + ", ID: " + Team1[1] + "\nHãy Nhắn Tin Với Nhau Để Hợp Tác Tốt Nhất !", check);
                }
                else if (check == Team1[1]) {
                  var name = (await Users.getName(Team1[0])) || (await api.getUserInfo(Team1[0])).name;
                  api.sendMessage("〉 Đồng Đội Của Bạn Là : " + name + ", UID: " + Team1[0] + "\nHãy Nhắn Tin Với Nhau Để Hợp Tác Tốt Nhất !", check);
                }
              }
              return await start(api, event, Users, global.moduleData.werewolf, Team1);
            }
            catch (e) { console.log(e); return api.sendMessage('〉 Đã Lỗi !', event.threadID); }
          }
        }
      }
    };
      break;
    case "TEST": {
      var test = [];
      for (let i = 0; i < values.player.length; i++) {
        api.sendMessage('〉 Bạn Có Thấy Tin Nhắn Này ?', values.player[i].id, (error, info) => { if (error) { test.push(values.player[i].id); } });
      }
      if (test.length != 0) {
        for (let kan of test) {
          var name = (await Users.getName(kan)) || (await api.getUserInfo(kan)).name;
          api.sendMessage("〉 Phát Hiện Acc Dưới 18+ Hoặc Đã Block Acc Bot" + " Tại User: " + name + ", Tiến Hành Restart Bot, Hủy Game Tránh Lỗi,Chi Tiết Tại werewolf help", event.threadID);
        }
        global.moduleData.werewolf.delete(event.threadID)
        return api.sendMessage(`〉 Tự động huỷ bàn ma sói thành công`, threadID)
        // return process.exit(1);
      }
      else return api.sendMessage("〉 Không Phát Hiện Acc Dưới 18+ Hoặc Đã Block Acc Bot", event.threadID);
    }
      break;
    case "PING": {
      return api.sendMessage(`〉 Tổng Số Người Tham Gia: ${values.player.length}, Đã Chia Phe: ${values.phanvai == 1 ? "True" : "False"}, Đã Start Game: ${values.start == 1 ? "True" : "False"}`, event.threadID);
    }
    default: { }
  }
};

export async function onMessage({ api, event, args, Users }) {
  let mprefix = global.data.allThreadData[event.threadID].prefix || global.client.config.PREFIX;
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID); let { senderID, threadID, messageID } = event;
  switch (args[0]) {
    case "9": {
      switch (args[1]) {
        case "create":
        case "Create": {
          if (!global.moduleData.werewolf) global.moduleData.werewolf = new Map();
          var values = global.moduleData.werewolf.get(event.threadID) || {};
          if (global.moduleData.werewolf.has(event.threadID)) return api.sendMessage("〉 Nhóm đang có bàn ma sói !", threadID, messageID);
          global.moduleData.werewolf.set(event.threadID, { author: event.senderID, start: 0, type: '9', phanvai: 0, player: [] });
          global.AuthThread = event.threadID;
          return out(`〉 Đã Tạo Thành Công Bàn Có 8-9 Người! Hãy bấm ${mprefix}masoi join để tham gia !, Hướng Dẫn Tại ${mprefix}masoi help!, Lưu Ý Không Được Cho Acc Dưới 18 Tuổi ( Facebook ) Chơi Vì Sẽ Lỗi !`);
        }
        case "check":
        case "Check": {
          var values = global.moduleData.werewolf.get(event.threadID) || {};
          return out(`〉 Status: ${values.player.length}/${values.type}`);
        }
      }
    }
      break;
    case "10-11": {
      return out("〉 Chưa Hoàn Thành !");
    }
    case "12-13": {
      return out("〉 Chưa Hoàn Thành !");
    }
    case "14-15": {
      return out("〉 Chưa Hoàn Thành !");
    }
    case "16-17": {
      return out("〉 Chưa Hoàn Thành !");
    }
    case "18-19": {
      return out("〉 Chưa Hoàn Thành !");
    }
    case "join":
    case "Join": {
      // let _idUser = ['100012371343281', '100007653399051', '100048593391564', '100025536690946', '100045223667485', '100038379006171',
      //  '100073627286185', '100000272507589','100000284670465', '100006622276498', '100026707747289', '100035731083424'];
      // for (let idUser of _idUser) {
      //   console.log(idUser)

      var values = global.moduleData.werewolf.get(event.threadID) || {};
      if (!values.player) return out('Tạo Phòng Đê'); if (values.player.length >= values.type) return out("Phòng Đã Đầy !");
      // if (values.player.find(item => item.id == senderID)) continue;
      if (values.player.find(item => item.id == senderID)) return api.sendMessage("〉 Bạn Đã Tham Gia Rồi !", event.threadID, event.messageID);
      if (!values) return api.sendMessage("〉 Hiện Tại Chưa Có Ván Ma Sói Nào Được Mở!", event.threadID, event.messageID);
      if (values.start == 1) return api.sendMessage("〉 Chin Nhỗi Nhưng Ván Ma Sói Của Nhóm Này Đã Start !", threadID, messageID);
      values.player.push({ "id": senderID, "vai": 0, "phe": 0, "ready": false, "vote": 0 });
      global.moduleData.werewolf.set(threadID, values);

      // }
      return api.sendMessage(`〉 Status: ${values.player.length}/${values.type}`, threadID)
    }
    case "leave":
    case "Leave": {
      var values = global.moduleData.werewolf.get(event.threadID) || {};
      if (typeof values.player == "undefined") return api.sendMessage(`〉 Hãy Tạo Ván Ma Sói Bằng Lệnh ${mprefix}masoi số người tham gia :[8-9] Create !`, event.threadID, event.messageID);
      if (!values.player.some(item => item.id == senderID)) return api.sendMessage("〉 Bạn chưa tham gia vào bàn ma sói trong nhóm này!", event.threadID, event.messageID);
      if (values.start == 1) return api.sendMessage("〉 Chin Nhỗi Nhưng Ván Ma Sói Của Nhóm Này Đã Start !", threadID, messageID);
      if (values.author == senderID) {
        global.moduleData.werewolf.delete(threadID);
        api.sendMessage("〉 Chủ Game Đã Rời Khỏi Game = Hủy !", threadID, messageID);
      }
      else {
        values.player.splice(values.player.findIndex(item => item.id === senderID), 1);
        api.sendMessage("〉 Bạn Đã Rời Khỏi Ma Sói Thành Công !", threadID, messageID);
        global.moduleData.werewolf.set(threadID, values);
      }
    }
      break;
    case 'status':
    case "Status": {
      var values = global.moduleData.werewolf.get(event.threadID) || {};
      if (typeof values.player == "undefined") return api.sendMessage(`〉 Hãy Tạo Ván Ma Sói Bằng Lệnh ${mprefix}masoi số người tham gia :[8-9] Create !`, event.threadID, event.messageID);
      var name = (await Users.getName(values.author)) || (await api.getUserInfo(values.author));
      return out('◆━━━━━━[\x20🐧\x20Status\x20WereWolf\x20🐧\x20]━━━━━━◆\x0a[🐧]\x20=>\x20Chủ\x20Game:\x20' + name + '\x0a[🐧]\x20=>\x20Loại\x20Bàn\x20:\x20' + values['type'] + '\x20Player\x0a[🐧]\x20=>\x20Số\x20Người\x20Tham\x20Gia:\x20' + values['player']['length'] + '/' + values['type']);
    }
    case 'start':
    case 'Start': {
      var values = global.moduleData.werewolf.get(event.threadID) || {};
      if (!values) return api.sendMessage("〉 Hiện Tại Chưa Có Ván Ma Sói Nào Được Mở!", event.threadID, event.messageID);
      if (senderID == values.author) {
        if (values.player.length <= 1 || values.player.length != values.type) return api.sendMessage(`〉 Đang Thiếu Người, Hiện Tại Có : ${values.player.length}/${values.type} Người !`, threadID, messageID);
        if (values.start == 1) return api.sendMessage("〉 Đã Bắt Đầu Rồi !", threadID, messageID);
        values.start = 1;
        return out("〉 Bắt Đầu Thành Công!");
      }
    }
    case "delete":
    case "del": {
      var values = global.moduleData.werewolf.get(event.threadID) || {};
      if (typeof values.player == "undefined") return api.sendMessage(`〉Hiện tại chưa có bàn ma sói nào được mở!`, event.threadID, event.messageID);
      global.moduleData.werewolf.delete(event.threadID)
      return api.sendMessage(`〉 Huỷ bàn ma sói thành công`, threadID)
    }
      break;
    case "help":
    case "Help": return out(`〉 Các Loại: masoi [9,status,leave,join]\nTạo Bàn: ${mprefix}masoi 9 create\nKiểm Tra: ${mprefix}masoi 9 check\nRời Bàn: ${mprefix}masoi leave\nTham Gia: ${mprefix}masoi join\nBắt Đầu: ${mprefix}masoi start\nHuỷ bàn: ${mprefix}masoi del\nLưu Ý: Không Được Cho Acc Dưới 18 Tuổi ( Facebook ) Chơi Vì Sẽ Lỗi !`);
    default: return out(`〉 Các Loại: masoi [9,status,leave,join]\nTạo Bàn: ${mprefix}masoi 9 create\nKiểm Tra: ${mprefix}masoi 9 check\nRời Bàn: ${mprefix}masoi leave\nTham Gia: ${mprefix}masoi join\nBắt Đầu: ${mprefix}masoi start\nHuỷ bàn: ${mprefix}masoi del\nLưu Ý: Không Được Cho Acc Dưới 18 Tuổi ( Facebook ) Chơi Vì Sẽ Lỗi !`);
  }
};