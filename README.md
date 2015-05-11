# lifethread
Install instructions:

1. Get a fresh install of the latest Ubuntu, available here: http://www.ubuntu.com/download
2. Install the lamp stack.
* Update package manager
  ```
  sudo apt-get update
  ```
* Install Apache webserver
  ```
  sudo apt-get install apache2
  ```
* Install MySQL
  ```
  sudo apt-get install mysql-server php5-mysql
  ```
* Install PHP
  ```
  sudo apt-get install php5 libapache2-mod-php5 php5-mcrypt
  ```
3. Copy the website files
* Delete the file located at /var/www/html/info.php
* Clone the website files from Github to /var/www/html
4. Create a new mysql user
Open a mysql prompt at a terminal. Enter the following:
  ```
  CREATE USER 'test'@'localhost' IDENTIFIED BY 'test';
  GRANT ALL PRIVILEGES ON * . * TO 'test'@'localhost';
  FLUSH PRIVILEGES;
  CREATE DATABASE LifeThread;
  use LifeThread;
  source /var/www/html/db.sql;
  ```
5. If you did everything right, access the website at localhost/main.html
