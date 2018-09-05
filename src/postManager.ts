import { NextFunction, Request, Response } from 'express';
import { getConnection, Repository } from 'typeorm';
import Post from './entity/Post';

let initialized = false;
let postRepository: Repository<Post>;

const initialize = () => {
  initialized = true;
  const connection = getConnection();
  postRepository = connection.getRepository(Post);
};

export const readPosts = async (_: Request, res: Response, next: NextFunction) => {
  if (!initialized) {
    initialize();
  }
  try {
    const posts = await postRepository.find({ relations: ['tags'] });
    res.send(posts);
  } catch (error) {
    next(error);
  }
};