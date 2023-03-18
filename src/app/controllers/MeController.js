const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../ulti/mongoose')

class meController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({})

        // *****SẮP XẾP THEO THỨ TỰ*****
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount, 
                    courses: multipleMongooseToObject(courses)
                }))
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {

        let courseQuery = Course.findDeleted({})

        // *****SẮP XẾP THEO THỨ TỰ*****
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocuments()])
            .then(([courses, documentCount]) =>
                res.render('me/trash-courses', {
                    documentCount, 
                    courses: multipleMongooseToObject(courses)
                }))
            .catch(next)
    }
}

module.exports = new meController()
