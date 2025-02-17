import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user'

@Entity({ name: 'labels' })
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('text')
  name!: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column('text')
  color!: string

  @Column('text', { nullable: true })
  description?: string

  @CreateDateColumn()
  createdAt!: Date

  @Column('integer', { default: 0 })
  position!: number
}
