import express from "express";
const router = express.Router();

// Middleware to handle requests requiring database access
router.use((req, res, next) => {
  // Access the database connection from the request object
  const dbConnection = req.dbConnection;

  // Attach the database connection to the request object for use in subsequent route handlers
  req.dbConnection = dbConnection;
  next();
});

//getting all emp
router.get("/getEmp", (req, res) => {
  const tableName = "Employee_Details";
  const dbConnection = req.dbConnection;
  const query = `SELECT * FROM ${tableName} `;

  dbConnection.query(query, (err, result) => {
    if (err) {
     // console.error("Error c :", err);
      return res.status(500).send("Not Fount Details");
    } else {
      //console.log("Data Fetched successfully");
      return res.status(200).json(result);
    }
  });
});

//get emp by id
router.get("/getEmp/:id", (req, res) => {
  const uId = req.params.id; 
  const tableName = "Employee_Details";
  const dbConnection = req.dbConnection;
  const query = `SELECT * FROM ${tableName} WHERE id =${uId} `;

  dbConnection.query(query, (err, result) => {
    if (err) {
      //console.error("Not Found:", err);
      return res.status(500).send("Not Found");
    } else {
      //console.log("Data Fetched successfully");
      return res.status(200).json(result);
    }
  });
});

//create table
router.post("/create-table", (req, res) => {
  const dbConnection = req.dbConnection;
  const tableName = req.body.tableName;
  if (!tableName) {
    return res.status(400).send("Table name is required");
  }

  const query = `CREATE TABLE ${tableName} (id INT PRIMARY KEY IDENTITY(1,1), firstName VARCHAR(255),
                    lastName VARCHAR(255),email VARCHAR(255), gender VARCHAR(10))`;

  dbConnection.query(query, (err, result) => {
    if (err) {
      //console.error("Error creating table:", err);
      return res.status(500).send("Error creating table");
    } else {
      //console.log("Table created successfully");
      return res.status(200).send("Table created successfully");
    }
  });
});

// Creating employee with table name
router.post("/createEmp/:tableName", (req, res) => {
  // Access the database connection from the request object
  const dbConnection = req.dbConnection;

  // Extract data from the request body and other necessary details
  const { firstName, lastName, email, gender } = req.body;
  const tableName = req.params.tableName;

  // Construct and execute the SQL query using the database connection
  const query = `INSERT INTO ${tableName} (firstName, lastName, email, gender) VALUES (?, ?, ?, ?)`;
  const params = [firstName, lastName, email, gender];

  dbConnection.query(query, params, (err, result) => {
    if (err) {
      //console.error("Error inserting data:", err);
      return res.status(500).send("Error inserting data");
    } else {
      //console.log("Data inserted successfully");
      return res.status(201).send("Data inserted successfully");
    }
  });
});

//update emp by id
router.put("/updateEmp/:id", (req, res) => {
  const uId = req.params.id;
  const tableName = "Employee_Details";
  const dbConnection = req.dbConnection;
  const { firstName, lastName, email, gender } = req.body;

  const query = `
  UPDATE ${tableName} 
  SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', gender = '${gender}' 
  WHERE id = ${uId};
`;

  dbConnection.query(query, (err, result) => {
    if (err) {
      //console.error("Error when updating Data :", err);
      return res.status(500).send("Error when updating Data");
    } else {
      //console.log("Employee Updated successfully");
      //return res.status(201).json(result);
    }
  });

  const query1 = `SELECT * FROM ${tableName} WHERE id =${uId} `;
  dbConnection.query(query1, (err, result) => {
    if (err) {
      //console.error("Not Found:", err);
      return res.status(500).send("Error when updating Data :", err);
    } else {
      //console.log("Data Fetched successfully");
      return res.status(201).json(result);
    }
  });
});

//update emp by id
router.patch("/updateEmpDetails/:id", (req, res) => {
  const uId = req.params.id;
  const tableName = "Employee_Details";
  const dbConnection = req.dbConnection;
  const { firstName, lastName, email, gender } = req.body;

  // Initialize an empty array to store the updates to be applied
  const updates = [];

  // Construct the SQL query to update the employee details based on the provided fields
  if (firstName) {
    updates.push(`firstName = '${firstName}'`);
  }
  if (lastName) {
    updates.push(`lastName = '${lastName}'`);
  }
  if (email) {
    updates.push(`email = '${email}'`);
  }
  if (gender) {
    updates.push(`gender = '${gender}'`);
  }

  // Construct the final SQL query
  const query = `
    UPDATE ${tableName} 
    SET ${updates.join(", ")} 
    WHERE id = ${uId};
  `;

  // Execute the SQL query
  dbConnection.query(query, (err, result) => {
    if (err) {
      //console.error("Error when updating data:", err);
      return res.status(500).send("Error when updating data");
    } else {
      //console.log("Employee updated successfully");
      return res.status(200).send("Employee updated successfully");
    }
  });
});

//delete Emp  by Id
router.delete("/deleteEmp/:id", (req, res) => {
  const uId = req.params.id;
  const tableName = "Employee_Details";
  const dbConnection = req.dbConnection;
  const query = `DELETE FROM ${tableName} WHERE id = ${uId}`;
  console.log(uId);
  // Execute the SQL query
  dbConnection.query(query, (err, result) => {
    if (err) {
      //console.error("Error when deleting data:", err);
      return res.status(500).send("Error when deleting data");
    } else {
      //console.log("Employee deleted successfully");
      return res.status(200).send("Employee deleted successfully");
    }
  });
});

export default router;
