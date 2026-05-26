export interface AlertButton {
  label: string;
  class?: string;
  action: string;
}

export interface AlertData {
  showAlert: boolean;

  // Modal-style alert fields
  status: 'success' | 'error' | 'warning' | 'info'; // used in app-modal-alert
  title: string;
  description: string;
  buttons?: AlertButton[];

  // Optional Bootstrap-style alert support
  type?: 'success' | 'danger' | 'warning' | 'info'; // used in app-bootstrap-alert
  autoDismissSeconds?: number;
}
