import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserPost } from "../models";
import { HttpClientService } from "./http_client.service";

@Injectable({ providedIn: 'root' })
export class HttpPostsService {

    constructor(private httpClientService: HttpClientService) { }

    get(): Observable<UserPost[]> {
        return this.httpClientService.get<UserPost[]>('posts');
    }
}