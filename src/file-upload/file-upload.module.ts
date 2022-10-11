import { Global, Module } from '@nestjs/common'

import { FileUploadService } from './file-upload.service'
import { FileUploadResolver } from './file-upload.resolver'

@Global()
@Module({
  providers: [FileUploadService, FileUploadResolver],
})
export class FileUploadModule {}
