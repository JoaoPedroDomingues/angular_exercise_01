import { Injectable } from "@angular/core";
import { HttpPostsService } from "../http/httpPosts.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UserPost } from "../models";

@Injectable({ providedIn: 'root' })
export class UserPostsService {
    private userPostsState = new BehaviorSubject<UserPost[]>([]);
    userPosts$: Observable<UserPost[]> = this.userPostsState.asObservable();

    constructor(private httpPostsService: HttpPostsService) { }

    getPosts(): Observable<UserPost[]> {
        return this.httpPostsService.get().pipe(
            tap((userPosts) => {
                this.updatePosts(userPosts)
            })
        );
    }

    updatePosts(userPosts: UserPost[]): void {
        this.userPostsState.next(userPosts);
    }
}