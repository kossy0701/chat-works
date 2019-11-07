import { Comment } from './comment';
import { User } from './user';

const user: User = new User(1, '田中太郎');
const comment: Comment = new Comment(user, 'deserialize');

describe('Comment', () => {
  it('should create an instance', () => {
    expect(new Comment(user, 'こんにちは！')).toBeTruthy();
  });

  it('deserialize', () => {
    expect(comment.deserialize()).toBeTruthy();
  });
});

