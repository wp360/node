const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds125616.mlab.com:25616/mongo-demo');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find({ isPublished: true, tags: 'backend' }) // 查询条件
    .sort({ name: 1 }) // 排序
    .select({ name:1, author: 1 }) // 筛选
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();