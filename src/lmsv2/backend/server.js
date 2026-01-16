import express from "express";
import db from "./db.js";
import cors from "cors"
 
const app = express();        // 🔥 THIS WAS MISSING
app.use(express.json());     // allows JSON body
app.use(cors());

//----------------- LOGIN -------------------

app.post("/login", (req, res) => {
  const { email } = req.body;

  db.get(
    "SELECT id, name, role, status FROM users WHERE email = ?",
    [email],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (user.status !== "Active") {
        return res.status(403).json({ error: "Account inactive" });
      }

      res.json(user);
    }
  );
});

// ---------------- ADMIN ----------------
app.get("/admin/stats", (req, res) => {
  const stats = {};

  db.get(
    "SELECT COUNT(*) AS totalStudents FROM users WHERE role = 'student'",
    (err, row) => {
      stats.students = row.totalStudents;

      db.get(
        "SELECT COUNT(*) AS totalTeachers FROM users WHERE role = 'teacher'",
        (err, row) => {
          stats.teachers = row.totalTeachers;

          db.get(
            "SELECT COUNT(*) AS totalCourses FROM courses",
            (err, row) => {
              stats.courses = row.totalCourses;
              res.json(stats);
            }
          );
        }
      );
    }
  );
});



// ---------------- STUDENTS ----------------

app.get("/students", (req, res) => {
  db.all(
    "SELECT id, name, email, status FROM users WHERE role = 'student'",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

app.put("/students/:id/status", (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT status FROM users WHERE id = ?",
    [id],
    (err, row) => {
      if (err || !row) {
        res.status(404).json({ error: "Student not found" });
        return;
      }

      const newStatus = row.status === "Active" ? "Inactive" : "Active";

      db.run(
        "UPDATE users SET status = ? WHERE id = ?",
        [newStatus, id],
        () => {
          res.json({ id, status: newStatus });
        }
      );
    }
  );
});

app.post("/students", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.run(
    "INSERT INTO users (name, email, role, status) VALUES (?, ?, 'student', 'Active')",
    [name, email],
    function () {
      res.json({
        id: this.lastID,
        name,
        email,
        status: "Active"
      });
    }
  );
});

app.get("/students/:id/courses", (req, res) => {
  const studentId = req.params.id;

  db.all(
    `
    SELECT
      c.id,
      c.title,
      c.description,
      e.progress
    FROM enrollments e
    JOIN courses c ON c.id = e.course_id
    WHERE e.student_id = ?
    `,
    [studentId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

app.get("/students/:id/explore", (req, res) => {
  const studentId = req.params.id;

  db.all(
    `
    SELECT
      c.id,
      c.title,
      c.description,
      c.status,
      CASE
        WHEN e.id IS NULL THEN 0
        ELSE 1
      END AS enrolled
    FROM courses c
    LEFT JOIN enrollments e
      ON e.course_id = c.id
      AND e.student_id = ?
    `,
    [studentId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

app.post("/students/:id/enroll", (req, res) => {
  const studentId = req.params.id;
  const { courseId } = req.body;

  db.run(
    `
    INSERT INTO enrollments (student_id, course_id, progress)
    VALUES (?, ?, 0)
    `,
    [studentId, courseId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});


//----------------- COURSES --------------

app.get("/courses", (req, res) => {
  db.all(
    `
    SELECT 
      c.id,
      c.title,
      c.description,
      c.status,
      u.name AS teacher
    FROM courses c
    JOIN users u ON u.id = c.teacher_id
    `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

app.get("/courses/:id/details", (req, res) => {
  const courseId = req.params.id;
  const studentId = req.query.studentId;

  // 1️⃣ Get course + teacher
  db.get(
    `
    SELECT 
      c.title,
      c.description,
      u.name AS teacher
    FROM courses c
    JOIN users u ON u.id = c.teacher_id
    WHERE c.id = ?
    `,
    [courseId],
    (err, course) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!course) return res.status(404).json({ error: "Course not found" });

      // 2️⃣ Get student's progress
      db.get(
        `
        SELECT progress
        FROM enrollments
        WHERE course_id = ? AND student_id = ?
        `,
        [courseId, studentId],
        (err, enrollment) => {
          if (err) return res.status(500).json({ error: err.message });

          const progress = enrollment ? enrollment.progress : 0;

          // 3️⃣ Get classmates
          db.all(
            `
            SELECT u.name
            FROM enrollments e
            JOIN users u ON u.id = e.student_id
            WHERE e.course_id = ?
              AND u.id != ?
            `,
            [courseId, studentId],
            (err, classmates) => {
              if (err) return res.status(500).json({ error: err.message });

              res.json({
                title: course.title,
                description: course.description,
                teacher: course.teacher,
                progress: progress,
                classmates: classmates.map(c => c.name)
              });
            }
          );
        }
      );
    }
  );
});



// ---------------- TEACHERS --------------

app.get("/teachers", (req, res) => {
  db.all(
    "SELECT id, name, email, status FROM users WHERE role = 'teacher'",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.post("/teachers", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.run(
    "INSERT INTO users (name, email, role, status) VALUES (?, ?, 'teacher', 'Active')",
    [name, email],
    function () {
      res.json({
        id: this.lastID,
        name,
        email,
        status: "Active"
      });
    }
  );
});

// ---------------- SERVER ----------------

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});


db.serialize(() => {
  // USERS
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      role TEXT,
      status TEXT
    )
  `);

  // COURSES
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      teacher_id INTEGER,
      status TEXT,
      FOREIGN KEY (teacher_id) REFERENCES users(id)
    )
  `);

  // ENROLLMENTS
  db.run(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      course_id INTEGER,
      progress INTEGER DEFAULT 0,
      FOREIGN KEY (student_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // SEED USERS (only once)
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row.count === 0) {
      db.run(`
        INSERT INTO users (name, email, role, status)
        VALUES
          ('Blossom', 'blossom@gmail.com', 'student', 'Active'),
          ('Bubbles', 'bubbles@gmail.com', 'student', 'Active'),
          ('Buttercup', 'buttercup@gmail.com', 'student', 'Active'),
          ('Gugi', 'gugi@gmail.com', 'teacher', 'Active'),
          ('Bablu', 'bablu@gmail.com', 'teacher', 'Active'),
          ('Admin', 'admin@admin.com', 'admin', 'Active')
      `);
    }
  });

  //SEED COURSES
  db.get("SELECT COUNT(*) as count FROM courses", (err, row) => {
  if (row.count === 0) {
    db.run(`
      INSERT INTO courses (title, description, teacher_id, status)
      VALUES 
        ('Anatomy 101', 'Introduction to human anatomy', 4, 'Active' ),
        ('Biochemistry', 'Introduction to Biochem', 5, 'Active' ),
        ('Surgery', 'Lets fuckin cut em', 4, 'Active' ),
        ('Dark Arts', 'Skibidi Dob Dob yes yes yes ', 4, 'Active' ),
        ('Battelfield Strategy', 'За Родину!!!', 5, 'Active' )
    `);
  }
});

db.get("SELECT COUNT(*) as count FROM enrollments", (err, row) => {
  if (row.count === 0) {
    db.run(`
      INSERT INTO enrollments (student_id, course_id, progress)
      VALUES
        (1, 1, 80),
        (1, 2, 95),
        (1, 3, 72),
        (2, 3, 50),
        (2, 4, 20),
        (2, 5, 100),
        (3, 2, 55),
        (3, 3, 98)
    `);
  }
});




});

