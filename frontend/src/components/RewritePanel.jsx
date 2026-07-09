import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function RewritePanel({ rewrite, onRewrite, isRewriting }) {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRewrite("autonomy")}
          disabled={isRewriting}
        >
          {isRewriting ? "Optimizing..." : "Optimize Autonomy Rewrite"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRewrite("enforcement")}
          disabled={isRewriting}
        >
          {isRewriting ? "Optimizing..." : "Optimize Enforcement Rewrite"}
        </Button>
      </div>

      <Textarea
        readOnly
        value={rewrite}
        placeholder="Best rewrite will appear here."
        className="min-h-[180px] resize-y leading-relaxed"
      />
    </div>
  );
}
