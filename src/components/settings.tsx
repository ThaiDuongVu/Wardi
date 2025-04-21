import { useState, useEffect } from "react";
import { getCookie, setCookie } from "@/cookieManager";

const Settings = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const theme = getCookie("theme");
    setDarkMode(theme === "dark");
  }, [isDarkMode]);

  return (
    <div className="modal fade" id="settingsModal" tabIndex={-1} aria-labelledby="settingsModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="settingsModalLabel">Settings <i className="bi bi-gear-fill"></i></h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="form-check form-check">
              <label className="form-check-label" htmlFor="darkModeCheck">Dark mode <i className="bi bi-brightness-low-fill"></i></label>
              <input
                className="form-check-input"
                type="checkbox" id="darkModeCheck"
                checked={isDarkMode}
                onChange={(event) => {
                  setCookie("theme", event.target.checked ? "dark" : "light");
                  setDarkMode(event.target.checked);
                }} />
            </div>
            <br />
            Changes applied on <a href="">reload</a>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Settings;