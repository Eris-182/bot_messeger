'use strict';const _0x25e1be=_0x4b63;function _0x4b63(_0x2eb800,_0x4637c3){const _0x2f1dc9=_0x2f1d();return _0x4b63=function(_0x4b632e,_0x461cb6){_0x4b632e=_0x4b632e-0x133;let _0x176baf=_0x2f1dc9[_0x4b632e];return _0x176baf;},_0x4b63(_0x2eb800,_0x4637c3);}(function(_0x2c049f,_0x3198c2){const _0x1bbebc=_0x4b63,_0xdc5466=_0x2c049f();while(!![]){try{const _0x2f4e98=-parseInt(_0x1bbebc(0x197))/0x1*(-parseInt(_0x1bbebc(0x184))/0x2)+-parseInt(_0x1bbebc(0x186))/0x3*(-parseInt(_0x1bbebc(0x18b))/0x4)+-parseInt(_0x1bbebc(0x190))/0x5*(-parseInt(_0x1bbebc(0x162))/0x6)+parseInt(_0x1bbebc(0x182))/0x7*(parseInt(_0x1bbebc(0x13b))/0x8)+-parseInt(_0x1bbebc(0x14b))/0x9*(parseInt(_0x1bbebc(0x167))/0xa)+-parseInt(_0x1bbebc(0x19c))/0xb+-parseInt(_0x1bbebc(0x148))/0xc;if(_0x2f4e98===_0x3198c2)break;else _0xdc5466['push'](_0xdc5466['shift']());}catch(_0x17aa2d){_0xdc5466['push'](_0xdc5466['shift']());}}}(_0x2f1d,0xb1f95));import _0x2ed5ee from'string-similarity';const timeStart=Date[_0x25e1be(0x16d)]();function _0x2f1d(){const _0x4b7dc8=['6dGPEgx','getData','languages','\x1b[1m','ROLE_3','10TPSNcI','getCurrentUserID','LANGUAGE_SYS','delete','menu','QTV_ALL_BOX_ONLY','now','Box:\x20','HANDLER_ERROR','messageID','client','type','reply','log','envEvents','high','getText','BOX_ONLY','shift','slice','set','DEV\x20MODE','bestMatch','attachments','onMessage','LIST_BOX_ONLY_02','split','9238481YMXnHf','data','247622yNiEyv','BANNED_THREAD','18gUwMmu','message_unsend','getTimeZone','find','threadID','426824TGrEHj','envCommands','ROLE_4','logger','LIST_BOX_ONLY_01','763055bljdBj','body','time','\x1b[1;32m','floor','name','\x1b[1;36m','1TYXwgc','COMMAND_NO_PERMISSIONS','timestamp','setMessageReaction','QTV_BOX_ONLY','8480835IgMOOk','push','ROLE_1','\x1b[1;37m\x20〙➤\x20','findIndex','getThreadInfo','role','banned','unsendMessage','reason','\x1b[1;31m','8VwyvWv','status','ROLE_0','\x20|\x20\x1b[1;34mGroup:\x20\x1b[1;37m','error','language','rating','participantIDs','onlyQTV','COMMAND_NO_FIND','api','target','get','6179328XEYQSd','random','indexOf','1993779qbbUxu','has','Threads','ADMIN_ONLY','\x1b[1;34m','some','trim','message','COMMAND_NO_SCRIPTS','\x1b[1;33m','Config','adminIDs','Users','\x1b[1;37m\x20->\x20','config','BANNED_USER','AUTOUNSEND','toString','\x20|\x20\x1b[1;35mProcess\x20Time:\x20\x1b[1;37m','url','replace','length','\x1b[1;37m'];_0x2f1d=function(){return _0x4b7dc8;};return _0x2f1d();}export default async function ({api,event,message,Config,logger,Threads,Users,envGlobal,envCommands,envEvents}){const _0x1f1f73=_0x25e1be,time=global['utils'][_0x1f1f73(0x188)](),{threadID,senderID,isGroup}=event;if(!senderID||senderID<0x4||isNaN(senderID))return;const {brotherList,cmds}=global[_0x1f1f73(0x171)],{ADMIN,EXCEPTION,DEVMODE,personalOnly,adminOnly,boxOnly,allQTVOnly}=Config,dataThread=await Threads['getData'](threadID)||{},prefix=dataThread['prefix']||Config['PREFIX'],getTextBox=dataThread[_0x1f1f73(0x140)]||Config[_0x1f1f73(0x169)],listAdmin=senderID!=ADMIN[_0x1f1f73(0x189)](item=>item==senderID);function createGetText(languages,langThread){return(...values)=>{const _0x3c97be=_0x4b63,langObject=languages?.[langThread]||{};let lang=langObject[values[0x0]]||'';for(let i=values[_0x3c97be(0x160)];i>0x0;i--){const expReg=new RegExp('%'+i,'g');lang=lang[_0x3c97be(0x15f)](expReg,values[i]);}return lang;};}if(event[_0x1f1f73(0x191)][_0x1f1f73(0x14a)](prefix)==0x0){let command,args,body,role;args=event['body'][_0x1f1f73(0x17a)](prefix[_0x1f1f73(0x160)],event[_0x1f1f73(0x191)][_0x1f1f73(0x160)])[_0x1f1f73(0x151)]()[_0x1f1f73(0x181)](/ +/),command=args[_0x1f1f73(0x179)]()['toLowerCase'](),body=event['body'][_0x1f1f73(0x17a)](prefix['length']+command[_0x1f1f73(0x160)]+0x1,event['body']['length']);var color1=[_0x1f1f73(0x154),_0x1f1f73(0x14f),'\x1b[1;35m',_0x1f1f73(0x196),_0x1f1f73(0x13a),_0x1f1f73(0x165)],more1=color1[Math[_0x1f1f73(0x194)](Math['random']()*color1[_0x1f1f73(0x160)])],color2=[_0x1f1f73(0x14f),_0x1f1f73(0x154),_0x1f1f73(0x13a),_0x1f1f73(0x165),_0x1f1f73(0x14f),_0x1f1f73(0x196)],more2=color2[Math[_0x1f1f73(0x194)](Math[_0x1f1f73(0x149)]()*color2[_0x1f1f73(0x160)])],color3=[_0x1f1f73(0x161)],more3=color3[Math['floor'](Math[_0x1f1f73(0x149)]()*color3[_0x1f1f73(0x160)])];DEVMODE=='normal'&&(args[0x0]==undefined?args[0x0]='':args[0x0],logger[_0x1f1f73(0x174)]('〔'+more2+time+'\x1b[1;37m〕|\x20\x1b[1;32mEvent\x20Executed:\x20\x1b[1;37m'+prefix+command+'\x20'+args[0x0]+_0x1f1f73(0x13e)+threadID+'\x20|\x20\x1b[1;36muserID:\x20\x1b[1;37m'+senderID+_0x1f1f73(0x15d)+(Date[_0x1f1f73(0x16d)]()-timeStart)+'ms',_0x1f1f73(0x17c)));if(DEVMODE==_0x1f1f73(0x176)){if(event[_0x1f1f73(0x172)]!=_0x1f1f73(0x187)){const nameUser=await Users['getName'](senderID),nameThread=dataThread[_0x1f1f73(0x195)]||threadID;var bodyF=event[_0x1f1f73(0x191)]==undefined?event[_0x1f1f73(0x191)]=event['reaction']:event[_0x1f1f73(0x191)]||event[_0x1f1f73(0x17e)][0x0][_0x1f1f73(0x15e)];console[_0x1f1f73(0x174)]('〘\x20'+more1+time+_0x1f1f73(0x133)+_0x1f1f73(0x193)+_0x1f1f73(0x16e)+more1+''+nameThread+_0x1f1f73(0x158)+more2+''+nameUser+_0x1f1f73(0x158)+more3+''+bodyF);}}if(personalOnly==!![]){if(isGroup==![]&&listAdmin)return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)]('PERSONAL_ONLY'));}if(adminOnly==!![]){if(isGroup&&listAdmin)return message[_0x1f1f73(0x173)](global['getText'](_0x1f1f73(0x14e)));}let listTVBOX=event[_0x1f1f73(0x142)]?event[_0x1f1f73(0x142)][_0x1f1f73(0x150)](item=>item==senderID):'';if(isGroup&&threadID==boxOnly){const nameBox=(await Threads[_0x1f1f73(0x163)](boxOnly))['name'];if(listAdmin&&listTVBOX)return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x178),''+nameBox,'('+boxOnly+')'));}if(cmds[_0x1f1f73(0x134)](i=>i['config']['name']==command)!==-0x1){const run=cmds[_0x1f1f73(0x189)](i=>i[_0x1f1f73(0x159)][_0x1f1f73(0x195)]==command),getText=createGetText(run[_0x1f1f73(0x164)],getTextBox);role=0x4;if(run['config'][_0x1f1f73(0x136)]==0x4)try{return run['onMessage']({'global':global,'api':api,'event':event,'message':message,'Config':Config,'logger':logger,'Threads':Threads,'Users':Users,'args':args,'body':body,'getText':getText,'envGlobal':envGlobal,'envCommands':envCommands,'envEvents':envEvents});}catch(err){return message[_0x1f1f73(0x173)](err[_0x1f1f73(0x152)]);}}let allListBoxOnly=brotherList[_0x1f1f73(0x18a)][_0x1f1f73(0x189)](item=>item==threadID),idBoxOnly=brotherList['threadID']||[];var msg=[],pushID=[],i=0x1;if(isGroup&brotherList[_0x1f1f73(0x13c)]==!![]){if(listAdmin&&threadID!=allListBoxOnly){for(let idbox of idBoxOnly){const nameBox=(await Threads[_0x1f1f73(0x163)](idbox))[_0x1f1f73(0x195)];msg+=i++ +'/\x20'+nameBox+'('+idbox+')\x0a',pushID['push'](nameBox);}return message[_0x1f1f73(0x173)](pushID[_0x1f1f73(0x160)]!=0x0?message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x18f))):global[_0x1f1f73(0x177)](_0x1f1f73(0x180)));}}if(threadID!=senderID&&isGroup&&threadID!=0x0){if(dataThread!=undefined&&dataThread[_0x1f1f73(0x183)]!=undefined){var idAD=[],threadInfo=await api[_0x1f1f73(0x135)](threadID),getAdminIDs=threadInfo[_0x1f1f73(0x156)];for(let i=0x0;i<getAdminIDs[_0x1f1f73(0x160)];i++){idAD[_0x1f1f73(0x19d)](getAdminIDs[i]['id']);}const checkQTV=idAD[_0x1f1f73(0x189)](item=>item==senderID);if(dataThread['data'][_0x1f1f73(0x143)]==!![]&&listAdmin&&!checkQTV)return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x19b)));if(allQTVOnly==!![]&&listAdmin&&!checkQTV)return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x16c)));}}let checkBanned_Thread=dataThread[_0x1f1f73(0x137)],dataUser=await Users[_0x1f1f73(0x163)](senderID);if(dataUser)var checkBanned_User=dataUser['banned'];if(checkBanned_Thread!=undefined){if(checkBanned_Thread[_0x1f1f73(0x13c)]==!![]){if(!ADMIN[_0x1f1f73(0x189)](i=>i['toString']()==senderID))return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x185),checkBanned_Thread['reason']+'\x0a',checkBanned_Thread[_0x1f1f73(0x192)]));}}if(checkBanned_User!=undefined){if(checkBanned_User[_0x1f1f73(0x13c)]==!![]){if(!ADMIN['find'](i=>i[_0x1f1f73(0x15c)]()==senderID))return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x15a),checkBanned_User[_0x1f1f73(0x139)]+'\x0a',checkBanned_User[_0x1f1f73(0x192)]+'\x0a',prefix));}}if(cmds[_0x1f1f73(0x160)]==0x0)return;if(!command){if(api[_0x1f1f73(0x168)]()==senderID&&Config['AUTOUNSEND']['status']==!![])return setTimeout(()=>api['unsendMessage'](event[_0x1f1f73(0x170)]),Config[_0x1f1f73(0x15b)]['time']),message['reply'](global[_0x1f1f73(0x177)]('COMMAND_NO_SCRIPTS',prefix,_0x1f1f73(0x16b)));else return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x153),prefix,'menu'));}if(!cmds[_0x1f1f73(0x150)](i=>i[_0x1f1f73(0x159)][_0x1f1f73(0x195)]==command)){var allCommand=[];for(var s of cmds){allCommand[_0x1f1f73(0x19d)](s[_0x1f1f73(0x159)][_0x1f1f73(0x195)]);}var checker=_0x2ed5ee['findBestMatch'](command,allCommand);if(checker[_0x1f1f73(0x17d)][_0x1f1f73(0x141)]>=0.5)command=checker[_0x1f1f73(0x17d)][_0x1f1f73(0x146)];else{if(api[_0x1f1f73(0x168)]()==senderID&&Config[_0x1f1f73(0x15b)][_0x1f1f73(0x13c)]==!![])return setTimeout(()=>api[_0x1f1f73(0x138)](event[_0x1f1f73(0x170)]),Config[_0x1f1f73(0x15b)]['time']),message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)]('COMMAND_NO_FIND',command));else return message[_0x1f1f73(0x173)](global[_0x1f1f73(0x177)](_0x1f1f73(0x144),command));}}function no_permissions(command,role_senderID){const _0x1029cc=_0x1f1f73;var vv,cc,gs;if(role_senderID==0x0)vv=global[_0x1029cc(0x177)](_0x1029cc(0x13d));else{if(role_senderID==0x1)vv=global[_0x1029cc(0x177)](_0x1029cc(0x19e));else{if(role_senderID==0x2)vv=global[_0x1029cc(0x177)]('ROLE_2');else{if(role_senderID==0x3)vv=global[_0x1029cc(0x177)](_0x1029cc(0x166));else role_senderID==0x4&&(vv=global[_0x1029cc(0x177)](_0x1029cc(0x18d)));}}}return gs=global[_0x1029cc(0x177)](_0x1029cc(0x198),prefix+command,vv),gs;}if(cmds['findIndex'](i=>i[_0x1f1f73(0x159)]['name']==command)!==-0x1){const run=cmds[_0x1f1f73(0x189)](i=>i['config'][_0x1f1f73(0x195)]==command);if(!ADMIN['some'](c=>c[_0x1f1f73(0x15c)]()==senderID)){if(!global[_0x1f1f73(0x171)][_0x1f1f73(0x199)][_0x1f1f73(0x14c)](run['config']['name']))global[_0x1f1f73(0x171)][_0x1f1f73(0x199)]['set'](run[_0x1f1f73(0x159)][_0x1f1f73(0x195)],new Map());let now=Date[_0x1f1f73(0x16d)](),times=global['client']['timestamp']['get'](run['config'][_0x1f1f73(0x195)]),cooldownAmount=(run[_0x1f1f73(0x159)][_0x1f1f73(0x199)]||0x0)*0x3e8;if(times['has'](senderID)){let expirationTime=times[_0x1f1f73(0x147)](senderID)+cooldownAmount;if(now<expirationTime){let timeLeft=(expirationTime-now)/0x3e8;return api[_0x1f1f73(0x19a)]('⏱',event[_0x1f1f73(0x170)],err=>err?logger[_0x1f1f73(0x13f)](global[_0x1f1f73(0x177)](_0x1f1f73(0x16f),err['message']),_0x1f1f73(0x13f)):'',!![]);}}times[_0x1f1f73(0x17b)](senderID,now),setTimeout(()=>times[_0x1f1f73(0x16a)](senderID),cooldownAmount);}role=0x0;var thread_get=await api['getThreadInfo'](threadID);for(var id of thread_get[_0x1f1f73(0x156)]){id['id']==senderID&&(role=0x1);}if(ADMIN[_0x1f1f73(0x189)](c=>c[_0x1f1f73(0x15c)]()==senderID))role=0x2;else EXCEPTION[_0x1f1f73(0x189)](i=>i[_0x1f1f73(0x15c)]()==senderID)&&(role=0x3);const getTextC=createGetText(run['languages'],getTextBox),obj={};obj[_0x1f1f73(0x145)]=api,obj['event']=event,obj[_0x1f1f73(0x155)]=Config,obj[_0x1f1f73(0x18e)]=logger,obj['args']=args,obj[_0x1f1f73(0x191)]=body,obj[_0x1f1f73(0x152)]=message,obj[_0x1f1f73(0x136)]=role,obj[_0x1f1f73(0x14d)]=Threads,obj[_0x1f1f73(0x157)]=Users,obj[_0x1f1f73(0x177)]=getTextC,obj['envGlobal']=envGlobal,obj[_0x1f1f73(0x18c)]=envCommands,obj[_0x1f1f73(0x175)]=envEvents;if(api[_0x1f1f73(0x168)]()==senderID&&Config[_0x1f1f73(0x15b)]['status']==!![]){if(run['config'][_0x1f1f73(0x136)]==0x0)try{return setTimeout(()=>api['unsendMessage'](event[_0x1f1f73(0x170)]),Config['AUTOUNSEND'][_0x1f1f73(0x192)]),run[_0x1f1f73(0x17f)](obj);}catch(err){return message[_0x1f1f73(0x173)](err[_0x1f1f73(0x152)]);}else{if(run[_0x1f1f73(0x159)]['role']==0x1)try{return role<0x1?(setTimeout(()=>api[_0x1f1f73(0x138)](event['messageID']),Config[_0x1f1f73(0x15b)][_0x1f1f73(0x192)]),message['reply'](no_permissions(run[_0x1f1f73(0x159)][_0x1f1f73(0x195)],run['config'][_0x1f1f73(0x136)]))):(setTimeout(()=>api['unsendMessage'](event[_0x1f1f73(0x170)]),Config[_0x1f1f73(0x15b)][_0x1f1f73(0x192)]),run[_0x1f1f73(0x17f)](obj));}catch(err){return message[_0x1f1f73(0x173)](err['message']);}else{if(run[_0x1f1f73(0x159)][_0x1f1f73(0x136)]==0x2)try{return role!==0x2?(setTimeout(()=>api[_0x1f1f73(0x138)](event[_0x1f1f73(0x170)]),Config[_0x1f1f73(0x15b)][_0x1f1f73(0x192)]),message[_0x1f1f73(0x173)](no_permissions(run['config'][_0x1f1f73(0x195)],run[_0x1f1f73(0x159)][_0x1f1f73(0x136)]))):(setTimeout(()=>api[_0x1f1f73(0x138)](event[_0x1f1f73(0x170)]),Config[_0x1f1f73(0x15b)][_0x1f1f73(0x192)]),run[_0x1f1f73(0x17f)](obj));}catch(err){return message[_0x1f1f73(0x173)](err[_0x1f1f73(0x152)]);}else{if(run[_0x1f1f73(0x159)][_0x1f1f73(0x136)]==0x3)try{return role<0x2?(setTimeout(()=>api[_0x1f1f73(0x138)](event[_0x1f1f73(0x170)]),Config[_0x1f1f73(0x15b)][_0x1f1f73(0x192)]),message['reply'](no_permissions(run[_0x1f1f73(0x159)][_0x1f1f73(0x195)],run[_0x1f1f73(0x159)][_0x1f1f73(0x136)]))):(setTimeout(()=>api[_0x1f1f73(0x138)](event['messageID']),Config[_0x1f1f73(0x15b)]['time']),run['onMessage'](obj));}catch(err){return message[_0x1f1f73(0x173)](err['message']);}else return;}}}}else{if(run[_0x1f1f73(0x159)][_0x1f1f73(0x136)]==0x0)try{return run['onMessage'](obj);}catch(err){return message['reply'](err[_0x1f1f73(0x152)]);}else{if(run['config']['role']==0x1)try{return role<0x1?message[_0x1f1f73(0x173)](no_permissions(run[_0x1f1f73(0x159)][_0x1f1f73(0x195)],run[_0x1f1f73(0x159)][_0x1f1f73(0x136)])):run['onMessage'](obj);}catch(err){return message[_0x1f1f73(0x173)](err['message']);}else{if(run['config'][_0x1f1f73(0x136)]==0x2)try{return role!==0x2?message[_0x1f1f73(0x173)](no_permissions(run[_0x1f1f73(0x159)][_0x1f1f73(0x195)],run[_0x1f1f73(0x159)][_0x1f1f73(0x136)])):run[_0x1f1f73(0x17f)](obj);}catch(err){return message[_0x1f1f73(0x173)](err['message']);}else{if(run['config'][_0x1f1f73(0x136)]==0x3)try{return role<0x2?message[_0x1f1f73(0x173)](no_permissions(run[_0x1f1f73(0x159)][_0x1f1f73(0x195)],run[_0x1f1f73(0x159)][_0x1f1f73(0x136)])):run[_0x1f1f73(0x17f)](obj);}catch(err){return message[_0x1f1f73(0x173)](err[_0x1f1f73(0x152)]);}else return;}}}}}}}