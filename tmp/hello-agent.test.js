const { greetUser } = require('./hello-agent');

test('greets a user by name', () => {
  expect(greetUser('Ada')).toBe('Hello, Ada! Welcome to the Agentic Workflow.');
});

test('greets another user', () => {
  expect(greetUser('Grace')).toBe('Hello, Grace! Welcome to the Agentic Workflow.');
});

test('greets with empty name', () => {
  expect(greetUser('')).toBe('Hello, ! Welcome to the Agentic Workflow.');
});
