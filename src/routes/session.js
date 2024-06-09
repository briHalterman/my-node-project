import { Router } from 'express';

import { BadRequestError } from '../utils/errors';

const router = Router();

router.get('/', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.context.me.id
  ).catch((error) => new BadRequestError(error));

  return res.send(user);
});

export default router;
