
import { useState, useMemo } from "react";
import pointsIcon from "./points.png";
import mealsIcon from "./meals.svg";
import thankIcon from "./thank.png";
import fallIcon from "./fall.png";
import wesIcon from "./icon.png";
import plateIcon from "./plate.png";
import './BottomMarquee.css';


function BottomMarquee() {
  const marqueeText = "DOLLY PARTON ADP FRIDAY NIGHT!!!    ";

  return (
    <div className="marquee-fixed-bottom">
      <div className="marquee-content">
        {/* We repeat the text to ensure a seamless infinite loop loop */}
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>
    </div>
  );
}

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
  const onPacePerDay = totalDays > 0 ? total / (totalDays) : null;

  return { rem, used, usedPerDay, canSpendPerDay, onPacePerDay };
}

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

function Track({ name, unit, total, icon, setTotal, remaining, setRemaining, daysElapsed, daysLeft, totalDays }) {
  const t = calcTrack(total, remaining, daysElapsed, daysLeft, totalDays);
  const hasData = remaining !== "";
  const imgSrc = typeof icon === "string" ? icon : icon?.src || icon;

  return (
    <div style={{
      background: "var(--surface-2)",
      borderRadius: 12,
      border: "0.5px solid var(--border)",
      padding: "20px 22px",
      marginBottom: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <img
          src={imgSrc}
          alt={name}
          style={{ width: 24, height: 24, objectFit: "contain" }}
        />
        <span style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}>{name}</span>
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
            Current balance
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
            }}
          />
        </div>
      </div>

      {hasData && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <StatCard label="Used so far" value={t.used !== null ? Math.round(t.used) : null} />
          <StatCard label="Used per day" value={t.usedPerDay !== null ? t.usedPerDay.toFixed(1) : null} sub="historical avg" />
          <StatCard
            label="Can spend / day"
            value={t.canSpendPerDay !== null ? t.canSpendPerDay.toFixed(1) : null}
            sub={`${daysLeft} days left`}
          />
          <StatCard label="Target / day" value={t.onPacePerDay !== null ? t.onPacePerDay.toFixed(1) : null} sub="ideal pace" />
        </div>
      )}
    </div>
  );
}

export function SmallView() {
  const [startDate, setStartDate] = useState(`${YEAR}-09-04`);
  const [endDate, setEndDate] = useState(`${YEAR}-12-20`);
  const [fallStartDate, setFallStartDate] = useState(`${YEAR}-10-24`);
  const [fallEndDate, setFallEndDate] = useState(`${YEAR}-10-27`);
  const [fallBreak, setFallBreak] = useState(false);
  const [thankStartDate, setThankStartDate] = useState(`${YEAR}-11-25`);
  const [thankEndDate, setThankEndDate] = useState(`${YEAR}-11-29`);
  const [thankBreak, setThankBreak] = useState(false);
  const [totalPoints, setTotalPoints] = useState(540);
  const [remainingPoints, setRemainingPoints] = useState("");
  const [totalSwipes, setTotalSwipes] = useState(290);
  const [remainingSwipes, setRemainingSwipes] = useState("");

  const { totalDays, daysElapsed, daysLeft } = useMemo(() => {
    const totalDays = Math.max(0, daysBetween(startDate, endDate) - (fallBreak ? daysBetween(fallStartDate, fallEndDate) : 0) - (thankBreak ? daysBetween(thankStartDate, thankEndDate) : 0));
    const daysElapsed = Math.max(0, Math.min(totalDays, daysBetween(startDate, TODAY)));
    const daysLeft = Math.max(0, daysBetween(TODAY, endDate) - (fallBreak ? daysBetween(fallStartDate, fallEndDate) : 0) - (thankBreak ? daysBetween(thankStartDate, thankEndDate) : 0));
    return { totalDays, daysElapsed, daysLeft };
  }, [startDate, endDate, fallStartDate, fallEndDate, fallBreak, thankStartDate, thankEndDate, thankBreak]);

  const handleCheckboxChange = () => {
    setFallBreak(!fallBreak);
  };
  const handleCheckboxChange2 = () => {
    setThankBreak(!thankBreak);
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
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
                Semester start
              </label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            -
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
                Semester end
              </label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>
             <img
              src={typeof fallIcon === "string" ? fallIcon : fallIcon?.src || fallIcon}
              style={{ width: 20, height: 20, objectFit: "contain" }}
              />
            {' '} {' '}Off Campus Fall Break
          </label>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 16 }}>
            <input
              type="checkbox"
              checked={fallBreak}
              onChange={handleCheckboxChange}
            />
            <div>
              <input type="date" value={fallStartDate} onChange={e => setFallStartDate(e.target.value)} />
            </div>
            -
            <div>
              <input type="date" value={fallEndDate} onChange={e => setFallEndDate(e.target.value)} />
            </div>
          </div>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 5 }}>

              <img
              src={typeof thankIcon === "string" ? thankIcon : thankIcon?.src || thankIcon}
              style={{ width: 24, height: 24, objectFit: "contain" }}
              />
            {' '} {' '} Off Campus Thanksgiving Break
          </label>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={thankBreak}
              onChange={handleCheckboxChange2}
            />
            <div>
              <input type="date" value={thankStartDate} onChange={e => setThankStartDate(e.target.value)} />
            </div>
            -
            <div>
              <input type="date" value={thankEndDate} onChange={e => setThankEndDate(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 660, margin: "20px auto", padding: "0 16px" }}>
        <Track
          name="Meal points"
          unit="Points"
          total={totalPoints}
          icon={pointsIcon}
          setTotal={setTotalPoints}
          remaining={remainingPoints}
          setRemaining={setRemainingPoints}
          daysElapsed={daysElapsed}
          daysLeft={daysLeft}
          totalDays={totalDays}
        />
        <Track
          name="Meal swipes"
          unit="Swipes"
          total={totalSwipes}
          icon={mealsIcon}
          setTotal={setTotalSwipes}
          remaining={remainingSwipes}
          setRemaining={setRemainingSwipes}
          daysElapsed={daysElapsed}
          daysLeft={daysLeft}
          totalDays={totalDays}
        />
      </div>
      <div style={{ maxWidth: 660, margin: "20px auto", padding: "0 16px" }}>
        <a href="https://wesleyan-sp.transactcampus.com/eAccounts/AccountSummary.aspx" target="_blank" rel="noopener noreferrer">
          Check Your Balance
        </a>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)" }}>
            (Click on your plan at the bottom for meals: for example "Intermediate 540 Pts Fall")
          </label>
      </div>
      <BottomMarquee></BottomMarquee>
    </div>
  );
}