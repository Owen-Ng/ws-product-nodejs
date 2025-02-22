export interface Ieventshourly {
    date: string,
    hour: number,
    events: number
}
export interface Ieventsdaily {
    date: string,
    events: number
}

export interface Istatshourly {
    date: string,
    hour: number,
    impressions: number,
    clicks: number,
    revenue: string
}
export interface Istatsdaily {
    date: string,
    impressions: number,
    clicks: number,
    revenue: string
}
export interface Ipoi {
    poi_id: number,
    name: string,
    lat: number,
    lon: number
}

export interface Itable_data {
    date: string,
    name: string,
    lat: number,
    lon: number,
    poi_id: number,
    events: number,
    impressions: number,
    clicks: number,
    revenue: number
}

export interface Igeo_data {
    name: string,
    lat: number,
    lon: number,
    poi_id: number,
    events: number,
    impressions: number,
    clicks: number,
    revenue: number
}