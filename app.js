const express = require('express')
const cors = require('cors')
const { read , write } = require('./lab/write&read')
const path = require('path')
const  fs  = require('fs')

const app = express()
const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
  res.send('ok')
})
app.post("/users",(req,res)=>{
    
    if( !req.body.name || !req.body.phone || !req.body.id || !req.body){
       res.json({
         msg: "Kamchilik bor"
       })
    }else{
      let a = write(path.join(process.cwd(),"data","users.json"),req.body)
      res.json({
        msg:a
      })
    }
})
app.get("/users",(req,res)=>{
  if(!read(path.join(process.cwd(),"data","users.json")).length){
    res.json({
      data:null
    })
  }
  res.json({
    data:read(path.join(process.cwd(),'data',"users.json"))
  })
})
app.post("/courses",(req,res)=>{
  if( !req.body.tarif || !req.body.nomi ){
    res.json({
      msg: "Kamchilik bor"
    })
  }else{
    let a = write(path.join(process.cwd(),"data","courses.json"),req.body)
      res.json({
        msg:a,
        data:req.body
      })
  }

})

app.get('/courses',(req,res)=>{
  if(!read(path.join(process.cwd(),"data","courses.json")).length){
    res.json({
      data:null
    })
  }
  res.json({
    data:read(path.join(process.cwd(),'data',"courses.json"))
  })
})

app.delete('/courses/:id',(req,res)=>{
   if(!req.params.id ||  +req.params.id % 1 !== 0){
     res.json({
       msg: "O'chirish uchun req.params bilan id ni jo'nating"
     })
   }else{
     let data = read(path.join(process.cwd(),"data",'courses.json'))
     
     let course = data.find(el => el.id==req.params.id)
     if(!course){
       res.json({
         data: null ,
         msg: "bunday kurs yoq"
       })
     }else{
       data = data.filter(el => +el.id!==+req.params.id)
     }
     fs.writeFileSync(path.join(process.cwd(),"data",'courses.json'),JSON.stringify(data,null,4))
     res.json({
       data:course,
       msg: "Kurs o'chirildi"
     })
   }
})

app.get('/courses/:id',(req,res)=>{
  let data = read(path.join(process.cwd(),"data",'courses.json'))
  let course = data.find(el => el.id==req.params.id)
  if(course){
    res.json({
      data:course
    })
  }else{
    res.json({
      msg: "bunday kurs yoq",
      data:null
    })
  }
})

app.listen(PORT,()=>console.log('http://localhost:'+PORT))
