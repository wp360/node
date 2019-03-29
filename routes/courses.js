const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

router.get('/', (req,res) => {
    // res.send([1,2,3]);
    res.send(courses);
});

router.post('/', (req,res) => {
    // console.log(req.body.name);
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body, schema);
    // console.log(result);

    // if(!req.body.name || req.body.name.length < 3) {
    //     // 400 Bad Request
    //     res.status(400).send('Name is required and should be minimum 3 characters.');
    //     return;
    // }
    // if(result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    const {error} = validateCourse(req.body); // result.error
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req,res) => {
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    const result = validateCourse(req.body);
    // 对象解构
    // const {error} = validateCourse(req.body); // result.error
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // 更新
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req,res) => {
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    // 删除
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});

router.get('/:id', (req,res) => {
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    res.send(course);
    // res.send(req.params.id);
    // res.send(req.query);
});

function validateCourse(course) {
    // 验证
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

// router.get('/api/posts/:year/:month', (req,res) => {
//     res.send(req.params);
// });

module.exports = router;