My app is for people who want to track their spending on different types of expenses to see what they are spending the most money on. This is to help them realize if they need to cut back on food because it accounts for a ton of their purchases, includes a helpful bar graph for this purpose. 


Front end: https://full-stack-final.netlify.app/ 
Back end: https://full-stack-final-vble.onrender.com 



* Has read, write and delete functionality for expenses
* Backend API with full CRUD operations
* Data persisted in MongoDB
* Error handling on client + server
* Contains a helpful, responsive in real time bar graph 

The bar graph takes all of the combined “amount” numbers held in mongoDB and adds them up by category. I then pass that information to a chart.js bar graph. You can even hover over the bars to see specific data



This is what the app looks like with no tasks

"screenshots/empty.png"

This is what the app looks like with one expense
"screenshots/one expense.png"

This is what the app looks like with two expenses
"screenshots/two expenses.png"

this is what it looks like when the user tries to enter an incorrectly formatted amount
"screenshots/fail.png"


/frontend
  /src
    /components
       ExpenseItem.jsx
       ExpenseList.jsx
       TypeChart.jsx 
     /api
       Expense.js
    App.jsx
    App.css
    main.jsx
    index.css
/backend
  /models
     Expense.js
  /routes
  server.js 

The app.jsx holds the bulk of the front end page info and holds 3 components, the first is the expense item, which holds the direct front end info for each expense, the second is the expense list, which holds the expense items and the third is the type chart which holds the baseline framework for the bar graph which is eventually initialized on app.jsx. To get to the backend app.jsx imports methods fromExpense.js which fetches the routes from the server.js file in the backend. On the backend side of things the schema for the expenses is stored in the Expense.js file in the models folder. The server.js file uses that schema to make CRUD routes which are later fetched by the front end


Setup guide:

1. Clone this git repo 

git clone https://github.com/your-username/your-project.git
cd your-project


2. There are 2 .env.example files(one in the frontend and one in the backend), remove the .example from each one to connect to a local version of this app


3. Make sure you go into both the front end and the back end and run these two commands in both

npm install
npm run dev


*** important note*** to change what folder you are in use the command cd <folder name>
So to go from the root folder to the back end you would type:   cd backend



*** important note 2*** to go back one folder type the command:   cd .. 
So if you are in the backend folder typing cd .. will bring you back to the root folder where you can then type cd frontend to travel to the front end so you can run the commands above



4. To run the app locally 


    Start backend on http://localhost:300 by going to the backend folder using the cd command and then typing npm run, followed by the command npm start, you should see a little checkmark pop up   
 
Next start the frontend on http://localhost:5173 by going to the frontend folder and typing npm run dev

Confirm that CORS and the API requests are working and that nothing is broken.



GET /api/expenses
Returns all expenses.

GET api/expenses/totals
Gets the total of “amount(s)” per “type”


POST /api/expenses

Creates a new resource. Body example:

{
 "title": “pizza",
 "type": "food",
  "amount": 12.12,
}

PUT /api/expenses/:id

Updates an expense.


DELETE /api/expenses/:id
Deletes an expense..



My front end is on netlify at https://full-stack-final.netlify.app/ 

My backend is on render at https://full-stack-final-vble.onrender.com 
The environment variables are CLIENT_ORIGIN, connecting to my front end and MONGODB_URI which connects to my mongoDB database



video
https://youtu.be/AfTDmXdd8Ns 




Reflection

The hardest part of this project was by far the front end. This is a consistent thing I have noticed when working with html and react. Creating things and making them look cool like buttons, input lines and images is trivial. Especially with things like bootstrap, adding cool colors or interesting effects is extremely easy. However placing items where you want them on screen and sizing them correctly is very time consuming and annoying. The reason particularly bad is because of the nested structure of html, On large projects something being of center could be the result of 7 different tags and you have to sort through all of it one by one to fix the problem

I am most proud of the graph, on the surface it looks simple, just throw your data into a graph, easy. But I had to do lots of stuff behind the scenes to get it to work, most importantly I had to make an entirely new backend route. Because the total amount of money spent on a single category is going to end up being spread across different expense items I had to make an endpoint that consolidated the data so I could use it in the graph.
I would add more. I think because of the amount of work I had to do for all my finals I set my scope kind of low. One thing I would like to add to this app in the future is the ability to see expenses over time, every expense item has a timestamp so we could graph that with a line graph
I did not have a working product for that gallery. 




I used chat gpt for configuring cors, I did not realize the extra / at the end of my url for my cors variable made the url “www.example//api/expenses” instead of “www.example/api/expenses” this frustrated me so much I had to go to chat gpt after wasting 45 minutes or so 
I also used it for this line which forces the amount of money to be imputed in the $xx.xx format. 

const amountPattern = /^\d+(\.\d{2})$/;

this is a regular the d+ means 1 or mor digits, and the \.\d{2} means a decimal point followed by two more digits


Most of the issues I had I could find answers for on the internet so I did not need to use a lot of ai.
