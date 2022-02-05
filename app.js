const express = require('express');
const app= express();
const mongoose = require('mongoose');
const Blog = require('./Models/model');
mongoose.connect('mongodb+srv://zartaj:zartaj@cluster0.2isjv.mongodb.net/blog-node?retryWrites=true&w=majority');

app.listen(3000);
app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.get('/' , (req,res)=>{
  res.redirect('/blogs')
});
app.get('/blogs',(req,res)=>{
  Blog.find()
  .then((result)=>{
    res.render('index',{title:'all blogs',blogs:result})
  });
});
app.post('/blogs',(req,res)=>{
  const blog = new Blog(req.body);
  blog.save()
   .then((result)=>{
    res.redirect('/blogs')
  })
})

 app.get('/about',(req,res)=>{
   res.render('about',{title:'About'})
 });

 app.get('/blogs/create',(req,res)=>{
  res.render('create',{title:'create a new blog'})
});

app.get('/blogs/:id',(req,res)=>{
 const id = req.params.id
 Blog.findById(id)
 .then((result)=>{
   res.render('Blog',{blog:result,title:'Full blog'})
 })
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});





app.use((req,res)=>{
  res.status(404).render('404',{title:'404'})
});
