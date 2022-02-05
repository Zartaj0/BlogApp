const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zartaj:zartaj@cluster0.2isjv.mongodb.net/blog-node?retryWrites=true&w=majority');
const blogSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  snippet:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  }
});
const Blog = mongoose.model('Blog',blogSchema);
module.exports=Blog;
