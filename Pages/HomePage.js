import React, { useState } from "react";
import PostCard from "../Components/PostCard";
import ModalPrompt from "../Components/ModalPrompt";

// Constants (schema-aligned)
const GUEST_VIEW_LIMIT = 3;

// Hard-coded demo posts (field names match your Posts schema)
const POSTS = [
  {
    PostId: 1,
    UserId: 0,
    DeptId: 5,
    Title: "How to connect to company VPN",
    Body: "Step-by-step: open VPN client, add server address, use corporate credentials. If MFA enabled, approve on your device. Troubleshoot: check firewall, DNS, and certificates.",
    UpvoteCount: 12,
    DownvoteCount: 0,
    CreatedAt: new Date().toISOString(),
    Tags: [
      { TagId: 1, TagName: "VPN", DeptId: 5 },
      { TagId: 2, TagName: "IT", DeptId: 5 },
    ],
  },
  {
    PostId: 2,
    UserId: 0,
    DeptId: 4,
    Title: "How to raise leave request",
    Body: "Open HR portal → My Requests → New Leave. Select dates, reason and approver. Attach docs if needed. Manager gets a notification.",
    UpvoteCount: 9,
    DownvoteCount: 0,
    CreatedAt: new Date().toISOString(),
    Tags: [
      { TagId: 3, TagName: "HR", DeptId: 4 },
      { TagId: 4, TagName: "Leave", DeptId: 4 },
    ],
  },
  {
    PostId: 3,
    UserId: 0,
    DeptId: 6,
    Title: "Setup local SQL Server",
    Body: "Install SQL Server Express, enable TCP/IP, create SQL auth user and update connection string in appsettings.json.",
    UpvoteCount: 7,
    DownvoteCount: 0,
    CreatedAt: new Date().toISOString(),
    Tags: [
      { TagId: 5, TagName: "SQL Server", DeptId: 6 },
      { TagId: 6, TagName: "Dev", DeptId: 6 },
    ],
  },
];

export default function HomePage({ onSignup, onSignin }) {
  // Keep guest views in component state only (no localStorage) so refresh = new guest
  const [viewedPosts, setViewedPosts] = useState([]); // array of PostId
  const [limitReached, setLimitReached] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);

  function handleView(postId) {
    // If limit already reached and the post is not already counted, show modal
    if (limitReached && !viewedPosts.includes(postId)) {
      setModalVisible(true);
      return;
    }

    // Toggle expand for the post
    setExpandedPostId((prev) => (prev === postId ? null : postId));

    setViewedPosts((prev) => {
      if (prev.includes(postId)) return prev;
      const next = [...prev, postId];
      if (next.length >= GUEST_VIEW_LIMIT) {
        setLimitReached(true);
        setModalVisible(true);
      }
      return next;
    });
  }

  return (
    <div style={{ maxWidth: 900, margin: "18px auto", padding: 12 }}>
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Corporate Q&A Hub — Guest</h1>
        <div style={{ color: "#444", marginTop: 6 }}>
          You may view up to <strong>{GUEST_VIEW_LIMIT}</strong> posts. Viewed:{" "}
          <strong>{viewedPosts.length}</strong>.
        </div>
      </header>

      <main>
        {POSTS.map((post) => (
          <div key={post.PostId} style={{ marginBottom: 8 }}>
            <PostCard
              post={post}
              onView={handleView}
              disabled={Boolean(
                limitReached && !viewedPosts.includes(post.PostId)
              )}
            />

            {expandedPostId === post.PostId && (
              <div
                style={{
                  border: "1px solid #edf2f7",
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 8,
                  background: "#fbfdff",
                }}
              >
                <div style={{ marginBottom: 8 }}>{post.Body}</div>
                <div style={{ fontSize: 12, color: "#556" }}>
                  Upvotes: {post.UpvoteCount} • Downvotes: {post.DownvoteCount}{" "}
                  • DeptId: {post.DeptId} • CreatedAt:{" "}
                  {new Date(post.CreatedAt).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        ))}
      </main>

      <footer
        style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8 }}
      >
        <button
          onClick={onSignup}
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          Sign up
        </button>
        <button
          onClick={onSignin}
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          Sign in
        </button>
      </footer>

      <ModalPrompt
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSignup={onSignup}
        onSignin={onSignin}
      />
    </div>
  );
}
