class LocationService {

    constructor(http) {
        this.http = http;
    }

    async search(searchText) {
        const query = searchText ? `?searchText=${searchText}` : '';
        return this.http.fetch(`/location/search${query}`, {
            method: 'GET',
        });
    }

    async getNearLocation(x,y){
        const coordinate = await this.getLocation();
        console.log(coordinate);
        const query = (!x||!y) ? `?x=${coordinate.latitude}&y=${coordinate.longitude}` : `?x=${x}&y=${y}`;
        return this.http.fetch(`/location/getNearAddress${query}`, {
            method: 'GET',
        });
    }
    setMapKeyScript() {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}`;
        script.async = true;

        document.body.appendChild(script);
    }

    getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                const now = new Date();
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            err: 0,
                            time: now.toLocaleTimeString(),
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (err) => {
                        console.log(err);
                        resolve({
                            err: -1,
                            latitude: -1,
                            longitude: -1,
                        });
                    },
                    { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
                );
            } else {
                reject({ error: -2, latitude: -1, longitude: -1 });
            }
        });
    }
}
export default LocationService;