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
    // .find({ isPublished: true, tags: {$in: ['frontend','backend']}}) // 查询条件
    .find({ isPublished: true })
    // 使用操作符
    // 价格大于等于15，使用正则表达式判断含有关键字by的内容
    .or([{price:{$gte: 15}},{name: /.*by.*/i}])
    .sort('-price') // 排序
    .select('name author price'); // 筛选
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();