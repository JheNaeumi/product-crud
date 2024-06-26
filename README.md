﻿# product-crud
## Overview
This application is created using asp.net for the backend, react.js frontend and MySQL for its database. The application purpose is to create a CRUD application where we can create, read, update and delete products.  The application can be used for product management and inventory management for business use.


## CRUD Operations
![image](https://github.com/JheNaeumi/product-crud/assets/66902295/dee6d1e9-6e5f-4b4c-a1be-33a4f15d3fdf)



## Setup

1. Clone Repository
> git clone https://github.com/JheNaeumi/product-crud.git

2. Create Database
> CREATE DATABASE productDb;

3. Configure Connection Sting in ProductDbContext
rename application.properties.sample to application.properties
> protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    string connectionString = "server=usersql_server;port=user_port;database=productDb;uid=user_id;password=user_password";
    optionsBuilder.UseMySQL(connectionString);
}

4. Navigate and Run backend app
> UserfeedbackApplication.java

5. Navigate and Run Vite in Development
> cd product-frontend
> npm run dev
