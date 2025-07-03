import React, { useState } from "react"
import "./body.css"
import OpenAI from "openai"

export default function Body() {
  const [inputText, setInputText] = useState<string>("")
  const [showTranslation, setShowTranslation] = useState<boolean>(false)
  const [translatedText, setTranslatedText] = useState<string>("")

  const handleTranslate = (e) => {
    e.preventDefault()
    if (!showTranslation) {
      const selectedLanguage = (
        document.querySelector(
          'input[name="language"]:checked'
        ) as HTMLInputElement
      ).value

      if (!inputText) {
        alert("Please enter text to translate.")
        return
      }

      if (!selectedLanguage) {
        alert("Please select a language to translate to.")
        return
      }
      translateText(inputText, selectedLanguage)
    } else {
      setInputText("")
      setTranslatedText("")
    }
    setShowTranslation(!showTranslation)
  }

  const translateText = async (text: string, language: string) => {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that translates text.",
        },
        {
          role: "user",
          content: `Translate the following text to ${language}: '${text}' and only return the translation without any additional text.`,
        },
      ],
    })
    const translated = response.choices[0].message.content.trim()
    setTranslatedText(translated)
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
          <div className="language-options">
            <label>
              <input type="radio" name="language" value="french" /> French
            </label>
            <label>
              <input type="radio" name="language" value="spanish" /> Spanish
            </label>
            <label>
              <input type="radio" name="language" value="hindi" /> Hindi
            </label>
          </div>
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
