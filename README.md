# Gemini-AI-app
Created as a technical task for interview

Steps for a run project:

Add .env file in the backend folder with:
GEMINI_API_KEY=<your key>
PORT=5000


From the root folder run the command npm run install-all
Then run the command npm start
Node version should be 18 or greater

I implemented this task using React for the frontend and Node.js for the backend. I chose Node.js because I have experience working with it.
For storing data, I chose SQLite, since within the framework of this small project it is more suitable than, for example, Mongo. This is my first experience with such a database and at first, it caused some difficulties in understanding how to work with it. But I managed it :)

There was nothing that caused me any major difficulties in the project, only the time limitation did not allow me to improve the UI/UX and functionality.

Bugs and features that I would like to fix in this project if I worked on it further:

- When a user sends a message, it appears in the conversation only after a response from the backend, It is necessary to change the state immediately after sending
- For tablets UI doesn't look very good, more breakpoints are needed
- Canceling requests only works on the client side, but writing to the database still occurs
- I would add a stream of responses from Gemini so that it can be displayed to the user in chunks
- To solve problems 3 and 4, it is necessary to implement web socket technologies

In total, I spent about 18 hours solving the problem.

Best regards, Arman.
 
