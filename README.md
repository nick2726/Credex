# ZenAudit AI

ZenAudit AI is a full-stack AI spend optimization platform that helps startups, engineering teams, and founders identify unnecessary AI expenses, optimize subscriptions, and discover smarter pricing alternatives. The platform generates personalized financial audits, estimated savings reports, and actionable AI infrastructure recommendations.

Built using React, Node.js, and MySQL, ZenAudit AI focuses on helping startups reduce AI burn while improving operational efficiency and governance.

---

## 🚀 Live Demo

🔗 https://your-deployment-link.com

---

## 📸 Screenshots

### Landing Page

![Landing Page](./screenshots/landing-page.png)

### AI Stack Audit Form

![Audit Form](./screenshots/audit-form.png)

### Audit Results Dashboard

![Audit Results](./screenshots/audit-results.png)

---

## ✨ Features

### ✅ AI Spend Audit Engine
- Detects AI subscription overspending
- Suggests cheaper pricing plans
- Recommends optimized AI stacks
- Calculates monthly and yearly savings
- Provides finance-oriented recommendations

### ✅ Personalized AI Insights
- AI-generated optimization summaries
- Usage-based recommendations
- Governance and cost efficiency analysis
- Fallback handling for API failures

### ✅ Multi-Tool AI Stack Support
Supports:
- Cursor
- Claude
- ChatGPT
- GitHub Copilot
- Gemini
- OpenAI API
- Anthropic API
- Windsurf

### ✅ Shareable Public Reports
- Public audit URLs
- Open Graph previews
- Twitter card support
- Privacy-safe report generation

### ✅ Lead Capture System
- Email capture workflow
- Company & role fields
- MySQL data storage
- Transactional confirmation emails
- Rate limiting & abuse protection

### ✅ Modern UI/UX
- Responsive design
- Mobile optimized
- Clean dashboard interface
- Accessible components
- Lighthouse optimized

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js

### Database
- MySQL

### AI Integration
- Anthropic API / OpenAI API

### Deployment
- Vercel / Netlify
- Render / Railway

---

## 📂 Project Structure

```bash
ZenAudit-AI/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── utils/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── models/
│   └── config/
│
├── tests/
├── docs/
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/zenaudit-ai.git
cd zenaudit-ai
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 🔐 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=zenaudit_ai

OPENAI_API_KEY=your_api_key
ANTHROPIC_API_KEY=your_api_key

EMAIL_API_KEY=your_email_service_key

CLIENT_URL=http://localhost:5173
```

---

## 🗄 Database Setup

```sql
CREATE DATABASE zenaudit_ai;
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/audit` | Generate AI spend audit |
| GET | `/api/report/:id` | Fetch public report |
| POST | `/api/lead` | Capture lead information |

---

## 🧮 Audit Logic

The audit engine evaluates:
- Team-size compatibility
- Pricing plan efficiency
- AI usage optimization
- Alternative vendor pricing
- Estimated annual savings

### Example Recommendations

| Current Tool | Recommendation | Estimated Savings |
|--------------|----------------|------------------|
| Claude Team | Claude Pro | $200/month |
| Cursor Business | Cursor Pro | $80/month |
| ChatGPT Team | ChatGPT Plus | $120/month |

---

## 🧪 Testing

Run tests:

```bash
npm run test
```

Run lint checks:

```bash
npm run lint
```

---

## 🚀 Deployment

### Frontend
- Vercel
- Netlify

### Backend
- Render
- Railway
- Fly.io

### Database
- PlanetScale
- AWS RDS
- Railway MySQL

---

## 📈 Lighthouse Goals

- Performance ≥ 85
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 85

---

## 🔒 Security Features

- Environment variable protection
- Input validation
- SQL injection prevention
- XSS sanitization
- Rate limiting
- Honeypot anti-spam protection

---

## ⚖️ Key Decisions & Trade-offs

### 1. Rule-Based Audit Engine
Financial recommendations remain deterministic and reliable instead of AI-generated.

### 2. AI Used Only for Summaries
LLMs are used only for personalized explanations, not calculations.

### 3. React + Node.js Architecture
Chosen for fast development, scalability, and maintainability.

### 4. Public Shareable Reports
No-login flow improves virality and user conversion.

### 5. MySQL Database
Relational structure better supports pricing and reporting workflows.

---

## 🔮 Future Improvements

- PDF export support
- AI benchmarking dashboard
- Browser extension integration
- Team collaboration features
- Referral system
- Real-time pricing sync

---

## 🤝 Contributing

```bash
fork → clone → create branch → commit → push → create PR
```

---

## 👨‍💻 Author

**Nikhil Kumar Jha**

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- OpenAI
- Anthropic
- React Community
- Tailwind CSS
- Credex Assignment Team

---

## 📚 Additional Documentation

This repository also includes:
- ARCHITECTURE.md
- DEVLOG.md
- REFLECTION.md
- TESTS.md
- PRICING_DATA.md
- PROMPTS.md
- GTM.md
- ECONOMICS.md
- USER_INTERVIEWS.md
- LANDING_COPY.md
- METRICS.md

Prepared as part of the Credex Web Development Internship Assignment. :contentReference[oaicite:0]{index=0}
