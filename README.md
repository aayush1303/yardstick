
# 💸 Yardstick – Personal Finance Visualizer

A simple, responsive personal finance tracking application built with **Next.js**, **React**, **shadcn/ui**, **MongoDB**, and **Recharts**.

> GitHub Repository: [aayush1303/yardstick](https://github.com/aayush1303/yardstick.git)

---

## Features

###  Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions (amount, date, description)
- View all transactions in a list
- Monthly expenses bar chart
- Form validation using Zod and React Hook Form

###  Stage 2: Categories
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard summary:
  - Total expenses
  - Category breakdown
  - Most recent transactions

###  Stage 3: Budgeting
- Set monthly category budgets
- Budget vs Actual bar chart
- Budget insight text summaries (e.g., "Overspent by $20")
- Budget charts and spending visualizations

---

## 🧱 Tech Stack

- **Next.js (App Router)**
- **React**
- **shadcn/ui**
- **Tailwind CSS**
- **MongoDB (via API routes)**
- **Recharts**

---

## 🛠️ Getting Started

Clone the repository:

```bash
git clone https://github.com/aayush1303/yardstick.git
cd yardstick
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

This project is ready to deploy on [Vercel](https://vercel.com).

To deploy:
1. Push the code to GitHub.
2. Connect the repo on Vercel.
3. Set up your environment variables (e.g., MongoDB connection string).
4. Deploy and enjoy 🎉

---

## 📁 Project Structure

```
app/
  api/
    budgets/
    transactions/
  layout.js
  page.js

components/
  transactions/
  budgets/
  summary/
  ui/

hooks/
  useBudgets.js
  useTransactions.js

utils/
  chartUtils.js

public/
  favicon.png

styles/
  globals.css
```

