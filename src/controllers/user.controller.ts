// Uncomment these imports to begin using these cool features!


import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { loginBL } from '../BL/login.BL';
import { signupBL } from '../BL/signup.BL';
import {UserModel} from '../models';
import {UserModelRepository} from '../repositories';
import jsonwebtoken from 'jsonwebtoken';
import { UserAuth } from '../BL/user.BL';


export class UserDataController {
  constructor(
    @repository(UserModelRepository)
    public userModelRepository : UserModelRepository,
  ) {}

  @post('/user/signup')
  @response(200, {
    description: 'UserModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserModel, {
            title: 'NewUserModel',
            
          }),
        },
      },
    })
    userModel: UserModel,
  
  ): Promise<any> {

    try{
      // return signupBL(this.userModelRepository, userModel);
      return UserAuth.signupBL(this.userModelRepository, userModel);
    }
    catch(err){
      return {status : 'Failed'}
    }
    // return this.userModelRepository.create(userModel);
  }


  @post('/user/login')
  @response(200, {
    description: 'UserModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserModel)}},
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserModel, {
            title: 'NewUserModel',
            
          }),
        },
      },
    })
    userModel: UserModel,
  
  ): Promise<any> {

    try{
      return UserAuth.loginBL(this.userModelRepository, userModel, jsonwebtoken)
    }
    catch(err){
      return {status : 'Failed', message : err.message}
    }
    // return this.userModelRepository.create(userModel);
  }
}
