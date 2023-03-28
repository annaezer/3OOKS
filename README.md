# About this application
3OOKS is all about books. If you don’t know what to read this is where you start! Especially when you are overwhelmed with all the choices and you just want to keep it quick and simple. There are 3 options to search:

1. Click on ‘Questions’ to answer three questions about your mood, available time and need for reviews. This results in a max of 3 fitting books.

2. Click on ‘Database’ if you already know which author, subject or title you are looking for. Fill in your query and start your search to get 3 suggestions.

3. Clicking the button ‘Bestsellers’ results in the 3 bestselling fiction books of the moment according to the New York Times. If you like non-fiction you can easily change it by clicking the button underneath the results.

There is no need for an account, only if you like to save your favourite books while browsing. In that case you click ‘sign up’ in the menu on top of the page. Just fill in your name, chosen password and email and you can log in after.

Saving books as favourite is as easy as it sounds: just click the heart next to the book you would like to save and you will see a notification that it’s been saved. You can view this saved books by clicking on the heart in the menu on top.

If you like to read more about the application you can click on ‘about’ in the menu on top. If you like to contact us with questions or suggestions you can use the contact form on the contact page.

# Screenshot
![](/src/assets/screenshot 3OOKS.png)

# How to run this application
1. When you open this project in WebStorm or another IDE it is important to first install all the packages the project depends on. You can do this by opening the terminal (in WebStorm you can find the terminal on the bottom of the page: click to open) and typing in the following command:

`npm install`

After this you will see the dependencies added to the project as a file called “node_modules”.

2. Second important step is to create a new file in the project called ‘.env’. In this file you can copy the two API keys you will find in the "Installatiehandleiding" chapter in my project documentation. You need this keys to be able to fetch the data from the sources I use, also called API. In the .env.dist file you can find the variables without the key.

3. The third step is to start running the application in the development mode. You can do this by typing the following command in the terminal:

`npm start`

A browser window will open automatically with the address http://localhost:3000. If not you can open it by typing in this address in the bar of your web browser. The page will reload when you make changes. If you want to stop the application use the shortcut CTRL-C in the terminal.

There are two more commands you can use:

`npm test`

Launches the test runner in the interactive watch mode. See the section about running tests (https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

