**name**: Feature Request

**description**: Suggest a new feature or improvement

**title**: "[Feature] "

**labels**: [enhancement]

**assignees**: []

**body**:
  - type: markdown
    attributes:
      value: "Thank you for your suggestion! Please complete the following form."

  - type: input
    id: summary
    attributes:
      label: Summary
      description: Short summary of your idea
      placeholder: "e.g., Add dark mode option"
    validations:
      required: true

  - type: textarea
    id: motivation
    attributes:
      label: Motivation
      description: Why should this be added? What problem does it solve?
    validations:
      required: true

  - type: textarea
    id: details
    attributes:
      label: Feature Details
      description: Describe the feature you'd like to see.
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Have you considered other solutions or workarounds?
    validations:
      required: false

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Add any other context, links, or screenshots here.
    validations:
      required: false
