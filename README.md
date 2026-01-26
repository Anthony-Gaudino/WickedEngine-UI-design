# WickedEngine UI design proposal

A web UI design proposal for WickedEngine created using React, ShadCN and
Tailwind.

## Why create this using web technologies if the engine is written in C++

The idea here is to create an UI proposal that could later be implemented in the
engine. It's much easier to create UIs for web than for a game engine and there
are many libraries and components readily available. The UI can be viewed and
interacted with; and changes can be easy to implement.

Changes to the UI design can be iterated until it's in a state suits the engine
and it's usage and then it could be implemented in the engine itself.

[penpot](https://penpot.app/) could possibly be used instead, but it doesn't
offer the high level of interactivity that a web UI provides, and since it's not
code based it's harder to have control of changes.

## Setup

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```
