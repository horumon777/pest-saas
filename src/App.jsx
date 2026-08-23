import { useState, useMemo } from "react";

// ── Icon ──────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  record:    "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5 M17.586 3.586a2 2 0 012.828 2.828L12 15l-4 1 1-4 8.586-8.414z",
  report:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  master:    "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  schedule:  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  alert:     "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  settings:  "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  search:    "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  bell:      "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  plus:      "M12 5v14 M5 12h14",
  clock:     "M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6v6l4 2",
  bug:       "M8 2l1.5 1.5 M16 2l-1.5 1.5 M12 8a4 4 0 014 4v4a4 4 0 01-8 0v-4a4 4 0 014-4z M8 12H4 M20 12h-4 M6 18l-2 2 M18 18l2 2 M6 8L4 6 M18 8l2-2",
  arrow:     "M5 12h14 M12 5l7 7-7 7",
  chevL:     "M15 18l-6-6 6-6",
  chevR:     "M9 18l6-6-6-6",
  check:     "M20 6L9 17l-5-5",
  copy:      "M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.912 4.895 3 6 3h8c1.105 0 2 .912 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.088 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z",
  pdf:       "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
  more:      "M12 5h.01 M12 12h.01 M12 19h.01",
  edit:      "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:     "M3 6h18 M8 6V4h8v2 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6",
  x:         "M18 6L6 18 M6 6l12 12",
  save:      "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  map:       "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z",
  flag:      "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
};

// ── データ ────────────────────────────────────────────────────────────────────
const mockJobs = [
  { id: 1, client: "焼肉たかはし",       address: "渋谷区道玄坂2-1-1",   pest: "ゴキブリ",         date: "2026-04-23", status: "完了", next: "2026-07-23" },
  { id: 2, client: "ラーメン福来",        address: "新宿区歌舞伎町1-5-2", pest: "ネズミ",           date: "2026-04-20", status: "完了", next: "2026-05-20" },
  { id: 3, client: "寿司 銀次郎",        address: "港区六本木3-2-7",     pest: "ゴキブリ・チョウバエ", date: "2026-04-18", status: "完了", next: "2026-10-18" },
  { id: 4, client: "カフェ ル・ソレイユ", address: "目黒区自由が丘1-8-3", pest: "アリ",             date: "2026-04-15", status: "完了", next: "2026-06-15" },
];

// スケジュールイベント（施工済み＋次回予定を展開）
const allEvents = [
  // 施工済み
  { id: 101, client: "焼肉たかはし",       pest: "ゴキブリ",         date: "2026-04-23", type: "done",    address: "渋谷区道玄坂2-1-1" },
  { id: 102, client: "ラーメン福来",        pest: "ネズミ",           date: "2026-04-20", type: "done",    address: "新宿区歌舞伎町1-5-2" },
  { id: 103, client: "寿司 銀次郎",        pest: "ゴキブリ・チョウバエ", date: "2026-04-18", type: "done", address: "港区六本木3-2-7" },
  { id: 104, client: "カフェ ル・ソレイユ", pest: "アリ",             date: "2026-04-15", type: "done",    address: "目黒区自由が丘1-8-3" },
  { id: 105, client: "天ぷら 大和",        pest: "チョウバエ",        date: "2026-05-02", type: "done",    address: "港区麻布十番1-2-3" },
  { id: 106, client: "居酒屋 燦燦",        pest: "ゴキブリ",         date: "2026-05-07", type: "done",    address: "渋谷区恵比寿2-5-1" },
  // 予定
  { id: 201, client: "ラーメン福来",        pest: "ネズミ",           date: "2026-05-20", type: "scheduled", address: "新宿区歌舞伎町1-5-2" },
  { id: 202, client: "天ぷら 大和",        pest: "チョウバエ",        date: "2026-05-28", type: "scheduled", address: "港区麻布十番1-2-3" },
  { id: 203, client: "居酒屋 燦燦",        pest: "ゴキブリ",         date: "2026-06-07", type: "scheduled", address: "渋谷区恵比寿2-5-1" },
  { id: 204, client: "カフェ ル・ソレイユ", pest: "アリ",             date: "2026-06-15", type: "scheduled", address: "目黒区自由が丘1-8-3" },
  { id: 205, client: "焼肉たかはし",       pest: "ゴキブリ",         date: "2026-07-23", type: "scheduled", address: "渋谷区道玄坂2-1-1" },
  { id: 206, client: "鮮魚 海丸",         pest: "ネズミ",           date: "2026-05-14", type: "scheduled", address: "江東区豊洲3-2-1" },
  { id: 207, client: "焼鳥 とりいち",      pest: "ゴキブリ",         date: "2026-05-21", type: "scheduled", address: "品川区大崎1-6-4" },
  { id: 208, client: "イタリアン ボーノ",   pest: "アリ",             date: "2026-05-09", type: "scheduled", address: "目黒区中目黒4-3-2" },
];

