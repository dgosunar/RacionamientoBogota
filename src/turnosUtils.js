const TOTAL_TURNOS = 9;

export function generarTurnosDelMes(anio, mes) {
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const asignaciones = [];

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const diffDias = Math.floor(
      (Date.UTC(anio, mes, dia) - Date.UTC(2025, 3, 3)) / (1000 * 60 * 60 * 24)
    );

    const turnoIndex =
      ((diffDias % TOTAL_TURNOS) + TOTAL_TURNOS) % TOTAL_TURNOS;
    const turno = turnoIndex + 1;

    asignaciones.push({
      dia,
      turno: `Turno ${turno}`,
    });
  }

  return asignaciones;
}
