# social-network-api

## Description

This is an API for a social network web app where users can create an account, add their thoughts, (which can then be commented on) and then add friends. This programme uses `MongoDB` for database, `Mongoose` ODM, `Moment.js` for timestamps and `Express.js` for routing. `Insomnia` was also used to seed the data.

To see a video of the platform working in Insomnia, see here:

## Table of Contents

- [Licence](#licence)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation Process](#installation-process)
- [Credits](#credits)
- [Links](#links)
- [Images](#images)

## Licence

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Installation Process

Clone the repository to use this application on local machine.
Node.js and MongoDB is required to run the application
To install necessary dependencies, navigate to the root directory and run the following command: npm i

## Credits

I worked on this project with Graham McCullough [Github](https://github.com/Grahamy27)

## Links

[Click Here to Watch](https://drive.google.com/file/d/1JzApSDnmJpDlDjgQFLhEGqCtgUJZwvJZ/view)