import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Post from './entity/Post';
import Tag from './entity/Tag';

const POSTS_COUNT = 10;

createConnection().then(async (connection) => {
  const tagRepository = connection.getRepository(Tag);
  const postRepository = connection.getRepository(Post);
  const tagA = new Tag();
  tagA.name = 'Tag A';
  tagRepository.save(tagA);
  const tagB = new Tag();
  tagB.name = 'Tag B';
  tagRepository.save(tagB);
  const tagC = new Tag();
  tagC.name = 'Tag C';
  tagRepository.save(tagC);
  for (let i = 0; i < POSTS_COUNT; i ++) {
    const post = new Post();
    post.name = `Post ${i.toString()}`;
    switch (i) {
      case 0:
        break;
      case 1:
      case 2:
      case 3:
        post.tags = [tagA];
        break;
      case 4:
      case 5:
      case 6:
        post.tags = [tagA, tagB];
        break;
      case 7:
      case 8:
      case 9:
        post.tags = [tagA, tagB, tagC];
      default:
    }
    await postRepository.save(post);
  }
  process.exit(0);
}).catch((error) => console.log(error));
