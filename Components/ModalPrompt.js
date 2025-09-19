import React from "react";

/**
 * ModalPrompt (default export)
 * Props:
 * - visible: boolean
 * - onSignup: function
 * - onSignin: function
 * - onClose: function
 */
export default function ModalPrompt({ visible, onSignup, onSignin, onClose }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 440,
          background: "#fff",
          borderRadius: 8,
          padding: 18,
          boxShadow: "0 10px 30px rgba(2,6,23,0.2)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Please sign up or sign in</h2>
        <p style={{ color: "#334155" }}>
          You have viewed the maximum allowed posts as a <strong>Guest</strong>.
          To continue viewing more posts, please sign up as an{" "}
          <strong>Employee</strong> or sign in if you already have an account.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 14,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              cursor: "pointer",
            }}
          >
            Close
          </button>

          <button
            onClick={onSignin}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #e2e8f0",
              background: "#f1f5f9",
              cursor: "pointer",
            }}
          >
            Sign in
          </button>

          <button
            onClick={onSignup}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              background: "#0ea5e9",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
