import { Router } from "express"
import { register, login, refresh, getMe } from "../authControllers/authRegisterLogin"

import { googleCallback } from "../authControllers/authGoogle"
import passport from "passport"
import { requireAuth } from "../middleware/auth"

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], }));
router.get("/google/callback", passport.authenticate("google", { session: false, }),googleCallback);
router.get('/me', requireAuth, getMe)

export default router