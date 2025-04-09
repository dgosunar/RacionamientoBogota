import React, { useState, useEffect } from "react";
import { generarTurnosDelMes } from "./turnosUtils";
import Header from "./components/Header";
import TurnSelector from "./components/TurnSelector";
import NotificationSettings from "./components/NotificationSettings";
import Calendar from "./components/Calendar";

function App() {
  const hoy = new Date();

  const [anioActual, setAnioActual] = useState(hoy.getFullYear());
  const [mesActual, setMesActual] = useState(hoy.getMonth());

  const [miTurno, setMiTurno] = useState(() => {
    return localStorage.getItem("miTurno") || "";
  });

  const [horaAnterior, setHoraAnterior] = useState(() => {
    return localStorage.getItem("horaAnterior") || "18:00";
  });

  const [horaMismoDia, setHoraMismoDia] = useState(() => {
    return localStorage.getItem("horaMismoDia") || "06:00";
  });

  const turnos = generarTurnosDelMes(anioActual, mesActual);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!miTurno) return;

    const siguienteFecha = obtenerProximaFecha();
    if (!siguienteFecha) return;

    const now = new Date();

    const anterior = new Date(siguienteFecha);
    anterior.setDate(anterior.getDate() - 1);
    const [horaA, minA] = horaAnterior.split(":").map(Number);
    anterior.setHours(horaA, minA, 0, 0);

    const mismo = new Date(siguienteFecha);
    const [horaM, minM] = horaMismoDia.split(":").map(Number);
    mismo.setHours(horaM, minM, 0, 0);

    const programarNoti = (fecha, mensaje) => {
      const diff = fecha - now;
      if (diff > 0 && diff < 86400000) {
        setTimeout(() => {
          if (Notification.permission === "granted") {
            new Notification("📢 Recordatorio de Corte de Agua", {
              body: mensaje,
            });
          }
        }, diff);
      }
    };

    programarNoti(anterior, `Mañana tienes tu turno de corte de agua`);
    programarNoti(mismo, `Hoy te quitan el agua`);
  }, [miTurno, horaAnterior, horaMismoDia, anioActual, mesActual]);

  const obtenerProximaFecha = () => {
    if (!miTurno) return null;
    const hoyDia = hoy.getDate();
    const hoyMes = hoy.getMonth();
    const hoyAnio = hoy.getFullYear();

    const siguientes = generarTurnosDelMes(hoyAnio, hoyMes).filter(
      ({ dia, turno }) => dia >= hoyDia && turno === `Turno ${miTurno}`
    );

    if (siguientes.length === 0) return null;

    return new Date(hoyAnio, hoyMes, siguientes[0].dia);
  };

  const cambiarMes = (offset) => {
    const nuevaFecha = new Date(anioActual, mesActual + offset, 1);
    setAnioActual(nuevaFecha.getFullYear());
    setMesActual(nuevaFecha.getMonth());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
      }}
    >
      <h1>Turnos Racionamiento de Agua en Bogotá</h1>

      <TurnSelector miTurno={miTurno} setMiTurno={setMiTurno} />

      {miTurno && (
        <div style={{ marginBottom: 20 }}>
          <h3>Tu próximo turno es el día {obtenerProximaFecha()?.getDate()}</h3>
          <p>Recibirás notificaciones:</p>
          <ul>
            <li>📅 Día anterior a las {horaAnterior}</li>
            <li>📅 Mismo día a las {horaMismoDia}</li>
          </ul>
        </div>
      )}

      <NotificationSettings
        horaAnterior={horaAnterior}
        setHoraAnterior={setHoraAnterior}
        horaMismoDia={horaMismoDia}
        setHoraMismoDia={setHoraMismoDia}
      />

      <Header anio={anioActual} mes={mesActual} onMonthChange={cambiarMes} />

      <Calendar
        turnos={turnos}
        miTurno={miTurno}
        anio={anioActual}
        mes={mesActual}
      />
    </div>
  );
}

export default App;
