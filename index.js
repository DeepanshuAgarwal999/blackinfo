const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xlsxtojson = require("xlsx-to-json-lc");
const accident = require("./model/accident");
const { DBconn } = require("./db");

dotenv.config();
DBconn();
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// MongoDB connection setup

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("excelFile"), (req, res) => {
  const filePath = req.file.path; // Path to the uploaded Excel file

  xlsxtojson(
    {
      input: filePath,
      output: null, // Output file (null for in-memory JSON)
      // Convert headers to lowercase
    },
    async (err, result) => {
      if (err) {
        console.error("Error converting Excel to JSON:", err);
        res.status(500).json({ error: "Conversion failed" });
      } else {
        const jsonFileName = `output_${Date.now()}.json`;

        await fs.promises.writeFile(
          path.join("uploads", jsonFileName),
          JSON.stringify(result, null, 2)
        );

        res.json({
          success: true,
          message: "JSON file generated successfully.",
        }); // Send the JSON data
      }
    }
  );
});

async function saveDataToMongoDB() {
  try {
    // Read the JSON file
    const fileName = "output_1709189614956.json";
    const filePath = path.join(__dirname + "/uploads/", fileName);
    console.log(filePath);
    const jsonData = fs.readFileSync(filePath, "utf-8");

  
    // const dataArray = await JSON.parse(jsonData);
    // const savedDocuments = await Promise.all(
      //   dataArray.map(async (data) => {
        //     const accidentInstance = new accident(data);
        
        //     // Save individual documents to trigger the pre("save") hook
    //     await accidentInstance.save();
    
    //     return accidentInstance;
    //   })
    // );
    // await accident.insertMany(dataArray);
     const dataArray = JSON.parse(jsonData);

     for (const data of dataArray) {
       const accidentInstance = new accident(data);
       await accidentInstance.save();
       console.log(
         `Accident saved with severity: ${accidentInstance.severity}`
       );
     }
    console.log("successfull");
    // if (!existingData) {
    // await accident.insertMany(data);
    //  const accidentInstance = new accident(data);
    //  await accidentInstance.save();
    // console.log("Data saved to MongoDB successfully");
    // } else {
    // console.log("Data already exists in MongoDB. No insertion needed.");
    // }
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
  }
}
app.post("/senddata", async (req, res) => {
  await saveDataToMongoDB();
  res.json({
    message: "success",
  });
});
// Other routes

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
