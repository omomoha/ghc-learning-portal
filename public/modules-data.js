// ========================================================================
// MODULES DATA — GitHub Copilot Agentic Engineering Enablement Program
// ========================================================================

const MODULES = [

// ======================================================================
// WORKSHOP 1 — Agentic Development & AI Code Review
// ======================================================================

{
  id: 1, workshop: 1,
  title: "Configuring GitHub Copilot for Agentic Workflows",
  time: "45 min",
  objectives: [
    "Understand what agentic AI means in the context of software development",
    "Enable and configure GitHub Copilot's agent mode in VS Code",
    "Set up workspace-level Copilot settings for optimal agentic behavior",
    "Verify your configuration with a live agentic task"
  ],
  sections: [
    {
      title: "🔍 What Are Agentic Workflows?",
      content: `<p>Traditional AI code assistants respond to a single prompt with a single suggestion. <strong>Agentic workflows</strong> go much further — the AI operates as an autonomous agent that can plan multi-step tasks, execute commands, read and write files, and iterate on its own output until the task is complete.</p>
<p>Think of it this way: a regular assistant answers questions, but an agent <em>completes tasks</em>. GitHub Copilot's agent mode transforms it from a code suggestion tool into a full development partner.</p>
<div class="concept-box info">
  <h4>💡 Key Concepts</h4>
  <p><strong>Agent Mode:</strong> Copilot autonomously plans, executes, and iterates on tasks. It can run terminal commands, edit multiple files, and fix its own errors.<br>
  <strong>Chat Mode:</strong> Standard Q&A — Copilot responds to prompts but doesn't take action.<br>
  <strong>Edit Mode:</strong> Copilot makes inline code changes you specify, but doesn't run or test them.</p>
</div>`
    },
    {
      title: "⚙️ Step-by-Step: Enable Agent Mode in VS Code",
      content: `<div class="steps">
  <div class="step">
    <div class="step-num">1</div>
    <div class="step-content">
      <h4>Install Prerequisites</h4>
      <p>Ensure you have VS Code 1.99+ and the GitHub Copilot extension (v1.250+). Open VS Code, go to Extensions (Ctrl+Shift+X), and search for "GitHub Copilot". Install or update to the latest version.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">2</div>
    <div class="step-content">
      <h4>Enable Agent Mode in Settings</h4>
      <p>Open Settings (Ctrl+,), search for <code>chat.agent.enabled</code>, and ensure it is checked. This activates the agent mode toggle in the Copilot Chat panel.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">3</div>
    <div class="step-content">
      <h4>Open Copilot Chat & Switch to Agent</h4>
      <p>Open Copilot Chat (Ctrl+Shift+I). At the bottom of the chat input, you'll see a mode dropdown. Switch it from "Chat" to <strong>"Agent"</strong>.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">4</div>
    <div class="step-content">
      <h4>Configure Workspace Settings</h4>
      <p>Create a <code>.vscode/settings.json</code> in your project root for workspace-specific Copilot settings. This ensures all team members share the same configuration.</p>
    </div>
  </div>
</div>`
    },
    {
      title: "💻 Configuration Example",
      content: `<p>Here is a typical VS Code workspace configuration that optimizes Copilot for agentic development:</p>`,
      codeBlocks: [
        {
          lang: "json",
          title: ".vscode/settings.json",
          code: `{
  "chat.agent.enabled": true,
  "github.copilot.chat.agent.runTasks": true,
  "github.copilot.chat.agent.autoFix": true,
  "github.copilot.chat.codeGeneration.instructions": [
    { "text": "Use TypeScript with strict mode enabled" },
    { "text": "Follow ESLint and Prettier formatting rules" },
    { "text": "Include JSDoc comments for public functions" }
  ],
  "github.copilot.chat.testGeneration.instructions": [
    { "text": "Use Jest with describe/it blocks" },
    { "text": "Include edge cases and error scenarios" }
  ]
}`
        }
      ],
      image: "m1_agent_config.png"
    },
    {
      title: "🧪 Try It Yourself: First Agentic Task",
      content: `<p>Let's verify your configuration with a simple agentic task. Open the Copilot Chat in agent mode and type the following prompt:</p>
<div class="code-block"><div class="code-header"><span class="code-lang">Prompt</span></div><pre class="code-content">Create a new file called hello-agent.js that exports a function
greetUser(name) which returns a personalized greeting. Then create
a test file hello-agent.test.js with at least 3 test cases using
Jest. Run the tests and fix any failures.</pre></div>
<p>Watch how the agent plans the task, creates both files, installs Jest if needed, runs the tests, and fixes any issues — all autonomously.</p>
<div class="concept-box tip">
  <h4>✅ What to Look For</h4>
  <p>A successful agentic flow shows: (1) the agent's plan in the chat, (2) file creation in your explorer, (3) terminal commands executing, (4) automatic error correction if tests fail.</p>
</div>`
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the primary difference between Copilot's Agent mode and Chat mode?",
        options: [
          "Agent mode is faster at generating code",
          "Agent mode can autonomously plan, execute commands, and iterate on tasks",
          "Chat mode cannot understand natural language",
          "Agent mode only works with Python projects"
        ],
        correct: 1,
        explanation: "Agent mode goes beyond answering questions — it autonomously plans multi-step tasks, runs terminal commands, edits files, and iterates until the task is complete."
      },
      {
        text: "Which VS Code setting enables Copilot's agent mode?",
        options: [
          "copilot.agent.activate",
          "github.copilot.agentMode",
          "chat.agent.enabled",
          "copilot.mode.agent"
        ],
        correct: 2,
        explanation: "The setting 'chat.agent.enabled' in VS Code settings activates the agent mode toggle in the Copilot Chat panel."
      },
      {
        text: "Where should workspace-level Copilot instructions be configured?",
        options: [
          "In your .bashrc file",
          "In the GitHub repository settings page",
          "In .vscode/settings.json at the project root",
          "In the Copilot extension global settings only"
        ],
        correct: 2,
        explanation: "Workspace-level configurations go in .vscode/settings.json, which allows project-specific settings that can be shared across the team."
      },
      {
        text: "You want the Copilot agent to automatically use TypeScript strict mode for all generated code. Which setting achieves this?",
        options: [
          "Set typescript.strict in tsconfig.json only",
          "Add { \"text\": \"Use TypeScript with strict mode enabled\" } to github.copilot.chat.codeGeneration.instructions in .vscode/settings.json",
          "Install the TypeScript Copilot extension",
          "Enable strict mode in the Copilot organization settings"
        ],
        correct: 1,
        explanation: "The codeGeneration.instructions array in .vscode/settings.json passes persistent instructions to the agent for every code generation request. This is how you enforce project-wide coding standards."
      },
      {
        text: "An agent creates a file, runs tests, sees failures, and fixes them without you re-prompting. Which setting enables this self-correction loop?",
        options: [
          "chat.agent.enabled",
          "github.copilot.chat.agent.autoFix",
          "github.copilot.chat.agent.runTasks",
          "chat.agent.selfCorrect"
        ],
        correct: 1,
        explanation: "github.copilot.chat.agent.autoFix enables the agent to detect errors in its output (like failing tests) and automatically attempt to fix them, completing the iterative self-correction loop."
      }
    ]
  }
},

{
  id: 2, workshop: 1,
  title: "Agent Modes: Local, Background & Cloud Execution",
  time: "50 min",
  objectives: [
    "Distinguish between local, background, and cloud agent execution modes",
    "Configure and trigger each mode for different use cases",
    "Understand when to choose each mode for optimal developer workflow",
    "Run a background agent task using GitHub's cloud infrastructure"
  ],
  sections: [
    {
      title: "🔍 Understanding the Three Execution Modes",
      content: `<p>GitHub Copilot agents can operate in three distinct execution environments. Understanding when to use each is critical for efficient development workflows.</p>
<table class="content-table">
  <tr><th>Mode</th><th>Where It Runs</th><th>Best For</th><th>Latency</th></tr>
  <tr><td><strong>Local (Foreground)</strong></td><td>Your VS Code instance</td><td>Interactive development, debugging</td><td>Immediate</td></tr>
  <tr><td><strong>Background</strong></td><td>Your machine, background process</td><td>Long-running tasks while you code</td><td>Minutes</td></tr>
  <tr><td><strong>Cloud (Coding Agent)</strong></td><td>GitHub-hosted environment</td><td>Multi-file refactors, CI-adjacent tasks</td><td>Minutes–hours</td></tr>
</table>`
    },
    {
      title: "🖥️ Local Agent Mode — Deep Dive",
      content: `<p>The <strong>local agent</strong> runs directly inside your VS Code session. It has full access to your workspace, terminal, installed tools, and local environment. This is the default and most interactive mode.</p>
<div class="concept-box tip">
  <h4>✅ When to Use Local Mode</h4>
  <p>Use local mode for: real-time pair programming, debugging sessions, learning new APIs, generating and running tests iteratively, and any task where you want to observe and intervene in real time.</p>
</div>
<h4>Example: Local Agent Building an Express API</h4>
<p>In your Copilot Chat (Agent mode), try this prompt:</p>`,
      codeBlocks: [
        {
          lang: "prompt",
          title: "Local Agent Prompt",
          code: `Create a RESTful Express.js API with the following endpoints:
- GET /api/users — returns a list of users
- POST /api/users — creates a new user
- GET /api/users/:id — returns a single user

Use an in-memory array for storage. Include input validation
with express-validator. Add error handling middleware.
Run the server and test each endpoint with curl.`
        }
      ],
      image: "m2_agent_modes.png"
    },
    {
      title: "🔄 Background Agent Mode — Deep Dive",
      content: `<p>Background agent mode lets Copilot run a long-running task in a background process while you keep coding in the foreground. The agent works autonomously, and you can check its progress or interrupt at any time — it doesn't block your editor.</p>
<div class="concept-box info">
  <h4>💡 When to Use Background Mode</h4>
  <p>Use background mode for tasks that take minutes to complete but don't need your constant supervision: running a full test suite, generating comprehensive docs for a module, doing a large batch rename, or analysing code quality across many files. You stay productive while the agent works.</p>
</div>
<h4>How to Trigger a Background Task in VS Code</h4>
<div class="steps">
  <div class="step">
    <div class="step-num">1</div>
    <div class="step-content">
      <h4>Start a task in Agent Mode</h4>
      <p>Open Copilot Chat in Agent mode (Ctrl+Shift+I → switch to Agent). Type your task prompt. Before pressing Enter, click the <strong>▾</strong> dropdown next to the send button and select <strong>"Run in Background"</strong>.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">2</div>
    <div class="step-content">
      <h4>Monitor via the Background Tasks panel</h4>
      <p>A background task indicator appears in the VS Code status bar. Click it to open the Background Tasks panel and watch progress logs in real time without losing your current editor context.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">3</div>
    <div class="step-content">
      <h4>Review or interrupt</h4>
      <p>You can interrupt a background task at any point. When it completes, VS Code shows a notification with a summary of what changed. Review and accept or reject the edits.</p>
    </div>
  </div>
</div>`,
      codeBlocks: [
        {
          lang: "prompt",
          title: "Example: Background Task — Test Coverage Report",
          code: `[Run in Background]

Analyse the entire /api directory for test coverage gaps.
For every exported function that has no corresponding test,
create a list in a new file: reports/test-coverage-gaps.md

Format each entry as:
- File: <path>
- Function: <name>
- Suggested test: <one-line description of what to test>

Do NOT write tests yet — just produce the report.
I will review and run the actual test-writing in a second pass.`
        }
      ]
    },
    {
      title: "☁️ Cloud Agent (Coding Agent) — Deep Dive",
      content: `<p>The <strong>Cloud Coding Agent</strong> runs in a GitHub-hosted environment. You assign it a GitHub Issue, and it creates a pull request with the implementation — autonomously.</p>
<h4>How to Trigger the Cloud Coding Agent</h4>
<div class="steps">
  <div class="step">
    <div class="step-num">1</div>
    <div class="step-content">
      <h4>Create a Well-Defined GitHub Issue</h4>
      <p>Write a clear, specific issue. The more detail you provide (acceptance criteria, edge cases, file paths), the better the result.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">2</div>
    <div class="step-content">
      <h4>Assign Copilot to the Issue</h4>
      <p>In the issue sidebar, assign <strong>@copilot</strong> as the assignee. The coding agent begins work in a cloud sandbox.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">3</div>
    <div class="step-content">
      <h4>Review the Pull Request</h4>
      <p>When the agent finishes, it opens a PR linked to the issue. Review the code, request changes if needed, and the agent will iterate.</p>
    </div>
  </div>
</div>
<div class="concept-box warning">
  <h4>⚠️ Limitations of Cloud Agent</h4>
  <p>The cloud agent works in a sandboxed container. It cannot access private npm registries, VPNs, or databases that require network access outside of the sandbox. Always check if your task depends on external services before assigning to the cloud agent.</p>
</div>`
    },
    {
      title: "💻 Comparison in Practice",
      content: `<p>Here is a practical comparison showing how the same task would be handled differently in each mode:</p>`,
      codeBlocks: [
        {
          lang: "python",
          title: "Task: Add input validation to an API endpoint",
          code: `# === LOCAL MODE ===
# You open agent mode in VS Code and say:
# "Add request body validation to the POST /users endpoint
#  using Pydantic. Show me the validation errors."
# Agent edits the file, runs the server, tests it — you watch live.

# === CLOUD MODE (via GitHub Issue) ===
# Issue title: "Add Pydantic validation to POST /users"
# Issue body:
# - Validate: name (str, 2-50 chars), email (valid format),
#   age (int, 18-120)
# - Return 422 with detailed error messages for invalid input
# - Add unit tests for all validation cases
# - Update API documentation in docs/api.md
# Assign: @copilot → PR appears in ~10 minutes`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "Which agent mode runs in a GitHub-hosted sandbox environment?",
        options: [
          "Local (Foreground) mode",
          "Background mode",
          "Cloud (Coding Agent) mode",
          "Hybrid mode"
        ],
        correct: 2,
        explanation: "The Cloud Coding Agent runs in GitHub's hosted environment. You assign it issues and it creates pull requests autonomously."
      },
      {
        text: "How do you trigger the Cloud Coding Agent for a task?",
        options: [
          "Use a special VS Code command palette action",
          "Assign @copilot to a GitHub Issue",
          "Push code to a branch named 'copilot-agent'",
          "Send an email to copilot@github.com"
        ],
        correct: 1,
        explanation: "You assign @copilot as the assignee on a GitHub Issue. The coding agent picks it up and opens a PR when it's done."
      },
      {
        text: "What is a key limitation of the Cloud Coding Agent?",
        options: [
          "It can only work with JavaScript projects",
          "It cannot create new files",
          "It cannot access private registries or VPN-only resources",
          "It only works on weekdays"
        ],
        correct: 2,
        explanation: "The cloud agent works in a sandboxed container and cannot access private npm registries, VPNs, or databases that require special network access."
      },
      {
        text: "What is the key advantage of running an agent task in background mode versus foreground mode?",
        options: [
          "Background mode is faster because it uses more CPU",
          "Background mode lets you keep coding while the agent works — it doesn't block your editor",
          "Background mode has access to the internet; foreground does not",
          "Background mode automatically deploys the result"
        ],
        correct: 1,
        explanation: "Background mode decouples the agent's execution from your editor session. You can continue writing code, reviewing PRs, or doing other work while the agent processes a long-running task in the background."
      },
      {
        text: "You ask Copilot (background mode) to analyse 200 files for test coverage gaps and produce a report. It completes after 8 minutes. What should you do next?",
        options: [
          "Nothing — background tasks auto-merge their changes",
          "Restart VS Code to apply the changes",
          "Review the background task output in the Background Tasks panel and accept or reject the changes",
          "The task only runs locally, so no output is produced"
        ],
        correct: 2,
        explanation: "Background tasks don't auto-apply. When they complete, VS Code notifies you and shows the proposed changes. You review the output in the Background Tasks panel and explicitly accept, modify, or reject what the agent produced."
      },
      {
        text: "What is the exact GitHub CLI command to assign Issue #42 to the Copilot Coding Agent?",
        options: [
          "gh issue assign 42 --to copilot",
          "gh issue edit 42 --add-assignee @copilot",
          "gh copilot assign 42",
          "gh issue copilot-assign 42"
        ],
        correct: 1,
        explanation: "The correct command is 'gh issue edit 42 --add-assignee @copilot'. This sets @copilot as the assignee, which triggers the Cloud Coding Agent to begin working on the issue."
      },
      {
        text: "What file in a repository governs an agent's permissions, constraints, and tech stack knowledge?",
        options: [
          ".github/copilot-instructions.md",
          "AGENTS.md",
          ".vscode/settings.json",
          "CONTRIBUTING.md"
        ],
        correct: 1,
        explanation: "AGENTS.md is the agent instruction manifest. It defines what the agent can do (Permissions), what it must not do (Constraints), the Tech Stack it works with, and Code Style requirements — ensuring consistent, safe agent behavior."
      }
    ]
  }
},

{
  id: 3, workshop: 1,
  title: "Coding Agent: From Issue to Pull Request",
  time: "55 min",
  objectives: [
    "Write effective GitHub Issues that the Coding Agent can act on",
    "Understand the Coding Agent's workflow from issue assignment to PR",
    "Review and iterate on Coding Agent pull requests",
    "Build a complete feature using the Coding Agent end-to-end"
  ],
  sections: [
    {
      title: "🔍 The Coding Agent Lifecycle",
      content: `<p>The GitHub Copilot Coding Agent transforms how features are built. Instead of writing code yourself, you describe the desired outcome in a GitHub Issue. The agent reads your codebase, plans the implementation, writes the code, runs tests, and opens a Pull Request. Your role shifts from coder to <strong>reviewer and architect</strong>.</p>
<div class="concept-box info">
  <h4>💡 The New Developer Workflow</h4>
  <p><strong>Traditional:</strong> Write issue → Assign to developer → Developer codes → Developer opens PR → Review → Merge<br>
  <strong>Agentic:</strong> Write issue → Assign to @copilot → Agent codes → Agent opens PR → You review → Iterate or merge</p>
</div>`
    },
    {
      title: "📝 Writing Issues the Agent Understands",
      content: `<p>The quality of the Coding Agent's output directly depends on the quality of your issue. Here's the anatomy of an agent-friendly issue:</p>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: "Example: Well-Structured Agent Issue",
          code: `## Add User Authentication Middleware

### Context
Our Express.js API currently has no authentication.
We need JWT-based auth middleware for protected routes.

### Requirements
- Create middleware/auth.js with JWT verification
- Token should be passed in Authorization: Bearer <token>
- Verify against JWT_SECRET from environment variables
- Return 401 for missing token, 403 for invalid token
- Apply to all /api/* routes except POST /api/auth/login

### Acceptance Criteria
- [ ] middleware/auth.js created and exported
- [ ] Protected routes return 401 without token
- [ ] Protected routes return 403 with invalid token
- [ ] Valid token allows request through with req.user set
- [ ] Unit tests cover all three scenarios
- [ ] No changes to existing test files

### Technical Notes
- Use jsonwebtoken package (already in package.json)
- Follow the existing error response format in utils/errors.js`
        }
      ],
      image: "m3_coding_agent.png"
    },
    {
      title: "💻 Hands-On: Building Auth Middleware with the Coding Agent",
      content: `<p>Let's walk through what the Coding Agent produces from the issue above. Below is an example of the auth middleware it might generate:</p>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "middleware/auth.js — Generated by Coding Agent",
          code: `const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errors');

const authMiddleware = (req, res, next) => {
  // Skip auth for login endpoint
  if (req.path === '/api/auth/login' && req.method === 'POST') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication required', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError('Invalid or expired token', 403);
  }
};

module.exports = authMiddleware;`
        },
        {
          lang: "javascript",
          title: "tests/auth.test.js — Auto-Generated Tests",
          code: `const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('Authentication Middleware', () => {
  const SECRET = process.env.JWT_SECRET || 'test-secret';
  const validToken = jwt.sign(
    { id: 1, email: 'test@test.com' }, SECRET
  );

  it('returns 401 when no token is provided', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
    expect(res.body.message).toContain('Authentication required');
  });

  it('returns 403 when token is invalid', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', 'Bearer invalid-token');
    expect(res.status).toBe(403);
  });

  it('allows access with valid token', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', \`Bearer \${validToken}\`);
    expect(res.status).toBe(200);
  });

  it('skips auth for login endpoint', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'pass' });
    expect(res.status).not.toBe(401);
  });
});`
        }
      ],
      image: "m3_auth_middleware.png"
    },
    {
      title: "🔄 Reviewing and Iterating on Agent PRs",
      content: `<p>When the Coding Agent opens a PR, review it like you would any teammate's code. You can leave comments, request changes, and the agent will update the PR.</p>
<div class="concept-box tip">
  <h4>✅ Effective PR Review Comments for the Agent</h4>
  <p>Be specific in your review comments. Instead of "This looks wrong", write: "The error message on line 15 should include the specific validation field that failed. Update it to include the field name from the error object." The agent responds better to specific, actionable feedback.</p>
</div>`
    },
    {
      title: "🧪 Testing & Validating AI-Generated Code",
      content: `<p>AI-generated code requires the same rigor as human-written code — but with specific patterns to watch for. Agents are prone to particular failure modes that systematic testing can catch before they reach production.</p>
<table class="data-table">
  <thead><tr><th>AI Failure Pattern</th><th>What to Look For</th><th>How to Catch It</th></tr></thead>
  <tbody>
    <tr><td>Happy-path only tests</td><td>Agent writes tests that all pass trivially; no edge cases or error paths</td><td>Check code coverage — aim for &gt;80%. Review test cases for error/null/boundary inputs</td></tr>
    <tr><td>Tautological tests</td><td>Tests that test the mock, not the logic: <code>expect(mock).toHaveBeenCalled()</code></td><td>Require at least 50% of assertions to validate actual output values, not call counts</td></tr>
    <tr><td>Outdated API usage</td><td>Agent uses deprecated SDK methods from training data</td><td>Run tests against actual dependencies; check deprecation warnings in CI</td></tr>
    <tr><td>Security regressions</td><td>Input validation removed; SQL query becomes vulnerable</td><td>Enable CCR with severity threshold "medium"; run SAST tools in CI</td></tr>
    <tr><td>Silent failure modes</td><td>Error caught but not logged; function returns undefined instead of throwing</td><td>Test error paths explicitly; use strict TypeScript — <code>noImplicitAny</code>, <code>strictNullChecks</code></td></tr>
    <tr><td>Race conditions</td><td>Agent writes async code without proper concurrency guards</td><td>Test with concurrent requests; use <code>--detectOpenHandles</code> in Jest</td></tr>
  </tbody>
</table>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "Code Review Checklist for Agent-Generated PRs",
          code: `/**
 * AI-Generated Code Review Checklist
 * Run through each point when reviewing a Copilot Coding Agent PR
 */

const REVIEW_CHECKLIST = {
  security: [
    'Input validation present on all external inputs',
    'No hardcoded secrets, tokens, or credentials',
    'SQL/NoSQL queries use parameterized inputs (not string concat)',
    'Auth checks present on all protected routes',
    'Sensitive data not logged to console'
  ],

  testing: [
    'Tests cover at least 2 error paths (null, invalid input, network failure)',
    'Tests validate output values, not just mock calls',
    'Edge cases included (empty array, zero, max value)',
    'Tests pass independently (no order dependency)'
  ],

  quality: [
    'No unused imports or variables (agent often leaves scaffolding)',
    'Error messages are descriptive and include context',
    'TypeScript types are specific (not "any")',
    'Async functions properly awaited (no floating promises)',
    'Breaking changes are flagged in PR description'
  ],

  architecture: [
    'Change is scoped to the described task (no unasked-for refactors)',
    'New dependencies are justified and audited',
    'Follows existing codebase patterns (naming, structure)',
    'No significant performance regressions (check query plans if DB changed)'
  ]
};

// Before approving a Copilot PR, verify each category above.
// Any unchecked item should become a specific PR review comment for the agent.`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the most important factor in getting good results from the Coding Agent?",
        options: [
          "Using the latest VS Code version",
          "Writing clear, detailed GitHub Issues with acceptance criteria",
          "Having a fast internet connection",
          "Using only Python or JavaScript"
        ],
        correct: 1,
        explanation: "The Coding Agent's output quality is directly proportional to the quality of the input issue. Clear requirements, acceptance criteria, and technical context produce the best results."
      },
      {
        text: "How can you request changes on a Coding Agent's pull request?",
        options: [
          "Close the PR and create a new issue",
          "Leave review comments on the PR — the agent will iterate",
          "Send a Slack message to the Copilot team",
          "Edit the issue title"
        ],
        correct: 1,
        explanation: "You can leave review comments directly on the PR. The Coding Agent reads your feedback and pushes updated commits to address the changes."
      },
      {
        text: "In the agentic workflow, what does the developer's role primarily shift to?",
        options: [
          "Writing more detailed code",
          "Managing CI/CD pipelines",
          "Reviewer and architect",
          "Database administration"
        ],
        correct: 2,
        explanation: "With the Coding Agent handling implementation, developers shift to a reviewer and architect role — defining requirements, reviewing output, and ensuring quality."
      },
      {
        text: "The Coding Agent opened a PR for Issue #17, but you need it to also update the API documentation in docs/api.md. How do you request this?",
        options: [
          "Close the PR and rewrite the issue",
          "Leave a specific PR review comment: 'Please also update docs/api.md with the new endpoint details'",
          "Create a separate new issue for the docs",
          "Edit the AGENTS.md file"
        ],
        correct: 1,
        explanation: "The Coding Agent iterates on PR review comments. A specific, actionable comment ('update docs/api.md with X') is sufficient — the agent reads it and pushes a new commit addressing the feedback."
      },
      {
        text: "After assigning an issue to @copilot, you see it has posted an implementation plan but no code yet. What must you do?",
        options: [
          "Wait 24 hours — it will start automatically",
          "Re-assign the issue",
          "Approve the plan in the issue thread to authorize the agent to begin implementation",
          "Create a new issue"
        ],
        correct: 2,
        explanation: "The Copilot Coding Agent uses a plan-first approach. It posts the implementation plan and waits for human approval before writing any code. You must explicitly approve the plan to proceed."
      }
    ]
  }
},

