import * as Mongoose from 'mongoose';
import { keyword } from '../libs/log';
import UserMod, { IUser } from './model/user';
import MessageMod, { IMessage } from './model/message';
import ArticleMod, { IArticle } from './model/article';
import ClassificationMod, { IClassification } from './model/classification';

interface Database {
  UserModel: Mongoose.Model<IUser>;
  MessageModel: Mongoose.Model<IMessage>;
  ArticleModel: Mongoose.Model<IArticle>;
  ClassificationModel: Mongoose.Model<IClassification>;
}

export default function DbConnection(dbURL: string): Database {
  (<any>Mongoose).Promise = global.Promise;

  Mongoose.connect(
    dbURL,
    { useNewUrlParser: true }
  );

  //连接成功终端显示消息
  Mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to ' + keyword('yellow')(dbURL));
  });
  //连接失败终端显示消息
  Mongoose.connection.on('error', () => {
    console.log('Mongoose error ');
  });
  //连接断开终端显示消息
  Mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
  return {
    UserModel: UserMod,
    MessageModel: MessageMod,
    ArticleModel: ArticleMod,
    ClassificationModel: ClassificationMod
  };
}
