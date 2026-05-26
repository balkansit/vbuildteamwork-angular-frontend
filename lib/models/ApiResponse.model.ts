export interface ApiResponse {
  total: number;
  map(arg0: (role: any) => { label: any; value: any; }): { label: string; value: any; }[] | undefined;
  length?: number;
  success: boolean;
  message: string;
  data: any;
  error: string;
}
