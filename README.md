# Rewards API
Build a REST API that will help keep track of points and point transactions, which can be used to manage reward points for a single user with different payers. It allows users to add points, spend points, and retrieve the current points balance for each payer. 

The API is built with Node.js and Express. 

Originated from a Fetch Backend Internship Challenge from [Fetch]

## Features
1. Add Points: Add points for a specific payer, including the payer's name, the points to be added, and the timestamp of the transaction.
2. Spend Points: Spend a specific number of points using the FIFO strategy, ensuring no payer's points go negative.
3. Get Points Balance: Retrieve the current points balance for each payer.
## Prerequisites
You can use any language. 
We must be able to compile and run your code. 
Please provide any documentation necessary to accomplish this as part of the code you submit. 
Please assume the reviewer has not executed code in your language before when writing your README.


## Installation
1. **Clone the repository**:

    ```sh
    git clone https://github.com/Vanessa-Chung-1372/rewards-api.git

    ```

2. **Navigate to the project directory**:

    ```sh
    cd rewards-api
    ```

3. **Install the dependencies**:

    ```sh
    npm install
    ```
4. **Run the server**:

    ```sh
    node route.js
    ```

## Running the Service Locally on http://localhost:8000

## Endpoints
###1. Add Points
* Method: POST
* Endpoint: /add
* Description: When a user has points added, we 
* Request Body: JSON
* Request Body Example:
#### Transaction 1: Add 300 points for DANNON
```sh
curl -X POST http://localhost:8000/add \
-H "Content-Type: application/json" \
-d '{
  "payer": "DANNON",
  "points": 300,
  "timestamp": "2022-10-31T10:00:00Z"
}'
```
#### Transaction 2: Add 200 points for UNILEVER
```sh
curl -X POST http://localhost:8000/add \
-H "Content-Type: application/json" \
-d '{
  "payer": "UNILEVER",
  "points": 200,
  "timestamp": "2022-10-31T11:00:00Z"
}'
```
#### Transaction 3: Subtract 200 points for DANNON
```sh
curl -X POST http://localhost:8000/add \
-H "Content-Type: application/json" \
-d '{
  "payer": "DANNON",
  "points": -200,
  "timestamp": "2022-10-31T15:00:00Z"
}'
```
#### Transaction 4: Add 10,000 points for MILLER COORS
```sh
curl -X POST http://localhost:8000/add \
-H "Content-Type: application/json" \
-d '{
  "payer": "MILLER COORS",
  "points": 10000,
  "timestamp": "2022-11-01T14:00:00Z"
}'
```
#### Transaction 5: Add 1,000 points for DANNON
```sh
curl -X POST http://localhost:8000/add \
-H "Content-Type: application/json" \
-d '{
  "payer": "DANNON",
  "points": 1000,
  "timestamp": "2022-11-02T14:00:00Z"
}'
```
* Response: Status 200 OK if the points are added successfully.

###2. Spend Points
* Method: POST
* Endpoint: /spend
* Description: Spends points from the user's payers, ensuring the oldest points are spent first and no payer's points go negative.
* Request Body: JSON
* Request Body Example:
```sh
curl -X POST http://localhost:8000/spend \
-H "Content-Type: application/json" \
-d '{
  "points": 5000
}'
```
* Response: Status 200 OK if the points are added successfully.
* Expected Response:
```text
[
  { "payer": "DANNON", "points": -100 },
  { "payer": "UNILEVER", "points": -200 },
  { "payer": "MILLER COORS", "points": -4700 }
]
```

###3. Get Points Balance
* Method: GET
* Endpoint: /balance
* Description: Retrieves the current points balance for each payer for a user.
* Request Body: NA
```sh
curl -X GET http://localhost:8000/balance
```
* Response: Status 200 
* Expected Response:
```sh
{
"DANNON": 1000,
”UNILEVER” : 0,
"MILLER COORS": 5300
}
```

##Breakdown:
```text
Adding Rewards:
DANNON has:
+300 points (1st transaction)
-200 points (3rd transaction)
+1000 points (5th transaction)
UNILEVER has:
+200 points (2nd transaction)
MILLER COORS has:
+10,000 points (4th transaction)

Spending Rewards:
Spent 5000 points using the FIFO strategy:
First, 100 points from DANNON (leaving DANNON with 1000 points).
Next, 200 points from UNILEVER (leaving UNILEVER with 0 points).
Finally, 4700 points from MILLER COORS (leaving MILLER COORS with 5300 points).

Balance:
After spending the points, the remaining balances are:
DANNON: 1000 points
UNILEVER: 0 points
MILLER COORS: 5300 points

```
