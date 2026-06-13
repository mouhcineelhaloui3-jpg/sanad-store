import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { ProductsModule } from "./modules/products/products.module";
import { AdsModule } from "./modules/ads/ads.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AutomationModule } from "./modules/automation/automation.module";
import { MarketplaceModule } from "./modules/marketplace/marketplace.module";
import { ExtensionsModule } from "./modules/extensions/extensions.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CoreModule,
    AuthModule,
    ExtensionsModule,
    ProductsModule,
    AdsModule,
    AnalyticsModule,
    AutomationModule,
    MarketplaceModule
  ]
})
export class AppModule {}
