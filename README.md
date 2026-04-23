# Multi-Container App

> Simple multi-container Docker app (Node.js + MongoDB) — a clean starting template for containerized web services. Get from zero to running stack in under a minute.

**Built by:** Shane Brazelton + Claude Anthropic (ShaneBrain ecosystem, Hazel Green AL)

---

## Quick Start

```bash
git clone https://github.com/thebardchat/multi-container-app.git
cd multi-container-app
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## What's Included

A fully wired multi-container application demonstrating:

- **Node.js + Express** web app with EJS templating
- **MongoDB** companion container with persistent volume
- **docker-compose** orchestration — single command to start everything
- **Todo App** demo — full CRUD cycle across the Node.js ↔ MongoDB boundary

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Node.js + Express |
| Templates | EJS |
| Database | MongoDB |
| Container | Docker + docker-compose |

---

## Project Structure

```
multi-container-app/
├── compose.yaml          # Docker Compose orchestration
├── app/
│   ├── Dockerfile        # Node.js app container
│   ├── server.js         # Express server
│   ├── package.json      # Dependencies
│   ├── models/           # MongoDB models
│   ├── routes/           # Express routes
│   └── views/            # EJS templates
└── README.md
```

---

## Use This As a Starting Point

1. Clone the repo
2. `docker compose up -d`
3. Verify it works at localhost:3000
4. Replace the todo app with your own routes, models, and views
5. Deploy to any Docker-capable host

No cloud account required. No external services. Runs entirely on your machine.

---

## GitHub Pages

[thebardchat.github.io/multi-container-app](https://thebardchat.github.io/multi-container-app/)

---

## Related Ecosystem Repos

| Repo | Purpose |
|------|---------|
| [AI-Trainer-MAX](https://github.com/thebardchat/AI-Trainer-MAX) | 5-phase local AI curriculum |
| [angelcloud-actual](https://github.com/thebardchat/angelcloud-actual) | Angel Cloud wellness platform |
| [thought-tree](https://github.com/thebardchat/thought-tree) | Visual knowledge browser |
| [srm-dispatch](https://github.com/thebardchat/srm-dispatch) | SRM Concrete dispatch tool |
| [mini-shanebrain](https://github.com/thebardchat/mini-shanebrain) | Multi-platform social bot |
| [shanebrain-learning](https://github.com/thebardchat/shanebrain-learning) | Auto-learning ingestion pipeline |
| [treasures](https://github.com/thebardchat/treasures) | Recovered artifacts hub |

---

## Constitution

This project operates under the [ShaneBrain Constitution](https://github.com/thebardchat/constitution/blob/main/CONSTITUTION.md).

See [CONSTITUTION.md](./CONSTITUTION.md) in this repo.

---

## Built With

| Partner | Role |
|---------|------|
| **Claude by Anthropic** · [claude.ai](https://claude.ai) | Co-built this entire ecosystem |
| **Raspberry Pi 5** · [raspberrypi.com](https://www.raspberrypi.com) | Local AI compute backbone |
| **Pironman 5-MAX** · [sunfounder.com](https://www.sunfounder.com) | NVMe RAID chassis |

---

Built with [Claude + ShaneBrain](https://claude.ai/referral/4fAMYN9Ing) — AI tools for humans who build.
