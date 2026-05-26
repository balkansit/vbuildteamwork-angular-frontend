import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.css'],
  standalone: false,
})
export class HelpCenterComponent {
  /** Active tab */
  activeTab = signal<'faq' | 'kb' | 'ticket'>('faq');
  search = signal('');
  /** FAQs */
  faqs = [
    {
      id: 1,
      q: 'How do I reset my password?',
      a: 'Go to My Profile → Change Password.',
    },
    {
      id: 2,
      q: 'How to contact support?',
      a: 'Use the Contact Support tab and submit a ticket.',
      route: '/dashboard/support-help/contact-support',
    },
    {
      id: 3,
      q: 'Where can I find product documentation?',
      a: 'Browse Knowledge Base → Documentation.',
    },
  ];
  /** Knowledge Base Articles */
  articles = [
    {
      id: 1,
      title: 'Reset Password Guide',
      content: 'Step 1: Go to profile...\nStep 2: Enter new password...',
    },
    {
      id: 2,
      title: 'Billing Setup',
      content: 'To configure billing, go to Settings → Billing...',
    },
    {
      id: 3,
      title: 'Pharmacy Settings Guide',
      content: 'Pharmacy settings include stock, suppliers, etc.',
    },
  ];
  /** Active Article */
  activeArticle: any = null;
  /** Set Active Tab */
  setTab(tab: 'faq' | 'kb' | 'ticket') {
    this.activeTab.set(tab);
  }
  /** Open Article */
  openArticle(a: any) {
    this.activeArticle = a;
  }
}
