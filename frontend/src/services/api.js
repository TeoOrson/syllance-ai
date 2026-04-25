const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

async function fetchJson(path, body, method = "POST") {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });

  const raw = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${raw}`);
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid JSON from backend: ${error.message}`);
  }
}

export function scorePolicy(text, optimizeFor = "autonomy") {
  return fetchJson("/api/score", { text, optimizeFor });
}

export function rewritePolicy(policyText, mode = "autonomy") {
    return fetchJson("/api/rewrite", {
        policy_text: policyText,
        mode,
    });
}

export function healthCheck() {
  return fetchJson("/api/health", null, "GET");
}

export function scorePolicyDirect(policyText, optimizeFor = "autonomy") {
  return fetchJson("/api/score-policy", {
    policy_text: policyText,
    optimizeFor,
  });
}

export function rewriteOptimizePolicy(policyText, mode = "autonomy", count = 3, runMode = "fast") {
  return fetchJson("/api/rewrite-optimize", {
    policy_text: policyText,
    mode,
    count,
    run_mode: runMode,
  });
}