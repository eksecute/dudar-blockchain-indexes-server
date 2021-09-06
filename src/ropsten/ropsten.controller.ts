import {Controller, Get, Param, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import {RopstenService} from "./ropsten.service";
import GetGroupDto from "./dto/get-group.dto";
import ValidationExceptionFilter from "../common/exceptions/validation-exception.filter";
import GetIndexDto from "./dto/get-index.dto";

@Controller('ropsten')
export class RopstenController {
  constructor(private readonly ropstenService: RopstenService) {}

  @Get('group/list')
  getGroupIds(): Object {
    return this.ropstenService.getGroupIds()
  }

  @UsePipes(ValidationPipe)
  @Get('group/:id')
  @UseFilters(ValidationExceptionFilter)
  getGroup(@Param() param: GetGroupDto): Object {
    const { id } = param;
    return this.ropstenService.getGroup(id)
  }

  @UsePipes(ValidationPipe)
  @Get('index/:id')
  @UseFilters(ValidationExceptionFilter)
  getIndex(@Param() param: GetIndexDto): Object {
    const { id } = param;
    return this.ropstenService.getIndex(id)
  }

  @Get('lastblock')
  getRopstenLastBlock(): Object {
    return this.ropstenService.getLastBlock()
  }
}
