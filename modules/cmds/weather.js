export const config = {
    name: "weather",
    version: "1.0.1",
    role: 0,
    author: ["Sky"],
    viDesc: "Xem thông tin thời tiết tại khu vực",
    enDesc: "See weather information in a location",
    category: ['Tin tức', 'Social'],
    usages: "[Location]",
    timestamp: 5,
    envConfig: {
        "OPEN_WEATHER": "c4ef85b93982d6627681b056e24bd438"
    }
};

export const languages = {
    "vi_VN": {
        "locationNotExist": "Địa điểm %1 không tồn tại!",
        "returnResult": "🌡 Nhiệt độ: %1°C\n🌡 Nhiệt độ cơ thể cảm nhận được: %2°C\n☁️ Cảnh quan hiện tại: %3\n💦 Độ ẩm: %4%\n💨 Tốc độ gió: %5km/h\n🌅 Mặt trời mọc vào lúc: %6\n🌄 Mặt trời lặn vào lúc: %7\n"
    },
    "en_US": {
        "locationNotExist": "Can't find %1.",
        "returnResult": "🌡 Temp: %1℃\n🌡 Feels like: %2℃\n☁️ Sky: %3\n💦 Humidity: %4%\n💨 Wind speed: %5km/h\n🌅 Sun rises: %6\n🌄 Sun sets: %7"
    }
}

import moment from 'moment-timezone';
import request from 'request'

export async function onMessage({ api, event, args, getText, Threads }) {
    const { threadID, messageID } = event;

    var city = args.join(" ");
    if (city.length == 0) return client.throwError(this.config.name);
    return request(encodeURI("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + client.envConfig.envCommands[this.config.name].OPEN_WEATHER + "&units=metric&lang=" + Threads.getPrefix(threadID)), (err, response, body) => {
        if (err) throw err;
        var weatherData = JSON.parse(body);
        if (weatherData.cod !== 200) return api.sendMessage(getText("locationNotExist", city), threadID, messageID);
        var sunrise_date = moment.unix(weatherData.sys.sunrise).tz("Asia/Ho_Chi_Minh");
        var sunset_date = moment.unix(weatherData.sys.sunset).tz("Asia/Ho_Chi_Minh");
        api.sendMessage({
            body: getText("returnResult", weatherData.main.temp, weatherData.main.feels_like, weatherData.weather[0].description, weatherData.main.humidity, weatherData.wind.speed, sunrise_date.format('HH:mm:ss'), sunset_date.format('HH:mm:ss')),
            location: {
                latitude: weatherData.coord.lat,
                longitude: weatherData.coord.lon,
                current: true
            },
        }, threadID, messageID);
    });
}