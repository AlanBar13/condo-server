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
} from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
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
    const isPublicValue = uploadFileDto.isPublic === "true" ? true : false;
    console.log(uploadFileDto.isPublic)
    return await this.filesService.uploadSingleFile(
      file,
      isPublicValue,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':key')
  @ApiResponse({ status: 200, description: 'File URL returned' })
  getFileUrl(@Param('key') key: string) {
    return { url: this.filesService.getFileUrl(key) };
  }

  @HttpCode(HttpStatus.OK)
  @Get('/signed-url/:key')
  @ApiResponse({ status: 200, description: 'File signed  URL returned, this link will expire in 3hrs' })
  async getSignedUrl(@Param('key') key: string) {
    const url = await this.filesService.getPreSignedUrl(key);
    return { url };
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':key')
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  async deleteObject(@Param('key') key: string) {
    return await this.filesService.deleteFile(key);
  }
}
