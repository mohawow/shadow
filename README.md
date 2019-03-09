# [Shadow](https://road-rate-client.herokuapp.com/)
<div align="center">
  <img src="./src/assets/loginPage.png" alt="login Page" width="800px">
</div>
<p align="center">Shadow </p>

## Why Shadow?
**Thousands of Amazon drivers are unable to view thier past/ historical trips, but more importantly they are unable to tell how much exactly they made before and after tips, how much stops they made**


## What is Shadow?
Shadow is web application service that help Amazon drivers to track thier trips. 

- STORE AND VIEW YOUR HISTORICAL DATA
- TIPS GET CALULATED AUTOMATICALLY
- SEARCH, ADD, DELETE, UPDATE AND SORT YOUR TRIPS

## Heroku Live App
- [Deployed Client](https://limitless-beach-69771.herokuapp.com)
- [Deployed Server](https://peaceful-meadow-82701.herokuapp.com/) 
- [Client Repo](https://github.com/mohawow/shadow)
- [Server Repo](https://github.com/mohawow/shadow-api-node)


## ScreenShot
<img src='./src/assets/dashboard.png' alt='dashboard' width='300px'/>

**All Users:**
- Landing page with background info and login/registration navbar.
- User Registration and Login forms are /Auth/ using jwt authToken and Joi validation. 
**Demo User:**
 DEMO USERNAME: user1@domain.com
 PASSWORD: user1


**Trip Data Means:**
[Date, time, shift, number of packages, number of Stops, inital pay, final pay, tips ]

**Registered Users:** 
- Registered users can "add" all trips data. 
- Registered users can "view" all trips data.
- Registered users can "delete" all trips data.
- Registered users can "update" all trips data.
- Registered users can "sort" by columns in trips data.
- Registered users can "search" by word for a trips data.
- Registered users can "select" filter by shift. 
- Registered users can "favor" certain row. 
- Registered users can use pagination feature when they reach 4 rows per page to view more trips. 
- Registered users can view thier automatically calcualted tips. 


## V2 Features future Plans 
- Log time automatically  upon login.
- Calculate Milage upon login to app and log out. 
- Chart report that shows meaning visual data ex. Chart.js 
- Community forums.

## Tech Stack
**Front End:** 
  - Create React App
  - React
  - Axios
  - Joi
  - JWT
  - CSS: used bootstap terminologies only. 
  Plan to convert CSS app to bootstap after graduation.

**Back End:** 
  - Node
  - Express
  - Axios
  - Joi
  - JWT
  - MongoDB
  - Mongoose

**Testing:** 
  - Jest
  - Enzyme 

## App Images

<img src='./src/assets/loginPage.png' alt='loginPage' width='800px'/>
<img src='./src/assets/registeration.png' alt='registeration Page' width='800px'/>
<img src='./src/assets/dashboard.png' alt='dashboard' width='800px'/>
<img src='./src/assets/tripForm.png' alt='Trip Form' width='800px'/>
