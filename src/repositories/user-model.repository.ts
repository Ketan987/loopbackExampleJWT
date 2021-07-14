import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PersondataDataSource} from '../datasources';
import {UserModel, UserModelRelations} from '../models';

export class UserModelRepository extends DefaultCrudRepository<
  UserModel,
  typeof UserModel.prototype.id,
  UserModelRelations
> {
  constructor(
    @inject('datasources.persondata') dataSource: PersondataDataSource,
  ) {
    super(UserModel, dataSource);
  }
}
