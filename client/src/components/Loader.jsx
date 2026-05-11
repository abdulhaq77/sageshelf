export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Simple CSS Spinner */}
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p
        style={{ color: "white", marginTop: "15px", fontFamily: "sans-serif" }}
      >
        Please wait...
      </p>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
