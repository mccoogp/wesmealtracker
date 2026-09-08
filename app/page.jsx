"use client";

import { useState, useMemo } from "react";

const TODAY = (() => {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
})();

const YEAR = new Date().getFullYear();

function daysBetween(a, b) {
  const d1 = new Date(a + "T12:00:00");
  const d2 = new Date(b + "T12:00:00");
  return Math.round((d2 - d1) / 86400000);
}

function calcTrack(total, remaining, daysElapsed, daysLeft, totalDays) {
  const rem = remaining === "" ? null : parseFloat(remaining);
  if (rem !== null && isNaN(rem)) return {};
  const used = rem !== null ? Math.max(0, total - rem) : null;
  const usedPerDay = daysElapsed > 0 && used !== null ? used / daysElapsed : null;
  const canSpendPerDay = daysLeft > 0 && rem !== null ? rem / daysLeft : null;
  const onPacePerDay = totalDays > 0 ? total / totalDays : null;
  const pctUsed = rem !== null ? Math.min(100, Math.max(0, ((total - rem) / total) * 100)) : null;
  const pctDays = totalDays > 0 ? Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100)) : 0;
  const projectedRemaining = usedPerDay !== null && rem !== null ? rem - usedPerDay * daysLeft : null;
  let pace = null;
  if (canSpendPerDay !== null && onPacePerDay !== null) {
    const ratio = canSpendPerDay / onPacePerDay;
    if (ratio > 1.06) pace = "slow";
    else if (ratio < 0.94) pace = "fast";
    else pace = "track";
  }
  return { rem, used, usedPerDay, canSpendPerDay, onPacePerDay, pctUsed, pctDays, pace, projectedRemaining };
}

const PACE_CONFIG = {
  track: { color: "var(--text-success)", bg: "var(--bg-success)", border: "var(--border-success)", bar: "var(--fill-success)", label: "On track" },
  slow: { color: "var(--text-warning)", bg: "var(--bg-warning)", border: "var(--border-warning)", bar: "var(--fill-warning)", label: "Spending slow" },
  fast: { color: "var(--text-danger)", bg: "var(--bg-danger)", border: "var(--border-danger)", bar: "var(--fill-danger)", label: "Spending fast" },
};

