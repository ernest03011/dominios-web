**name**: Bug Report

**description**: Report a bug or unexpected behavior

**title:** "[Bug] "

**labels**: [bug]

**assignees**: []

**body**:
  - type: markdown
    attributes:
      value: "Thanks for reporting a bug! Please fill out the form below."

  - type: input
    id: environment
    attributes:
      label: Environment
      description: What environment are you running this in? (e.g., OS, browser, PHP version)
      placeholder: "e.g., Windows 10, Chrome 123, PHP 8.2"
    validations:
      required: false

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: How can we reproduce the bug?
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. Scroll down to '...'
        4. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What did you expect to happen?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened?
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots or Logs
      description: If applicable, add screenshots or relevant logs.
    validations:
      required: false
