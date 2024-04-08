const express=require('express');
const app=express();
const tasks=require('./routes/index')
// app.use('/api',tasks)
const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/storiesDB").then(()=>console.log("mongoDB connected")).catch((err)=>console.log(err))
const newsSchema = new mongoose.Schema({
  title: String,
  link: String
});

const news = mongoose.model('News', newsSchema);
const newsData = [
  {
     "title": "Amy Schneider’s Jeopardy! Streak Ends at 40 Consecutive Wins and $1.4 Million",
     "link": "https://time.com/6142934/amy-schneider-jeopardy-streak-ends/"
   },
   {
     "title": "'Writing With Fire' Shines a Light on All-Women News Outlet",
     "link": "https://time.com/6142628/writing-with-fire-india-documentary/"
   },
   {
     "title": "Moderna Booster May Wane After 6 Months",
     "link": "https://time.com/6142852/moderna-booster-wanes-omicron/"
   },
   {
     "title": "Pressure Mounts for Biden to Nominate a Black Woman to the Supreme",
     "link": "https://time.com/6142743/joe-biden-supreme-court-nominee-black-woman-campaignpromise/"
   },
   {
     "title": "The James Webb Space Telescope Is in Position—And Now We Wait",
     "link": "https://time.com/6142769/james-webb-space-telescope-reaches-l2/"
   },
   {
    "title": "We Urgently Need a New National COVID-19 Response Plan",
     "link": "https://time.com/6142718/we-need-new-national-covid-19-response-plan/"
   }
];

// Function to save news articles to the database
async function saveNewsArticles() {
  try {
    await news.deleteMany({}); // Clear existing data
    const savedNews = await news.insertMany(newsData);
    console.log('News articles saved successfully:', savedNews);
  } catch (error) {
    console.error('Error saving news articles:', error.message);
  } finally {
    mongoose.disconnect(); // Close database connection
  }
}

// Call the function to save news articles
saveNewsArticles();
app.get('/',(req,res)=>{
    res.send('go to /getTimeStories route')
})
app.get('/getTimeStories',async(req,res)=>{
    try{
        const resposne=await news.find({});
        res.json(response)
    }
    
    catch(err){
        console.log(err);
    }
})
app.listen(3000,()=>{
    
    console.log("listeing on port 5000.");
})