{
  id: 4, workshop: 1,
  title: "Crafting Effective Agent Prompts & Issue Templates",
  time: "45 min",
  objectives: [
    "Apply prompt engineering principles to agentic workflows",
    "Create reusable GitHub Issue templates for common agent tasks",
    "Understand what makes a prompt effective vs. ineffective for agents",
    "Build a library of templates for your team"
  ],
  sections: [
    {
      title: "🔍 Prompt Engineering for Agents vs. Chat",
      content: `<p>Prompting an <strong>agent</strong> is fundamentally different from prompting a chat model. With a chat, you're asking for information. With an agent, you're delegating a <em>task</em>. This requires a different structure.</p>
<table class="content-table">
  <tr><th>Aspect</th><th>Chat Prompt</th><th>Agent Prompt</th></tr>
  <tr><td>Goal</td><td>Get an answer</td><td>Complete a task</td></tr>
  <tr><td>Structure</td><td>A question</td><td>Requirements + constraints + context</td></tr>
  <tr><td>Output</td><td>Text response</td><td>Code changes, files, executed commands</td></tr>
  <tr><td>Iteration</td><td>Follow-up questions</td><td>Acceptance criteria to self-check</td></tr>
</table>`
    },
    {
      title: "📋 GitHub Issue Template for Agent Tasks",
      content: `<p>Create a <code>.github/ISSUE_TEMPLATE/copilot-task.yml</code> file in your repository to standardize how your team writes issues for the Coding Agent:</p>`,
      codeBlocks: [
        {
          lang: "yaml",
          title: ".github/ISSUE_TEMPLATE/copilot-task.yml",
          code: `name: "Copilot Agent Task"
description: "Task template optimized for the GitHub Copilot Coding Agent"
title: "[Agent] "
labels: ["copilot-agent"]
assignees:
  - copilot
body:
  - type: textarea
    id: context
    attributes:
      label: "Context & Background"
      description: "What does the agent need to know about the codebase?"
      placeholder: "Our API uses Express.js with PostgreSQL..."
    validations:
      required: true
  - type: textarea
    id: requirements
    attributes:
      label: "Requirements"
      description: "List specific, measurable requirements"
      placeholder: |
        - Create a new endpoint GET /api/reports
        - Use the existing Report model in models/report.js
    validations:
      required: true
  - type: textarea
    id: acceptance
    attributes:
      label: "Acceptance Criteria"
      description: "How will we know the task is complete?"
      placeholder: |
        - [ ] Endpoint returns paginated results
        - [ ] Unit tests pass with 90%+ coverage
    validations:
      required: true
  - type: textarea
    id: constraints
    attributes:
      label: "Constraints & Notes"
      description: "Any restrictions or patterns to follow?"
      placeholder: "Do not modify existing migration files..."`
        }
      ],
      image: "m4_issue_template.png"
    },
    {
      title: "❌ vs ✅ Prompt Comparison",
      content: `<div class="concept-box warning">
  <h4>❌ Bad Prompt</h4>
  <p>"Fix the user registration" — This is vague. What's broken? What should change? The agent has no criteria for success.</p>
</div>
<div class="concept-box tip">
  <h4>✅ Good Prompt</h4>
  <p>"The POST /api/register endpoint accepts duplicate email addresses. Add a unique constraint check before creating the user. Return a 409 Conflict with message 'Email already registered' if the email exists. Add a test case for duplicate registration. File: routes/auth.js, line ~45."</p>
</div>
<p>The key differences: <strong>specificity</strong> (exact endpoint, exact behavior), <strong>context</strong> (file location), <strong>acceptance criteria</strong> (expected response code and message), and <strong>scope</strong> (includes test requirement).</p>`
    },
    {
      title: "⚠️ Handling Ambiguous Requirements",
      content: `<p>Real-world issues are rarely perfectly specified. Requirements may be contradictory, incomplete, or make assumptions that aren't true. A well-written agent task anticipates this and either resolves the ambiguity upfront or gives the agent explicit instructions for how to handle uncertainty.</p>
<table class="data-table">
  <thead><tr><th>Ambiguity Type</th><th>Example</th><th>How to Handle in the Issue</th></tr></thead>
  <tbody>
    <tr><td>Missing edge case</td><td>"Add pagination" — but what if there are 0 results?</td><td>Add: "If results are empty, return <code>{"data": [], "total": 0, "page": 1}</code>"</td></tr>
    <tr><td>Conflicting requirements</td><td>"Validate email format" — but existing users have non-standard emails</td><td>Add: "Validate on new registrations only; do NOT validate existing records"</td></tr>
    <tr><td>Missing file location</td><td>"Update the error handler" — which one?</td><td>Add the exact path: "File: middleware/globalErrorHandler.js"</td></tr>
    <tr><td>Unclear scope</td><td>"Improve performance" — of what?</td><td>Scope explicitly: "Optimise the GET /api/users query. Current p95 latency: 800ms. Target: under 200ms"</td></tr>
    <tr><td>Agent needs to choose</td><td>"Add caching" — Redis, in-memory, or CDN?</td><td>State the constraint: "Use the existing Redis client in lib/cache.js. Do not add new dependencies"</td></tr>
  </tbody>
</table>
<div class="concept-box tip">
  <h4>✅ The "Agent Clarification" Pattern</h4>
  <p>For tasks where some decisions genuinely belong to the agent, add this line to your issue:<br><br>
  <em>"If you encounter a decision point not covered by these requirements, choose the approach that best follows the patterns in the existing codebase and document your reasoning in a comment."</em><br><br>
  This prevents the agent from blocking or guessing silently — it will implement and explain.</p>
</div>`,
      codeBlocks: [
        {
          lang: "yaml",
          title: ".github/ISSUE_TEMPLATE/copilot-bugfix.yml — Bug Fix Template",
          code: `name: "Copilot Bug Fix"
description: "Bug fix template for the Copilot Coding Agent"
title: "[Bug Fix] "
labels: ["bug", "copilot-agent"]
assignees:
  - copilot
body:
  - type: textarea
    id: bug_description
    attributes:
      label: "Bug Description"
      description: "What is happening vs what should happen?"
      placeholder: |
        ACTUAL: POST /api/login returns 200 even for invalid passwords
        EXPECTED: Should return 401 with message "Invalid credentials"
    validations:
      required: true
  - type: textarea
    id: reproduction
    attributes:
      label: "Steps to Reproduce"
      placeholder: |
        1. Call POST /api/login with {"email":"a@b.com","password":"wrong"}
        2. Response is 200 OK (should be 401)
    validations:
      required: true
  - type: textarea
    id: root_cause
    attributes:
      label: "Suspected Root Cause & Files"
      placeholder: |
        Likely in: services/authService.js — comparePassword() may not await correctly
        Also check: routes/auth.js around line 40
  - type: textarea
    id: fix_constraints
    attributes:
      label: "Fix Constraints"
      placeholder: |
        - Do NOT change the response schema — just fix the status code
        - Add a regression test for invalid password
        - Do not modify migration files`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the most critical element of an effective agent prompt?",
        options: [
          "Using formal language",
          "Keeping it as short as possible",
          "Specific, measurable acceptance criteria",
          "Including diagrams"
        ],
        correct: 2,
        explanation: "Acceptance criteria give the agent a way to self-verify its work. Without them, the agent doesn't know when the task is truly complete."
      },
      {
        text: "Where should reusable issue templates for the Coding Agent be stored?",
        options: [
          "In a shared Google Doc",
          ".github/ISSUE_TEMPLATE/ directory",
          "In the project's README.md",
          "In the VS Code settings"
        ],
        correct: 1,
        explanation: "GitHub Issue templates live in the .github/ISSUE_TEMPLATE/ directory and are automatically available when creating new issues."
      },
      {
        text: "Your issue template YAML has `assignees: [copilot]`. What does this do?",
        options: [
          "It mentions @copilot in a comment",
          "It automatically assigns every new issue created with this template to the Copilot Coding Agent",
          "It grants Copilot write access to the repository",
          "It adds a copilot label to the issue"
        ],
        correct: 1,
        explanation: "The assignees field in a GitHub Issue template YAML pre-fills the assignee. Setting it to 'copilot' means every issue created from this template is automatically assigned to the Copilot Coding Agent."
      },
      {
        text: "An agent prompt says 'Add validation to the form'. What two critical elements are missing?",
        options: [
          "File path and function name",
          "Specific validation rules/constraints AND acceptance criteria (expected behavior for valid/invalid inputs)",
          "A code example and a screenshot",
          "The programming language and framework"
        ],
        correct: 1,
        explanation: "Without specific rules (what to validate, valid ranges, format requirements) and acceptance criteria (expected HTTP responses, error message format), the agent can't determine what 'done' looks like."
      },
      {
        text: "Which section of a well-structured agent issue prevents it from modifying files outside its scope?",
        options: [
          "Context & Background",
          "Requirements",
          "Constraints & Notes (e.g. 'Do not modify existing migration files')",
          "Acceptance Criteria"
        ],
        correct: 2,
        explanation: "The Constraints & Notes section explicitly tells the agent what it must NOT do. This prevents the agent from accidentally modifying unrelated files or breaking existing behavior."
      }
    ]
  }
},

{
  id: 5, workshop: 1,
  title: "Plan Agent: Architecture & Multi-File Changes",
  time: "55 min",
  objectives: [
    "Use the Plan Agent to architect multi-file changes before coding",
    "Understand how the agent decomposes complex tasks into steps",
    "Review and modify agent-generated plans",
    "Execute a planned refactoring across multiple files"
  ],
  sections: [
    {
      title: "🔍 What is the Plan Agent?",
      content: `<p>The <strong>Plan Agent</strong> is a mode where Copilot first creates a detailed implementation plan before writing any code. This is crucial for complex, multi-file changes where jumping straight to code would lead to inconsistencies.</p>
<p>Think of it as having an architect review your task and create blueprints before construction begins. You can review the plan, adjust it, and only then tell the agent to execute.</p>
<div class="concept-box info">
  <h4>💡 When to Use the Plan Agent</h4>
  <p>Use plan mode for: refactoring that spans 3+ files, adding new features that touch multiple layers (API, service, model, tests), database schema changes, and any task where the order of operations matters.</p>
</div>`
    },
    {
      title: "💻 Plan Agent in Action",
      content: `<p>Let's use the Plan Agent to convert a callback-based Node.js service to async/await:</p>`,
      codeBlocks: [
        {
          lang: "prompt",
          title: "Prompt to Plan Agent",
          code: `#plan Refactor the user service from callbacks to async/await.

Files involved:
- services/userService.js (main service with callbacks)
- controllers/userController.js (calls the service)
- middleware/errorHandler.js (needs to catch async errors)
- tests/user.test.js (update test patterns)

Requirements:
- Convert all callback-based functions to async/await
- Wrap controller methods with asyncHandler utility
- Update error handling to use try/catch
- Ensure all existing tests still pass
- Do NOT change the API response format`
        },
        {
          lang: "markdown",
          title: "Agent's Generated Plan",
          code: `## Implementation Plan

### Step 1: Create asyncHandler utility
- File: utils/asyncHandler.js (NEW)
- Wrap async route handlers to catch promise rejections
- This must be created first as other files depend on it

### Step 2: Refactor userService.js
- Convert getUserById(id, callback) → async getUserById(id)
- Convert createUser(data, callback) → async createUser(data)
- Convert updateUser(id, data, callback) → async updateUser(id, data)
- Replace callback error patterns with thrown errors

### Step 3: Update userController.js
- Import asyncHandler from utils
- Wrap each route handler with asyncHandler()
- Replace service callback usage with await
- Add try/catch for specific error handling

### Step 4: Update errorHandler middleware
- Ensure it catches async errors (will be passed by asyncHandler)
- No structural changes needed, verify compatibility

### Step 5: Update tests
- Convert test callbacks to async/await syntax
- Update mock patterns for async service methods
- Run full test suite to verify

Estimated files changed: 4 modified, 1 new
Risk level: Medium (changes touch core business logic)`
        }
      ],
      image: "m5_plan_agent.png"
    },
    {
      title: "✏️ Modifying & Rejecting Agent Plans",
      content: `<p>Generating a plan is only half the story. In practice, you will often need to modify the plan — change the order of steps, remove a step you want to handle manually, or redirect the agent when its approach is wrong. This is where the feedback loop matters most.</p>
<div class="concept-box info">
  <h4>💡 Three Types of Plan Feedback</h4>
  <p><strong>Approve as-is:</strong> Reply "Looks good, proceed with implementation"<br>
  <strong>Approve with changes:</strong> Reply with specific modifications before approving<br>
  <strong>Reject and redirect:</strong> Reply explaining why the approach is wrong and what to do instead</p>
</div>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: "Scenario: Modifying a Plan Before Execution",
          code: `## Agent's Generated Plan (Step 2 is wrong)

### Step 1: Create asyncHandler utility ✅
### Step 2: Refactor userService.js AND orderService.js ❌ (too broad)
### Step 3: Update controllers ✅
### Step 4: Update error middleware ✅
### Step 5: Update tests ✅

---

## Your Reply to the Agent:

"Before proceeding, I want to modify the plan:

- Step 2: ONLY refactor userService.js in this PR.
  orderService.js will be handled in a separate issue to
  keep this PR reviewable. Remove orderService from scope.

- Step 3: Also update userController.js only (not orderController).

- Add a new Step 2b: Run the existing test suite after Step 2
  to confirm nothing is broken before touching the controllers.

Updated plan looks good otherwise — proceed with implementation."

---

## Result:
The agent respects the scope change and proceeds with
only the files you specified. Step 2b is added to the
execution sequence.`
        },
        {
          lang: "markdown",
          title: "Scenario: Rejecting a Plan and Redirecting",
          code: `## Agent's Plan (fundamentally wrong approach)

### Step 1: Install new dependency 'bluebird' for Promise utilities
### Step 2: Replace all native Promises with Bluebird Promises
### Step 3: Convert callbacks using Bluebird.promisify()

---

## Your Rejection and Redirect:

"❌ Reject this plan.

Reason: We do not add new npm dependencies without
architectural review. Bluebird is unnecessary here.
Node.js 18+ has full native async/await support.

Please generate a new plan that:
1. Uses native async/await ONLY — no new libraries
2. Uses util.promisify() (built-in Node.js) where
   promisification is needed
3. Follows the asyncHandler pattern already used in
   middleware/errorHandler.js

Generate a revised plan."

---

## What happens next:
Agent generates a completely new plan following your
constraints, using only native Node.js patterns.
No Bluebird, no new dependency.`
        }
      ]
    },
    {
      title: "🛠️ Hands-On Example: asyncHandler Utility",
      content: `<p>Here's the utility the Plan Agent creates in Step 1. This is a common pattern in Express.js applications:</p>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "utils/asyncHandler.js",
          code: `/**
 * Wraps an async Express route handler to catch errors
 * and forward them to the error handling middleware.
 *
 * Usage: router.get('/users', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;`
        },
        {
          lang: "python",
          title: "Python Equivalent: Async Error Handling (FastAPI)",
          code: `from fastapi import FastAPI, HTTPException
from functools import wraps
import logging

logger = logging.getLogger(__name__)

def handle_errors(func):
    """Decorator to catch and log async errors in route handlers."""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except HTTPException:
            raise  # Let FastAPI handle HTTP exceptions
        except Exception as e:
            logger.error(f"Unhandled error in {func.__name__}: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")
    return wrapper

app = FastAPI()

@app.get("/users/{user_id}")
@handle_errors
async def get_user(user_id: int):
    user = await user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the primary advantage of using the Plan Agent before coding?",
        options: [
          "It makes the code run faster",
          "It creates a reviewable plan for multi-file changes before execution",
          "It automatically deploys the changes",
          "It doesn't require any prompting"
        ],
        correct: 1,
        explanation: "The Plan Agent creates a structured implementation plan that you can review and modify before any code is written, reducing errors in complex multi-file changes."
      },
      {
        text: "In the asyncHandler pattern, why do we wrap the async function?",
        options: [
          "To make it run synchronously",
          "To catch rejected promises and pass errors to Express error middleware",
          "To improve performance",
          "To enable TypeScript support"
        ],
        correct: 1,
        explanation: "Express doesn't natively catch errors in async route handlers. asyncHandler catches rejected promises and forwards them to the error-handling middleware via next()."
      },
      {
        text: "What prefix triggers the Plan Agent mode in Copilot Chat?",
        options: [
          "/plan",
          "#plan",
          "@plan",
          "!plan"
        ],
        correct: 1,
        explanation: "#plan at the start of your Copilot Chat message activates Plan Agent mode. The agent generates a step-by-step implementation plan that you review and approve before any code is written."
      },
      {
        text: "A Plan Agent output shows Step 1 creates utils/asyncHandler.js and Step 3 imports it. Why is this ordering critical?",
        options: [
          "It isn't — steps can be executed in any order",
          "Dependencies must be created before the files that import them; reversing would cause import errors",
          "The agent always starts with utility files for performance reasons",
          "Alphabetical order is required"
        ],
        correct: 1,
        explanation: "In multi-file changes, execution order matters. Files that are imported by other files must be created first. The Plan Agent intelligently sequences steps to avoid broken imports or missing dependencies."
      },
      {
        text: "You're using the Plan Agent to extract a microservice from a monolith. What should your prompt include?",
        options: [
          "Just the name of the microservice",
          "#plan prefix, list of affected files, current dependencies, desired API contract, and constraints like 'maintain backward compatibility'",
          "A one-line description of the desired outcome",
          "The production database credentials"
        ],
        correct: 1,
        explanation: "For complex architectural tasks, the Plan Agent needs: scope (#plan), affected files, dependency graph, API contracts, and explicit constraints. Richer context produces a more accurate, safer implementation plan."
      }
    ]
  }
},

{
  id: 6, workshop: 1,
  title: "Copilot Code Review (CCR): Automated PR Reviews",
  time: "50 min",
  objectives: [
    "Enable and configure Copilot Code Review on your repository",
    "Understand the types of feedback CCR provides",
    "Set up custom review instructions tailored to your codebase",
    "Integrate CCR into your team's pull request workflow"
  ],
  sections: [
    {
      title: "🔍 What is Copilot Code Review?",
      content: `<p><strong>Copilot Code Review (CCR)</strong> is GitHub's AI-powered pull request reviewer. When enabled, it automatically analyzes PRs for bugs, security issues, performance problems, and style violations — just like a human reviewer, but instant.</p>
<p>CCR can be triggered automatically on every PR, or manually by requesting a review from <code>@copilot</code> on a specific PR. It leaves inline comments on specific lines of code, just like a human reviewer.</p>
<div class="concept-box info">
  <h4>💡 Key Benefits</h4>
  <p>CCR catches issues before human reviewers spend time on them: null pointer risks, SQL injection vectors, unhandled promise rejections, missing input validation, and inconsistent error handling patterns. This lets human reviewers focus on architecture and business logic.</p>
</div>`
    },
    {
      title: "⚙️ Setting Up CCR",
      content: `<div class="steps">
  <div class="step">
    <div class="step-num">1</div>
    <div class="step-content">
      <h4>Enable in Repository Settings</h4>
      <p>Go to your repository → Settings → Code Security and Analysis → Enable Copilot Code Review. Choose "Automatic" to review every PR or "Manual" for on-demand reviews.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">2</div>
    <div class="step-content">
      <h4>Create Custom Review Instructions</h4>
      <p>Add a <code>.github/copilot-review-instructions.md</code> file to teach CCR your team's specific patterns and standards.</p>
    </div>
  </div>
  <div class="step">
    <div class="step-num">3</div>
    <div class="step-content">
      <h4>Configure Review Scope</h4>
      <p>Use a <code>.github/copilot-review-config.yml</code> to specify which files to include/exclude and which review categories to prioritize.</p>
    </div>
  </div>
</div>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: ".github/copilot-review-instructions.md",
          code: `# Code Review Instructions for Copilot

## Security
- Flag any SQL queries not using parameterized statements
- Check for hardcoded secrets or API keys
- Verify all user input is sanitized before use

## Error Handling
- All async functions must use try/catch
- API endpoints must return appropriate HTTP status codes
- Never expose stack traces in production responses

## Style
- Functions must not exceed 30 lines
- Use early returns to reduce nesting
- All public functions require JSDoc comments`
        }
      ],
      image: "m6_code_review.png"
    },
    {
      title: "🔬 Deterministic Detections: LLM + CodeQL + ESLint",
      content: `<p>CCR's most powerful feature is <strong>Deterministic Detection</strong> — blending LLM reasoning with static analysis tools (CodeQL and ESLint) to produce findings with <em>zero false positives</em>. Unlike pure LLM review which may hallucinate, deterministic detections are backed by proven static analysis engines.</p>
<table class="content-table">
  <thead><tr><th>Detection Layer</th><th>Tool</th><th>Example Finding</th></tr></thead>
  <tbody>
    <tr><td>Security Vulnerabilities</td><td>CodeQL</td><td>SQL injection, path traversal, XSS vectors</td></tr>
    <tr><td>Code Style Violations</td><td>ESLint</td><td>Unused variables, missing semicolons, complexity</td></tr>
    <tr><td>Logic &amp; Context</td><td>LLM</td><td>"This function ignores the DB error on line 12"</td></tr>
    <tr><td>Custom Rules</td><td>Your config</td><td>Team patterns from copilot-review-instructions.md</td></tr>
  </tbody>
</table>
<div class="concept-box info">
  <h4>💡 The Agent Handoff Pattern in PRs</h4>
  <p>When CCR leaves a comment, you can respond with <code>@copilot fix this</code> in the PR thread. The Coding Agent reads the comment, understands the finding, and pushes a new commit to fix it — without you leaving GitHub. CCR identifies the issue, you authorize, the Coding Agent applies the fix.</p>
</div>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: "PR Comment — Triggering the Handoff Pattern",
          code: `<!-- CCR leaves this comment on line 14 of routes/users.js -->
Warning: SQL Injection Risk (CodeQL CWE-89)
The query concatenates user input directly.
An attacker could execute: name='; DROP TABLE users; --

Suggested fix:
  const users = await db.query(
    'SELECT * FROM users WHERE name = $1',
    [req.query.name]
  );

<!-- Developer replies: -->
@copilot fix this

<!-- Coding Agent pushes commit: -->
<!-- fix: use parameterized query to prevent SQL injection (CWE-89) -->`
        },
        {
          lang: "yaml",
          title: ".github/copilot-review-config.yml — Automatic Rulesets",
          code: `review:
  automatic: true
  branches:
    - "main"
    - "release/**"
  required_passing: true
  severity_threshold: "high"

context_files:
  - "docs/architecture.md"
  - "docs/security-standards.md"

exclude_patterns:
  - "*.generated.ts"
  - "vendor/**"
  - "dist/**"`
        }
      ]
    },
    {
      title: "💻 Example: What CCR Catches",
      content: `<p>Here's an example of code that CCR would flag, and its suggested fix:</p>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "Code with issues (CCR flags these)",
          code: `// ❌ CCR flags: SQL injection vulnerability
app.get('/users', async (req, res) => {
  const name = req.query.name;
  const users = await db.query(
    \`SELECT * FROM users WHERE name = '\${name}'\`
  );
  // ❌ CCR flags: Unhandled case when users is empty
  res.json(users.rows);
});

// ✅ CCR suggested fix:
app.get('/users', async (req, res) => {
  const name = req.query.name;
  const users = await db.query(
    'SELECT * FROM users WHERE name = $1',
    [name]  // Parameterized query prevents SQL injection
  );
  res.json(users.rows || []);  // Handle empty results
});`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "How is Copilot Code Review triggered on a pull request?",
        options: [
          "It only works when you push to the main branch",
          "Automatically on every PR (if configured) or by requesting @copilot as reviewer",
          "By running a CLI command locally",
          "By adding a 'review' label to the PR"
        ],
        correct: 1,
        explanation: "CCR can be set to automatic (reviews every PR) or manual (you request @copilot as a reviewer on specific PRs)."
      },
      {
        text: "Where do you customize CCR's review criteria for your team?",
        options: [
          "VS Code settings",
          ".github/copilot-review-instructions.md",
          "GitHub organization admin panel",
          "Copilot mobile app"
        ],
        correct: 1,
        explanation: "Custom review instructions go in .github/copilot-review-instructions.md. CCR reads this file to understand your team's specific coding standards and patterns."
      },
      {
        text: "What is 'Deterministic Detection' in Copilot Code Review?",
        options: [
          "CCR that only runs on deterministic (non-async) functions",
          "Blending LLM reasoning with CodeQL and ESLint to produce zero-false-positive security findings",
          "A review mode that always gives the same suggestions",
          "A feature that detects duplicate code"
        ],
        correct: 1,
        explanation: "Deterministic Detection combines LLM contextual understanding with CodeQL static analysis and ESLint rules. Because it's backed by proven engines, these findings have zero false positives — unlike pure LLM review."
      },
      {
        text: "A CCR comment flags a SQL injection on line 22. You reply '@copilot fix this' in the PR. What happens next?",
        options: [
          "CCR re-runs and marks the issue as resolved",
          "The Copilot Coding Agent pushes a new commit fixing the injection vulnerability",
          "An email is sent to the repository admin",
          "Nothing — @copilot only works in issue comments"
        ],
        correct: 1,
        explanation: "This is the Agent Handoff Pattern. @copilot in a PR comment delegates the fix to the Copilot Coding Agent, which reads the finding, implements the fix, and pushes a new commit without leaving GitHub."
      },
      {
        text: "You want CCR to block merging to 'main' if it finds any HIGH severity issue. Where is this configured?",
        options: [
          ".github/copilot-review-instructions.md",
          ".github/copilot-review-config.yml with required_passing: true and severity_threshold: high",
          "Repository Settings → Branches → merge restrictions",
          "The AGENTS.md file"
        ],
        correct: 1,
        explanation: "Automatic Code Review rulesets are configured in .github/copilot-review-config.yml. Setting required_passing: true and severity_threshold: 'high' blocks merges when CCR finds high or critical issues."
      },
      {
        text: "You want CCR to understand your team's security standards doc when reviewing. What do you add to the review request?",
        options: [
          "Upload the doc to GitHub Pages",
          "Reference the file using # in the PR comment: '#file:docs/security-standards.md please review with this context'",
          "Paste the entire doc into the PR description",
          "Add the doc path to .gitignore"
        ],
        correct: 1,
        explanation: "Using the # symbol in Copilot comments attaches specific files as context. The reviewer uses the current file content when analyzing the PR, giving you context-aware security reviews."
      }
    ]
  }
},

