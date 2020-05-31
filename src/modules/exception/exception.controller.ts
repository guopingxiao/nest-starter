import {
    Controller,
    Get,
    Post,
    Patch,
    Query,
    Delete,
    Body,
    Param,
    Headers,
    UseFilters,
    ParseIntPipe,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';

  import { ExceptionService } from './exception.service';
  import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
  

  @UseFilters(new HttpExceptionFilter())
  @Controller('/exception')
  export class ExceptionController {
    constructor(private readonly exceptionService: ExceptionService) {}
  
    // 查询
    @Get()
    fetch(@Query() { id }, @Headers('token') token): string {
      if (!id) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, message: '请求参数id 必传', error: 'id is required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.exceptionService.fetch(id);
    }
  
    // 创建
    @Post()
    save(@Body() { message }): string {
      return this.exceptionService.save(message);
    }
  
    // 更新
    @Patch(':id')
    // 有时，我们希望参数的类型为数字，则可以通过管道进行转换
    // !现nest自带部分管道
    update(@Param('id', new ParseIntPipe()) id, @Body() { message }): string {
        console.log(typeof id)
        return this.exceptionService.update(id, message);
    }
  
    // 删除
    @Delete()
    remove(@Query() { id }): string {
      return this.exceptionService.remove(id);
    }
  }