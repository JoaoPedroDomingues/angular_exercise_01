import { NgModule } from "@angular/core";
import { PostComponent } from "./post/post.component";
import { PostsComponent } from "./posts.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [PostComponent, PostsComponent],
    imports: [CommonModule],
    exports: [PostsComponent]
})
export class PostsModule {}
