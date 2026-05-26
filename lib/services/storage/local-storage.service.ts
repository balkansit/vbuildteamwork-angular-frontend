import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() { }

    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);

        if (!item || item === 'undefined' || item === 'null') {
            return null;
        }

        try {
            return JSON.parse(item) as T;
        } catch (error) {
            console.error('Failed to parse JSON from localStorage:', {
                key,
                item,
                error,
            });
            return null;
        }
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
