
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwxpbpTy3cZD0-FJYhwK7NFeG5U0ZEmMPTcUupBDjLky6zUgSQcBwUNI-3bmlFnWVys/exec";

app.post("/api/po", async (req, res) => {
  const { tech, vendor, jobAddress } = req.body;
  if (!tech || !vendor || !jobAddress) {
    return res.status(400).send("Missing fields");
  }

  const formData = new URLSearchParams();
  formData.append("tech", tech);
  formData.append("vendor", vendor);
  formData.append("jobAddress", jobAddress);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).send("Proxy request failed");
  }
});

module.exports = app;
