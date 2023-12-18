import { Component, OnInit } from "@angular/core";
import { HttpPostsService } from "@src/app/shared/http/http_posts.service";
import { UserPost } from "@src/app/shared/models";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'] 
})
export class PostsComponent implements OnInit {
    posts: UserPost[] = [];

    constructor(private httpPostsService: HttpPostsService) { }

    ngOnInit(): void {
        this.httpPostsService.get().subscribe(posts => {
            this.posts = posts;
        });
    }
}