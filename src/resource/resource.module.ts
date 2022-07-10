import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceResolver } from './resource.resolver';

@Module({
  providers: [ResourceService, ResourceResolver]
})
export class ResourceModule {}
