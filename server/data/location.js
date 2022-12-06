import proj4 from 'proj4';
import { getLocations } from '../database/database.js';
import path from 'path';
const __dirname = path.resolve();

async function getKoreaAddress() {
    return await getLocations().find().toArray();
}

export async function getNearAddress(currentX, currentY) {
    try {
        const grs = convertWGSToGRS(currentX, currentY);
        const address = await getKoreaAddress();
        return address.map(data => {
            return {
                address: data.ADMNM,
                directDistance: getDirectDistance(grs[0], grs[1], data.X, data.Y),
                X: data.X,
                Y: data.Y,
                currentX, //사용자가 처음 등록한 좌표 정보
                currentY,
            };;
        }).sort(sortByDistance).slice(0, 60);
    } catch (e) {
        console.error(`error occured!\npath : ${__dirname} \n${e.toString()}`);
        return null;
    }
}
//WGS84 좌표를 GRS80 좌표로 변환하기
function convertWGSToGRS(x, y) {
    x = parseFloat(x);
    y = parseFloat(y);
    const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    const grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
    if (x && y) {
        const result = proj4(wgs84,grs80, [y, x]);
        return [result[0], result[1]];
    }
}
//GRS80 좌표를 WGS84 좌표로 변환하기
export function convertGRSToWGS(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    const grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
    if (x && y) {
        const result = proj4(grs80, wgs84, [x, y]);
        return [result[1], result[0]];
    }
}

function getDirectDistance(x1, y1, x2, y2) {
    const x = getAbsoluteValue(x2 - x1);
    const y = getAbsoluteValue(y2 - y1);
    return Math.sqrt((x * x) + (y * y));
}
function getAbsoluteValue(x) {
    return x < 0 ? x * -1 : x;
}
function sortByDistance(a, b) {
    if (a.directDistance == b.directDistance) {
        return 0;
    }
    return a.directDistance > b.directDistance ? 1 : -1;
}