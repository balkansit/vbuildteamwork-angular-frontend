export interface TableColumn {
    key: string;
    header: string;
    sortable?: boolean;
    type?: string;
    dateFormat?: string;
    action?: boolean;
}
