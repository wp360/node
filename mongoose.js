const mongoose = require('mongoose');

mongoose.connect('mongoose://localhost/playground')
    .then(() => console.log('连接数据库'))
    .catch(err => console.error('连接未成功',err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date,default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course',courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

// createCourse();

// Mongoose初使用总结 https://www.jianshu.com/p/265ff15bca7a
async function getCourses() {
    const courses = await Course.find({author:'Mosh', isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({name: 1,tags: 1});
    console.log(courses);
}

getCourses();