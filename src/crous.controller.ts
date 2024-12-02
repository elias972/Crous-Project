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

  @Put(':id')
  updateCrous(@Param('id') id: string, @Body() crous: Crous): Crous {
    try {
      return this.crousService.updateCrous(id, crous);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  deleteCrous(@Param('id') id: string): boolean {
    try {
      return this.crousService.deleteCrous(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
