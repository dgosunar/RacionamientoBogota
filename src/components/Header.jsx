// src/components/Header.js
import React from "react";

function Header({ anio, mes, onMonthChange }) {
  const monthName = new Date(anio, mes).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Turnos - {monthName}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <button onClick={() => onMonthChange(-1)}>← Mes Anterior</button>
        <button onClick={() => onMonthChange(1)}> Mes Siguiente →</button>
      </div>
    </div>
  );
}

export default Header;
