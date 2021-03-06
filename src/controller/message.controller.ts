import * as Koa from 'koa';
import { prefix, router, log, required, auth, permission } from '../middleware/router/decorators';
import { MessageMod } from '../db/model';
import { trycatch } from '../libs/utils';
import { Permission, Status } from '../constants/enum';

@prefix('/message')
export default class MessageController {
  // @router({
  //   path: '',
  //   method: 'get'
  // })
  // @required(['index', 'limit'])
  // @auth
  // @log
  // async getMessage(ctx: Koa.Context) {
  //   let { index, limit } = ctx.query;
  //   index = +index;
  //   limit = +limit;

  //   await trycatch(
  //     ctx,
  //     async () => {
  //       const count = await MessageMod.countDocuments();
  //       const results = await MessageMod.find({ uid: ctx.request.uid })
  //         .skip((index - 1) * limit)
  //         .limit(limit)
  //         .sort({ time: -1 })
  //         .exec();

  //       ctx.body = {
  //         code: Status.ok,
  //         data: {
  //           rows: results,
  //           count
  //         },
  //         msg: 'message,hold well'
  //       };
  //     },
  //     'message get failed'
  //   );
  // }

  @router({
    path: '/get',
    method: 'get'
  })
  @log
  async addMessage(ctx: Koa.Context) {
    // const req = ctx.request.body as { email: string; text: string; uid: string };
    // req.uid = ctx.request.uid;

    // const newMessage = new MessageMod({ email: '11111', text: '2222', uid: ctx.request.uid });
    // await trycatch(
    //   ctx,
    //   async () => {
    //     await newMessage.save();
    //     ctx.body = {
    //       code: Status.ok,
    //       data: null,
    //       msg: 'message sent successfully'
    //     };
    //   },
    //   'message sent failed'
    // );
  }

  @router({
    path: '',
    method: 'delete'
  })
  @auth
  @required(['_id'])
  @permission(Permission.root)
  @log
  async removeMessage(ctx: Koa.Context) {
    const req = <{ _id: string }>ctx.request.body;
    await trycatch(
      ctx,
      async () => {
        await MessageMod.findByIdAndDelete(req._id);
        ctx.body = {
          code: Status.ok,
          data: null,
          msg: 'message deleted successfully'
        };
      },
      'message deleted failed'
    );
  }
}
