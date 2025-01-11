const express=require("express");
const users =require("./MOCK_DATA.json");
const app = express();
const port =7000;
const fs=require("fs");
app.use((req,res,next)=>{
    console.log("HEllo from middleware 1");
    req.username="piyush sir";
    next();
});
app.use((req,res,next)=>{
  fs.appendFile("log.txt",`\n${Date.now()}:${req.method}:${req.path}`,(err,data)=>
{
    next();
});
});
app.get("/api/users",(req,res)=>{
    res.setHeader("X name","ishans");
    return res.json(users);
});
app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}</ul>`;
res.send(html);
});

app.use(express.urlencoded({extended:false}));

//routes
app.route("/api/users/:id").
get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
})
.put((req,res)=>{
   return res.json({status:'pending'}
    );
})
.delete((req,res)=>{
    return res.json({status:'pending'});
});

app.post("/api/users",(req,res)=>{
   const body=req.body;
   users.push({...body,id:users.length });
   fs.writeFileSync("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json({status:pending});
   });
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
