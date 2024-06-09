import { Router } from 'express';

import { BadRequestError } from '../utils/errors';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll().catch((error) =>
    next(new BadRequestError(error))
  );

  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId
  ).catch((error) => next(new BadRequestError(error)));
  
  return res.send(user);
});

export default router;
