import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript';

@Table({ tableName: 'usuarios', timestamps: true })
export class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(100))
  nombre!: string;

  @Unique
  @Column(DataType.STRING(100))
  email!: string;

  @Column(DataType.STRING(255))
  password!: string;

  @Column({
    type: DataType.ENUM('Admin', 'Vendedor', 'Inventario', 'Marketing'),
    defaultValue: 'Vendedor'
  })
  rol!: 'Admin' | 'Vendedor' | 'Inventario' | 'Marketing';

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  estado!: boolean;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;
}

export default Usuario;