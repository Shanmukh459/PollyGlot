import React from "react"
import parrotImage from "../../assets/parrot.png"
import "./Header.css"

export default function Header() {
  return (
    <div className="header-container">
      <div>
        <img className="parrot-image" src={parrotImage} alt="Parrot" />
      </div>
      <div>
        <h1 className="title">PollyGlot</h1>
        <p className="sub-title">Perfect Translation Every Time</p>
      </div>
    </div>
  )
}
