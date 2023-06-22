# Project 'boxfox'
'boxfox' is a companion app for PostgreSQL databases. It allows users to remotely:

1. directly download tables as .csv files from their database, and
2. upload .csv files to their database as tables. If a table with the same name as an uploaded .csv file already exists, it will be replaced (NOTE: this feature is in beta - currently, all columns in the newly generated table will be of type TEXT).

'boxfox' was created as a failsafe to be used in events when servers go down but users need to urgently access data from their PostgreSQL database. As such, 'boxfox' has been designed to connect to remote PostgreSQL database instances WITHOUT storing your credentials.


## Installation
Clone the repo and use npm to install the project dependencies through the terminal.

```
npm install
```

Create a .env file and populate with your desired port (the default is 3000). Feel free to copypaste the code below into your .env:

```
PORT=3000
```

## Usage
'boxfox' has two primary modes of use:

| Box - package and receive a PostgreSQL table as a .csv | Unbox - send a .csv to a PostgreSQL database |
|---|---|
| <img width="834" alt="boxmode" src="https://github.com/yoko-8/boxfox/assets/106457612/0e6effd0-5ce2-489f-84a2-7b30ad94d7ca"> | <img width="832" alt="unboxmode" src="https://github.com/yoko-8/boxfox/assets/106457612/60a0eb75-7d43-4b25-86ff-36987606b7c1"> |

Start by entering your database credentials in the appropriate fields. **NOTE: YOUR POSTGRESQL DATABASE MUST ALLOW INCOMING TRAFFIC FROM THE PORT BOXFOX IS CONFIGURED TO RUN ON (i.e. 3000).** Press the "Test Connection" button to connect to your database. If successful, the app will show a list of tables to download/a field to upload a .csv file.

## License
'boxfox' is open source and was built with PostgreSQL, Express, React, Node.js, and TailwindCSS.
