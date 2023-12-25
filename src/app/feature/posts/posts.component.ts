import { Component, OnInit } from "@angular/core";
import { UserPost } from "@src/app/shared/models";
import { UserPostsService } from "@src/app/shared/services/userPosts.service";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    posts: UserPost[];

    constructor(private userPostsService: UserPostsService) { }

    // I could later assign these subscriptions to be unsubscribed from in the OnDestroy(), for example
    ngOnInit(): void {
        this.userPostsService.getPosts().subscribe();
        this.userPostsService.userPosts$.subscribe(posts => this.posts = posts);
    }
}