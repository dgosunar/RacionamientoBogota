// src/components/NotificationSettings.js
import React from "react";

function NotificationSettings({
  horaAnterior,
  setHoraAnterior,
  horaMismoDia,
  setHoraMismoDia,
}) {
  const handleAnteriorChange = (e) => {
    const value = e.target.value;
    setHoraAnterior(value);
    localStorage.setItem("horaAnterior", value);
  };

  const handleMismoDiaChange = (e) => {
    const value = e.target.value;
    setHoraMismoDia(value);
    localStorage.setItem("horaMismoDia", value);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 50,
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <label>Hora de Notificación (Día Anterior): </label>
        <input
          type="time"
          value={horaAnterior}
          onChange={handleAnteriorChange}
        />
      </div>

      <div>
        <label>Hora de Notificación (Mismo Día): </label>
        <input
          type="time"
          value={horaMismoDia}
          onChange={handleMismoDiaChange}
        />
      </div>
    </div>
  );
}

export default NotificationSettings;
