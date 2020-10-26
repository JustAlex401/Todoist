import { User } from "src/user/entity/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne,} from "typeorm";
import { Project } from "./project.entity";

@Entity({
        name:'user_proj'
    })
export class UserProj {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.projects,  { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user!: User;

    @ManyToOne(() => Project, project => project.users,  { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    project!: Project;

}