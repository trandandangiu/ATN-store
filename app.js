// Import các module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect('mongodb+srv://dzminhnguyen:Nn22102002@cluster0.qfggmoz.mongodb.net/estore-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

// Định nghĩa Schema cho collection Store
const StoreSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String
});

// Tạo model từ schema
const Store = mongoose.model('Store', StoreSchema);

// Cấu hình body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Định nghĩa route cho trang chủ
app.get('/', async (req, res) => {
  try {
    const Stores = await Store.find();
    res.render('index', { Stores: Stores });
  } catch (err) {
    console.log(err);
    res.render('index', { books: [] });
  }
});

// Định nghĩa route cho việc tạo sách mới
app.post('/', (req, res) => {
  const newStore = new Store({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  });

  newStore.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

// Định nghĩa route cho việc xóa sách
app.post('/delete', (req, res) => {
  const StoreId = req.body.id;

  Store.findByIdAndDelete(StoreId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

// Định nghĩa route cho việc cập nhật sách
app.post('/update', (req, res) => {
  const StoreId = req.body.id;

  Store.findByIdAndUpdate(StoreId, {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

// Cấu hình template engine là Pug
app.set('view engine', 'pug');

// Serve static files (CSS, images, etc.) from the 'public' directory
app.use(express.static('public'));

// Khởi chạy server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
