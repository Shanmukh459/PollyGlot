import React, { useState } from "react"
import "./body.css"
import { translateText } from "../../utils/api"

export default function Body() {
  const [inputText, setInputText] = useState<string>("")
  const [showTranslation, setShowTranslation] = useState<boolean>(false)
  const [translatedText, setTranslatedText] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!showTranslation) {
      if (!inputText.trim() || !selectedLanguage) {
        alert("Please enter text and select a language to translate.")
        return
      }
      try {
        const translation = await translateText(inputText, selectedLanguage)
        setTranslatedText(translation || "Translation failed.")
      } catch (error) {
        console.error("Error during translation:", error)
        setTranslatedText("Translation failed due to an error.")
        return
      }
    } else {
      // Reset the input and translated text when starting over
      setInputText("")
      setTranslatedText("")
    }
    // Toggle the translation view
    setShowTranslation(!showTranslation)
  }

  return (
    <div className="body-container">
      <div className="input-section">
        <h2 className="section-title">Text to translate 👇</h2>
        <textarea
          className="text-input"
          placeholder="How are you?"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          rows={5}
        ></textarea>
      </div>
      {showTranslation ? (
        <div className="input-section">
          <h2 className="section-title">Your translation 👇</h2>
          <textarea
            className="text-input"
            placeholder="How are you?"
            value={
              translatedText
                ? translatedText
                : "Translation will appear here..."
            }
            rows={5}
            readOnly
          ></textarea>
        </div>
      ) : (
        <div className="language-section">
          <h2 className="section-title">Select language 👇</h2>
          <select
            className="language-options"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value=""></option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      )}
      <div className="translate-section">
        <button onClick={handleTranslate} className="translate-btn">
          {showTranslation ? "Start Over" : "Translate"}
        </button>
      </div>
    </div>
  )
}
