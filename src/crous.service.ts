import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { Crous } from './crous';
import { images } from './imageData';

@Injectable()
export class CrousService implements OnModuleInit {
  private readonly logger = new Logger(CrousService.name);
  private storage: Crous[] = [];

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    this.logger.log('Loading Crous data from API');
    await this.loadDataFromApi();
    this.logger.log(`${this.storage.length} Crous entries loaded`);
  }

  private async loadDataFromApi() {
    const url =
      'https://data.opendatasoft.com/api/records/1.0/search/?dataset=fr_crous_restauration_france_entiere%40mesr&rows=50'; // Changed rows to 50
  
    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(url).pipe(map((res) => res.data)),
      );
  
      const records = response.records;


  
      const crousList: Crous[] = records.map((record) => {
      const randomImage =
      images[Math.floor(Math.random() * images.length)];

          const fields = record.fields;
  
          const crous: Crous = {
            id: fields.id || record.recordid,
            type: fields.type,
            zone: fields.zone,
            nom: fields.title,
            description: fields.short_desc,
            contact: fields.contact,
            info: fields.infos,
            geolocalisation: {
              latitude: fields.geolocalisation[0],
              longitude: fields.geolocalisation[1],
            },
          photo: randomImage,
          favorite: false
          };
  
          return crous;
      });
  
      this.storage.push(...crousList);
    } catch (error) {
      this.logger.error('Failed to load data from API', error);
    }
  }

  addCrous(crous: Crous) {
    const exists = this.storage.some((item) => item.id === crous.id);
    if (exists) {
      throw new Error(`Crous with ID ${crous.id} already exists`);
    }
    this.storage.push(crous);
    console.log("created the following ->", crous)
  }

  getAllCrous(): Crous[] {
    console.log("calllllllllllllleddddddddddd ->", this.getAllFav())
    return [...this.storage];
  }

  getAllFav(): void {
    const favorites = this.storage.filter((item) => item.favorite);
    console.log("favs-->>", {
      total: this.storage.length,
      favorites,
    }) ;
  }

  getCrous(id: string): Crous {
    const crous = this.storage.find((item) => item.id === id);
    if (!crous) {
      throw new Error(`Crous with ID ${id} not found`);
    }
    return crous;
  }

  createCrous(crous: Crous): Crous {
    this.addCrous(crous);
    return crous;
  }

  updateCrous(id: string, updatedCrous: Crous): Crous {
    const index = this.storage.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Crous with ID ${id} not found`);
    }
    this.storage[index] = updatedCrous;
    return updatedCrous;
  }

  deleteCrous(id: string): boolean {
    const index = this.storage.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Crous with ID ${id} not found`);
    }
    this.storage.splice(index, 1);
    return true;
  }

  getPaginatedCrous(page: number, limit: number): { data: Crous[]; page: number; limit: number; total: number } {
    const total = this.storage.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = this.storage.slice(startIndex, endIndex);

    return {
      data,
      page,
      limit,
      total,
    };
  }

  toggleFavorite(id: string): Crous {
    console.log("uijfheruifheu ->", id)
    const crous = this.storage.find(item => item.id === id);
    if (!crous) {
      throw new Error('Crous not found');
    }
    crous.favorite = !crous.favorite; 
    console.log("uijfheruifheu ->", crous)
    return crous;
  }

}
