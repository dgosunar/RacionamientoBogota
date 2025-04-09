// src/components/TurnoSelector.js
import React from "react";

function TurnoSelector({ miTurno, setMiTurno }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setMiTurno(value);
    localStorage.setItem("miTurno", value);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label htmlFor="miTurno">Selecciona tu Turno: </label>
      <select id="miTurno" value={miTurno} onChange={handleChange}>
        <option value="">-- Selecciona 1 --</option>
        {Array.from({ length: 9 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Truno {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TurnoSelector;
