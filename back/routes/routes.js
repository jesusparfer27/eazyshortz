import { Router } from 'express';
import { shortenURL } from '../controllers/urls.controller.js';

const router = Router();

router.post("/shorten", shortenURL);

export default router;