const pestMeta = {
  "ゴキブリ":             { color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
  "ネズミ":               { color: "#8b5cf6", bg: "#f5f3ff", dot: "#8b5cf6" },
  "チョウバエ":           { color: "#0ea5e9", bg: "#f0f9ff", dot: "#0ea5e9" },
  "アリ":                 { color: "#10b981", bg: "#f0fdf4", dot: "#10b981" },
  "ゴキブリ・チョウバエ": { color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
};

const alertJobs = allEvents.filter(e => {
  if (e.type !== "scheduled") return false;
  const days = (new Date(e.date) - new Date("2026-05-10")) / 86400000;
  return days >= 0 && days <= 30;
}).map(e => ({ ...e, daysLeft: Math.round((new Date(e.date) - new Date("2026-05-10")) / 86400000) }));

const initialMaster = [
  { id: 1, pest: "ゴキブリ", chemicals: ["フィプロニル系ベイト剤", "ホウ酸ダンゴ"], amount: "20〜30g", method: "ベイト設置（シンク下・排水口周辺・壁際）", interval: "3ヶ月", notes: "湿度の高い場所を重点的に確認。" },
  { id: 2, pest: "ネズミ", chemicals: ["クマテトラリル系殺鼠剤", "ブロマジオロン"], amount: "50〜100g", method: "毒餌ステーション設置（壁際・暗所）、粘着トラップ併用", interval: "1ヶ月", notes: "侵入経路をパテ・金網で封鎖する。" },
  { id: 3, pest: "チョウバエ", chemicals: ["ピレスロイド系スプレー", "排水管洗浄剤"], amount: "適量（排水管1本につき100ml）", method: "排水口・グリストラップ周辺へ薬剤散布＋物理洗浄", interval: "2ヶ月", notes: "幼虫の発生源（ヘドロ）を除去しないと再発しやすい。" },
  { id: 4, pest: "アリ", chemicals: ["フィプロニル系ベイト剤（アリ用）", "ペルメトリン系粉剤"], amount: "ベイト：10〜15g　粉剤：適量", method: "侵入経路沿いにベイト設置＋外周に粉剤処理", interval: "2ヶ月", notes: "巣の場所を特定できる場合は直接処理が効果的。" },
  { id: 5, pest: "ハエ", chemicals: ["ジクロルボス系蒸散剤", "フィプロニル系ベイト剤（ハエ用）"], amount: "蒸散剤：1個/15㎡", method: "ULV処理＋ライトトラップ設置", interval: "1ヶ月", notes: "搬入口・ゴミ置き場付近に発生源がある場合が多い。" },
];

// ── UI部品 ───────────────────────────────────────────────────────────────────
function Badge({ label, color, bg }) {
  return <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, color, background: bg, whiteSpace: "nowrap" }}>{label}</span>;
}
function Card({ children, style = {} }) {
  return <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)", border: "1px solid #f1f5f9", ...style }}>{children}</div>;
}

