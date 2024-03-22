import sql from "msnodesqlv8";

const server = "VIVEKS-PC-377";
const database = "MSSQLDB";
const userName = "root";
const password = "root";
const DSN = "MSSQL"; // Specify the correct DSN name here
const connectionString = `DSN=${DSN};UID=${userName};PWD=${password};Database=${database}`;

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        sql.open(connectionString, (err, conn) => {
            if (err) {
                console.error("Failed to connect to the database:", err);
                reject(err);
            } else {
                console.log("Database connected successfully ");
                resolve(conn);
            }
        });
    });
};

export default connectToDatabase;
