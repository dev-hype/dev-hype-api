import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'

@Injectable()
export class FileUploadService {
  s3: S3

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get('S3_BUCKET_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_BUCKET_SECRET_KEY'),
      },
    })
  }

  getS3PresignedUrl(filename: string) {
    const params = {
      Bucket: this.configService.get('S3_BUCKET'),
      Key: filename,
      Expires: 60,
    }

    return this.s3.getSignedUrlPromise('putObject', params)
  }
}
