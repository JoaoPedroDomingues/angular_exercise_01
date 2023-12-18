import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { UserPost } from '@src/app/shared/models';

describe('PostComponent tests', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const post: UserPost = { userId: 1, id: 1, title: 'Test Title', body: 'Test Body' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
    });

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    component.post = post;
    component.ngOnInit();
  });

  it('Should initialize component', () => {
    expect(component).toBeTruthy();
  });

  it('Should initialize component with UserId being displayed first', () => {
    Object.keys(post).forEach(property => {
      expect(component.currentView.get(property)).toBeDefined();
      expect(component.currentView.get(property)).toBe(false);
    });

    // Ensuring the first property displayed in the card is the one we want
    expect(Object.keys(post)[0]).toBe('userId');
    expect(component.currentView.get(Object.keys(post)[0])).toBe(true);
  });

  it('Should toggle to the next UserPost property to be displayed', () => {
    component.goToNextPostProperty();

    const previousProperty = component.currentView.get(Object.keys(post)[0]);
    const newProperty = component.currentView.get(Object.keys(post)[1]);

    expect(newProperty).toBe(true);
    expect(previousProperty).toBe(false);
  });

  it('Should go back to the last UserPost proerty when reaching the end of the list', () => {
    // Call it until we circle back
    Object.keys(post).forEach(() => component.goToNextPostProperty());

    const lastView = component.currentView.get(Object.keys(post)[Object.keys(post).length - 1]);
    const firstView = component.currentView.get(Object.keys(post)[0]);

    expect(lastView).toBe(false);
    expect(firstView).toBe(true);
  });
});