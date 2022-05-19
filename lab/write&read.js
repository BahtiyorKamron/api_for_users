const fs = require('fs')
const path = require('path')

function write(path,data){
     let datas = fs.readFileSync(path)
     datas = JSON.parse(datas)
     let user = null 
     if(data.id){
      user = datas.find( u => u.id==data.id )
     }else if (!data.id || +data.id<10000){
       data.id = datas.length ? datas.length + 1 : 1
     }

     if(!user){
       datas.push(data)
       fs.writeFileSync(path,JSON.stringify(datas,null,4))
       return "qo'shildi"
     }else{
       return "bu foydalanuvchi mavjud"
     }
}
function read(path){
  const datas = fs.readFileSync(path)
  return JSON.parse(datas)
}

module.exports = {
  write,
  read
}
