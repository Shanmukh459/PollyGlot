import React from "react"
import "./body.css"

export default function Body() {
  return (
    <div className="body-container">
      <div className="input-section">
        <h2 className="section-title">Text to translate 👇</h2>
        <textarea className="text-input" placeholder="How are you?"></textarea>
      </div>
      <div className="language-section">
        <h2 className="section-title">Select language 👇</h2>
        <div className="language-options">
          <label>
            <input type="radio" name="language" value="english" /> French
          </label>
          <label>
            <input type="radio" name="language" value="spanish" /> Spanish
          </label>
          <label>
            <input type="radio" name="language" value="french" /> Hindi
          </label>
        </div>
      </div>
      <div className="translate-section">
        <button className="translate-btn">Translate</button>
      </div>
    </div>
  )
}
