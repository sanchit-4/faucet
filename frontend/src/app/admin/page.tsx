// src/app/admin/page.tsx
"use client";

import AdminDashboard from "@/components/Admin";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "white",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#d1d5db" }}>
        Admin Portal
      </h1>

      {/* Render the Admin Component we made earlier */}
      <AdminDashboard />

      <div style={{ marginTop: "3rem" }}>
        <Link href="/" style={{ color: "#7dd3fc", textDecoration: "underline" }}>
          ← Back to Faucet
        </Link>
      </div>
    </div>
  );
}