{
  id: 7, workshop: 1,
  title: "Agent-Assisted PR Summaries & Documentation",
  time: "40 min",
  objectives: [
    "Generate comprehensive PR summaries using Copilot",
    "Auto-generate changelog entries from pull requests",
    "Create developer documentation with agent assistance",
    "Debug and validate AI-generated documentation quality"
  ],
  sections: [
    {
      title: "🔍 Why Agent-Generated Documentation Matters",
      content: `<p>One of the biggest productivity gains from agentic AI is automatic documentation. Every PR should have a clear summary of what changed and why. Copilot can generate these instantly from the diff, saving developers from one of the most dreaded tasks.</p>
<div class="concept-box info">
  <h4>💡 What Good Documentation Looks Like</h4>
  <p><strong>Agent-generated (good):</strong> "Adds JWT refresh token rotation — when a token is used, it is immediately invalidated and a new one issued. Prevents replay attacks. Affects <code>auth/token.service.ts</code> and <code>auth/middleware.ts</code>. Breaking change: clients must store the new token from each response."<br><br>
  <strong>Developer-written (common reality):</strong> "Fixed auth stuff"</p>
</div>`
    },
    {
      title: "💻 Generating PR Summaries",
      content: `<p>When you open a PR, you can use Copilot to generate a comprehensive summary. Here's a GitHub Action that automatically fetches the diff, calls the Copilot API, and posts the summary as a PR comment:</p>`,
      codeBlocks: [
        {
          lang: "yaml",
          title: ".github/workflows/pr-summary.yml",
          code: `name: Auto PR Summary
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  summarize:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Generate PR Summary
        uses: actions/github-script@v7
        env:
          COPILOT_TOKEN: \${{ secrets.COPILOT_API_TOKEN }}
        with:
          script: |
            // Fetch the PR diff
            const { data: diff } = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.payload.pull_request.number,
              mediaType: { format: 'diff' }
            });

            // Call Copilot API to summarize
            const response = await fetch(
              'https://api.githubcopilot.com/chat/completions',
              {
                method: 'POST',
                headers: {
                  'Authorization': \`Bearer \${process.env.COPILOT_TOKEN}\`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  model: 'gpt-4o',
                  messages: [{
                    role: 'system',
                    content: 'You are a technical writer. Given a git diff, write a concise PR summary covering: what changed, why it matters, breaking changes (if any), and files affected. Use markdown.'
                  }, {
                    role: 'user',
                    content: \`Summarize this diff:\\n\\n\${diff.substring(0, 6000)}\`
                  }]
                })
              }
            );
            const result = await response.json();
            const summary = result.choices[0].message.content;

            // Post as a PR comment
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: \`## 🤖 Copilot PR Summary\\n\\n\${summary}\\n\\n---\\n_Generated by GitHub Copilot. Review for accuracy._\`
            });`
        },
        {
          lang: "javascript",
          title: "scripts/generate-changelog.js",
          code: `// Generate changelog entry from merged PRs
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
    const entry = \`- \${pr.title} (#\${pr.number})\`;

    if (labels.includes('feature')) categories.features.push(entry);
    else if (labels.includes('bug')) categories.fixes.push(entry);
    else if (labels.includes('docs')) categories.docs.push(entry);
    else categories.refactor.push(entry);
  }

  return formatChangelog(categories);
}

module.exports = { generateChangelog };`
        }
      ],
      image: "m7_pr_summary.png"
    },
    {
      title: "🐛 Debugging Poor Documentation Quality",
      content: `<p>AI-generated documentation can hallucinate, omit critical details, or mischaracterize changes. Knowing how to diagnose and fix poor output is an essential engineering skill.</p>
<table class="data-table">
  <thead><tr><th>Symptom</th><th>Root Cause</th><th>Fix</th></tr></thead>
  <tbody>
    <tr><td>Summary describes deleted feature as "added"</td><td>Diff too large — context window truncated</td><td>Limit diff to 6,000 chars; split large PRs</td></tr>
    <tr><td>Generic summary: "Updated auth service"</td><td>No system prompt — LLM has no instructions</td><td>Add structured system prompt specifying output format</td></tr>
    <tr><td>Missing breaking change warning</td><td>No breaking-change signal in commits/labels</td><td>Enforce conventional commits: <code>feat!:</code> or label <code>breaking-change</code></td></tr>
    <tr><td>Confidential internals exposed in comment</td><td>Diff includes secrets or sensitive paths</td><td>Pre-process diff: strip <code>*.env</code>, <code>secrets/**</code> before sending</td></tr>
    <tr><td>Wrong file names cited</td><td>LLM hallucination — model invented plausible paths</td><td>Validate cited file paths against actual diff before posting</td></tr>
  </tbody>
</table>
<div class="concept-box tip">
  <h4>✅ Validation Pattern</h4>
  <p>Before posting AI-generated content as a PR comment, always validate:<br>
  1. Extract file paths mentioned in the summary<br>
  2. Cross-reference against actual changed files in the diff<br>
  3. Flag or strip any path that doesn't appear in the diff<br>
  This prevents hallucinated file references from misleading reviewers.</p>
</div>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "scripts/validate-summary.js — Hallucination Guard",
          code: `// Validate AI-generated PR summary against actual diff
function validateSummary(summary, changedFiles) {
  // Extract file paths mentioned in summary (common patterns)
  const mentionedFiles = summary.match(/[\w/.-]+\\.(?:ts|js|py|go|java|yml|json)/g) || [];

  const hallucinated = mentionedFiles.filter(
    f => !changedFiles.some(real => real.endsWith(f) || f.endsWith(real))
  );

  if (hallucinated.length > 0) {
    console.warn('⚠️ Potential hallucination — files mentioned but not in diff:', hallucinated);
    // Append disclaimer to the posted comment
    return summary + \`\\n\\n> ⚠️ **Note:** AI may have referenced files not in this diff. Verify: \${hallucinated.join(', ')}\`;
  }

  return summary;
}

// Usage in the workflow
const changedFiles = context.payload.pull_request.changed_files_list;
const validatedSummary = validateSummary(rawSummary, changedFiles);`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the main benefit of agent-generated PR summaries?",
        options: [
          "They make PRs merge faster automatically",
          "They provide consistent, comprehensive documentation of changes with minimal developer effort",
          "They replace the need for human code review",
          "They automatically fix bugs in the code"
        ],
        correct: 1,
        explanation: "Agent-generated summaries ensure every PR has clear documentation of what changed and why, saving developers time on one of their most dreaded tasks."
      },
      {
        text: "How can PR labels be useful in an automated documentation workflow?",
        options: [
          "They change the color of the PR in the GitHub UI",
          "They categorize PRs for automated changelog generation (features, fixes, docs)",
          "They determine who can approve the PR",
          "They set the PR's deployment environment"
        ],
        correct: 1,
        explanation: "Labels like 'feature', 'bug', and 'docs' allow automated scripts to categorize changes into structured changelog entries."
      },
      {
        text: "You want Copilot to generate a PR description that references your architecture docs. What is the most effective approach?",
        options: [
          "Ask Copilot to 'write a PR description'",
          "Use '@github summarize this PR and reference #file:docs/architecture.md for context'",
          "Copy-paste the architecture doc into the PR body manually",
          "Add the doc as a PR attachment"
        ],
        correct: 1,
        explanation: "Combining @github (for repo context like the diff) with #file: (to attach specific docs) gives Copilot everything it needs to generate a PR description that references your actual architecture decisions."
      },
      {
        text: "A developer says Copilot's auto-generated CHANGELOG entry is inaccurate. What is the most likely root cause?",
        options: [
          "Copilot doesn't support CHANGELOG generation",
          "The PR had no labels, vague commit messages, and no linked issue — Copilot had insufficient context",
          "The CHANGELOG.md file was too large",
          "The developer used the wrong branch"
        ],
        correct: 1,
        explanation: "CHANGELOG generation quality depends on context signals: PR labels, conventional commit messages, linked issues, and PR description. Without these, Copilot cannot accurately categorize or describe the change."
      },
      {
        text: "Where should the PR description template be stored so Copilot can use it as a starting structure?",
        options: [
          ".github/PR_TEMPLATE.txt",
          ".github/pull_request_template.md",
          "docs/pr-template.md",
          ".vscode/pr-template.md"
        ],
        correct: 1,
        explanation: ".github/pull_request_template.md is automatically loaded by GitHub when creating a new PR. Copilot can reference its structure to ensure consistent, complete PR descriptions."
      }
    ]
  }
},

{
  id: 8, workshop: 1,
  title: "Agent Handoff & Multi-Agent Collaboration",
  time: "50 min",
  objectives: [
    "Understand the concept of agent handoff in complex workflows",
    "Design multi-step tasks that chain multiple agent interactions",
    "Implement a handoff pattern from Coding Agent to Code Review",
    "Build a complete CI/CD-integrated agent workflow"
  ],
  sections: [
    {
      title: "🔍 What is Agent Handoff?",
      content: `<p><strong>Agent Handoff</strong> is a pattern where one AI agent completes its task and passes the output to another agent for the next step. Think of it like an assembly line: the Coding Agent builds the feature, then the Code Review agent reviews it, then a documentation agent updates the docs.</p>
<div class="concept-box info">
  <h4>💡 Common Handoff Chains</h4>
  <p><strong>Feature Development:</strong> Issue → Coding Agent → PR → Code Review Agent → Merge → Changelog Agent<br>
  <strong>Bug Fix:</strong> Bug Report → Coding Agent (fix) → Test Agent (verify) → Code Review → Merge<br>
  <strong>Refactoring:</strong> Plan Agent → Coding Agent (execute) → Code Review → Documentation Agent</p>
</div>`
    },
    {
      title: "💻 Implementing Agent Handoff with GitHub Actions",
      content: `<p>Here's a complete, production-ready GitHub Actions workflow that implements an agent handoff chain. Note how each job explicitly sets outputs so the next job can consume them — this is the contract between agents:</p>`,
      codeBlocks: [
        {
          lang: "yaml",
          title: ".github/workflows/agent-pipeline.yml",
          code: `name: Agent Pipeline
on:
  issues:
    types: [assigned]

jobs:
  # Step 1: Wait for Coding Agent to create a PR
  wait-for-pr:
    if: contains(github.event.issue.assignees.*.login, 'copilot')
    runs-on: ubuntu-latest
    outputs:
      pr_number: \${{ steps.find-pr.outputs.pr_number }}   # ← sets output
    steps:
      - name: Wait for Coding Agent PR
        id: find-pr
        uses: actions/github-script@v7
        with:
          script: |
            const issueNum = context.issue.number;
            let prNumber = null;

            // Poll up to 30 minutes (30 × 60s intervals)
            for (let attempt = 0; attempt < 30; attempt++) {
              const { data: prs } = await github.rest.pulls.list({
                owner: context.repo.owner,
                repo: context.repo.repo,
                state: 'open',
                head: \`\${context.repo.owner}:copilot/issue-\${issueNum}\`
              });
              if (prs.length > 0) {
                prNumber = prs[0].number;
                console.log(\`✅ Copilot PR found: #\${prNumber}\`);
                break;
              }
              console.log(\`⏳ Attempt \${attempt + 1}/30 — no PR yet, waiting 60s...\`);
              await new Promise(r => setTimeout(r, 60000));
            }

            if (!prNumber) {
              core.setFailed('❌ Coding Agent did not create a PR within 30 minutes');
              return;
            }

            // Expose as job output for downstream jobs
            core.setOutput('pr_number', String(prNumber));

  # Step 2: Request Copilot Code Review on the PR
  request-review:
    needs: wait-for-pr
    runs-on: ubuntu-latest
    steps:
      - name: Request CCR
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = Number('\${{ needs.wait-for-pr.outputs.pr_number }}');
            await github.rest.pulls.requestReviewers({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: prNumber,
              reviewers: ['copilot']
            });
            console.log(\`✅ CCR requested on PR #\${prNumber}\`);

  # Step 3: Label PR based on CCR outcome (human merges manually)
  label-pr:
    needs: [wait-for-pr, request-review]
    runs-on: ubuntu-latest
    steps:
      - name: Add 'awaiting-review' label
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = Number('\${{ needs.wait-for-pr.outputs.pr_number }}');
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber,
              labels: ['copilot-generated', 'awaiting-review']
            });
            // Post status comment
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber,
              body: '🤖 **Agent Pipeline Complete**\\n\\nCopilot has implemented this issue and CCR review is in progress. A human reviewer must approve before merging.'
            });`
        }
      ],
      image: "m8_agent_handoff.png"
    },
    {
      title: "🚨 Error Handling & Failure Recovery",
      content: `<p>Agentic workflows fail. Networks time out, the Coding Agent misunderstands requirements, CCR blocks a PR, or the agent silently produces incomplete code. You must build recovery strategies into every pipeline.</p>
<table class="data-table">
  <thead><tr><th>Failure Mode</th><th>Detection Signal</th><th>Recovery Strategy</th></tr></thead>
  <tbody>
    <tr><td>Agent doesn't create PR in time</td><td>Polling loop exhausted (30 attempts)</td><td><code>core.setFailed()</code> → creates GitHub Actions failure notification; re-assign issue</td></tr>
    <tr><td>Agent creates PR but tests fail</td><td>CI status checks red on PR</td><td>Post <code>@copilot the tests are failing, please fix</code> comment → triggers another agent iteration</td></tr>
    <tr><td>CCR blocks PR with severity:high</td><td>CCR posts blocking review</td><td>Post <code>@copilot fix this</code> in the CCR comment (Agent Handoff Pattern)</td></tr>
    <tr><td>Agent opens PR to wrong base branch</td><td>PR targets <code>main</code> instead of feature branch</td><td>Close PR, reopen issue with explicit base branch constraint in AGENTS.md</td></tr>
    <tr><td>Agent loops on same error</td><td>3+ identical commits in PR history</td><td>Add <code>max_iterations: 3</code> to AGENTS.md; escalate to human</td></tr>
  </tbody>
</table>`,
      codeBlocks: [
        {
          lang: "yaml",
          title: "AGENTS.md — Failure & Loop Prevention",
          code: `# AGENTS.md for payments-service

## Failure Handling
- If tests fail after 3 fix attempts, stop and comment: "I need human guidance on [specific error]"
- Never delete tests to make them pass
- If you cannot find a file you expect to exist, comment and halt — do not create placeholder files

## Loop Prevention
- Maximum 3 iterations on the same failing test
- Maximum 5 total commits per issue assignment
- If you exceed these limits, post a summary of what you tried and request human review

## Escalation Protocol
When you cannot proceed, post this format:
\`\`\`
🛑 **Agent Blocked**
- **Task**: [what you were trying to do]
- **Blocker**: [specific error or ambiguity]
- **Attempts**: [what you tried]
- **Needs**: [what human input would unblock this]
\`\`\``
        }
      ]
    },
    {
      title: "🔭 Debugging Agentic Workflows",
      content: `<p>When an agent behaves unexpectedly, you need a systematic debugging approach. Unlike traditional code, the "bug" may be in the instructions, the context provided, or the agent's interpretation — not in the code itself.</p>
<div class="concept-box info">
  <h4>💡 Debugging Checklist</h4>
  <p><strong>1. Read the agent's session log</strong> — In VS Code Agent Mode, expand the tool calls in the chat panel. Every file read, command run, and edit attempt is logged.<br><br>
  <strong>2. Check what context the agent had</strong> — Did it read the right files? In the Coding Agent, check the PR's "Copilot Session" tab to see exactly which files were in context.<br><br>
  <strong>3. Look for the first wrong decision</strong> — Agents cascade errors. Find the earliest point where the agent's reasoning diverged from your intent.<br><br>
  <strong>4. Test your AGENTS.md instruction</strong> — Ask the agent directly: "Given your AGENTS.md, how would you approach [problem]?" Its answer reveals how it's interpreting your instructions.<br><br>
  <strong>5. Reduce scope and retry</strong> — If the agent fails a complex task, break it into smaller issues. Each issue should be completable in ~20 minutes with a focused scope.</p>
</div>`,
      codeBlocks: [
        {
          lang: "bash",
          title: "Inspecting Coding Agent Activity via GitHub CLI",
          code: `# List all PRs created by Copilot in the last 30 days
gh pr list --author "app/github-copilot" --state all --json number,title,createdAt,state

# View the commits in a Copilot PR to trace agent decisions
gh pr view 42 --json commits --jq '.commits[] | {sha: .oid[0:7], msg: .messageHeadline}'

# See the exact files changed by the agent
gh pr diff 42 --name-only

# View PR review comments (CCR findings the agent needed to fix)
gh api repos/{owner}/{repo}/pulls/42/comments --jq '.[] | {file: .path, line: .line, body: .body[0:100]}'

# Check if agent is currently working on an issue
gh issue view 18 --json assignees,comments --jq '{assignees: [.assignees[].login], last_comment: .comments[-1].body[0:200]}'`
        }
      ]
    },
    {
      title: "🛠️ Hands-On: Design Your Own Handoff Chain",
      content: `<p>Think about your team's workflow. Where could agent handoffs save time? Consider mapping out a chain for one of these scenarios:</p>
<div class="concept-box tip">
  <h4>Exercise: Map Your Handoff Chain</h4>
  <p>1. Pick a repetitive task your team does weekly<br>
  2. Break it into distinct steps (each step = one agent's task)<br>
  3. Define the input/output contract between each step (what does each job's <code>outputs:</code> produce?)<br>
  4. Identify which steps need human approval vs. full automation<br>
  5. Write the GitHub Issue that would trigger the chain<br>
  6. Add failure handling: what happens if step 2 fails? Can step 3 still run?</p>
</div>`
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is agent handoff?",
        options: [
          "When an agent crashes and restarts",
          "When one agent's output becomes the input for the next agent in a chain",
          "When you switch from using Copilot to using ChatGPT",
          "When the agent saves its state to disk"
        ],
        correct: 1,
        explanation: "Agent handoff is a pattern where one agent completes its task and passes the output to the next agent — creating an automated pipeline of AI-powered steps."
      },
      {
        text: "In the Feature Development handoff chain, what is the typical order?",
        options: [
          "Code Review → Coding Agent → Merge → Documentation",
          "Documentation → Issue → Coding Agent → Review",
          "Issue → Coding Agent → PR → Code Review → Merge → Changelog",
          "Coding Agent → Issue → Deploy → Review"
        ],
        correct: 2,
        explanation: "The standard handoff chain flows: Issue (input) → Coding Agent (implementation) → PR → Code Review (quality check) → Merge → Changelog (documentation)."
      },
      {
        text: "You have a Security Auditor agent that finds a vulnerability. How does it hand off the fix to the Coding Agent?",
        options: [
          "It emails the Coding Agent",
          "It posts a GitHub Issue or PR comment tagging @copilot with the specific finding, which the Coding Agent picks up",
          "It directly modifies the Coding Agent's instructions",
          "It commits a fix directly to main"
        ],
        correct: 1,
        explanation: "Agent handoff in GitHub happens through issues and PR comments. The auditor posts a structured finding (severity, file, line, description) and tags @copilot. The Coding Agent reads the comment and pushes a fix."
      },
      {
        text: "In a multi-agent AGENTS.md, why is it essential to define explicit Permissions for each specialized agent?",
        options: [
          "To improve performance",
          "To prevent agents from accidentally modifying each other's domains or overstepping their scope",
          "GitHub requires it for billing purposes",
          "It's optional — agents scope themselves automatically"
        ],
        correct: 1,
        explanation: "In multi-agent setups, agents could overlap. A Security Auditor should only read files (not write), while the Coding Agent has write permissions. Explicit Permissions in AGENTS.md prevent dangerous cross-domain modifications."
      },
      {
        text: "Which GitHub feature enables you to build a fully automated agent pipeline that triggers when an issue is assigned to @copilot?",
        options: [
          "GitHub Codespaces",
          "GitHub Actions with the issues: [assigned] trigger event",
          "GitHub Pages",
          "GitHub Packages"
        ],
        correct: 1,
        explanation: "A GitHub Actions workflow with `on: issues: types: [assigned]` triggers when any issue is assigned. Combined with a check for @copilot as assignee, this creates the entry point for a fully automated agent pipeline."
      }
    ]
  }
},

