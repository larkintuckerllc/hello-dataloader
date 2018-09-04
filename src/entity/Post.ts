import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import Tag from './Tag';

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string = '';

    @ManyToMany(() => Tag, (tag) => tag.posts)
    @JoinTable()
    public tags: Tag[];
}