// ── カレンダーヘルパー ─────────────────────────────────────────────────────────
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function buildCalendarDays(year, month) {
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);
  const days  = [];
  for (let i = 0; i < first.getDay(); i++) {
    const d = new Date(year, month, -first.getDay() + 1 + i);
    days.push({ date: d, current: false });
  }
  for (let d = 1; d <= last.getDate(); d++) {
    days.push({ date: new Date(year, month, d), current: true });
  }
  const rem = 42 - days.length;
  for (let i = 1; i <= rem; i++) {
    days.push({ date: new Date(year, month + 1, i), current: false });
  }
  return days;
}

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ── スケジュールページ ────────────────────────────────────────────────────────
function SchedulePage() {
  const today = new Date("2026-05-10");
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(dateKey(today));
  const [viewMode, setViewMode]   = useState("month"); // "month" | "list"

  const calDays = useMemo(() => buildCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);

  // 日付→イベント マップ
  const eventMap = useMemo(() => {
    const map = {};
    allEvents.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, []);

  const selectedEvents = eventMap[selectedDate] || [];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };
  const goToday = () => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); setSelectedDate(dateKey(today)); };

  // 今月の予定一覧（リストビュー用）
  const monthEvents = useMemo(() => {
    return allEvents
      .filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [viewYear, viewMonth]);

  const monthLabel = `${viewYear}年${viewMonth + 1}月`;
  const todayKey = dateKey(today);

  return (
    <div>
      {/* ページヘッダー */}
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" }}>スケジュール</h1>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>施工予定・完了記録をカレンダーで管理します</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* ビュー切替 */}
          <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 8, padding: 3, gap: 2 }}>
            {[{ key: "month", label: "月" }, { key: "list", label: "リスト" }].map(v => (
              <button key={v.key} onClick={() => setViewMode(v.key)}
                style={{ padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, background: viewMode === v.key ? "#fff" : "transparent", color: viewMode === v.key ? "#0f172a" : "#64748b", boxShadow: viewMode === v.key ? "0 1px 2px rgba(0,0,0,.08)" : "none", transition: "all .15s" }}>
                {v.label}
              </button>
            ))}
          </div>
          <button onClick={goToday} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#374151", fontFamily: "inherit" }}>今日</button>
        </div>
      </div>

      {/* 凡例 */}
      <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: "#3b82f6" }} />
          <span style={{ fontSize: 11, color: "#64748b" }}>施工予定</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: "#94a3b8" }} />
          <span style={{ fontSize: 11, color: "#64748b" }}>施工済み</span>
        </div>
        {Object.entries(pestMeta).slice(0, 4).map(([pest, m]) => (
          <div key={pest} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.dot }} />
            <span style={{ fontSize: 11, color: "#64748b" }}>{pest}</span>
          </div>
        ))}
      </div>

      {viewMode === "month" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>

          {/* ── カレンダー本体 ── */}
          <Card style={{ overflow: "hidden" }}>
            {/* 月ナビ */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={prevMonth} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: "#374151", display: "flex" }}>
                <Icon d={Icons.chevL} size={16} />
              </button>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{monthLabel}</span>
              <button onClick={nextMonth} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: "#374151", display: "flex" }}>
                <Icon d={Icons.chevR} size={16} />
              </button>
            </div>

            {/* 曜日ヘッダー */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #f1f5f9" }}>
              {WEEKDAYS.map((w, i) => (
                <div key={w} style={{ padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: 600, color: i === 0 ? "#ef4444" : i === 6 ? "#3b82f6" : "#94a3b8" }}>{w}</div>
              ))}
            </div>

            {/* 日付グリッド */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {calDays.map((cell, idx) => {
                const key    = dateKey(cell.date);
                const events = eventMap[key] || [];
                const isToday   = key === todayKey;
                const isSelected = key === selectedDate;
                const isSun = cell.date.getDay() === 0;
                const isSat = cell.date.getDay() === 6;
                const isLast = idx >= 35;

                return (
                  <div key={key + idx}
                    onClick={() => setSelectedDate(key)}
                    style={{
                      minHeight: 88, padding: "6px 8px",
                      borderRight: (idx % 7) < 6 ? "1px solid #f1f5f9" : "none",
                      borderBottom: !isLast ? "1px solid #f1f5f9" : "none",
                      background: isSelected ? "#eff6ff" : isToday ? "#fefce8" : "#fff",
                      cursor: "pointer", transition: "background .12s",
                      opacity: cell.current ? 1 : 0.35,
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#f8fafc"; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = isToday ? "#fefce8" : "#fff"; }}
                  >
                    {/* 日付番号 */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{
                        fontSize: 12, fontWeight: isToday ? 700 : 400,
                        color: isToday ? "#fff" : isSun ? "#ef4444" : isSat ? "#3b82f6" : "#374151",
                        background: isToday ? "#3b82f6" : "transparent",
                        width: isToday ? 22 : "auto", height: isToday ? 22 : "auto",
                        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {cell.date.getDate()}
                      </span>
                      {events.length > 2 && (
                        <span style={{ fontSize: 9, color: "#94a3b8" }}>+{events.length - 2}</span>
                      )}
                    </div>

                    {/* イベントチップ（最大2件） */}
                    {events.slice(0, 2).map(ev => {
                      const meta = pestMeta[ev.pest] || { dot: "#94a3b8" };
                      const isDone = ev.type === "done";
                      return (
                        <div key={ev.id} style={{
                          fontSize: 10, lineHeight: 1.2, marginBottom: 2, padding: "2px 5px",
                          borderRadius: 4, display: "flex", alignItems: "center", gap: 3,
                          background: isDone ? "#f1f5f9" : "#eff6ff",
                          color: isDone ? "#64748b" : "#1d4ed8",
                          overflow: "hidden",
                        }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: isDone ? "#94a3b8" : meta.dot, flexShrink: 0 }} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.client}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* ── 右パネル：選択日の詳細 ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* 選択日イベント */}
            <Card style={{ overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                  {selectedDate.replace(/-/g, "/")} の予定
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
                  {selectedEvents.length > 0 ? `${selectedEvents.length}件` : "予定なし"}
                </div>
              </div>
              <div style={{ padding: selectedEvents.length ? 0 : "20px 16px" }}>
                {selectedEvents.length === 0 ? (
                  <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>この日の予定はありません</div>
                ) : (
                  selectedEvents.map((ev, i) => {
                    const meta = pestMeta[ev.pest] || { color: "#64748b", bg: "#f8fafc", dot: "#94a3b8" };
                    const isDone = ev.type === "done";
                    return (
                      <div key={ev.id} style={{ padding: "12px 16px", borderBottom: i < selectedEvents.length - 1 ? "1px solid #f8fafc" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: isDone ? "#94a3b8" : meta.dot, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", flex: 1 }}>{ev.client}</span>
                          <Badge label={isDone ? "完了" : "予定"} color={isDone ? "#64748b" : "#3b82f6"} bg={isDone ? "#f1f5f9" : "#eff6ff"} />
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                            <Badge label={ev.pest} color={meta.color} bg={meta.bg} />
                          </div>
                          <div style={{ fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                            <Icon d={Icons.map} size={11} />{ev.address}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

            {/* 直近の予定 */}
            <Card style={{ overflow: "hidden", flex: 1 }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>直近の訪問予定</div>
              </div>
              <div>
                {allEvents
                  .filter(e => e.type === "scheduled" && e.date >= dateKey(today))
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .slice(0, 5)
                  .map((ev, i, arr) => {
                    const meta = pestMeta[ev.pest] || { color: "#64748b", bg: "#f8fafc", dot: "#94a3b8" };
                    const days = Math.round((new Date(ev.date) - today) / 86400000);
                    return (
                      <div key={ev.id}
                        onClick={() => { setSelectedDate(ev.date); setViewYear(+ev.date.slice(0, 4)); setViewMonth(+ev.date.slice(5, 7) - 1); }}
                        style={{ padding: "10px 16px", borderBottom: i < arr.length - 1 ? "1px solid #f8fafc" : "none", cursor: "pointer", transition: "background .12s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0f172a" }}>{ev.client}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: days <= 14 ? "#ef4444" : "#64748b", background: days <= 14 ? "#fef2f2" : "#f8fafc", padding: "2px 7px", borderRadius: 99 }}>
                            {days === 0 ? "今日" : `あと${days}日`}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: meta.dot }} />
                          <span style={{ fontSize: 11, color: "#94a3b8" }}>{ev.pest}　{ev.date}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* ── リストビュー ── */
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={prevMonth} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: "#374151", display: "flex" }}>
                <Icon d={Icons.chevL} size={16} />
              </button>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{monthLabel}</span>
              <button onClick={nextMonth} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: "#374151", display: "flex" }}>
                <Icon d={Icons.chevR} size={16} />
              </button>
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{monthEvents.length}件</span>
          </div>

          {monthEvents.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>この月の予定はありません</div>
          ) : (
            monthEvents.map((ev, i) => {
              const meta   = pestMeta[ev.pest] || { color: "#64748b", bg: "#f8fafc", dot: "#94a3b8" };
              const isDone = ev.type === "done";
              const d      = new Date(ev.date);
              const dow    = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
              return (
                <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: i < monthEvents.length - 1 ? "1px solid #f8fafc" : "none", transition: "background .12s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>

                  {/* 日付列 */}
                  <div style={{ width: 48, textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: d.getDay() === 0 ? "#ef4444" : d.getDay() === 6 ? "#3b82f6" : "#0f172a", lineHeight: 1 }}>{d.getDate()}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{dow}</div>
                  </div>

                  {/* ライン */}
                  <div style={{ width: 1, height: 40, background: "#e2e8f0", flexShrink: 0 }} />

                  {/* タイプドット */}
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: isDone ? "#94a3b8" : meta.dot, flexShrink: 0 }} />

                  {/* 内容 */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>{ev.client}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon d={Icons.map} size={11} />{ev.address}
                    </div>
                  </div>

                  {/* バッジ群 */}
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                    <Badge label={ev.pest} color={meta.color} bg={meta.bg} />
                    <Badge label={isDone ? "完了" : "予定"} color={isDone ? "#64748b" : "#3b82f6"} bg={isDone ? "#f1f5f9" : "#eff6ff"} />
                  </div>
                </div>
              );
            })
          )}
        </Card>
      )}
    </div>
  );
}

// ── 薬剤マスタ モーダル ───────────────────────────────────────────────────────
function MasterModal({ item, onSave, onClose }) {
  const isNew = !item.id;
  const [form, setForm] = useState({
    pest: item.pest || "", chemicals: (item.chemicals || []).join("、"),
    amount: item.amount || "", method: item.method || "",
    interval: item.interval || "", notes: item.notes || "",
  });
  const handleSave = () => {
    if (!form.pest.trim()) return;
    onSave({ ...item, pest: form.pest.trim(), chemicals: form.chemicals.split(/[、,，]/).map(s => s.trim()).filter(Boolean), amount: form.amount.trim(), method: form.method.trim(), interval: form.interval.trim(), notes: form.notes.trim() });
  };
  const inputStyle = { width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px", color: "#0f172a", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" };
  const Field = ({ k, label, placeholder, multi }) => (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
      {multi ? <textarea rows={3} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={placeholder} style={inputStyle} />
             : <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={placeholder} style={inputStyle} />}
    </div>
  );
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#fff", borderRadius: 12, width: 520, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,.18)" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>{isNew ? "新規薬剤マスタ登録" : "薬剤マスタ編集"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex" }}><Icon d={Icons.x} size={18} /></button>
        </div>
        <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          <Field k="pest" label="害虫種別 *" placeholder="例：ゴキブリ" />
          <Field k="chemicals" label="推奨薬剤（複数は読点区切り）" placeholder="例：フィプロニル系ベイト剤、ホウ酸ダンゴ" />
          <Field k="amount" label="使用量の目安" placeholder="例：20〜30g" />
          <Field k="method" label="処置方法" placeholder="例：シンク下・排水口周辺にベイト設置" multi />
          <Field k="interval" label="推奨訪問間隔" placeholder="例：3ヶ月" />
          <Field k="notes" label="備考・注意事項" placeholder="例：湿度の高い場所を重点的に確認" multi />
        </div>
        <div style={{ padding: "14px 22px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer", color: "#64748b", fontFamily: "inherit" }}>キャンセル</button>
          <button onClick={handleSave} style={{ background: "#3b82f6", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#fff", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon d={Icons.save} size={14} />保存
          </button>
        </div>
      </div>
    </div>
  );
}

// ── メインアプリ ──────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]                  = useState("dashboard");
  const [selectedJob, setSelectedJob]  = useState(null);
  const [generating, setGenerating]    = useState(false);
  const [report, setReport]            = useState("");
  const [copied, setCopied]            = useState(false);
  const [master, setMaster]            = useState(initialMaster);
  const [modalItem, setModalItem]      = useState(null);
  const [deleteId, setDeleteId]        = useState(null);
  const [searchPest, setSearchPest]    = useState("");
  const [form, setForm] = useState({ client: "", address: "", pest: "", chemical: "", amount: "", trap: "", note: "" });

  const navItems = [
    { key: "dashboard", label: "ダッシュボード" },
    { key: "schedule",  label: "スケジュール" },
    { key: "record",    label: "施工記録" },
    { key: "report",    label: "報告書生成" },
    { key: "master",    label: "薬剤マスタ" },
  ];

  const applyMaster = (pestName) => {
    const m = master.find(x => pestName.includes(x.pest) || x.pest.includes(pestName));
    if (m) setForm(f => ({ ...f, chemical: m.chemicals[0] || "", amount: m.amount || "" }));
  };

  const generateReport = async () => {
    setGenerating(true); setReport("");
    const prompt = `以下の施工記録をもとに、飲食店オーナー向けの丁寧な施工報告書の文章を200字程度で作成してください。
顧客名: ${selectedJob?.client || form.client}
害虫種別: ${selectedJob?.pest || form.pest}
使用薬剤: ${form.chemical || "フィプロニル系ベイト剤"}
使用量: ${form.amount || "30g"}
トラップ設置: ${form.trap || "シンク下・排水口付近 計4箇所"}
特記事項: ${form.note || "侵入経路と思われる隙間をパテで補填"}
次回推奨訪問: 3ヶ月後
報告書本文のみ出力してください。`;
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      setReport(data.text || "生成に失敗しました。");
    } catch { setReport("生成に失敗しました。"); }
    setGenerating(false);
  };

  const handleCopy = () => { navigator.clipboard.writeText(report); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const handleMasterSave = (item) => { setMaster(m => item.id ? m.map(x => x.id === item.id ? item : x) : [...m, { ...item, id: Date.now() }]); setModalItem(null); };
  const handleMasterDelete = (id) => { setMaster(m => m.filter(x => x.id !== id)); setDeleteId(null); };
  const filteredMaster = master.filter(m => m.pest.includes(searchPest));

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc", overflow: "hidden", fontFamily: "'Noto Sans JP', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* サイドバー */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={Icons.bug} size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", lineHeight: 1 }}>PESTLOG</div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>害虫駆除管理システム</div>
            </div>
          </div>
        </div>
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", padding: "4px 10px 8px", textTransform: "uppercase" }}>メニュー</p>
          {navItems.map(item => {
            const active = tab === item.key;
            return (
              <button key={item.key} onClick={() => { setTab(item.key); setReport(""); }}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2, background: active ? "#eff6ff" : "transparent", color: active ? "#3b82f6" : "#64748b", fontWeight: active ? 600 : 400, fontSize: 13.5, transition: "all .15s", fontFamily: "inherit" }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#f8fafc"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <Icon d={Icons[item.key]} size={16} />
                {item.label}
                {item.key === "dashboard" && alertJobs.length > 0 && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, background: "#ef4444", color: "#fff", borderRadius: 99, padding: "1px 6px" }}>{alertJobs.length}</span>}
                {item.key === "master" && <span style={{ marginLeft: "auto", fontSize: 10, color: "#94a3b8" }}>{master.length}</span>}
              </button>
            );
          })}
          <p style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", padding: "16px 10px 8px", textTransform: "uppercase" }}>その他</p>
          <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "#64748b", fontSize: 13.5, fontFamily: "inherit" }}>
            <Icon d={Icons.settings} size={16} />設定
          </button>
        </nav>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#3b82f6", color: "#fff", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>山</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0f172a" }}>山田 駆除サービス</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>管理者</div>
          </div>
          <Icon d={Icons.more} size={15} />
        </div>
      </aside>

      {/* メインエリア */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ height: 56, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px", width: 260 }}>
            <Icon d={Icons.search} size={14} />
            <input placeholder="顧客名・住所で検索…" style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#64748b", width: "100%", fontFamily: "inherit" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => { setTab("record"); setReport(""); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              <Icon d={Icons.plus} size={14} />新規施工記録
            </button>
            <div style={{ position: "relative" }}>
              <button style={{ background: "transparent", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 10px", cursor: "pointer", color: "#64748b", display: "flex" }}><Icon d={Icons.bell} size={16} /></button>
              {alertJobs.length > 0 && <span style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, background: "#ef4444", borderRadius: "50%", border: "1.5px solid #fff" }} />}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>

          {/* ダッシュボード */}
          {tab === "dashboard" && (
            <>
              <div style={{ marginBottom: 22 }}>
                <h1 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" }}>ダッシュボード</h1>
                <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>直近の施工状況とアラートを確認できます</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
                {[
                  { label: "今月の施工件数", value: "12件", sub: "先月比 +2", icon: Icons.record, iconColor: "#3b82f6", iconBg: "#eff6ff" },
                  { label: "定期契約顧客",   value: "28社", sub: "アクティブ", icon: Icons.dashboard, iconColor: "#10b981", iconBg: "#f0fdf4" },
                  { label: "訪問期限アラート", value: `${alertJobs.length}件`, sub: "30日以内", icon: Icons.alert, iconColor: "#ef4444", iconBg: "#fef2f2" },
                ].map((k, i) => (
                  <Card key={i} style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#64748b" }}>{k.label}</span>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: k.iconBg, color: k.iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={k.icon} size={14} /></div>
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.5px" }}>{k.value}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{k.sub}</div>
                  </Card>
                ))}
              </div>
              <Card style={{ padding: "16px 20px", marginBottom: 20, borderLeft: "3px solid #f59e0b" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <Icon d={Icons.alert} size={15} /><span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>定期訪問アラート（30日以内）</span>
                  <Badge label={`${alertJobs.length}件`} color="#f59e0b" bg="#fffbeb" />
                </div>
                {alertJobs.map(j => (
                  <div key={j.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fffbeb", borderRadius: 8, marginBottom: 6, border: "1px solid #fde68a" }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{j.client}</span>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8" }}><Icon d={Icons.clock} size={13} /><span style={{ fontSize: 12 }}>次回：{j.date}</span></div>
                      <Badge label={`あと${j.daysLeft}日`} color="#f59e0b" bg="#fef3c7" />
                    </div>
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>最近の施工記録</h2>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{mockJobs.length}件</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 120px 100px 80px", padding: "10px 20px", borderBottom: "1px solid #f8fafc" }}>
                  {["顧客名", "住所", "害虫種別", "施工日", ""].map((h, i) => <span key={i} style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>)}
                </div>
                {mockJobs.map((j, i) => {
                  const meta = pestMeta[j.pest] || { color: "#64748b", bg: "#f8fafc" };
                  return (
                    <div key={j.id} onClick={() => { setSelectedJob(j); setTab("report"); }}
                      style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 120px 100px 80px", padding: "13px 20px", alignItems: "center", borderBottom: i < mockJobs.length - 1 ? "1px solid #f8fafc" : "none", cursor: "pointer", transition: "background .12s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#0f172a" }}>{j.client}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{j.address}</div>
                      <div><Badge label={j.pest} color={meta.color} bg={meta.bg} /></div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{j.date}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#3b82f6", fontSize: 12, fontWeight: 500 }}>報告書<Icon d={Icons.arrow} size={13} /></div>
                    </div>
                  );
                })}
              </Card>
            </>
          )}

          {/* スケジュール */}
          {tab === "schedule" && <SchedulePage />}

          {/* 施工記録 */}
          {tab === "record" && (
            <>
              <div style={{ marginBottom: 22 }}>
                <h1 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a" }}>新規施工記録</h1>
                <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>害虫種別を入力すると薬剤マスタから自動補完されます</p>
              </div>
              <Card style={{ padding: 28 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  {[{ key: "client", label: "顧客名", placeholder: "例：焼肉たかはし" }, { key: "address", label: "住所", placeholder: "例：渋谷区道玄坂2-1-1" }].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{f.label}</label>
                      <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", color: "#0f172a", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    </div>
                  ))}
                  <div style={{ position: "relative" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>害虫種別 <span style={{ fontSize: 10, color: "#3b82f6", fontWeight: 400 }}>← 入力すると薬剤が自動入力</span></label>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input value={form.pest} onChange={e => setForm({ ...form, pest: e.target.value })} placeholder="例：ゴキブリ" style={{ flex: 1, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", color: "#0f172a", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
                      <button onClick={() => applyMaster(form.pest)} style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "0 12px", cursor: "pointer", color: "#3b82f6", fontSize: 12, fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap" }}>自動入力</button>
                    </div>
                  </div>
                  {[{ key: "chemical", label: "使用薬剤", placeholder: "例：フィプロニル系ベイト剤" }, { key: "amount", label: "使用量", placeholder: "例：30g" }, { key: "trap", label: "トラップ設置場所", placeholder: "例：シンク下 計4箇所" }].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{f.label}</label>
                      <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", color: "#0f172a", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>特記事項</label>
                  <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="例：侵入経路と思われる隙間をパテで補填" rows={3} style={{ width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", color: "#0f172a", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                </div>
                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                  <button onClick={() => { setSelectedJob(null); setTab("report"); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>記録を保存して報告書を生成<Icon d={Icons.arrow} size={15} /></button>
                  <button onClick={() => setForm({ client: "", address: "", pest: "", chemical: "", amount: "", trap: "", note: "" })} style={{ background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 18px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>クリア</button>
                </div>
              </Card>
            </>
          )}

          {/* 報告書 */}
          {tab === "report" && (
            <>
              <div style={{ marginBottom: 22 }}>
                <h1 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a" }}>{selectedJob ? `${selectedJob.client}　の報告書` : "施工報告書生成"}</h1>
                <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>Claude AIが施工記録から報告書を自動生成します</p>
              </div>
              {selectedJob && (
                <Card style={{ padding: "16px 20px", marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[{ label: "顧客名", value: selectedJob.client }, { label: "害虫種別", value: selectedJob.pest }, { label: "施工日", value: selectedJob.date }, { label: "次回推奨", value: selectedJob.next }].map((d, i) => (
                    <div key={i} style={{ padding: "6px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8 }}>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{d.label}：</span><span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{d.value}</span>
                    </div>
                  ))}
                </Card>
              )}
              <Card style={{ padding: "22px 24px", marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>ボタンを押すとAIが施工データをもとに報告書文章を作成します。</p>
                <button onClick={generateReport} disabled={generating} style={{ background: generating ? "#e2e8f0" : "#3b82f6", color: generating ? "#94a3b8" : "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 13.5, fontWeight: 600, cursor: generating ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                  {generating ? "⏳ AI生成中…" : <><Icon d={Icons.report} size={15} />報告書を自動生成</>}
                </button>
              </Card>
              {report && (
                <Card style={{ padding: "22px 24px", borderLeft: "3px solid #10b981" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}><Icon d={Icons.check} size={16} /><span style={{ fontSize: 13, fontWeight: 600, color: "#10b981" }}>報告書が生成されました</span></div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.9, color: "#374151", background: "#f8fafc", borderRadius: 8, padding: "16px 18px", border: "1px solid #e2e8f0" }}>{report}</div>
                  <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                    <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: 6, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 16px", color: "#374151", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}><Icon d={Icons.copy} size={14} />{copied ? "コピーしました！" : "コピー"}</button>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#3b82f6", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Icon d={Icons.pdf} size={14} />PDFで出力</button>
                  </div>
                </Card>
              )}
            </>
          )}

          {/* 薬剤マスタ */}
          {tab === "master" && (
            <>
              <div style={{ marginBottom: 22, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <h1 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a" }}>薬剤マスタ管理</h1>
                  <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>害虫の種別ごとに推奨薬剤・処置方法を管理します</p>
                </div>
                <button onClick={() => setModalItem({})} style={{ display: "flex", alignItems: "center", gap: 6, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Icon d={Icons.plus} size={14} />新規登録</button>
              </div>
              <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px", width: 260 }}>
                <Icon d={Icons.search} size={14} />
                <input value={searchPest} onChange={e => setSearchPest(e.target.value)} placeholder="害虫名で絞り込み…" style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#64748b", width: "100%", fontFamily: "inherit" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
                {filteredMaster.map(m => {
                  const meta = pestMeta[m.pest] || { color: "#64748b", bg: "#f8fafc" };
                  return (
                    <Card key={m.id} style={{ padding: 0, overflow: "hidden" }}>
                      <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: meta.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🐛</div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{m.pest}</div>
                            <div style={{ fontSize: 11, color: "#94a3b8" }}>推奨間隔：{m.interval}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => setModalItem(m)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#64748b", display: "flex" }}><Icon d={Icons.edit} size={14} /></button>
                          <button onClick={() => setDeleteId(m.id)} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#ef4444", display: "flex" }}><Icon d={Icons.trash} size={14} /></button>
                        </div>
                      </div>
                      <div style={{ padding: "14px 18px" }}>
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>推奨薬剤</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {m.chemicals.map((c, i) => <span key={i} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", fontWeight: 500 }}>{c}</span>)}
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                          <div style={{ background: "#f8fafc", borderRadius: 6, padding: "8px 12px" }}>
                            <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2 }}>使用量目安</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.amount}</div>
                          </div>
                          <div style={{ background: "#f8fafc", borderRadius: 6, padding: "8px 12px" }}>
                            <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2 }}>推奨訪問間隔</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.interval}</div>
                          </div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>処置方法</div>
                          <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.6 }}>{m.method}</div>
                        </div>
                        {m.notes && <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, padding: "8px 12px" }}>
                          <div style={{ fontSize: 11, color: "#92400e", fontWeight: 600, marginBottom: 2 }}>⚠️ 備考・注意</div>
                          <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.6 }}>{m.notes}</div>
                        </div>}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>

      {modalItem !== null && <MasterModal item={modalItem} onSave={handleMasterSave} onClose={() => setModalItem(null)} />}
      {deleteId !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={e => { if (e.target === e.currentTarget) setDeleteId(null); }}>
          <div style={{ background: "#fff", borderRadius: 12, width: 360, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,.18)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>マスタを削除しますか？</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>「{master.find(m => m.id === deleteId)?.pest}」の薬剤マスタを削除します。この操作は元に戻せません。</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setDeleteId(null)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer", color: "#64748b", fontFamily: "inherit" }}>キャンセル</button>
              <button onClick={() => handleMasterDelete(deleteId)} style={{ background: "#ef4444", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#fff", fontFamily: "inherit" }}>削除する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
