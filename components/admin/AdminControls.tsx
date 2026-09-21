"use client";

import { useState } from "react";

type Row = Record<string, string | number | boolean | null>;

function toCsv(rows: Row[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  return lines.join("\n");
}

export function ExportCsvButton({
  rows,
  filename,
}: {
  rows: Row[];
  filename: string;
}) {
  function download() {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={rows.length === 0}
      className="border border-border-subtle px-4 py-2 font-mono text-xs uppercase tracking-wide text-text-secondary transition-colors hover:border-accent-orange hover:text-text-primary disabled:opacity-50"
    >
      Export CSV
    </button>
  );
}

export function CloseRoundButton({
  adminKey,
  initialOpen,
}: {
  adminKey: string;
  initialOpen: boolean;
}) {
  const [open, setOpen] = useState(initialOpen);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function toggle() {
    setState("loading");
    try {
      const res = await fetch("/api/admin/round", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey, open: !open }),
      });
      if (!res.ok) {
        setState("error");
        return;
      }
      setOpen(!open);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        disabled={state === "loading"}
        className={`px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide text-white transition-colors disabled:opacity-60 ${
          open
            ? "bg-accent-orange hover:bg-accent-orange-hover"
            : "bg-accent-green hover:opacity-90"
        }`}
      >
        {state === "loading"
          ? "Working..."
          : open
            ? "Mark founding round CLOSED"
            : "Re-open founding round"}
      </button>
      <p className="mt-2 font-mono text-xs text-text-muted">
        Round is currently{" "}
        <span className={open ? "text-accent-green" : "text-accent-emergency"}>
          {open ? "OPEN" : "CLOSED"}
        </span>
        .
      </p>
      {state === "error" && (
        <p className="mt-1 font-mono text-xs text-accent-emergency">
          Couldn&apos;t update. Try again.
        </p>
      )}
    </div>
  );
}
