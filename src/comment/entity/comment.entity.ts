
import { Task } from "src/task/entity/task.entity";
import { User } from "src/user/entity/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

@Entity({
        name:'comments'
    })
export class Commentsss {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar', 
        nullable: false,
    })
    comment: string;

    @Column({ 
        type: 'datetime',
        default: () => 'NOW()',
    })
    createAt: Date;

    @ManyToOne(() => User, user => user.commentsss,  { onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    user!: User;

    @ManyToOne(() => Task, task => task.commentsss,  { onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    task!: Task;

    
}