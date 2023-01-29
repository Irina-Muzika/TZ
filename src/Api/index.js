export default class Api {
    static URL = 'https://vpic.nhtsa.dot.gov/api'
    static URL_VIN_VEHICLE = '/vehicles/decodevin/'
    static URL_VEHICLE_VARIEBLES = '/vehicles/getvehiclevariablelist'
    static URL_FORMAT = '?format=json'

    static request(url = '', method = 'GET', body) {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can not execute request method', { cause: res })
            })
    }

    static getVinVehicle(vin) {
        return this.request(this.URL + this.URL_VIN_VEHICLE + vin + this.URL_FORMAT)
            .catch(err => {
                throw new Error('Can not get vin vehicle')
            })
    }
    
    static getVehicleVariables(id) {
        return this.request(this.URL + this.URL_VEHICLE_VARIEBLES + this.URL_FORMAT)
            .catch(err => {
                throw new Error('Can not get vin vehicle')
            })
    }
}