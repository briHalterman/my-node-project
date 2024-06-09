import { v4 as uuidv4 } from 'uuid';

import { Router } from 'express';

import { BadRequestError } from '../utils/errors';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll().catch(
    (error) => next(new BadRequestError(error))
  );

  return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  ).catch((error) => next(new BadRequestError(error)));

  return res.send(message);
});

router.post('/', async (req, res, next) => {
    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    }).catch((error) => next(new BadRequestError(error)));

  return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  }).catch((error) => next(new BadRequestError(error)));

  return res.send(true);
});

export default router;
