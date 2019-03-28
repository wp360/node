const mongoose = require('mongoose');

mongoose
  .connect('mongodb://admin:admin123@ds125616.mlab.com:25616/mongo-demo')
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('数据库连接失败', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

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

async function getCourses() {
  // 操作符
  // eq(equal 等于)
  // ne(not equal 不等于)
  // gt (greater than 大于)
  // gte (greater than or equal to 大于等于)
  // lt (less than 小于)
  // lte (less than or equal to 小于等于)
  // in
  // nin (not in)

  // 分页
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: {$gt: 10 }}) // 价格大于10
    // .find({ price: {$gte: 10, $lte: 20 }}) // 价格在10到20之间
    // .find({ price: { $in: [10, 20, 30] } }) // 价格为10、20或30
    // 正则表达式
    // Starts with Mosh 开头
    .find( { author: /^Mosh/ })
    // Ends with Hamedani 结尾
    .find({ author: /Hamidani$/i })
    // Contains Mosh 中间
    .find({ author: /.*Mosh.*/i })
    // .limit(10)
    .skip((pageNumber -1 )*pageSize)
    .limit(pageSize)
    .limit.sort({ name: 1 })
    // .count(); 计数
    .select({ name: 1, tags: 1}); // 选择只显示的属性
  console.log(courses);
}

getCourses();



