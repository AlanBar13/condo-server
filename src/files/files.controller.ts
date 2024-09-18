import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Uploads a file to storage' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
          new MaxFileSizeValidator({
            maxSize: 10000000,
            message: 'File is too large. Max file size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    const isPublicValue = uploadFileDto.isPublic === 'true' ? true : false;
    console.log(uploadFileDto.isPublic);
    return await this.filesService.uploadSingleFile(file, isPublicValue);
  }

  @ApiOperation({ summary: 'Gets url for storage object' })
  @ApiResponse({ status: 200, description: 'File URL returned' })
  @HttpCode(HttpStatus.OK)
  @Get(':key')
  getFileUrl(@Param('key') key: string) {
    return { url: this.filesService.getFileUrl(key) };
  }

  @ApiOperation({
    summary: 'Gets signed url for storage object, this last 3hrs',
  })
  @ApiResponse({
    status: 200,
    description: 'File signed  URL returned, this link will expire in 3hrs',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/signed-url/:key')
  async getSignedUrl(@Param('key') key: string) {
    const url = await this.filesService.getPreSignedUrl(key);
    return { url };
  }

  @ApiOperation({ summary: 'Deletes a storage object' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @HttpCode(HttpStatus.OK)
  @Delete(':key')
  async deleteObject(@Param('key') key: string) {
    return await this.filesService.deleteFile(key);
  }
}
