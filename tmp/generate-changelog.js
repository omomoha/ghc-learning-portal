// Generate changelog entry from merged PRs
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function generateChangelog(owner, repo, since) {
  const { data: pulls } = await octokit.pulls.list({
    owner, repo,
    state: 'closed',
    sort: 'updated',
    direction: 'desc',
    since
  });

  const merged = pulls.filter(pr => pr.merged_at);

  const categories = {
    features: [], fixes: [], docs: [], refactor: []
  };

  for (const pr of merged) {
    const labels = pr.labels.map(l => l.name);
    const entry = `- ${pr.title} (#${pr.number})`;

    if (labels.includes('feature')) categories.features.push(entry);
    else if (labels.includes('bug')) categories.fixes.push(entry);
    else if (labels.includes('docs')) categories.docs.push(entry);
    else categories.refactor.push(entry);
  }

  return formatChangelog(categories);
}

function formatChangelog(categories) {
  let changelog = '';
  if (categories.features.length) {
    changelog += '### Features\n' + categories.features.join('\n') + '\n';
  }
  if (categories.fixes.length) {
    changelog += '### Fixes\n' + categories.fixes.join('\n') + '\n';
  }
  if (categories.docs.length) {
    changelog += '### Documentation\n' + categories.docs.join('\n') + '\n';
  }
  if (categories.refactor.length) {
    changelog += '### Refactor\n' + categories.refactor.join('\n') + '\n';
  }
  return changelog;
}

module.exports = { generateChangelog };
