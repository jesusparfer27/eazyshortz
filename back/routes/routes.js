import { Router } from 'express';
import { shortenURL } from '../controllers/urls.controller.js';
import { redirectURL } from '../controllers/redirect.controller.js';

const router = Router();

router.post("/shorten", shortenURL);
router.get("/short/:short_code", redirectURL);

export default router;
