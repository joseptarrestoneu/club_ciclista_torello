import { events } from "../data/events.js";

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

function isInSeason(date) {
  const month = date.getMonth(); // 0 = gener ... 11 = desembre
  return month >= 2 && month <= 9 && month !== 7; // març(2)-octubre(9), sense agost(7)
}

function recurringActivityFor(date) {
  if (!isInSeason(date)) return null;
  const weekday = date.getDay(); // 0 = diumenge, 2 = dimarts, 4 = dijous
  if (weekday === 0) return "Sortida de diumenge · 8:00 h, Gasolinera Galp";
  if (weekday === 2) return "Social Ride iniciàtica";
  if (weekday === 4) return "Social Ride";
  return null;
}

function toLocalISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function singularEventFor(date) {
  const iso = toLocalISODate(date);
  return events.find((event) => {
    const end = event.dateEndISO || event.dateISO;
    return iso >= event.dateISO && iso <= end;
  });
}

function buildDay(date) {
  const singular = singularEventFor(date);
  const recurring = recurringActivityFor(date);
  const label = singular ? singular.name : recurring;
  if (!label) return null;
  return {
    date,
    label,
    tag: singular ? singular.tag : null,
  };
}

function nextSeasonStart(today) {
  const year = today.getFullYear();
  const month = today.getMonth();
  if (month === 7) return new Date(year, 8, 1);
  if (month >= 10 || month < 2) return new Date(month >= 10 ? year + 1 : year, 2, 1);
  return null;
}

function formatDay(date) {
  return date.toLocaleDateString("ca", { weekday: "long", day: "numeric", month: "long" });
}

function formatMonthStart(date) {
  return date.toLocaleDateString("ca", { day: "numeric", month: "long" });
}

function buildWeek(start) {
  return Array.from({ length: 7 }, (_, i) => buildDay(addDays(start, i))).filter(Boolean);
}

export default function UpcomingFortnight() {
  const today = startOfDay(new Date());
  const weekday = today.getDay(); // 0 = diumenge
  const daysSinceMonday = (weekday + 6) % 7;
  const thisMonday = addDays(today, -daysSinceMonday);
  const nextMonday = addDays(thisMonday, 7);

  const thisWeek = Array.from({ length: 7 - daysSinceMonday }, (_, i) => buildDay(addDays(today, i))).filter(Boolean);
  const nextWeek = buildWeek(nextMonday);

  const total = thisWeek.length + nextWeek.length;

  if (total === 0) {
    const resume = nextSeasonStart(today);
    return (
      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Ara mateix, fora de temporada</h2>
            <p>
              El ritme setmanal de sortides i Social Ride va de març a octubre.
              {resume && <> Torna a començar el <strong>{formatMonthStart(resume)}</strong>.</>}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--alt" id="quinzena">
      <div className="container">
        <div className="section-head">
          <h2>Aquesta quinzena</h2>
          <p>El que toca d'avui a dues setmanes, calculat sobre el ritme setmanal i els esdeveniments singulars.</p>
        </div>
        <div className="grid grid-2">
          <div>
            <h3 style={{ marginBottom: 14 }}>Aquesta setmana</h3>
            {thisWeek.length === 0 ? (
              <p className="form-note">Cap activitat la resta d'aquesta setmana.</p>
            ) : (
              <ul className="ride-meta" style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
                {thisWeek.map((day) => (
                  <li key={day.date.toISOString()}>
                    <strong style={{ color: "var(--color-text)" }}>{formatDay(day.date)}</strong> — {day.label}
                    {day.tag && <span className="chip" style={{ marginLeft: 8 }}>{day.tag}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 style={{ marginBottom: 14 }}>La setmana que ve</h3>
            {nextWeek.length === 0 ? (
              <p className="form-note">Cap activitat la setmana que ve.</p>
            ) : (
              <ul className="ride-meta" style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
                {nextWeek.map((day) => (
                  <li key={day.date.toISOString()}>
                    <strong style={{ color: "var(--color-text)" }}>{formatDay(day.date)}</strong> — {day.label}
                    {day.tag && <span className="chip" style={{ marginLeft: 8 }}>{day.tag}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
