export class Crous {
  id: string;
  type: string;
  zone: string;
  nom: string;
  description?: string;
  contact?: string;
  info?: string;
  geolocalisation?: IGeolocalisation;  
  photo?: string;
  favorite?: boolean;
}

export interface IGeolocalisation {
  latitude: number;
  longitude: number;
}