// ======================================================================
// WORKSHOP 2 — Skills, MCP & Enterprise Governance
// ======================================================================

{
  id: 9, workshop: 2,
  title: "Copilot Skills Framework & Custom Instructions",
  time: "50 min",
  objectives: [
    "Understand the Copilot Skills Framework and its purpose",
    "Create custom instructions that shape Copilot's behavior",
    "Define project-level and organization-level skill configurations",
    "Implement skills that enforce your team's coding standards"
  ],
  sections: [
    {
      title: "🔍 What is the Skills Framework?",
      content: `<p>The <strong>Copilot Skills Framework</strong> is a system for customizing how GitHub Copilot behaves in your project or organization. Skills are instructions, tools, and configurations that teach Copilot about your specific codebase, standards, and workflows.</p>
<p>Without skills, Copilot operates on general programming knowledge. With skills, it becomes an expert on <em>your</em> codebase — understanding your architecture, patterns, naming conventions, and business domain.</p>
<div class="concept-box info">
  <h4>💡 Skills Hierarchy</h4>
  <p><strong>Organization Skills:</strong> Standards that apply to all repos (e.g., security policies)<br>
  <strong>Repository Skills:</strong> Project-specific patterns and conventions<br>
  <strong>Workspace Skills:</strong> Local developer preferences<br>
  Skills are applied in this order — more specific skills override general ones.</p>
</div>`
    },
    {
      title: "💻 Creating Custom Instructions",
      content: `<p>Custom instructions live in specific files that Copilot reads automatically. Here are the three levels:</p>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: ".github/copilot-instructions.md (Repository Level)",
          code: `# Project: Andela Talent Platform

## Architecture
This is a monorepo with:
- /api — Express.js REST API (TypeScript)
- /web — Next.js frontend (React + TypeScript)
- /shared — Shared types and utilities
- /infra — Terraform infrastructure code

## Coding Standards
- Use functional components with hooks (no class components)
- State management: Zustand (NOT Redux)
- API calls: Use the custom useApi() hook in shared/hooks
- Date handling: dayjs (NOT moment.js)
- All API endpoints must validate input with Zod schemas

## Database
- PostgreSQL with Prisma ORM
- Migrations: Use \`prisma migrate dev\` for development
- Always include created_at and updated_at timestamps
- Use UUID for primary keys

## Testing
- Unit tests: Vitest with React Testing Library
- E2E tests: Playwright
- Minimum 80% coverage for new code
- Mock external services, never call real APIs in tests`
        }
      ],
      image: "m9_skills_framework.png"
    },
    {
      title: "⚡ Instruction Conflicts: Priority & Resolution",
      content: `<p>When Copilot receives instructions from multiple sources simultaneously — organization-level, repository-level, and workspace-level — they don't always agree. Understanding how conflicts are resolved prevents unexpected behaviour.</p>
<table class="data-table">
  <thead><tr><th>Conflict Type</th><th>Example</th><th>Winner</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Framework preference</td><td>Org: "Use Jest" vs Repo: "Use Vitest"</td><td>Repository</td><td>More specific scope overrides broader</td></tr>
    <tr><td>Style rule</td><td>Org: "4-space indent" vs Workspace: "2-space indent"</td><td>Workspace</td><td>Workspace (most specific) always wins</td></tr>
    <tr><td>Additive (no conflict)</td><td>Org: security rules + Repo: API patterns</td><td>Both applied</td><td>Non-contradictory rules stack — all apply</td></tr>
    <tr><td>Direct contradiction</td><td>Org: "Always use async/await" vs Repo: "Use callbacks for legacy compat"</td><td>Repository</td><td>Repo-level specificity wins; but this is a smell — resolve at org level</td></tr>
  </tbody>
</table>
<div class="concept-box tip">
  <h4>✅ Best Practice: Separate Concerns by Level</h4>
  <p>Design your instruction hierarchy to avoid conflicts by assigning distinct concerns to each level:<br>
  <strong>Organization level</strong> → Security policies, banned libraries, IP protection rules<br>
  <strong>Repository level</strong> → Tech stack choices, architecture patterns, test framework<br>
  <strong>Workspace level</strong> → Personal editor preferences, local experiment flags</p>
</div>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: "Org-level: .github/copilot-instructions.md (Security-focused)",
          code: `# Organization: Andela Engineering — Security Standards

## SECURITY (applies to ALL repositories)
- NEVER suggest hardcoded secrets, API keys, or passwords
- ALWAYS use parameterised queries — never string concatenation in SQL
- Input from external sources MUST be validated before use
- JWT secrets MUST come from environment variables, never literals

## BANNED LIBRARIES (across all repos)
- Do NOT suggest: moment.js (use dayjs), request (use fetch/axios),
  node-uuid (use crypto.randomUUID())

## THESE RULES CANNOT BE OVERRIDDEN by repository-level instructions`
        },
        {
          lang: "markdown",
          title: "Repo-level: .github/copilot-instructions.md (Stack-focused)",
          code: `# Project: Andela Talent Platform

## TECH STACK (this repo only)
- Backend: Express.js + TypeScript (strict mode)
- Database: PostgreSQL with Prisma ORM
- State: Zustand (NOT Redux — org-level security rules still apply)
- Testing: Vitest + React Testing Library

## NOTE: Andela security rules from org-level ALSO apply here.
## This file adds project-specific patterns ON TOP of org rules.
## To see what the org-level rules say, check the organisation's
## copilot-instructions.md in .github/`
        }
      ]
    },
    {
      title: "🛠️ Practical Example: Skills in Action",
      content: `<p>Let's see how custom instructions change Copilot's behavior. Without instructions, Copilot might generate Redux code. With your skills configured:</p>`,
      codeBlocks: [
        {
          lang: "typescript",
          title: "What Copilot generates WITH custom instructions",
          code: `// Copilot knows to use Zustand (not Redux) and your useApi hook
import { create } from 'zustand';
import { useApi } from '@shared/hooks/useApi';
import { z } from 'zod';

// Copilot uses Zod for validation (as specified in instructions)
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(['engineer', 'manager', 'admin']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

type User = z.infer<typeof UserSchema>;

// Copilot uses Zustand store pattern (your standard)
interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    const api = useApi();
    const data = await api.get('/users');
    const validated = z.array(UserSchema).parse(data);
    set({ users: validated, loading: false });
  },
}));`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the primary purpose of the Copilot Skills Framework?",
        options: [
          "To make Copilot run faster",
          "To customize Copilot's behavior for your specific codebase and standards",
          "To restrict Copilot to certain programming languages",
          "To provide Copilot with internet access"
        ],
        correct: 1,
        explanation: "The Skills Framework lets you teach Copilot about your specific architecture, patterns, naming conventions, and business domain — making it an expert on your codebase."
      },
      {
        text: "In the skills hierarchy, which level has the highest priority?",
        options: [
          "Organization Skills",
          "Repository Skills",
          "Workspace Skills (most specific wins)",
          "They all have equal priority"
        ],
        correct: 2,
        explanation: "Skills follow a specificity hierarchy. Workspace skills (most local) override repository skills, which override organization skills. More specific always wins."
      },
      {
        text: "What file provides always-on, organization-wide instructions to every Copilot interaction in a repository?",
        options: [
          "AGENTS.md",
          ".github/copilot-instructions.md",
          ".vscode/settings.json",
          "SKILL.md"
        ],
        correct: 1,
        explanation: ".github/copilot-instructions.md is automatically loaded for every Copilot chat session in the repository. Unlike AGENTS.md (which governs autonomous agents), copilot-instructions.md applies to all interactive Copilot sessions."
      },
      {
        text: "A new engineer joins the team and Copilot immediately generates code using your team's patterns without any setup. What makes this possible?",
        options: [
          "The engineer installed a VS Code extension",
          ".github/copilot-instructions.md in the repository defines team conventions applied automatically to all Copilot interactions",
          "Copilot learned from previous commits",
          "The engineer configured their personal settings"
        ],
        correct: 1,
        explanation: "Repository-level copilot-instructions.md is version-controlled and shared. Any developer who clones the repo automatically benefits from team-defined standards without manual configuration."
      },
      {
        text: "Where do you store custom Copilot skills so they are versioned and available to the whole team?",
        options: [
          "In each developer's home directory",
          ".github/skills/ directory in the repository",
          "In the GitHub organization settings",
          "In the package.json devDependencies"
        ],
        correct: 1,
        explanation: ".github/skills/ is the standard location for team-shared skills. Being in the repository means skills are version-controlled with git, reviewed via PRs, and immediately available to all collaborators."
      }
    ]
  }
},

