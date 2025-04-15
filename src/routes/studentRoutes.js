const express = require("express")
const { PrismaClient } = require('@prisma/client')
const router = express.Router()

const prisma = new PrismaClient()

// Create Student
router.post("/", async (req, res) => {
    const { registrationNumber, name, class: studentClass, rollno, contactNumber } = req.body;
  
    if (!registrationNumber || !name || !studentClass || !rollno || !contactNumber) {
      return res.status(400).json({ error: "All fields are required!" });
    }
  
    try {
      const student = await prisma.student.create({
        data: {
          registrationNumber,
          name,
          class: studentClass,
          rollno,
          contactNumber
        }
      });
      res.status(201).json(student);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Student Creation Failed!", details: error.message });
    }
  });
  

// Get all Students (with pagination)
router.get("/", async (req, res) => {
    const {page = 1, limit = 10} = req.query
    const skip = (page - 1) * limit

    try {
        const students = await prisma.student.findMany({
            skip: parseInt(skip),
            take: parseInt(limit)
        })
        res.json(students)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to fetch Students!', details: error.message})
    }
})

// Get Student by Registaration Number
router.get("/:regNo", async (req, res) => {
  const {regNo} = req.params

  try {
    const student = await prisma.student.findUnique({
      where: { registrationNumber: regNo }
    })

    if(!student) {
      return res.status(404).json({error: "Student not found!"})
    }

    res.json(student)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Feild to fetch student!"})
  }
})

// Update Student
router.put("/:regNo", async (req, res) => {
  const { regNo } = req.params
  const { name, class: studentClass, rollNo, contactNumber, status } = req.body

  try {
    const existingStudent = await prisma.student.findUnique({
      where: { registrationNumber: regNo }
    })

    if(!existingStudent) {
      return res.status(404).json({error: "Student not found!"})
    }

    const updatedStudent = await prisma.student.update({
      where: { registrationNumber: regNo },
      data: { name, class: studentClass, rollNo, contactNumber, status }
    })

    res.json(updatedStudent)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Failed to update student.', details: error.message })
  }
})

// Delete Student
router.delete('/:regNo', async (req, res) => {
  const { regNo } = req.params;

  try {
    const student = await prisma.student.delete({
      where: { registrationNumber: regNo },
    });

    res.json({ message: 'Student deleted successfully.', student });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to delete student.', details: error.message });
  }
});

module.exports = router