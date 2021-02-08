module.exports = {
  types: [{
      value: "feat✨",
      name: "feat:     new features"
    },
    {
      value: "fix🐛",
      name: "fix:      fix bugs"
    },
    {
      value: "docs📝",
      name: "docs:     doc change"
    },
    {
      value: "style🎨",
      name: "style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)"
    },
    {
      value: "remove🔥",
      name: "remove:   Remove code or files"
    },
    {
      value: "deploy🚀",
      name: "deploy:   Deploy stuff"
    },
    {
      value: "config🔧",
      name: "config:   Add or update configs"
    },
    {
      value: "refactor♻️",
      name: "refactor: A code change that neither fixes a bug nor adds a feature"
    },
    {
      value: "perf⚡️",
      name: "perf:     A code change that improves performance"
    },
    {
      value: "test✅",
      name: "test:     Adding missing tests"
    },
    {
      value: "chore👷",
      name: "chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation"
    },
    {
      value: "revert⏪",
      name: "revert:   Revert to a commit"
    },
    {
      value: "WIP🚧",
      name: "WIP:      Work in progress"
    },
    {
      value: "merge🔀",
      name: "merge:    Merge branches"
    },
    {
      value: "upgrade⬆️",
      name: "upgrade:  Upgrade dependencies"
    }
  ],

  scopes: [{
      name: "components"
    },
    {
      name: "view page"
    },
    {
      name: "model"
    }
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: "TICKET-",
  ticketNumberRegExp: "\\d{1,5}",

  // it needs to match the value for field type. Eg.: 'fix'
  /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nDenote the SCOPE of this change (optional):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer: "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?"
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  // skip any questions you want
  skipQuestions: [],

  // limit subject length
  subjectLimit: 100
};