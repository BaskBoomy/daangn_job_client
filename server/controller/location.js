import { config } from '../config.js';
import { getLocations } from "../database/database.js";
import * as locationRepository from '../data/location.js';
// import KoreaCoordinate from '../data/coordinate/korea-coordinate.json' assert { type: "json" };

export async function getNearAddress(req, res) {
    const {x, y } = req.query;
    console.log(`x:${x}, y:${y}`);
    const result = await locationRepository.getNearAddress(x, y);
    console.log(result);
    return res.status(200).json(result);
}

export async function search(req, res) {
    const query = req.query.searchText ? req.query.searchText : ' ';
    const pipeline = [
        {
            $search: {
                "index": "location",
                "autocomplete": {
                    "query": query,
                    "path": "ADMNM"
                }
            }
        }
    ];
    await getLocations()
        .aggregate(pipeline)
        .toArray()
        .then((data)=>{
            return res.status(200).json(mapOptionalLocation(data));
        })
}

function mapOptionalLocation(data){
    return data.map((value)=>{
        const current = locationRepository.convertGRSToWGS(value.X,value.Y);
        return {
            address:value.ADMNM,
            X:value.X,
            Y:value.Y,
            currentX:current[0],
            currentY:current[1],
        }
    })
}
//DB에 좌표 추가할 때 필요
// export async function addKoreaCoordinate(req, res) {
//     KoreaCoordinate.map(x=>{
//         if(x.ADMNM.at(-1) === '동'&& isNaN(x.ADMNM.at(-2))===false){
//             //1의 자리
//             if(x.ADMNM.at(-3) === '제'){
//                 x.ADMNM = `${x.ADMNM.slice(0,-3)}${x.ADMNM.slice(-2)}`
//             }
//             //10의 자리
//             if(x.ADMNM.at(-4) === '제' && isNaN(x.ADMNM.at(-3))===false ){
//                 x.ADMNM = `${x.ADMNM.slice(0,-4)}${x.ADMNM.slice(-3)}`
//             }
//         }
//         return x;
//     })
//     getLocations()
//         .insertMany(KoreaCoordinate)
//         .then((data) => {
//             return res.send({ messeage: 'data inserted!' });
//         })
// }
