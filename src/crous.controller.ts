import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query
} from '@nestjs/common';
import { CrousService } from './crous.service';
import { Crous } from './crous';

@Controller('crous')
export class CrousController {
  constructor(private readonly crousService: CrousService) {}

  @Get()
  getAllCrous(): Crous[] {
    return this.crousService.getAllCrous();
  }

  // We will not use this one, since pagination on the frontend
  @Get('paginated')
  getPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): { data: Crous[]; page: number; limit: number; total: number } {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;

    return this.crousService.getPaginatedCrous(pageNumber, limitNumber);
  }

  @Get(':id')
  getCrous(@Param('id') id: string): Crous {
    try {
      return this.crousService.getCrous(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  createCrous(@Body() crous: Crous): Crous {
    try {
      return this.crousService.createCrous(crous);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // not implemented frontend yet
  @Put(':id')
  updateCrous(@Param('id') id: string, @Body() crous: Crous): Crous {
    try {
      return this.crousService.updateCrous(id, crous);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // not implemented frontend yet
  @Delete(':id')
  deleteCrous(@Param('id') id: string): boolean {
    try {
      return this.crousService.deleteCrous(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

   
    @Put('favorite/:id')
    toggleFavorite(@Param('id') id: string): Crous {
      try {
        return this.crousService.toggleFavorite(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }

}
