import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpClientService {
    // This can then be set on a per-environment basis
    private baseUrl: string = 'https://jsonplaceholder.typicode.com/'; 

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string): Observable<T> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.get<T>(url);
    }
}