import type { CartItem } from 'src/types/cart.types';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  hall: string;

  @Column('text')
  etc: string;

  @Column()
  total_amount: number;

  @Column('jsonb')
  items: CartItem[];

  @Column({ nullable: true })
  reserve: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @Column({ nullable: true })
  cart_id: string;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  username: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
