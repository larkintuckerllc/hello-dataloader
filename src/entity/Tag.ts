import { Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import Post from './Post';

@Entity()
export default class Tag {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string = '';

    @ManyToMany(() => Post, (post) => post.tags)
    public posts: Post[];
}
