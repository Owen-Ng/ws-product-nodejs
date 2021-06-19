import { Ieventshourly, Ieventsdaily, Istatshourly, Istatsdaily, Ipoi } from './interfaces';
export function start(callback: React.Dispatch<React.SetStateAction<string>>): void {
    fetch('/start', {
        method: "GET"
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        }
    }).then(res => {
        callback(res['user']);
    }).catch(err => {
        console.log(err);
    })

}

export function eventshourly(callback: React.Dispatch<React.SetStateAction<Ieventshourly[] | undefined>>): void {
    fetch('/events/hourly', {
        method: "GET"
    }).then(res => {
        console.log(res.status);

        if (res.status == 200) {
            return res.json()
        }
    }).then(res => {
        callback(res);
    }).catch(err => {
        console.log(err);
    })

}

export function eventsdaily(callback: React.Dispatch<React.SetStateAction<Ieventsdaily[] | undefined>>): void {
    fetch('/events/daily', {
        method: "GET"
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        }
    }).then(res => {
        callback(res);
    }).catch(err => {
        console.log(err);
    })

}
export function statshourly(callback: React.Dispatch<React.SetStateAction<Istatshourly[] | undefined>>): void {
    fetch('/stats/hourly', {
        method: "GET"
    }).then(res => {

        if (res.status == 200) {
            return res.json()
        }
    }).then(res => {
        callback(res);
    }).catch(err => {
        console.log(err);
    })

}
export function statsdaily(callback: React.Dispatch<React.SetStateAction<Istatsdaily[] | undefined>>): void {
    fetch('/stats/daily', {
        method: "GET"
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        }
    }).then(res => {
        callback(res);
    }).catch(err => {
        console.log(err);
    })

}

export function poi(callback: React.Dispatch<React.SetStateAction<Ipoi[] | undefined>>): void {
    fetch('/poi', {
        method: "GET"
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        }
    }).then(res => {
        callback(res);
    }).catch(err => {
        console.log(err);
    })

}