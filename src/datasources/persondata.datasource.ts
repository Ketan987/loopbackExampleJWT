import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'persondata',
  connector: 'mongodb',
  url: 'mongodb+srv://KetanUser:ddtJptLylWkQrs1z@clustermern.qtl6k.mongodb.net/ktFollow?retryWrites=true&w=majority',
  host: 'clustermern.qtl6k.mongodb.net',
  port: 27017,
  user: 'KetanUser',
  password: 'ddtJptLylWkQrs1z',
  database: 'ktFollow',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PersondataDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'persondata';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.persondata', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
