import { useState } from "react";
import "./profilepanel.css";

function ProfilePanel({ user, onClose }) {
  const [dob, setDob] = useState(
    localStorage.getItem("kb_dob") || ""
  );

  const [extraInfo, setExtraInfo] = useState(
    localStorage.getItem("kb_extra_info") || ""
  );

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("kb_dob", dob);
    localStorage.setItem("kb_extra_info", extraInfo);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <>
      <div className="profile-overlay" onClick={onClose}></div>

      <div className="profile-panel">

        {/* HEADER */}

        <div className="profile-header">
          <div>
            <h2>My Profile</h2>
            <p>Your account information</p>
          </div>

          <button
            className="profile-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>


        {/* PROFILE ICON */}

        <div className="profile-avatar">
          👤
        </div>


        {/* BASIC INFORMATION */}

        <div className="profile-section">

          <h3>Account Information</h3>

          <div className="profile-field">
            <label>Name</label>

            <input
              type="text"
              value={user?.name || "Not available"}
              readOnly
            />
          </div>


          <div className="profile-field">
            <label>Email</label>

            <input
              type="email"
              value={user?.email || "Not available"}
              readOnly
            />
          </div>


          <div className="profile-field">
            <label>Account Type</label>

            <input
              type="text"
              value={
                user?.role === "consumer"
                  ? "Consumer"
                  : "Farmer"
              }
              readOnly
            />
          </div>

        </div>


        {/* ADDITIONAL INFORMATION */}

        <div className="profile-section">

          <h3>Additional Information</h3>

          <div className="profile-field">
            <label>Date of Birth</label>

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>


          <div className="profile-field">
            <label>About You</label>

            <textarea
              placeholder="Tell us something about yourself..."
              value={extraInfo}
              onChange={(e) =>
                setExtraInfo(e.target.value)
              }
            />
          </div>

        </div>


        {/* SAVE BUTTON */}

        <button
          className="profile-save-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>


        {saved && (
          <p className="profile-saved">
            ✓ Changes saved successfully
          </p>
        )}

      </div>
    </>
  );
}

export default ProfilePanel;