function StatCard({ label, value, sub, color, big }) {
  return (
    <div style={{
      background: "var(--surface-1)",
      borderRadius: "var(--radius)",
      padding: "12px 14px",
      flex: "1 1 120px",
    }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, fontWeight: 500 }}>{label}</div>
      <div style={{
        fontSize: big ? 28 : 22,
        fontWeight: 500,
        color: color || "var(--text-primary)",
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1.1,
      }}>
        {value ?? <span style={{ color: "var(--text-muted)" }}>—</span>}
      </div>
      {sub && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function Track({ name, icon, unit, total, setTotal, remaining, setRemaining, daysElapsed, daysLeft, totalDays }) {
  const t = calcTrack(total, remaining, daysElapsed, daysLeft, totalDays);
  const pace = t.pace ? PACE_CONFIG[t.pace] : null;
  const hasData = remaining !== "";

  return (
    <div style={{
      background: "var(--surface-2)",
      borderRadius: 12,
      border: "0.5px solid var(--border)",
      padding: "20px 22px",
      marginBottom: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }} aria-hidden="true">{icon}</span>
        <span style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}>{name}</span>
        {pace && (
          <span style={{
            marginLeft: "auto",
            background: pace.bg,
            color: pace.color,
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: 20,
            border: `0.5px solid ${pace.border}`,
            whiteSpace: "nowrap",
          }}>
            {pace.label === "On track" ? "✓ " : pace.label === "Spending fast" ? "↑ " : "↓ "}
            {pace.label}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 140px" }}>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
            Starting {unit}
          </label>
          <input
            type="number"
            min={0}
            value={total}
            onChange={e => setTotal(Number(e.target.value))}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ flex: "1 1 140px" }}>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
            Current balance{remaining === "" ? " ←" : ""}
          </label>
          <input
            type="number"
            min={0}
            value={remaining}
            placeholder={`Enter ${unit.toLowerCase()}`}
            onChange={e => setRemaining(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              ...(remaining === "" ? { borderColor: "var(--border-warning)" } : {}),
            }}
          />
        </div>
      </div>

      {hasData ? (
        <>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
            <StatCard label="Used so far" value={t.used !== null ? Math.round(t.used) : null} />
            <StatCard label="Used per day" value={t.usedPerDay !== null ? t.usedPerDay.toFixed(1) : null} sub="historical avg" />
            <StatCard
              label="Can spend / day"
              value={t.canSpendPerDay !== null ? t.canSpendPerDay.toFixed(1) : null}
              sub={`${daysLeft} days left`}
              color={pace?.color}
            />
            <StatCard label="Target / day" value={t.onPacePerDay !== null ? t.onPacePerDay.toFixed(1) : null} sub="ideal pace" />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Usage vs. time elapsed</span>
              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                {t.pctUsed !== null ? Math.round(t.pctUsed) : 0}% used · {Math.round(t.pctDays)}% of semester
              </span>
            </div>
            <div style={{ position: "relative", height: 8, background: "var(--surface-1)", borderRadius: 4, overflow: "hidden", border: "0.5px solid var(--border)" }}>
              <div style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                width: `${t.pctUsed ?? 0}%`,
                background: pace?.bar || "var(--fill-accent)",
                transition: "width 0.3s ease",
                borderRadius: 4,
              }} />
            </div>
            <div style={{ position: "relative", height: 20, marginTop: 1 }}>
              <div style={{
                position: "absolute",
                left: `clamp(12px, ${t.pctDays}%, calc(100% - 36px))`,
                transform: "translateX(-50%)",
                fontSize: 10,
                color: "var(--text-secondary)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}>
                <span style={{ width: 1, height: 6, background: "var(--text-secondary)", display: "block" }} />
                <span>today</span>
              </div>
            </div>
            {t.projectedRemaining !== null && (
              <div style={{
                marginTop: 4,
                fontSize: 11,
                color: t.projectedRemaining >= 0 ? "var(--text-warning)" : "var(--text-danger)",
              }}>
                {t.projectedRemaining >= 0
                  ? `At this pace you'll finish with ~${Math.round(t.projectedRemaining)} ${unit.toLowerCase()} left over.`
                  : `At this pace you'll run out ~${Math.round(Math.abs(t.projectedRemaining))} ${unit.toLowerCase()} short.`
                }
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "20px 0 4px",
          fontSize: 13,
          color: "var(--text-muted)",
        }}>
          Enter your current balance above to see your spending stats.
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [startDate, setStartDate] = useState(`${YEAR}-09-04`);
  const [endDate, setEndDate] = useState(`${YEAR}-12-12`);
  const [totalPoints, setTotalPoints] = useState(540);
  const [remainingPoints, setRemainingPoints] = useState("");
  const [totalSwipes, setTotalSwipes] = useState(290);
  const [remainingSwipes, setRemainingSwipes] = useState("");

  const { totalDays, daysElapsed, daysLeft } = useMemo(() => {
    const totalDays = Math.max(0, daysBetween(startDate, endDate));
    const daysElapsed = Math.max(0, Math.min(totalDays, daysBetween(startDate, TODAY)));
    const daysLeft = Math.max(0, daysBetween(TODAY, endDate));
    return { totalDays, daysElapsed, daysLeft };
  }, [startDate, endDate]);

  const fmtDate = (s) => {
    const d = new Date(s + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div style={{
      fontFamily: "var(--font-sans)",
      background: "var(--surface-0)",
      minHeight: "100vh",
      padding: "0 0 48px",
      color: "var(--text-primary)",
    }}>
      <div style={{
        background: "var(--surface-2)",
        borderBottom: "0.5px solid var(--border)",
        padding: "20px 24px",
      }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 16, color: "var(--text-primary)" }}>
            Meal plan tracker
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
                Semester start
              </label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
                Semester end
              </label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <div style={{
              marginLeft: "auto",
              fontSize: 13,
              color: "var(--text-secondary)",
              textAlign: "right",
              lineHeight: 1.7,
            }}>
              <div>{fmtDate(startDate)} – {fmtDate(endDate)}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                {daysElapsed}d elapsed · {daysLeft}d left · {totalDays}d total
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 660, margin: "20px auto", padding: "0 16px" }}>
        <Track
          name="Meal points"
          icon="💳"
          unit="Points"
          total={totalPoints}
          setTotal={setTotalPoints}
          remaining={remainingPoints}
          setRemaining={setRemainingPoints}
          daysElapsed={daysElapsed}
          daysLeft={daysLeft}
          totalDays={totalDays}
        />
        <Track
          name="Meal swipes"
          icon="🍽️"
          unit="Swipes"
          total={totalSwipes}
          setTotal={setTotalSwipes}
          remaining={remainingSwipes}
          setRemaining={setRemainingSwipes}
          daysElapsed={daysElapsed}
          daysLeft={daysLeft}
          totalDays={totalDays}
        />
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", margin: "16px 0 0" }}>
          Update your balance each week to keep your pace accurate.
        </p>
      </div>
    </div>
  );
}