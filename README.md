# Employee Management System

A simple CRUD application for a coding techincal round for a Full-Stack role. As the choice of data to represent the features of the application was to be my own, I decided to build a simple Employee Management system

## Plan

Before beginning any development, I need to think about the structure of my data, and the tech stack I'll use.
I also need to think about some rough wireframing to inform my design.

### DB Relational schema

id: A unique identifier for each employee. It autoincrements with each new record, ensuring a unique key.
firstName and lastName: To store the employee's first and last names.
email: Employee's email address, marked as unique to avoid duplicate records.
position: The role or job title of the employee within the company.
salary: Numerical value representing the employee's salary. Stored as a float to accommodate decimals.
department: The department in which the employee works. This can help in filtering and grouping data in the application.

Further improvements would be to make a second table with personal details of the employees and join the data for the frontend when required.

### Tech Stack:

Frontend:

- Framework: React (Typescript) - Due to recent usage of it so I can quickly deliver within the shorter time frame; although for a business application as the one described, Angular (TS) may be a more suitable option due to its heavy opinionation allowing maintainability by other developers. The use of Typescript instead of Javascript helps to make the code more maintainable and less susceptible to bugs during development.
- Styling: TailwindCSS and NextUI Components - Again due to recent usage, this frontend stack will allow for quick development in the timeframe allotted, and saves having to spend too much time on making things look good.
- Deployment: Netlify integrated within Github CI/CD pipeline for quick and easy deployment.

Backend (Node.js):

- Framework: Express (typescript) - Can comfortably expose the required endpoints for the CRUD application and design the architecture following the MVC pattern. Again, Typescript over JS makes the code more maintainable as the developers can assert the function returns.
- Deployment: fly.io - Dockerised backend can be easily deployed. If time permits, I would set up Github actions to automate the deployment.

Database:

- PostgreSQL - Any SQL solution would work here, but again due to recent usage, seems like the most straight forward way to go.
- ORM: Prisma - Prisma will allow straightforward connections to the DB, and allow me to map out the relational schema as a Prisma Model. Any changes can then easily be made by updating the model.
- Deployment: Hosted on AWS RDS

### Wireframing:

[Figma](https://www.figma.com/file/9jeUvaeGUEwgH5fZy0Qq3V/SCSK-CRUD-Application?type=design&node-id=0%3A1&mode=design&t=1AFQrYLqTFpD19UP-1)