{
  id: 10, workshop: 2,
  title: "SKILL.md: Defining Reusable Agent Capabilities",
  time: "55 min",
  objectives: [
    "Understand the SKILL.md specification and its components",
    "Write SKILL.md files that define reusable agent capabilities",
    "Use skills to create domain-specific agent behaviors",
    "Share and version skills across teams"
  ],
  sections: [
    {
      title: "🔍 What is SKILL.md?",
      content: `<p>A <strong>SKILL.md</strong> file is a structured document that defines a reusable capability for an AI agent. It tells the agent what it can do, how to do it, what tools it has access to, and what constraints it must follow.</p>
<p>Think of SKILL.md as a job description for an agent. Just as a job description defines responsibilities, required skills, and reporting structure, SKILL.md defines the agent's purpose, available tools, and operating boundaries.</p>
<div class="concept-box info">
  <h4>💡 SKILL.md Components</h4>
  <p><strong>Frontmatter:</strong> Metadata (name, description, version, author)<br>
  <strong>Instructions:</strong> Detailed behavior guidelines for the agent<br>
  <strong>Tools:</strong> External capabilities the skill can use<br>
  <strong>Examples:</strong> Input/output pairs showing expected behavior<br>
  <strong>Constraints:</strong> Rules the agent must always follow</p>
</div>`
    },
    {
      title: "💻 Writing Your First SKILL.md",
      content: `<p>Let's create a SKILL.md that defines a "Code Review Expert" skill for your team:</p>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: "skills/code-reviewer/SKILL.md",
          code: `---
name: "Andela Code Review Expert"
description: "Reviews code changes for security, performance, and adherence to team standards"
version: "1.0.0"
author: "Andela Engineering"
triggers:
  - "review this code"
  - "check this PR"
  - "find issues in this change"
---

# Code Review Expert

You are a senior code reviewer at Andela. Your job is to review
code changes thoroughly and provide actionable feedback.

## Review Checklist

Always check for:
1. **Security**: SQL injection, XSS, auth bypass, secret exposure
2. **Performance**: N+1 queries, unnecessary re-renders, memory leaks
3. **Error Handling**: Unhandled promises, missing try/catch, generic errors
4. **Testing**: Coverage gaps, missing edge cases, brittle tests
5. **Standards**: Naming conventions, file organization, documentation

## Response Format

Structure your review as:
- 🔴 **Critical** — Must fix before merge (security/correctness)
- 🟡 **Suggestion** — Should fix, improves quality
- 🟢 **Nitpick** — Optional improvement, minor style issue

## Constraints
- Never approve code with known security vulnerabilities
- Always suggest tests for untested code paths
- Be constructive — explain WHY something is an issue
- Reference specific line numbers in your feedback`
        }
      ],
      image: "m10_skill_md.png"
    },
    {
      title: "🔎 Skill Discovery, Triggering & Composition",
      content: `<p>Writing a SKILL.md is only useful if the agent can find it and activate it at the right time. Skill discovery, triggering, and composition are the mechanics that make skills actually work in practice.</p>
<div class="concept-box info">
  <h4>💡 How Skills Are Discovered</h4>
  <p>Copilot scans these locations (in order) when a session starts:<br>
  1. <strong><code>.github/skills/*/SKILL.md</code></strong> — all skills in the skills directory<br>
  2. <strong><code>.github/copilot-instructions.md</code></strong> — always-on instructions (not a skill, but always loaded)<br>
  3. <strong>AGENTS.md</strong> in the repo root — for the Coding Agent specifically<br><br>
  Skills are loaded into context but only <em>activated</em> when triggered.</p>
</div>
<h4>Skill Triggering: Three Methods</h4>
<table class="data-table">
  <thead><tr><th>Method</th><th>How It Works</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><strong>Keyword triggers</strong> (in frontmatter)</td><td>Agent matches user message against trigger phrases</td><td>User says "review this code" → Code Review Expert skill activates</td></tr>
    <tr><td><strong>Explicit invocation</strong></td><td>User references skill by name in the prompt</td><td>"Using the api-generator skill, create an endpoint for products"</td></tr>
    <tr><td><strong>Auto-load</strong> (via copilot-instructions.md)</td><td>Add <code>@skill code-reviewer</code> to instructions to always activate</td><td>Code Review skill active on every Copilot interaction in the repo</td></tr>
  </tbody>
</table>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: "Composing Multiple Skills in copilot-instructions.md",
          code: `# Andela Talent Platform — Copilot Configuration

## Always-Active Skills
These skills are loaded for every Copilot interaction in this repo:

@skill security-checker   # From .github/skills/security-checker/SKILL.md
@skill api-standards      # From .github/skills/api-standards/SKILL.md

## Conditional Skills (activate on keyword match)
The following skills are available and activate automatically
when their trigger phrases are detected:

- code-reviewer    → triggers on: "review", "check this PR", "find issues"
- api-generator    → triggers on: "create endpoint", "generate API", "new route"
- test-writer      → triggers on: "write tests", "add test coverage", "test this"

## Skill Precedence
If two skills give conflicting instructions, security-checker
always takes priority over api-generator (security > convenience).`
        },
        {
          lang: "markdown",
          title: "How Skills and copilot-instructions.md Work Together",
          code: `## Layered Context Model (what Copilot sees in one session)

┌─────────────────────────────────────────────┐
│  Always present (every session):            │
│  • .github/copilot-instructions.md          │
│  • Any @skill references in instructions    │
├─────────────────────────────────────────────┤
│  Triggered skills (when phrase matched):    │
│  • .github/skills/code-reviewer/SKILL.md   │
│  • .github/skills/api-generator/SKILL.md   │
├─────────────────────────────────────────────┤
│  Coding Agent only (autonomous tasks):      │
│  • AGENTS.md (permissions + constraints)    │
└─────────────────────────────────────────────┘

Rule: Skills add DOMAIN EXPERTISE.
      copilot-instructions.md adds PROJECT KNOWLEDGE.
      AGENTS.md adds OPERATIONAL BOUNDARIES.
      All three work together — they don't replace each other.`
        }
      ]
    },
    {
      title: "🛠️ Advanced: Parameterized Skills",
      content: `<p>Skills can be parameterized to work across different contexts. Here's an example of an API endpoint generator skill:</p>`,
      codeBlocks: [
        {
          lang: "markdown",
          title: "skills/api-generator/SKILL.md",
          code: `---
name: "REST API Endpoint Generator"
description: "Generates complete API endpoints with validation, tests, and docs"
version: "2.0.0"
parameters:
  - name: resource
    description: "The resource name (e.g., users, products)"
    required: true
  - name: operations
    description: "CRUD operations to generate"
    default: ["list", "get", "create", "update", "delete"]
  - name: auth
    description: "Authentication requirement"
    default: true
---

# API Endpoint Generator

Generate a complete REST API endpoint for the {{resource}} resource.

## File Structure
Create these files:
- routes/{{resource}}.js — Express router with endpoints
- services/{{resource}}Service.js — Business logic
- validators/{{resource}}.js — Zod validation schemas
- tests/{{resource}}.test.js — Comprehensive test suite

## For each operation in {{operations}}:
1. Define the route with proper HTTP method
2. Add input validation using Zod
3. Implement service layer logic
4. Include error handling
5. Write tests covering happy path + error cases`
        },
        {
          lang: "python",
          title: "Python Example: FastAPI Endpoint (Generated by Skill)",
          code: `from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID, uuid4

router = APIRouter(prefix="/api/users", tags=["users"])

# --- Validation Schema (like Zod in Node.js) ---
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    role: str = "engineer"

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Ada Lovelace",
                "email": "ada@andela.com",
                "role": "engineer"
            }
        }

class UserResponse(UserCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime

# --- Route Handlers ---
@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    """Create a new user with validation."""
    new_user = {
        "id": uuid4(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        **user.model_dump()
    }
    # In production: await db.users.insert(new_user)
    return UserResponse(**new_user)

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: UUID):
    """Retrieve a user by their UUID."""
    # In production: user = await db.users.find_one(id=user_id)
    user = None  # Replace with DB query
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the primary purpose of a SKILL.md file?",
        options: [
          "To document the project's README",
          "To define a reusable, structured capability for an AI agent",
          "To configure CI/CD pipelines",
          "To store environment variables"
        ],
        correct: 1,
        explanation: "SKILL.md defines a reusable agent capability — including instructions, tools, examples, and constraints — that can be shared across teams and projects."
      },
      {
        text: "Which section of SKILL.md specifies rules the agent must always follow?",
        options: [
          "Instructions",
          "Tools",
          "Constraints",
          "Examples"
        ],
        correct: 2,
        explanation: "The Constraints section defines rules the agent must always follow, such as never approving code with security vulnerabilities."
      },
      {
        text: "How do parameterized skills differ from static skills?",
        options: [
          "They run faster",
          "They accept input variables like {{resource}} to generate context-specific behavior",
          "They can only be used in Python",
          "They don't need a SKILL.md file"
        ],
        correct: 1,
        explanation: "Parameterized skills use template variables (like {{resource}}) that are filled in at runtime, allowing one skill definition to generate context-specific behavior for different resources."
      },
      {
        text: "Your SKILL.md deploy skill references ${GITHUB_SHA}. Where is this variable provided at runtime?",
        options: [
          "Hardcoded in the SKILL.md file",
          "Injected as an environment variable by GitHub's runtime at the time of execution",
          "The developer types it manually",
          "It comes from .vscode/settings.json"
        ],
        correct: 1,
        explanation: "${GITHUB_SHA} is a GitHub Actions environment variable injected at runtime. SKILL.md steps can reference runtime variables to create dynamic, context-aware deployment commands using the current commit SHA."
      },
      {
        text: "Your deploy-to-staging skill fails because STAGING_TOKEN is not set. Where should this secret be configured?",
        options: [
          "Hardcoded in SKILL.md",
          "In the SKILL.md frontmatter under 'secrets:'",
          "In GitHub repository Settings → Secrets and variables → Actions",
          "In .github/copilot-instructions.md"
        ],
        correct: 2,
        explanation: "Secrets must NEVER be hardcoded in SKILL.md files (which are committed to the repo). They should be stored in GitHub repository Secrets and injected as environment variables at runtime."
      }
    ]
  }
},

{
  id: 11, workshop: 2,
  title: "Model Context Protocol (MCP): Building AI Tool Servers",
  time: "60 min",
  objectives: [
    "Understand what MCP is and why it matters for enterprise AI",
    "Build a basic MCP server that exposes tools to AI agents",
    "Connect an MCP server to GitHub Copilot",
    "Design tools that follow MCP best practices"
  ],
  sections: [
    {
      title: "🔍 What is MCP?",
      content: `<p>The <strong>Model Context Protocol (MCP)</strong> is an open standard created by Anthropic that allows AI models to connect to external tools and data sources. Think of MCP as a "USB port for AI" — it provides a standardized way for any AI agent to use any tool, regardless of the vendor.</p>
<p>Without MCP, every AI tool integration is custom-built. With MCP, you build a tool server once and any MCP-compatible AI (Copilot, Claude, etc.) can use it.</p>
<div class="concept-box info">
  <h4>💡 MCP Architecture</h4>
  <p><strong>MCP Host:</strong> The AI application (e.g., VS Code with Copilot)<br>
  <strong>MCP Client:</strong> Protocol handler inside the host<br>
  <strong>MCP Server:</strong> Your custom tool server that exposes capabilities<br>
  <strong>Transport:</strong> Communication layer (stdio or HTTP/SSE)</p>
</div>`
    },
    {
      title: "💻 Building Your First MCP Server (Node.js)",
      content: `<p>Let's build an MCP server that provides a database query tool. This allows Copilot to query your project's database directly when answering questions about data.</p>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "mcp-server/index.js — Basic MCP Server",
          code: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import Database from "better-sqlite3";

// Initialize MCP server
const server = new McpServer({
  name: "project-database",
  version: "1.0.0",
  description: "Query the project database for analytics and reporting"
});

// Connect to your database
const db = new Database("./project.db");

// Define a tool: query the database
server.tool(
  "query_database",
  "Run a read-only SQL query against the project database",
  {
    query: z.string().describe("SQL SELECT query to execute"),
    limit: z.number().default(50).describe("Max rows to return")
  },
  async ({ query, limit }) => {
    // Security: only allow SELECT queries
    if (!query.trim().toUpperCase().startsWith("SELECT")) {
      return {
        content: [{
          type: "text",
          text: "Error: Only SELECT queries are allowed"
        }]
      };
    }

    try {
      const rows = db.prepare(query).all().slice(0, limit);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(rows, null, 2)
        }]
      };
    } catch (err) {
      return {
        content: [{
          type: "text",
          text: \`Query error: \${err.message}\`
        }]
      };
    }
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP Server running on stdio");`
        }
      ],
      image: "m11_mcp_server.png"
    },
    {
      title: "🔌 Connecting MCP to VS Code & Copilot",
      content: `<p>After building your MCP server, you need to register it in your VS Code settings so Copilot can discover and use it:</p>`,
      codeBlocks: [
        {
          lang: "json",
          title: ".vscode/settings.json — Register MCP Server",
          code: `{
  "mcp": {
    "servers": {
      "project-database": {
        "command": "node",
        "args": ["./mcp-server/index.js"],
        "env": {
          "DB_PATH": "./project.db"
        }
      }
    }
  }
}`
        }
      ]
    },
    {
      title: "🐍 Python MCP Server Example",
      content: `<p>Here is the same MCP server concept implemented in Python using the official MCP SDK:</p>`,
      codeBlocks: [
        {
          lang: "python",
          title: "mcp_server.py — Python MCP Server",
          code: `from mcp.server.fastmcp import FastMCP
import sqlite3

mcp = FastMCP("project-database")

@mcp.tool()
def query_database(query: str, limit: int = 50) -> str:
    """Run a read-only SQL query against the project database.

    Args:
        query: SQL SELECT query to execute
        limit: Maximum rows to return (default: 50)
    """
    if not query.strip().upper().startswith("SELECT"):
        return "Error: Only SELECT queries are allowed"

    try:
        conn = sqlite3.connect("project.db")
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(query)
        rows = [dict(row) for row in cursor.fetchmany(limit)]
        conn.close()
        return str(rows)
    except Exception as e:
        return f"Query error: {e}"

@mcp.tool()
def list_tables() -> str:
    """List all tables in the database."""
    conn = sqlite3.connect("project.db")
    cursor = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table'"
    )
    tables = [row[0] for row in cursor.fetchall()]
    conn.close()
    return ", ".join(tables)

if __name__ == "__main__":
    mcp.run(transport="stdio")`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the best analogy for MCP?",
        options: [
          "A database driver",
          "A USB port for AI — standardized interface for connecting tools",
          "A programming language",
          "A CI/CD pipeline"
        ],
        correct: 1,
        explanation: "MCP is like a USB port — it provides a standardized interface so any AI model can connect to any tool, without custom integrations."
      },
      {
        text: "Why does the MCP server example only allow SELECT queries?",
        options: [
          "Because MCP doesn't support other query types",
          "To prevent the AI from accidentally modifying or deleting data",
          "Because SQLite only supports SELECT",
          "To improve query performance"
        ],
        correct: 1,
        explanation: "Restricting to SELECT is a security best practice. AI agents should have read-only access to databases to prevent accidental data modification or deletion."
      },
      {
        text: "What transport methods does MCP support?",
        options: [
          "Only HTTP",
          "Only WebSocket",
          "stdio and HTTP/SSE",
          "gRPC only"
        ],
        correct: 2,
        explanation: "MCP supports stdio (standard input/output, good for local servers) and HTTP with Server-Sent Events (good for remote servers)."
      },
      {
        text: "What is the difference between an MCP Tool and an MCP Resource?",
        options: [
          "Tools are faster than Resources",
          "Tools perform actions with side effects; Resources provide read-only access to data",
          "Resources can call APIs; Tools cannot",
          "They are identical concepts with different names"
        ],
        correct: 1,
        explanation: "MCP Tools are executable functions that can have side effects (write to DB, send message, run command). MCP Resources are read-only data sources (file contents, DB records) — they expose data without triggering actions."
      },
      {
        text: "Your mcp.json includes `requireApproval: ['run_terminal']`. An agent tries to run `rm -rf /tmp/build`. What happens?",
        options: [
          "The command executes immediately",
          "The agent is blocked permanently",
          "Execution pauses and the user is prompted to approve or deny the terminal command",
          "The agent silently skips the step"
        ],
        correct: 2,
        explanation: "requireApproval creates a human-in-the-loop checkpoint. Before executing any tool in the requireApproval list, the agent pauses and waits for explicit human confirmation — preventing accidental destructive operations."
      }
    ]
  }
},

{
  id: 12, workshop: 2,
  title: "GitHub MCP Server: Repository Intelligence",
  time: "45 min",
  objectives: [
    "Set up and configure the official GitHub MCP Server",
    "Use the GitHub MCP tools to query repositories, issues, and PRs",
    "Build workflows that leverage GitHub data through MCP",
    "Combine GitHub MCP with your custom MCP servers"
  ],
  sections: [
    {
      title: "🔍 The GitHub MCP Server",
      content: `<p>GitHub provides an official MCP server that gives AI agents direct access to your GitHub data. Instead of the agent scraping the web interface, it uses structured API calls to access repositories, issues, pull requests, code search, and more.</p>
<div class="concept-box info">
  <h4>💡 Available GitHub MCP Tools</h4>
  <p><strong>Repository:</strong> List repos, search code, get file contents, list branches<br>
  <strong>Issues:</strong> Create, list, update, comment on issues<br>
  <strong>Pull Requests:</strong> List PRs, get diffs, review, merge<br>
  <strong>Users:</strong> Get user profiles, list organization members<br>
  <strong>Actions:</strong> List workflows, trigger runs, check status</p>
</div>`
    },
    {
      title: "⚙️ Setting Up GitHub MCP Server",
      content: ``,
      codeBlocks: [
        {
          lang: "json",
          title: ".vscode/settings.json — GitHub MCP Configuration",
          code: `{
  "mcp": {
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
        }
      }
    }
  }
}`
        }
      ],
      image: "m12_github_mcp.png"
    },
    {
      title: "💻 Using GitHub MCP in Practice",
      content: `<p>With the GitHub MCP server connected, you can ask Copilot agent natural language questions about your repositories:</p>`,
      codeBlocks: [
        {
          lang: "prompt",
          title: "Example Agent Prompts Using GitHub MCP",
          code: `# These prompts work because the agent has GitHub MCP tools

"Show me all open issues labeled 'bug' in our backend repo
that were created in the last 7 days"

"Find all Python files in the repo that import the
deprecated 'utils.old_helper' module"

"List the last 5 merged PRs and summarize what changed"

"Check if there are any failing GitHub Actions workflows
and show me the error logs"

"Create an issue in the frontend repo for adding dark mode
support, with detailed requirements based on our design system"`
        },
        {
          lang: "python",
          title: "Script: Automated Sprint Report via GitHub MCP",
          code: `"""
Generate a sprint report by querying GitHub data.
This script demonstrates what the MCP server enables
when connected to an AI agent.
"""
import json
from datetime import datetime, timedelta

def generate_sprint_report(github_mcp, repo, sprint_days=14):
    """Generate a sprint report from GitHub data."""
    since = (datetime.now() - timedelta(days=sprint_days)).isoformat()

    # PRs merged this sprint
    merged_prs = github_mcp.call_tool("list_pull_requests", {
        "repo": repo,
        "state": "closed",
        "sort": "updated",
        "since": since
    })

    # Issues closed this sprint
    closed_issues = github_mcp.call_tool("list_issues", {
        "repo": repo,
        "state": "closed",
        "since": since
    })

    # Remaining open issues
    open_issues = github_mcp.call_tool("list_issues", {
        "repo": repo,
        "state": "open",
        "labels": "sprint-current"
    })

    report = {
        "sprint_end": datetime.now().isoformat(),
        "prs_merged": len(merged_prs),
        "issues_closed": len(closed_issues),
        "issues_remaining": len(open_issues),
        "velocity": len(closed_issues) / sprint_days
    }

    return report`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "What advantage does the GitHub MCP server have over web scraping?",
        options: [
          "It's faster because it doesn't render HTML",
          "It provides structured API access to GitHub data, which is reliable and efficient",
          "It can bypass GitHub's rate limits",
          "It works without authentication"
        ],
        correct: 1,
        explanation: "The GitHub MCP server uses structured API calls rather than scraping HTML. This is more reliable, efficient, and gives access to data that isn't visible in the web UI."
      },
      {
        text: "What authentication does the GitHub MCP server require?",
        options: [
          "OAuth only",
          "A GitHub Personal Access Token (PAT)",
          "SSH keys",
          "No authentication needed"
        ],
        correct: 1,
        explanation: "The GitHub MCP server requires a Personal Access Token (PAT) with appropriate permissions for the repositories you want to access."
      },
      {
        text: "Using the GitHub MCP server, you ask Copilot 'find all open bugs assigned to me'. What does the MCP server do?",
        options: [
          "It scrapes the GitHub website for the results",
          "It calls the GitHub Issues API with filters (state: open, label: bug, assignee: @me) and returns structured results",
          "It searches commit messages",
          "It reads the local repository's git log"
        ],
        correct: 1,
        explanation: "The GitHub MCP server translates natural language requests into structured GitHub API calls. It doesn't scrape — it uses the REST/GraphQL API directly, giving reliable, structured data the agent can reason about."
      },
      {
        text: "You added a Jira MCP server to your mcp.json. What new capability does Copilot now have?",
        options: [
          "It can deploy to Jira's cloud servers",
          "It can read, create, and update Jira tickets directly from Copilot Chat without leaving the IDE",
          "It can only read Jira ticket titles",
          "Jira tickets are imported as GitHub Issues automatically"
        ],
        correct: 1,
        explanation: "The Jira MCP server exposes Jira's API as MCP tools. Copilot can now search projects, read ticket details, create new tickets, and update status — all from within the IDE chat interface."
      },
      {
        text: "What security best practice must you follow when storing MCP server credentials?",
        options: [
          "Hardcode tokens directly in mcp.json for convenience",
          "Store all tokens in environment variables or secrets managers — never commit credentials to the repository",
          "Use the same token for all MCP servers",
          "Store credentials in .gitignore"
        ],
        correct: 1,
        explanation: "mcp.json is committed to the repository and visible to all contributors. All sensitive credentials must use environment variable references (${VAR_NAME}) with the actual values stored in secrets managers or environment variables."
      }
    ]
  }
},

{
  id: 13, workshop: 2,
  title: "Tool Calling: Building AI-Powered Integrations",
  time: "55 min",
  objectives: [
    "Understand the tool calling pattern in AI applications",
    "Build tools that AI agents can invoke with structured inputs",
    "Handle tool results and error states properly",
    "Design tools that are safe and predictable"
  ],
  sections: [
    {
      title: "🔍 How Tool Calling Works",
      content: `<p><strong>Tool calling</strong> is the mechanism by which an AI model requests to use an external function. Instead of guessing an answer, the model says "I need to call this tool with these parameters to get the real data."</p>
<p>The flow is: (1) User asks a question → (2) Model decides it needs a tool → (3) Model outputs a structured tool call → (4) Your code executes the tool → (5) Result is sent back to the model → (6) Model formulates the final answer.</p>
<div class="concept-box info">
  <h4>💡 Why Tool Calling Matters</h4>
  <p>Without tools, AI models can only use their training data. With tools, they can access real-time data (APIs, databases), perform calculations, interact with services (send emails, create tickets), and take actions in the real world. This is what makes agents <em>agentic</em>.</p>
</div>`
    },
    {
      title: "💻 Building Tools in Node.js",
      content: `<p>Here's how to define tools that an MCP server exposes to AI agents. Each tool needs a name, description, input schema, and handler function:</p>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "tools/deploymentTool.js — Deployment Status Tool",
          code: `import { z } from "zod";

export const deploymentTools = {
  // Tool 1: Check deployment status
  check_deployment: {
    description: "Check the current deployment status of a service",
    schema: {
      service: z.string().describe("Service name (e.g., api, web, worker)"),
      environment: z.enum(["staging", "production"]).describe("Target environment")
    },
    handler: async ({ service, environment }) => {
      const response = await fetch(
        \`https://deploy-api.internal/status/\${environment}/\${service}\`
      );
      const status = await response.json();
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            service,
            environment,
            version: status.version,
            status: status.healthy ? "✅ Healthy" : "❌ Unhealthy",
            lastDeployed: status.last_deploy,
            uptime: status.uptime_hours + " hours"
          }, null, 2)
        }]
      };
    }
  },

  // Tool 2: List recent deployments
  list_deployments: {
    description: "List recent deployments for a service",
    schema: {
      service: z.string(),
      limit: z.number().default(5)
    },
    handler: async ({ service, limit }) => {
      const response = await fetch(
        \`https://deploy-api.internal/history/\${service}?limit=\${limit}\`
      );
      const deploys = await response.json();
      return {
        content: [{
          type: "text",
          text: deploys.map(d =>
            \`[\${d.timestamp}] v\${d.version} → \${d.environment} by \${d.deployer}\`
          ).join("\\n")
        }]
      };
    }
  }
};`
        }
      ],
      image: "m13_tool_calling.png"
    },
    {
      title: "🐍 Python Tool Calling Example",
      content: ``,
      codeBlocks: [
        {
          lang: "python",
          title: "tools/monitoring.py — Monitoring Tools",
          code: `from mcp.server.fastmcp import FastMCP
from datetime import datetime, timedelta
import httpx

mcp = FastMCP("monitoring-tools")

@mcp.tool()
async def get_error_rate(
    service: str,
    period_hours: int = 1
) -> str:
    """Get the error rate for a service over the specified period.

    Args:
        service: Name of the service to check
        period_hours: Number of hours to look back (default: 1)
    """
    async with httpx.AsyncClient() as client:
        end = datetime.utcnow()
        start = end - timedelta(hours=period_hours)

        response = await client.get(
            f"https://metrics.internal/api/v1/query",
            params={
                "query": f'rate(http_errors_total{{service="{service}"}}[{period_hours}h])',
                "time": end.isoformat()
            }
        )
        data = response.json()

        if data["data"]["result"]:
            rate = float(data["data"]["result"][0]["value"][1])
            status = "🟢 Normal" if rate < 0.01 else "🔴 Elevated"
            return f"Service: {service}\\nError Rate: {rate:.4%}\\nStatus: {status}\\nPeriod: Last {period_hours}h"

        return f"No data found for service: {service}"

@mcp.tool()
async def get_service_health(service: str) -> str:
    """Check the overall health of a service including uptime,
    latency, and error rate.

    Args:
        service: Name of the service to check
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://health.internal/{service}/status"
        )
        health = response.json()

        return f"""Service: {service}
Status: {"✅ Healthy" if health["healthy"] else "❌ Unhealthy"}
Uptime: {health["uptime_percent"]:.2f}%
Avg Latency: {health["avg_latency_ms"]}ms
P99 Latency: {health["p99_latency_ms"]}ms
Active Instances: {health["instances"]}"""

if __name__ == "__main__":
    mcp.run()`
        }
      ]
    },
    {
      title: "🔒 Tool Safety Best Practices",
      content: `<div class="concept-box warning">
  <h4>⚠️ Critical Safety Rules for Tools</h4>
  <p>1. <strong>Read-only by default:</strong> Tools should only read data unless explicitly designed for writes<br>
  2. <strong>Input validation:</strong> Always validate and sanitize tool inputs with schemas<br>
  3. <strong>Rate limiting:</strong> Prevent agents from calling tools excessively<br>
  4. <strong>Audit logging:</strong> Log every tool call with timestamp, input, and caller<br>
  5. <strong>Least privilege:</strong> Tools should have minimum necessary permissions</p>
</div>`
    }
  ],
  assessment: {
    questions: [
      {
        text: "In the tool calling flow, what happens after the AI model outputs a tool call?",
        options: [
          "The model directly executes the function",
          "Your code executes the tool and sends the result back to the model",
          "The tool runs on GitHub's servers",
          "The user must manually run the tool"
        ],
        correct: 1,
        explanation: "The model outputs a structured tool call request. Your application code executes the actual tool/function and sends the result back to the model for final processing."
      },
      {
        text: "Why should tools be 'read-only by default'?",
        options: [
          "To save bandwidth",
          "Because AI is not good at writing data",
          "To prevent agents from accidentally modifying or deleting data",
          "Because MCP only supports read operations"
        ],
        correct: 2,
        explanation: "Read-only by default is a safety principle. AI agents can make mistakes, so limiting tools to read-only prevents accidental data modification or deletion."
      },
      {
        text: "An agent needs to: fetch an API response, transform the data, write a file, and post to Slack. What is this called?",
        options: [
          "Tool chaining — the agent sequences multiple tool calls where each output feeds the next",
          "Tool stacking",
          "Parallel execution",
          "Tool overloading"
        ],
        correct: 0,
        explanation: "Tool chaining is when an agent uses the output of one tool as input to the next, creating a sequential data pipeline. This enables complex multi-step workflows that no single tool could handle alone."
      },
      {
        text: "Why should a database deletion tool have `requireApproval: true` in its MCP configuration?",
        options: [
          "Database tools are always slow",
          "Deletion is irreversible — human confirmation prevents agents from accidentally destroying production data",
          "GitHub requires it for all database tools",
          "It improves tool performance"
        ],
        correct: 1,
        explanation: "Irreversible operations (delete, drop, truncate) must have human approval gates. AI agents can misinterpret intent. requireApproval: true creates a safety checkpoint before any destructive database operation executes."
      },
      {
        text: "An agent's tool call returns a 500 error from your API. What should a well-designed tool handler return to the agent?",
        options: [
          "An empty string",
          "The raw HTTP 500 response with stack trace",
          "A structured error object with error type, message, and suggested retry behavior",
          "null"
        ],
        correct: 2,
        explanation: "Well-designed tool handlers return structured error objects that help the agent understand what went wrong and what to do next. Raw stack traces leak implementation details and don't help the agent recover."
      }
    ]
  }
},

{
  id: 14, workshop: 2,
  title: "Enterprise Model Strategy & AI Governance",
  time: "55 min",
  objectives: [
    "Design an enterprise AI model strategy for your organization",
    "Configure Copilot's model selection for different tasks",
    "Implement governance policies for AI-generated code",
    "Set up content exclusion and IP protection rules"
  ],
  sections: [
    {
      title: "🔍 Enterprise Model Strategy",
      content: `<p>In an enterprise setting, not every AI task needs the same model. A smart model strategy routes tasks to the right model based on complexity, cost, and risk — just like you'd assign tasks to team members based on their expertise.</p>
<table class="content-table">
  <tr><th>Task Type</th><th>Recommended Model</th><th>Reasoning</th></tr>
  <tr><td>Code completion</td><td>Fast, small model</td><td>Needs low latency, high volume</td></tr>
  <tr><td>Code review</td><td>Large, capable model</td><td>Needs deep understanding of context</td></tr>
  <tr><td>Security analysis</td><td>Specialized model</td><td>Domain-specific knowledge required</td></tr>
  <tr><td>Documentation</td><td>Medium model</td><td>Good language skills, moderate cost</td></tr>
  <tr><td>Architecture planning</td><td>Most capable model</td><td>Complex reasoning required</td></tr>
</table>`
    },
    {
      title: "💻 Configuring Model Selection",
      content: ``,
      codeBlocks: [
        {
          lang: "json",
          title: "Organization-level Copilot Policy",
          code: `{
  "copilot_policies": {
    "model_selection": {
      "code_completion": {
        "model": "copilot-fast",
        "max_tokens": 500,
        "temperature": 0.1
      },
      "agent_mode": {
        "model": "gpt-4o",
        "max_tokens": 4096,
        "temperature": 0.3
      },
      "code_review": {
        "model": "gpt-4o",
        "max_tokens": 2048,
        "temperature": 0.1
      }
    },
    "content_exclusion": {
      "patterns": [
        "**/.env*",
        "**/secrets/**",
        "**/credentials/**",
        "**/*.pem",
        "**/*.key"
      ],
      "repositories": [
        "internal-security-tools",
        "compensation-data"
      ]
    },
    "ip_protection": {
      "block_suggestions_matching": [
        "copyleft_licensed_code",
        "exact_match_public_repos"
      ],
      "require_attribution": true
    }
  }
}`
        }
      ],
      image: "m14_model_strategy.png"
    },
    {
      title: "🛡️ Enforcement Mechanics: How Exclusions Actually Work",
      content: `<p>Knowing that content exclusion <em>exists</em> is not enough — you need to know exactly what it prevents and what it doesn't, so you can design a governance strategy that actually works.</p>
