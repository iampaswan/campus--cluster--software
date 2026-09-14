import { Router } from "express"

import { createCourseController, getMyCoursesController } from "../controller/course.controller"



const courseRouter = Router()

courseRouter.post('/create-course', createCourseController)
courseRouter.post('/my-course', getMyCoursesController)


export default courseRouter