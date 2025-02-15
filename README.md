# HitList App

The **HitList** app is a simple React-based application that allows users to manage a list of companies. Users can add, filter, update, and delete company information. The app communicates with a backend service to store and manage the data.


![Fun GIF](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzFlY25tbnF6a2U1Y3NnM3poa3l2Zzk3Y29wMmx2eHdsMmE3b3ZkciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8Cvv8FPd3Jd54i5HBs/giphy.gif)



## Features

- **Add Companies**: Users can add a new company by providing the company name, phone number, and an optional description.
- **Filter Companies**: Users can filter the list of companies based on the name.
- **Update Company Information**: If a company already exists, users can update its information, including its phone number.
- **Delete Companies**: Users can delete a company from the list.
- **Notifications**: The app shows success or error notifications for add, update, and delete actions.
- **Responsive UI**: The app is designed to work well on different screen sizes.

## Technologies Used

- **React**: For building the user interface.
- **CSS**: For styling the components.
- **JavaScript (ES6+)**: For the functionality and logic of the app.
- **Axios (or Fetch)**: For making HTTP requests to the backend.
- **Backend Service (companiesServices)**: Handles interactions with the backend API for CRUD operations.

## Installation

To run the app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/DannyGarciaDEV/HitList
   cd hitlist
   npm install
   npm run dev
   ```

Open Terminal in 'hitlist'

```
npm install -g json-server

json-server --watch db.json --port 3001

```


  