<table class="data-table">
  <thead><tr><th>Exclusion Target</th><th>What It Prevents</th><th>What It Does NOT Prevent</th></tr></thead>
  <tbody>
    <tr><td><strong>File path exclusion</strong><br><code>**/.env*</code></td><td>Copilot won't include that file's content in its context window when generating suggestions</td><td>The file still exists; the developer can read it. Copilot just won't see it.</td></tr>
    <tr><td><strong>Repository exclusion</strong><br><code>compensation-data</code> repo</td><td>Copilot is disabled entirely in that repository — no completions, no chat</td><td>Developers can still access the repo normally; exclusion only affects AI assistance</td></tr>
    <tr><td><strong>Public code filter</strong> (IP protection)</td><td>Filters suggestions that exactly match code in GitHub's public training corpus</td><td>Paraphrased or structurally similar code — only exact/near-exact matches are filtered</td></tr>
  </tbody>
</table>
<div class="concept-box warning">
  <h4>⚠️ Common Governance Misconceptions</h4>
  <p>• Content exclusion does NOT encrypt or hide the file — it only removes it from AI context<br>
  • Exclusion rules are enforced by the Copilot extension — a developer who disables the extension bypasses them<br>
  • IP protection filters suggestions at the time of display — code already accepted is not retroactively flagged<br>
  • Exclusion rules don't apply to GitHub Actions workflows that directly call the Copilot API</p>
