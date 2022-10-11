import { Args, Query, Resolver } from '@nestjs/graphql'
import { FileUploadService } from './file-upload.service'

@Resolver()
export class FileUploadResolver {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Query(() => String)
  async s3PresignedUrl(@Args('filename') filename: string) {
    return this.fileUploadService.getS3PresignedUrl(filename)
  }
}
