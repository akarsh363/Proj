import React from "react";

/**
 * PostCard (default export)
 * Props:
 * - post: object matching Posts schema (PostId, Title, Body, DeptId, Tags, etc.)
 * - onView(postId): callback when Read More clicked
 * - disabled: boolean
 */
export default function PostCard({ post, onView, disabled }) {
  const excerpt =
    post.Body && post.Body.length > 160
      ? post.Body.slice(0, 157) + "..."
      : post.Body;

  return (
    <div
      style={{
        border: "1px solid #e6edf3",
        borderRadius: 8,
        padding: 16,
        background: "#fff",
        boxShadow: "0 1px 4px rgba(2,6,23,0.04)",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px" }}>{post.Title}</h3>
          <div style={{ color: "#334155" }}>{excerpt}</div>

          <div style={{ marginTop: 8 }}>
            {Array.isArray(post.Tags) &&
              post.Tags.map((tag) => (
                <span
                  key={tag.TagId}
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    marginRight: 6,
                    marginBottom: 6,
                    borderRadius: 999,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                    color: "#0f172a",
                  }}
                >
                  {tag.TagName}
                </span>
              ))}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            DeptId: {post.DeptId}
          </div>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => onView(post.PostId)}
              disabled={!!disabled}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background: disabled ? "#cbd5e1" : "#2563eb",
                color: "#fff",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
        Upvotes: {post.UpvoteCount ?? 0} • Downvotes: {post.DownvoteCount ?? 0}{" "}
        • CreatedAt:{" "}
        {post.CreatedAt ? new Date(post.CreatedAt).toLocaleString() : ""}
      </div>
    </div>
  );
}
