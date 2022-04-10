import express from 'express';
import controller from '../controllers/pagination';

const router = express.Router();

router.get('/get/:page', controller.pagination);

export = router;
