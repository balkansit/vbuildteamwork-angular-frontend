import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpCenterComponent } from './help-center/help-center.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';

const routes: Routes = [
  { path: 'help-center', component: HelpCenterComponent },
  { path: 'contact-support', component: ContactSupportComponent },
  { path: '', redirectTo: 'help-center', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportHelpRoutingModule {}
