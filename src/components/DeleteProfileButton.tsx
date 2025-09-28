import React from "react";

export function DeleteProfileButton() {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile and all activities? This cannot be undone.")) {
      localStorage.removeItem("farmerProfile");
      localStorage.removeItem("activityLogs");
      // Add any other keys to clear if needed
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition mt-4"
    >
      Delete My Farm Profile & Activities
    </button>
  );
}
