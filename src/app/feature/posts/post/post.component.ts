import { Component, Input, OnInit } from '@angular/core';
import { UserPost } from '@src/app/shared/models';
import { camelCaseToRegularString } from '@src/app/shared/utils/helpers';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: UserPost = { userId: 0, id: 0, title: "", body: "" };

  currentView: Map<string, boolean> = new Map();
  isPostHovered: boolean = false;

  ngOnInit(): void {
    Object.keys(this.post).forEach(property => this.currentView.set(property, false));
    this.currentView.set(Object.keys(this.post)[2], true);
  }

  goToNextPostProperty(): void {
    let previousIndex: number;

    Object.keys(this.post).forEach((property, index) => {
      if(this.currentView.get(property)) {
        this.currentView.set(property, false);
        previousIndex = index;
      }
    });

    const nextIndex = previousIndex + 1 < Object.keys(this.post).length ? previousIndex + 1 : 0;
    this.currentView.set(Object.keys(this.post).at(nextIndex), true);
  }

  currentPostPropertyName(): string {
    const currentProperty = Object.keys(this.post).find(property => this.currentView.get(property));

    return camelCaseToRegularString(currentProperty);
  }

  onMouseHover(isHovering: boolean): void {
    this.isPostHovered = isHovering;
  }

  getAdjustedPostBody(): string {
    return this.isPostHovered ? this.post.body : this.post.body.slice(0, 25);
  }
}