</div>`,
      codeBlocks: [
        {
          lang: "yaml",
          title: ".github/workflows/governance-checks.yml — Automated Compliance Gate",
          code: `name: AI Governance Compliance Check
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  check-ai-pr:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Detect Copilot-generated PR
        id: detect
        uses: actions/github-script@v7
        with:
          script: |
            const pr = context.payload.pull_request;
            // Check if PR was authored by Copilot bot
            const isCopilot =
              pr.user.login === 'github-copilot[bot]' ||
              pr.body?.includes('Generated by GitHub Copilot');
            core.setOutput('is_copilot', String(isCopilot));
            console.log(\`Copilot PR: \${isCopilot}\`);

      - name: Check for excluded file patterns
        if: steps.detect.outputs.is_copilot == 'true'
        uses: actions/github-script@v7
        with:
          script: |
            const { data: files } = await github.rest.pulls.listFiles({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.payload.pull_request.number
            });

            // Patterns that should never appear in AI-generated PRs
            const EXCLUDED_PATTERNS = [
              /\\.env/,
              /secrets\\//,
              /credentials\\//,
              /\\.pem$/,
              /\\.key$/
            ];

            const violations = files
              .map(f => f.filename)
              .filter(name => EXCLUDED_PATTERNS.some(p => p.test(name)));

            if (violations.length > 0) {
              core.setFailed(
                \`🚨 Governance violation: Copilot PR touches excluded files: \${violations.join(', ')}\`
              );
            } else {
              console.log('✅ No excluded files touched in this Copilot PR');
            }

      - name: Require security scan for agent PRs
        if: steps.detect.outputs.is_copilot == 'true'
        run: |
          echo "AI-generated PR flagged for mandatory security review"
          # This step can integrate with your SAST tool (Snyk, Semgrep, etc.)
          # The workflow will fail if security scan finds HIGH severity issues`
        }
      ]
    },
    {
      title: "🔒 AI Governance Framework",
      content: `<p>Every enterprise needs a governance framework for AI-generated code. Here are the key pillars:</p>
<div class="concept-box warning">
  <h4>⚠️ The Five Pillars of AI Code Governance</h4>
  <p>1. <strong>IP Protection:</strong> Ensure AI-generated code doesn't contain copyleft-licensed snippets or violate third-party IP<br>
  2. <strong>Security Review:</strong> All AI-generated code must pass the same security checks as human-written code<br>
  3. <strong>Content Exclusion:</strong> Sensitive files and repos must be excluded from Copilot's context<br>
  4. <strong>Audit Trail:</strong> Track which code was AI-generated for compliance and review purposes<br>
  5. <strong>Quality Gates:</strong> AI-generated PRs must meet the same quality bar (tests, coverage, linting)</p>
</div>`,
      codeBlocks: [
        {
          lang: "python",
          title: "governance/audit_trail.py — AI Code Audit Logger",
          code: `"""Track AI-generated code contributions for governance."""
import json
from datetime import datetime
from pathlib import Path

class AIAuditTrail:
    def __init__(self, audit_file="ai_audit_log.jsonl"):
        self.audit_file = Path(audit_file)

    def log_generation(self, event: dict):
        """Log an AI code generation event."""
        record = {
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": "code_generation",
            "model": event.get("model", "unknown"),
            "developer": event.get("developer"),
            "repository": event.get("repository"),
            "files_changed": event.get("files", []),
            "prompt_summary": event.get("prompt", "")[:200],
            "review_status": "pending",
            "ip_check": "pending"
        }

        with open(self.audit_file, "a") as f:
            f.write(json.dumps(record) + "\\n")

        return record

    def get_ai_contribution_stats(self, repo: str) -> dict:
        """Get statistics on AI contributions to a repository."""
        records = []
        with open(self.audit_file) as f:
            for line in f:
                r = json.loads(line)
                if r["repository"] == repo:
                    records.append(r)

        return {
            "total_generations": len(records),
            "reviewed": sum(1 for r in records if r["review_status"] == "approved"),
            "pending_review": sum(1 for r in records if r["review_status"] == "pending"),
            "ai_code_percentage": "calculated_from_git_stats"
        }`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "Why should enterprise model strategy use different models for different tasks?",
        options: [
          "Because only one model exists",
          "To balance cost, latency, and capability based on task requirements",
          "Because smaller models are always better",
          "To confuse potential attackers"
        ],
        correct: 1,
        explanation: "Different tasks have different needs — code completion needs speed, architecture planning needs deep reasoning. Routing tasks to appropriate models optimizes cost and performance."
      },
      {
        text: "What does 'content exclusion' mean in Copilot governance?",
        options: [
          "Excluding Copilot from running on certain computers",
          "Preventing specific files and repositories from being used as Copilot context",
          "Excluding certain programming languages",
          "Blocking AI from generating documentation"
        ],
        correct: 1,
        explanation: "Content exclusion prevents sensitive files (secrets, credentials, proprietary code) from being sent to Copilot as context, protecting confidential information."
      },
      {
        text: "For a complex multi-file architectural refactoring task, which model would you choose and why?",
        options: [
          "GPT-4o — it's the fastest",
          "Claude Sonnet — optimized for complex multi-step reasoning, long context, and nuanced code analysis",
          "Gemini 1.5 Pro — because it supports images",
          "A smaller model — complex tasks don't need large models"
        ],
        correct: 1,
        explanation: "Claude Sonnet excels at complex, multi-step reasoning tasks where nuance matters. For architectural refactoring requiring deep code understanding across many files, its reasoning capabilities outweigh the latency cost of GPT-4o."
      },
      {
        text: "Where are GitHub Copilot Enterprise audit logs found, and what do they capture?",
        options: [
          "In the repository's git history",
          "In GitHub Enterprise's audit log (Settings → Audit Log) — capturing who used Copilot, what prompts were sent, and what was accepted",
          "Only in VS Code's output panel",
          "They are not available in Copilot Enterprise"
        ],
        correct: 1,
        explanation: "GitHub Enterprise audit logs record Copilot usage: user identity, timestamps, prompt categories, and suggestion acceptance rates. This data is essential for compliance, security reviews, and usage governance."
      },
      {
        text: "Your organization needs different teams to use different AI models based on task type. What Copilot Enterprise feature enables this?",
        options: [
          "This is not possible — all users must use the same model",
          "Per-policy model selection in GitHub Copilot Enterprise settings, routing tasks by type to appropriate models",
          "Each developer configures their own model in VS Code",
          "Models are assigned based on repository language"
        ],
        correct: 1,
        explanation: "Copilot Enterprise allows policy-based model routing. Security teams can use Claude for auditing, frontend teams can use GPT-4o for speed, and data teams can use Gemini for large-context analysis — all managed centrally."
      }
    ]
  }
},

{
  id: 15, workshop: 2,
  title: "Memory, Context Management & Optimization",
  time: "50 min",
  objectives: [
    "Understand how AI agents manage context windows",
    "Implement context optimization strategies for large codebases",
    "Use .github/copilot-instructions.md effectively for persistent context",
    "Design custom context providers for domain-specific knowledge"
  ],
  sections: [
    {
      title: "🔍 The Context Window Challenge",
      content: `<p>AI models have a <strong>context window</strong> — a maximum amount of text they can "see" at once. For most models, this is 128K-200K tokens. In a large codebase with thousands of files, the AI can't see everything at once. Effective context management ensures the agent sees the <em>right</em> information at the right time.</p>
<div class="concept-box info">
  <h4>💡 Context Budget Breakdown</h4>
  <p>A typical 128K token context window is consumed by:<br>
  <strong>System prompt:</strong> ~2K tokens (agent instructions)<br>
  <strong>Conversation history:</strong> ~5-20K tokens (previous messages)<br>
  <strong>Tool definitions:</strong> ~3-5K tokens (available tools)<br>
  <strong>Active files:</strong> ~10-50K tokens (open files, recent changes)<br>
  <strong>Available for new content:</strong> ~50-100K tokens</p>
</div>`
    },
    {
      title: "💻 Context Optimization Strategies",
      content: ``,
      codeBlocks: [
        {
          lang: "markdown",
          title: ".github/copilot-instructions.md — Context Optimization",
          code: `# Context Guide for Copilot

## Quick Reference: Where Things Are
- API routes: src/routes/*.ts
- Business logic: src/services/*.ts
- Database models: src/models/*.ts (Prisma)
- Shared types: src/types/index.ts
- Config: src/config/index.ts (reads from .env)
- Tests mirror source: tests/unit/**, tests/e2e/**

## Key Patterns (so Copilot doesn't need to read every file)
- All services use dependency injection via constructor
- Error handling: throw AppError(message, statusCode)
- Auth: JWT middleware at src/middleware/auth.ts
- Validation: Zod schemas co-located with routes
- Logging: winston logger via src/utils/logger.ts

## Database Schema Summary
- users: id(uuid), email(unique), name, role, created_at
- projects: id(uuid), name, owner_id(fk:users), status
- tasks: id(uuid), title, project_id(fk:projects), assignee_id
- comments: id(uuid), body, task_id(fk:tasks), author_id`
        }
      ],
      image: "m15_context_mgmt.png"
    },
    {
      title: "🛠️ Building a Custom Context Provider",
      content: `<p>For large codebases, you can build an MCP resource that provides relevant context on demand. This is like giving the agent a smart search engine for your codebase:</p>`,
      codeBlocks: [
        {
          lang: "python",
          title: "context_provider.py — Smart Context Provider",
          code: `from mcp.server.fastmcp import FastMCP
from pathlib import Path
import subprocess

mcp = FastMCP("context-provider")

@mcp.tool()
def find_related_files(file_path: str) -> str:
    """Find files related to the given file based on imports,
    tests, and naming conventions.

    Args:
        file_path: Path to the source file
    """
    base = Path(file_path)
    related = []

    # Find the test file
    test_path = str(base).replace("src/", "tests/").replace(".ts", ".test.ts")
    if Path(test_path).exists():
        related.append(f"Test: {test_path}")

    # Find files that import this module
    module_name = base.stem
    result = subprocess.run(
        ["grep", "-rl", f"from.*{module_name}", "src/"],
        capture_output=True, text=True
    )
    importers = result.stdout.strip().split("\\n")
    for f in importers[:5]:
        if f and f != str(base):
            related.append(f"Imported by: {f}")

    # Find the model if this is a service
    if "service" in str(base).lower():
        model = str(base).replace("services", "models").replace("Service", "")
        if Path(model).exists():
            related.append(f"Model: {model}")

    return "\\n".join(related) if related else "No related files found"

@mcp.tool()
def get_architecture_summary() -> str:
    """Get a high-level summary of the project architecture
    including directory structure, key files, and dependencies."""
    summary = []

    # Count files by type
    for ext in [".ts", ".js", ".py", ".json"]:
        count = len(list(Path("src").rglob(f"*{ext}")))
        summary.append(f"{ext}: {count} files")

    # List main directories
    dirs = sorted([d.name for d in Path("src").iterdir() if d.is_dir()])
    summary.append(f"\\nMain directories: {', '.join(dirs)}")

    return "\\n".join(summary)

if __name__ == "__main__":
    mcp.run()`
        }
      ]
    }
  ],
  assessment: {
    questions: [
      {
        text: "Why is context management important for AI agents in large codebases?",
        options: [
          "To make the AI respond faster",
          "Because the context window is limited — the agent needs to see the RIGHT information",
          "To reduce internet bandwidth usage",
          "Because large codebases have more bugs"
        ],
        correct: 1,
        explanation: "AI models have a limited context window. In large codebases with thousands of files, effective context management ensures the agent sees the most relevant information for the current task."
      },
      {
        text: "What is the purpose of putting a schema summary in copilot-instructions.md?",
        options: [
          "To create database migrations",
          "So Copilot understands the data model without reading every model file, saving context space",
          "To document the API for external developers",
          "To generate TypeScript types automatically"
        ],
        correct: 1,
        explanation: "Including a schema summary in copilot-instructions.md gives Copilot immediate understanding of the data model without consuming context tokens on individual model files."
      },
      {
        text: "What does the /compact command do in a long Copilot agent session?",
        options: [
          "Compresses the source code files",
          "Summarizes the conversation history into a compact representation to free up context window tokens",
          "Speeds up the model's response time",
          "Deletes the chat history"
        ],
        correct: 1,
        explanation: "/compact summarizes the conversation so far into a compressed form, freeing context window tokens for continued work. Use it when the session becomes long and responses start degrading in quality."
      },
      {
        text: "Copilot's suggestions become less accurate after an hour of working on the same session. What is the most likely cause?",
        options: [
          "The model is overheating",
          "The context window is filling up with conversation history, diluting the signal-to-noise ratio for the current task",
          "Your internet connection slowed down",
          "The model randomly degrades over time"
        ],
        correct: 1,
        explanation: "As a conversation grows, earlier, less-relevant messages consume context window space. This dilutes the relevant context and degrades output quality. Use /compact or start a new focused session to resolve this."
      },
      {
        text: "What does `#codebase` do when used in a Copilot Chat message?",
        options: [
          "Opens the codebase in a new VS Code window",
          "Signals Copilot to search across the entire repository for relevant context, not just open files",
          "Attaches the codebase as a zip file",
          "Runs the full test suite"
        ],
        correct: 1,
        explanation: "#codebase is a context reference that instructs Copilot to perform a semantic search across the entire repository to find relevant files, rather than only considering currently open tabs or the active file."
      }
    ]
  }
},

