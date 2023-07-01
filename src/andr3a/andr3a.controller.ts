import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Andr3aService } from './andr3a.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Public } from '../auth/is-public-decorator';

@Controller('andr3a')
@ApiTags('andr3a')
export class Andr3aController {
  constructor(private readonly andr3aService: Andr3aService) {}

  @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)     N.B: If I use a Guard at Global Level i can choose of don't use "UseGuards()" decorator on top of each controller
  // @Public()
  @Get('test')
  test() {
    return 'Test';
  }
}
