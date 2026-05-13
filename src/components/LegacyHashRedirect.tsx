import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Preserves old hash-based URLs from the v1 portal.
 *  #module-N         → /learn/module/N
 *  #prerequisites    → /learn/prerequisites
 *  #home or empty    → /learn/home
 */
export function LegacyHashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith("#")) return;
    if (hash.startsWith("#module-")) {
      const id = parseInt(hash.replace("#module-", ""), 10);
      if (!Number.isNaN(id)) navigate(`/learn/module/${id}`, { replace: true });
    } else if (hash === "#prerequisites") {
      navigate("/learn/prerequisites", { replace: true });
    } else if (hash === "#home") {
      navigate("/learn/home", { replace: true });
    }
  }, [navigate]);
  return null;
}
