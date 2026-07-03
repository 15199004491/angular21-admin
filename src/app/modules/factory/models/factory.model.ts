export interface Factory {
    id: number;
    name: string;
    location: string;
    status: string;
    employeeCount: number;
    establishedYear: number;
    verified: boolean;
    details: string;
    contact: string;
}

export interface Region {
    name: string;
    code: string;
    type: 'military' | 'local';
    createdDate: string;
    parent?: string;
}

export interface FactoryStatus {
    label: string;
    value: string;
}