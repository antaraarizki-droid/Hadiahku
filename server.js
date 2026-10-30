
const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ganti-password-admin";
const SESSION_SECRET = process.env.SESSION_SECRET || "ganti-session-secret";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" }
}));
app.use(express.static(path.join(__dirname, "public")));

const participants = [];
const otpBySession = new Map();

app.post("/api/register", (req, res) => {
  const alias = String(req.body.alias || "").trim().slice(0, 40);
  if (!alias) return res.status(400).json({ error: "Masukkan nama panggilan/pseudonim." });

  const record = {
    id: crypto.randomUUID(),
    alias,
    createdAt: new Date().toISOString(),
    stage: "Mengisi formulir simulasi"
  };
  participants.push(record);
  req.session.participantId = record.id;
  res.json({ ok: true, participantId: record.id });
});

app.post("/api/request-demo-otp", (req, res) => {
  if (!req.session.participantId) return res.status(401).json({ error: "Mulai simulasi terlebih dahulu." });
  // Demo code is intentionally fixed and displayed in-page; no SMS/email is sent.
  const code = "123456";
  otpBySession.set(req.sessionID, code);
  const record = participants.find(p => p.id === req.session.participantId);
  if (record) record.stage = "Meminta OTP demo";
  res.json({ ok: true, demoCode: code, message: "Kode demo ditampilkan di halaman ini. Tidak ada SMS yang dikirim." });
});

app.post("/api/verify-demo-otp", (req, res) => {
  const entered = String(req.body.code || "");
  const expected = otpBySession.get(req.sessionID);
  if (!expected || entered !== expected) return res.status(400).json({ error: "Kode demo tidak cocok." });
  const record = participants.find(p => p.id === req.session.participantId);
  if (record) record.stage = "Menyelesaikan simulasi";
  otpBySession.delete(req.sessionID);
  res.json({ ok: true });
});

function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.status(401).json({ error: "Login admin diperlukan." });
}
app.post("/api/admin/login", (req, res) => {
  if (String(req.body.password || "") !== ADMIN_PASSWORD) return res.status(401).json({ error: "Password salah." });
  req.session.isAdmin = true;
  res.json({ ok: true });
});
app.get("/api/admin/participants", requireAdmin, (req, res) => {
  res.json({ participants: [...participants].reverse() });
});
app.post("/api/admin/logout", requireAdmin, (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.listen(PORT, () => console.log(`HadiahKu simulation running on port ${PORT}`));
