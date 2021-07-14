import {Entity, model, property} from '@loopback/repository';

@model()
export class UserModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<UserModel>) {
    super(data);
  }
}

export interface UserModelRelations {
  // describe navigational properties here
}

export type UserModelWithRelations = UserModel & UserModelRelations;
