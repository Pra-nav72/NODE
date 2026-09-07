const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/MongoDYP")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    },
    address: {
        city: String,
        state: String,
        pincode: Number
    }
});

// Student Model
const newStudent = mongoose.model("Student", studentSchema);

// CREATE - Add student
app.post("/students", async (req, res) => {
    try {
        const student = await newStudent.create(req.body);

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// READ - Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await newStudent.find();

        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ - Get student by ID
app.get("/students/:id", async (req, res) => {
    try {
        const student = await newStudent.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: "Invalid student ID"
        });
    }
});

// UPDATE - Update student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await newStudent.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE - Delete student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await newStudent.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid student ID"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
