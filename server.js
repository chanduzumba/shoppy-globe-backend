import express from 'express' //import express for creating a server

// create and listen at port 5000 from env file
const app = new express()

//listen at port 5000
app.listen(process.env.PORT, () => {
    console.log('Server is running at port 5000')
})