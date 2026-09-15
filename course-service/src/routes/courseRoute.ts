import { Router } from "express"

import { createCourseController, getMyCoursesController } from "../controller/course.controller"



const courseRouter = Router()

courseRouter.post('/create', createCourseController)
courseRouter.get('/my', getMyCoursesController)


export default courseRouter