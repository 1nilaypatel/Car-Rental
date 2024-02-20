import express from 'express';
import {signin, signOut, userSignup, agencySignup} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/userSignup', userSignup);
router.post('/agencySignup', agencySignup);
router.post('/signin', signin);
router.get('/signout', signOut);

export default router;