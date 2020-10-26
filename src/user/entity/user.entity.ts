import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Project } from 'src/project/entity/project.entity';
import { UserProj } from 'src/project/entity/userproject.entiry';
import { Commentsss } from 'src/comment/entity/comment.entity';

@Entity({
    name: "users",

})
export class User{

  @PrimaryGeneratedColumn()
  @Index()
  id!: number;

  @Column({ 
    type: 'varchar', 
    nullable: false,
    unique: true
  }) 
  email: string;

  @Column({ 
    type: 'varchar', 
    nullable: false,
    unique: true
  }) 
  login: string;

  @Column({ 
    type: 'varchar', 
    nullable: false 
  }) 
  password: string;

  @OneToMany(() => UserProj, userProj => userProj.user)
  projects: Project[];

  @OneToMany(() => Commentsss, comments => comments.user)
  commentsss: Commentsss[];

  @BeforeInsert()
  emailToLowerCase(){
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));  
  }
}