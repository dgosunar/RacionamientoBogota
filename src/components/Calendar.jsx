// src/components/Calendar.js
import React from "react";

function Calendar({ turnos, miTurno, anio, mes }) {
  const celdas = [];

  // Determinar en qué día de la semana inicia el mes
  const primerDiaSemana = new Date(anio, mes, 1).getDay();

  // Insertar espacios vacíos para alinear el primer día
  for (let i = 0; i < primerDiaSemana; i++) {
    celdas.push(<div key={`empty-${i}`} />);
  }

  // Rellenar días del mes
  for (let i = 0; i < turnos.length; i++) {
    const { dia, turno } = turnos[i];
    const esMiTurno = turno === `Turno ${miTurno}`;
    celdas.push(
      <div
        key={dia}
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          textAlign: "center",
          backgroundColor: esMiTurno ? "#d0f0c0" : "#f9f9f9",
          fontWeight: esMiTurno ? "bold" : "normal",
        }}
      >
        <div>Day {dia}</div>
        <div style={{ fontSize: "0.9em" }}>{turno}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d} style={{ textAlign: "center" }}>
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
        }}
      >
        {celdas}
      </div>
    </div>
  );
}

export default Calendar;
