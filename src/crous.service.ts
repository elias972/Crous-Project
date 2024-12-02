import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { Crous } from './crous';

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
      'https://data.opendatasoft.com/api/records/1.0/search/?dataset=fr_crous_restauration_france_entiere%40mesr&rows=1000';

    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(url).pipe(map((res) => res.data)),
      );

      const records = response.records;

      const crousList: Crous[] = records.map((record) => {
        const fields = record.fields;

        const crous: Crous = {
          id: fields.id || record.recordid,
          type: fields.type,
          zone: fields.zone,
          nom: fields.nom,
          description: fields.description,
          contact: fields.contact,
          lat: fields.lat,
          informations: fields.informations,
          closing: fields.closing,
          geolocalisation: fields.geolocalisation,
          zone2: fields.zone2,
          crousandgo: fields.crousandgo,
          album: fields.album,
          photo: fields.photo,
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
  }

  getAllCrous(): Crous[] {
    return [...this.storage];
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
}
