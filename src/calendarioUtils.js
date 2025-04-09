// src/calendarioUtils.js
export function generarCalendario(anio, mes, turnos) {
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const primerDiaSemana = new Date(anio, mes, 1).getDay(); // 0 = domingo
  const semanas = [];
  let semana = [];

  // Rellenar con días vacíos antes del día 1
  for (let i = 0; i < primerDiaSemana; i++) {
    semana.push(null);
  }

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const turno = turnos.find((t) => t.dia === dia);
    semana.push({ dia, turno });

    if (semana.length === 7) {
      semanas.push(semana);
      semana = [];
    }
  }

  // Si sobran días, completar la última semana
  if (semana.length > 0) {
    while (semana.length < 7) semana.push(null);
    semanas.push(semana);
  }

  return semanas;
}
