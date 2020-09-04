import mysql = require('mysql');

export default class MySQL {
  private static _instance: MySQL;

  cnn: mysql.Connection;
  connected: boolean = false;

  constructor() {
    console.log('Class started');

    this.cnn = mysql.createConnection({
      host: 'localhost',
      user: 'node_user',
      password: '123456',
      database: 'node_db'
    });

    this.connectDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public static execQuery(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log('Query Error');
        console.log(err);
        return callback(err);
      }

      if (results.length === 0) {
        callback('No data found');
      } else {
        callback(null, results)
      }

    })
  }

  private connectDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }

      this.connected = true;
      console.log('DB Online')
    })
  }
}