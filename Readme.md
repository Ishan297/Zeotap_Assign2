# 🔄 ClickHouse-FlatFile Ingestion App

A web-based tool for bidirectional data ingestion between **ClickHouse** and **Flat Files (CSV)**. Users can authenticate via JWT, select columns, ingest data, and view record counts.

---

## 🧰 Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: ClickHouse
- **File Handling**: Multer, CSV Parser
- **Auth**: JWT Token for ClickHouse

---

## 🚀 Features

- 🔁 ClickHouse ↔ Flat File ingestion
- 🔐 JWT-based ClickHouse auth
- 📋 Column selection UI
- 📦 CSV file upload/download
- 📊 Record count reporting
- ✅ Error handling and statuses

---

## 📦 Prerequisites

- Node.js
- Docker (for ClickHouse)
- npm or yarn

---

## ⚙️ Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/clickhouse-flatfile-ingestion.git
cd clickhouse-flatfile-ingestion
