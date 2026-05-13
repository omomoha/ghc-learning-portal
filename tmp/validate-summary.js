// Validate AI-generated PR summary against actual diff
function validateSummary(summary, changedFiles) {
  // Extract file paths mentioned in summary (common patterns)
  const mentionedFiles = summary.match(/[\w/.-]+\.(?:ts|js|py|go|java|yml|json)/g) || [];

  const hallucinated = mentionedFiles.filter(
    f => !changedFiles.some(real => real.endsWith(f) || f.endsWith(real))
  );

  if (hallucinated.length > 0) {
    console.warn('⚠️ Potential hallucination — files mentioned but not in diff:', hallucinated);
    // Append disclaimer to the posted comment
    return summary + `\n\n> ⚠️ **Note:** AI may have referenced files not in this diff. Verify: ${hallucinated.join(', ')}`;
  }

  return summary;
}

// Usage example
const changedFiles = ['src/app.js', 'src/utils.js'];
const rawSummary = 'This PR updates src/app.js and src/utils.js.';
const validatedSummary = validateSummary(rawSummary, changedFiles);
console.log(validatedSummary);
