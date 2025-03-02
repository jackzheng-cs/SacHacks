import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static("public"));
app.use(cookieParser()); // To access cookies
app.set("view engine", "ejs");

// Render the signup page
app.get("/", (req, res) => {
  res.render("dashBoard");
});

// Route for Occupational Therapy page
app.get("/occupational-therapy", (req, res) => {
  res.render("occupational-therapy"); // Render the occupational therapy page
});

// Route for Cognitive Therapy page
app.get("/cognitive-therapy", (req, res) => {
  res.render("cognitive-therapy"); // Render the cognitive therapy page
});

// Route for Physical Therapy page
app.get("/physical-therapy", (req, res) => {
  res.render("physical-therapy"); // Render the physical therapy page
});

// Handle signup form submission
app.post("/signup", async (req, res) => {
  let { email, password } = req.body;

  // Sanitize the email (trim spaces)
  email = email.trim();

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Successful signup, redirect to the login page
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Render the login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Handle login form submission
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  // After login, redirect to dashboard
  // Set the auth cookie manually here
  res.cookie("sb-access-token", data?.access_token, {
    httpOnly: true,
    maxAge: 3600 * 1000,
  });

  res.redirect("/dashboard");
});

app.get("/dashboard", async (req, res) => {
  // Retrieve the token from the cookie
  const token = req.cookies["sb-access-token"];

  if (!token) {
    return res.send("Please log in to see your dashboard.");
  }

  // Use the token to get the session
  const { data: session, error } = await supabase.auth.api.getUser(token);

  if (error || !session) {
    return res.send("Please log in to see your dashboard.");
  }

  const user = session.user; // Get the user from the session
  console.log("User in session:", user);
  res.render("index", { user: user });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