{
  id: 16, workshop: 2,
  title: "Copilot Extensions & Ecosystem Integration",
  time: "60 min",
  objectives: [
    "Build and register a custom Copilot Extension with the GitHub App manifest",
    "Implement SSE streaming and error handling in an extension server",
    "Measure ROI and productivity impact of your agentic platform",
    "Design a phased organizational rollout plan for agentic workflows"
  ],
  sections: [
    {
      title: "🔍 What are Copilot Extensions?",
      content: `<p><strong>Copilot Extensions</strong> expand what Copilot can do beyond code. They're third-party integrations that add new capabilities directly into the Copilot Chat experience. Think of them as plugins for your AI assistant.</p>
<p>Extensions can provide: domain-specific knowledge (AWS, Azure, Kubernetes), integrations with external services (Jira, Slack, Datadog), specialized tools (design systems, API documentation), and custom workflows for your organization.</p>
<div class="concept-box info">
  <h4>💡 Extensions vs. MCP vs. Skills</h4>
  <p><strong>Extensions:</strong> Third-party plugins in the Copilot marketplace — add new @agents<br>
  <strong>MCP Servers:</strong> Custom tool servers you build and host — give agents new tools<br>
  <strong>Skills (SKILL.md):</strong> Behavior instructions — teach agents how to work in your codebase<br>
  All three work together to create a comprehensive AI developer platform.</p>
</div>`
    },
    {
      title: "💻 Building a Copilot Extension",
      content: `<p>Here's how to build a simple Copilot Extension that integrates with your team's internal documentation:</p>`,
      codeBlocks: [
        {
          lang: "javascript",
          title: "extension/index.js — Custom Copilot Extension",
          code: `import express from 'express';
import { Octokit } from '@octokit/rest';

const app = express();
app.use(express.json());

// Extension endpoint that Copilot calls
app.post('/agent', async (req, res) => {
  const { messages, copilot_references } = req.body;
  const userMessage = messages[messages.length - 1].content;

  // Your extension logic here
  // Example: Search internal documentation
  const docs = await searchInternalDocs(userMessage);

  // Stream response back to Copilot Chat
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // Send response in ChatCompletions streaming format
  const response = formatDocsAsResponse(docs);

  res.write(\`data: \${JSON.stringify({
    choices: [{
      delta: { content: response },
      finish_reason: null
    }]
  })}\\n\\n\`);

  res.write(\`data: \${JSON.stringify({
    choices: [{
      delta: {},
      finish_reason: "stop"
    }]
  })}\\n\\n\`);

  res.end();
});

async function searchInternalDocs(query) {
  // Connect to your documentation system
  // (Confluence, Notion, internal wiki, etc.)
  const results = await fetch(
    \`https://docs-api.internal/search?q=\${encodeURIComponent(query)}\`
  );
  return results.json();
}

function formatDocsAsResponse(docs) {
  if (!docs.length) return "No relevant documentation found.";
  return docs.map(d =>
    \`## \${d.title}\\n\${d.summary}\\n[Read more](\${d.url})\`
  ).join("\\n\\n");
}

app.listen(3000, () => {
  console.log("Copilot Extension running on port 3000");
});`
        }
      ],
      image: "m16_extensions.png"
    },
    {
      title: "📋 Registering Your Extension as a GitHub App",
      content: `<p>To make your extension available in Copilot Chat, you must register it as a GitHub App with the Copilot agent capability. This tells GitHub where to forward chat messages when users type <code>@your-extension</code>.</p>`,
      codeBlocks: [
        {
          lang: "json",
          title: "github-app-manifest.json — GitHub App Registration",
          code: `// Step 1: Register a GitHub App using the manifest below.
// POST https://github.com/settings/apps/new (or your org: /organizations/ORG/settings/apps/new)
// with: ?state=<csrf-token> and manifest=<URL-encoded JSON below>

{
  "name": "InternalDocs Copilot Extension",
  "url": "https://your-extension.company.com",
  "hook_attributes": {
    "url": "https://your-extension.company.com/webhook"
  },
  "redirect_url": "https://your-extension.company.com/callback",
  "callback_urls": ["https://your-extension.company.com/callback"],
  "public": false,
  "default_permissions": {
    "contents": "read",
    "pull_requests": "read",
    "copilot_chat": "write"
  },
  "default_events": []
}

// Step 2: After the App is created, go to:
//   GitHub.com → Settings → Developer settings → GitHub Apps → Your App → Copilot
// Set:
//   App Type:  "Copilot Extension"
//   URL:       "https://your-extension.company.com/agent"
//   Inference description: "Use when the user asks about internal APIs or runbooks"
//
// Note: The Copilot agent URL is NOT set in the manifest — it must be
// configured in the App settings UI under the "Copilot" tab after creation.`
        },
        {
          lang: "javascript",
          title: "extension/index.js — Production-Ready Extension with Error Handling",
          code: `import express from 'express';

const app = express();
app.use(express.json());

// Verify the request is genuinely from GitHub Copilot
async function verifyGitHubToken(token) {
  const res = await fetch('https://api.github.com/user', {
    headers: { Authorization: \`Bearer \${token}\` }
  });
  if (!res.ok) throw new Error('Invalid token');
  return res.json();
}

app.post('/agent', async (req, res) => {
  // 1. Authenticate the caller
  const authToken = req.headers['x-github-token'];
  try {
    await verifyGitHubToken(authToken);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { messages } = req.body;
  const userMessage = messages[messages.length - 1].content;

  // 2. Set up SSE streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendChunk = (content, finish = false) => {
    res.write(\`data: \${JSON.stringify({
      choices: [{ delta: finish ? {} : { content }, finish_reason: finish ? 'stop' : null }]
    })}\\n\\n\`);
  };

  try {
    // 3. Process the request
    const docs = await searchInternalDocs(userMessage);

    if (!docs.length) {
      sendChunk('No relevant documentation found. Try searching with different keywords.');
    } else {
      sendChunk(\`Found \${docs.length} relevant documents:\\n\\n\`);
      for (const doc of docs) {
        sendChunk(\`## \${doc.title}\\n\${doc.summary}\\n[Read more](\${doc.url})\\n\\n\`);
      }
    }

    sendChunk('', true); // finish_reason: stop
  } catch (err) {
    // 4. Surface errors gracefully to the user
    sendChunk(\`⚠️ Error searching docs: \${err.message}. Please try again.\`);
    sendChunk('', true);
  } finally {
    res.end();
  }
});

app.listen(3000);`
        }
      ]
    },
    {
      title: "📊 Measuring ROI & Productivity Impact",
      content: `<p>Deploying an agentic platform without measuring its impact is like shipping a feature without analytics. You need concrete metrics to justify investment, guide improvements, and report to leadership.</p>
<table class="data-table">
  <thead><tr><th>Metric</th><th>How to Measure</th><th>Target Benchmark</th></tr></thead>
  <tbody>
    <tr><td>PR cycle time reduction</td><td>GitHub Insights: avg time from first commit → merge, before vs. after</td><td>30–50% reduction</td></tr>
    <tr><td>Agent-generated code acceptance rate</td><td>Copilot usage metrics in GitHub organization settings</td><td>&gt;70% acceptance</td></tr>
    <tr><td>Issues resolved by Coding Agent (no human code)</td><td>Count PRs with <code>author:app/github-copilot</code> that merged</td><td>Track monthly trend</td></tr>
    <tr><td>CCR findings per PR</td><td>GitHub Security &amp; Code Scanning dashboard</td><td>Declining trend = better agent output</td></tr>
    <tr><td>Developer time saved on documentation</td><td>Survey: time spent writing PR descriptions before/after</td><td>2–4 hrs/dev/week</td></tr>
    <tr><td>MCP tool call success rate</td><td>Application logs: successful vs. failed tool invocations</td><td>&gt;99% uptime</td></tr>
  </tbody>
</table>`,
      codeBlocks: [
        {
          lang: "python",
          title: "scripts/roi_dashboard.py — ROI Metrics Collector",
          code: `"""Collect and report agentic workflow ROI metrics from GitHub."""
import os
from datetime import datetime, timezone, timedelta
from github import Github  # pip install PyGithub

gh = Github(os.environ['GITHUB_TOKEN'])
repo = gh.get_repo(os.environ['GITHUB_REPO'])  # e.g. "myorg/myrepo"

def get_copilot_pr_metrics(days=30):
    # timezone.utc required: PyGithub returns timezone-aware datetimes;
    # datetime.now() without tz is naive and raises TypeError on comparison
    since = datetime.now(timezone.utc) - timedelta(days=days)
    all_prs = repo.get_pulls(state='closed', sort='updated', direction='desc')

    copilot_prs = []
    total_prs = 0

    for pr in all_prs:
        if pr.created_at < since:
            break
        total_prs += 1
        if pr.user.login == 'github-copilot[bot]' or 'copilot' in pr.user.login.lower():
            cycle_hours = (pr.merged_at - pr.created_at).total_seconds() / 3600 if pr.merged_at else None
            copilot_prs.append({
                'number': pr.number,
                'title': pr.title,
                'cycle_hours': round(cycle_hours, 1) if cycle_hours else 'unmerged',
                'additions': pr.additions,
                'deletions': pr.deletions
            })

    agent_adoption = len(copilot_prs) / total_prs * 100 if total_prs else 0

    print(f"\\n📊 Agentic Workflow ROI Report ({days} days)")
    print(f"{'='*45}")
    print(f"Total PRs:               {total_prs}")
    print(f"Copilot-authored PRs:    {len(copilot_prs)} ({agent_adoption:.1f}%)")
    if copilot_prs:
        merged = [p for p in copilot_prs if isinstance(p['cycle_hours'], float)]
        avg_cycle = sum(p['cycle_hours'] for p in merged) / len(merged) if merged else 0
        print(f"Avg cycle time (agent):  {avg_cycle:.1f} hrs")
    return copilot_prs

if __name__ == '__main__':
    get_copilot_pr_metrics(days=30)`
        }
      ]
    },
    {
      title: "🚀 Organizational Rollout Strategy",
      content: `<p>Rolling out agentic AI to a large engineering team requires change management, not just technical deployment. Resistance, misuse, and over-trust are real risks. Use a phased approach:</p>
<div class="concept-box info">
  <h4>💡 Phased Rollout: 4-Stage Model</h4>
  <p><strong>Phase 1 — Champion Team (Weeks 1–4):</strong> 3–5 volunteer engineers. Full access to agent mode, MCP, and CCR. Weekly retrospectives. Build internal playbook.<br><br>
  <strong>Phase 2 — Controlled Expansion (Weeks 5–8):</strong> 20–30% of engineering. Share playbook. Human-in-the-loop required for all agent-merged PRs. Measure metrics.<br><br>
  <strong>Phase 3 — Broad Rollout (Weeks 9–12):</strong> All teams. Mandatory AGENTS.md for all repos. CCR enabled by default. Agentic skills in onboarding.<br><br>
  <strong>Phase 4 — Optimize & Govern (Ongoing):</strong> Audit logs reviewed monthly. Model selection optimized by use case. Custom extensions for domain-specific workflows.</p>
</div>
<div class="concept-box tip">
  <h4>⚠️ Common Rollout Mistakes</h4>
  <p>• <strong>Skipping Phase 1:</strong> Without a champion team, you have no internal expertise to support others<br>
  • <strong>No AGENTS.md standards:</strong> Each team invents their own → inconsistent quality and security gaps<br>
  • <strong>Over-automation too fast:</strong> Auto-merging agent PRs before trust is established → prod incidents<br>
  • <strong>No metrics baseline:</strong> Without before-state data, you can't prove ROI<br>
  • <strong>Ignoring skeptics:</strong> Engineers who resist AI-generated code often have valid concerns — listen and address them</p>
</div>`,
    },
    {
      title: "🏗️ Bringing It All Together",
      content: `<p>Here's how extensions, MCP, and skills combine to create a complete AI developer platform for your organization:</p>`,
      codeBlocks: [
        {
          lang: "yaml",
          title: "The Complete AI Developer Platform Stack",
          code: `# Your Organization's AI Developer Platform

Extensions (Marketplace):
  - @jira        # Create/query Jira tickets from chat
  - @datadog     # Check service health and metrics
  - @figma       # Reference design components
  - @internal-docs  # Your custom extension (built above)

MCP Servers (Custom Tools):
  - project-database    # Query your database
  - deployment-manager  # Check/trigger deployments
  - monitoring         # Service health & error rates
  - context-provider   # Smart codebase search

Skills (Behavior):
  - .github/copilot-instructions.md    # Project standards
  - skills/code-reviewer/SKILL.md      # Review guidelines
  - skills/api-generator/SKILL.md      # API patterns

Governance:
  - Content exclusion rules
  - IP protection policies
  - Audit trail logging
  - Model selection strategy

# Together, this gives every developer:
# ✅ An AI that knows YOUR codebase and standards
# ✅ Tools to access YOUR services and data
# ✅ Extensions for YOUR external integrations
# ✅ Governance that protects YOUR organization`
        }
      ]
    },
    {
      title: "🎓 Your Path as a GitHub Copilot Agentic Engineer",
      content: `<p>Completing this program means you have the full stack of skills needed to lead AI-native engineering at your organization. Here's how to apply what you've learned immediately:</p>
<table class="data-table">
  <thead><tr><th>Skill Acquired</th><th>First Action This Week</th></tr></thead>
  <tbody>
    <tr><td>Agent Mode + AGENTS.md</td><td>Create AGENTS.md in your most active repo; assign one real issue to @copilot</td></tr>
    <tr><td>Copilot Coding Agent</td><td>Pick a well-scoped bug (< 2 files affected) and let the agent fix it end-to-end</td></tr>
    <tr><td>CCR + Agent Handoff</td><td>Enable CCR on one repo; practice the @copilot fix this handoff on a real PR</td></tr>
    <tr><td>SKILL.md</td><td>Write a SKILL.md for your team's most common task (e.g., adding an API endpoint)</td></tr>
    <tr><td>MCP Server</td><td>Build a local MCP server that queries your team's internal documentation</td></tr>
    <tr><td>Enterprise Governance</td><td>Review your org's Copilot policy; propose a content exclusion rule for sensitive paths</td></tr>
    <tr><td>Multi-Agent Pipelines</td><td>Map one repetitive workflow as a GitHub Actions agent pipeline (Issue → PR → Review)</td></tr>
    <tr><td>Extensions</td><td>Install the @github extension and explore @datadog or @jira if your team uses them</td></tr>
  </tbody>
</table>
<div class="concept-box info">
  <h4>💡 Agentic Engineer Competency Levels</h4>
  <p><strong>Level 1 — Practitioner:</strong> Uses agent mode, assigns issues to Copilot, reviews CCR suggestions<br>
  <strong>Level 2 — Builder:</strong> Creates AGENTS.md, writes SKILL.md, builds MCP servers, debugs failed agent runs<br>
  <strong>Level 3 — Architect:</strong> Designs multi-agent pipelines, sets governance policy, measures ROI, leads team rollout<br>
  <strong>Level 4 — Platform Engineer:</strong> Builds custom extensions, contributes to MCP ecosystem, drives org-wide adoption strategy</p>
</div>
<div class="concept-box tip">
  <h4>What Separates Great Agentic Engineers</h4>
  <p>The best agentic engineers understand that AI amplifies both good and poor engineering practices. If your codebase has clear structure, good tests, and consistent patterns — the agent excels. If it has spaghetti code and no tests — the agent will produce more spaghetti. Investing in code quality and clear documentation is now an investment in AI effectiveness.<br><br>
  The skills in this program are the foundation. The engineers who stand out will be the ones who continuously measure, iterate, and share what they learn with their teams.</p>
</div>`
    }
  ],
  assessment: {
    questions: [
      {
        text: "What is the difference between a Copilot Extension and an MCP Server?",
        options: [
          "They are the same thing with different names",
          "Extensions are marketplace plugins adding @agents; MCP servers are custom tool servers you build",
          "Extensions only work with Python, MCP with JavaScript",
          "MCP servers are slower than extensions"
        ],
        correct: 1,
        explanation: "Extensions are third-party marketplace plugins that add new @agents to Copilot Chat. MCP servers are custom tool servers you build and host to give agents access to specific tools and data."
      },
      {
        text: "In the complete AI Developer Platform stack, what role do Skills play?",
        options: [
          "They provide third-party integrations",
          "They define the behavior and standards the AI follows in your codebase",
          "They manage deployment infrastructure",
          "They handle user authentication"
        ],
        correct: 1,
        explanation: "Skills (via SKILL.md and copilot-instructions.md) define HOW the AI behaves — your coding standards, patterns, and conventions. Extensions add capabilities, MCP adds tools, skills add knowledge."
      },
      {
        text: "Which combination creates the most comprehensive AI developer experience?",
        options: [
          "Only Extensions",
          "Only MCP Servers",
          "Extensions + MCP Servers + Skills + Governance working together",
          "Only Skills"
        ],
        correct: 2,
        explanation: "The full platform combines Extensions (integrations), MCP Servers (custom tools), Skills (behavior), and Governance (safety) to create a comprehensive AI developer platform."
      },
      {
        text: "What technical requirement must a custom Copilot Extension server implement?",
        options: [
          "A REST API with GET /chat",
          "A streaming HTTP endpoint implementing the ChatCompletions API format, returning Server-Sent Events",
          "A GraphQL endpoint at /graphql",
          "A WebSocket server on port 8080"
        ],
        correct: 1,
        explanation: "Copilot Extensions must implement the ChatCompletions streaming format. The extension receives messages, processes them, and streams back responses as Server-Sent Events (text/event-stream) — exactly as shown in the module's code example."
      },
      {
        text: "In the hands-on lab, after the Copilot Coding Agent opens a PR, CCR flags an issue. What is the complete sequence to fix it using only GitHub native features?",
        options: [
          "Download the code, fix locally, push",
          "Reply '@copilot fix this' in the CCR comment (Agent Handoff) → agent pushes fix commit → re-run CCR to verify",
          "Close the PR and create a new issue",
          "Manually edit the file in the GitHub web editor"
        ],
        correct: 1,
        explanation: "The Agent Handoff Pattern keeps everything in GitHub: CCR identifies the issue inline, @copilot in the comment delegates the fix to the Coding Agent, the agent pushes a new commit, and CCR can re-verify. Zero context switching."
      },
      {
        text: "Your custom Copilot Extension is returning responses but the chat UI shows an error. What is the most likely cause?",
        options: [
          "The extension is too slow",
          "The extension is not verifying the GitHub token — GitHub's request is being rejected as unauthorized",
          "The extension needs to be restarted",
          "The GitHub App is not installed on the correct repository"
        ],
        correct: 1,
        explanation: "Extensions must verify the X-GitHub-Token header on every request by calling the GitHub API user endpoint. If token verification fails and returns 401, Copilot Chat shows an error. Always validate the caller's identity before processing messages."
      },
      {
        text: "After rolling out agentic workflows for 30 days, leadership asks for ROI evidence. Which metric most directly demonstrates productivity impact?",
        options: [
          "Number of developers who have Copilot installed",
          "Copilot-authored PRs as a percentage of total PRs, with average cycle time comparison",
          "GitHub Copilot subscription cost",
          "Number of lines of code generated"
        ],
        correct: 1,
        explanation: "ROI is demonstrated by business outcomes, not tool adoption. Copilot-authored PR percentage shows agent utilization; average cycle time (before vs. after) shows speed impact. Lines of code is a vanity metric — more code doesn't mean more value."
      }
    ]
  }
}

]; // End MODULES array
