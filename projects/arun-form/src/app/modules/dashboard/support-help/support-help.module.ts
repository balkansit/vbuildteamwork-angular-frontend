import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportHelpRoutingModule } from './support-help-routing.module';
import { HelpCenterComponent } from './help-center/help-center.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';

@NgModule({
  declarations: [HelpCenterComponent, ContactSupportComponent],
  imports: [CommonModule, SupportHelpRoutingModule],
})
export class SupportHelpModule {}
