const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GANTI_PASSWORD_ADMIN";
const SESSION_SECRET = process.env.SESSION_SECRET || "GANTI_DENGAN_SECRET_ACAK_PANJANG";

app.use(express.json());
app.use(session({
  name: "hadiahku.sid",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 60 * 60 * 1000
  }
}));
app.use(express.static(path.join(__dirname, "public")));

const participants = [];
const demoOtpSessions = new Set();

app.post("/api/register", (req, res) => {
  const alias = String(req.body.alias || "").trim().slice(0, 40);
  if (!alias) return res.status(400).json({ error: "Isi nama panggilan karakter." });

  const participant = {
    id: crypto.randomUUID(),
    alias,
    createdAt: new Date().toISOString(),
    stage: "Memulai simulasi"
  };
  participants.push(participant);
  req.session.participantId = participant.id;
  req.session.save(err => {
    if (err) return res.status(500).json({ error: "Sesi tidak dapat dibuat. Coba lagi." });
    res.json({ ok: true });
  });
});

app.post("/api/request-demo-otp", (req, res) => {
  if (!req.session.participantId) {
    return res.status(401).json({ error: "Mulai dari halaman awal dan isi nama karakter terlebih dahulu." });
  }
  demoOtpSessions.add(req.sessionID);
  const participant = participants.find(p => p.id === req.session.participantId);
  if (participant) participant.stage = "Melihat notifikasi OTP demo";
  res.json({
    ok: true,
    demoCode: "123456",
    message: "Ini kode demo fiktif. Tidak ada SMS yang dikirim."
  });
});

app.post("/api/verify-demo-otp", (req, res) => {
  if (!req.session.participantId) {
    return res.status(401).json({ error: "Sesi simulasi tidak ditemukan. Mulai kembali dari halaman awal." });
  }
  const code = String(req.body.code || "").trim();
  if (!demoOtpSessions.has(req.sessionID) || code !== "123456") {
    return res.status(400).json({ error: "Minta notifikasi OTP demo terlebih dahulu, lalu masukkan kode demo 123456." });
  }
  demoOtpSessions.delete(req.sessionID);
  const participant = participants.find(p => p.id === req.session.participantId);
  if (participant) participant.stage = "Menyelesaikan simulasi";
  res.json({ ok: true });
});

function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.status(401).json({ error: "Login admin diperlukan." });
}
app.post("/api/admin/login", (req, res) => {
  if (String(req.body.password || "") !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Password admin salah." });
  }
  req.session.isAdmin = true;
  res.json({ ok: true });
});
app.get("/api/admin/participants", requireAdmin, (req, res) => {
  res.json({ participants: [...participants].reverse() });
});
app.post("/api/admin/logout", requireAdmin, (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.listen(PORT, () => console.log(`HadiahKu film simulation running on ${PORT}`));
