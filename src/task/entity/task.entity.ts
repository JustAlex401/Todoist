import { Commentsss } from "src/comment/entity/comment.entity";
import { Project } from "src/project/entity/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";

@Entity({
        name:'tasks'
    })
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar', 
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: 'varchar', 
        nullable: false,
    })
    description: string;

    @Column({
        type: 'boolean',
        nullable: true,
    })
    priority?: boolean;

    @Column({ 
        type: 'datetime',
        default: () => 'NOW()',
    })
    createAt: Date;

    @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    project!: Project;

    @OneToMany(() => Commentsss, comments => comments.task)
    commentsss: Commentsss[];

    
}