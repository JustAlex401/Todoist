import { Task } from "src/task/entity/task.entity";
import { User } from "src/user/entity/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, JoinColumn, IsNull, OneToMany } from "typeorm";
import { UserProj } from "./userproject.entiry";

@Entity({
        name:'projects'
    })
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar', 
        nullable: false,
        unique: true
    })
    name: string;

    @Column({ 
        type: 'datetime',
        default: () => 'NOW()',
    })
    createAt: Date;

    @OneToMany(() => Task, task => task.project)
    tasks: Task[];

    @OneToMany(() => UserProj, userProj => userProj.project)
    users: User[];

    


}