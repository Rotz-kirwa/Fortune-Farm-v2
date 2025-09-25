# Fortune Farm 🌱💰

Hey there! Welcome to Fortune Farm - my take on building an investment platform that actually makes sense. Think of it like MoneyTree, but built from scratch with modern tools and a lot of coffee.

## What's This All About?

I wanted to create something where people could invest their money and watch it grow, just like planting seeds and watching them become a harvest. The platform lets users:

- Sign up and manage their accounts securely
- Deposit money through M-Pesa (because who carries cash anymore?)
- Track their investments in a clean, simple dashboard
- Actually understand what's happening with their money

## How It's Built

I kept things simple but solid:

**The Frontend** (what you see)
- React with Vite for lightning-fast development
- Tailwind CSS because I'm not a designer but I want things to look good
- Clean, responsive design that works on your phone too

**The Backend** (the engine)
- Node.js and Express handling all the heavy lifting
- SQLite database (simple but effective)
- JWT authentication (your data stays yours)
- M-Pesa integration for seamless payments

## Getting Started

Want to run this locally? Here's how:

### Backend First
```bash
cd backend
npm install
npm start
```

### Then the Frontend
```bash
cd frontend
npm install
npm run dev
```

Open your browser to `http://localhost:5173` and you're good to go!

## The M-Pesa Magic ✨

This is where things get interesting. I've integrated M-Pesa so users can deposit money directly from their phones. No bank transfers, no complicated processes - just enter your phone number, amount, and approve the transaction on your phone.

*Note: Currently using sandbox credentials for testing. For production, you'll need real M-Pesa API credentials from Safaricom.*

## What I Learned

Building this taught me a lot about:
- Handling real money transactions (scary but exciting)
- Building secure authentication systems
- Creating responsive UIs that don't suck
- Integrating with third-party APIs (M-Pesa can be... temperamental)

## Future Plans

- Add investment packages with different risk levels
- Build a proper admin dashboard
- Add email notifications for transactions
- Maybe add some charts because everyone loves charts

## Tech Stack (For the Curious)

**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, SQLite, JWT, bcryptjs
**Payments:** M-Pesa Daraja API
**Deployment:** Railway (backend), Vercel (frontend)

---

*Built with ❤️ and way too much caffeine*
