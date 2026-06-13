import { Global, Module } from "@nestjs/common";
import { ExtensionRegistryService } from "./extension-registry.service";

@Global()
@Module({
  providers: [ExtensionRegistryService],
  exports: [ExtensionRegistryService]
})
export class CoreModule {}
