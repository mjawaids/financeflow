# FinanceFlow - Personal Finance Manager

A modern, feature-rich personal finance application built with React, TypeScript, and Tailwind CSS. Track expenses, manage budgets, and achieve your financial goals with an intuitive interface that works offline.

![FinanceFlow](https://via.placeholder.com/800x400/2563eb/ffffff?text=FinanceFlow+Personal+Finance+Manager)

## ✨ Features

### 🔐 Authentication
- Email/password authentication
- Secure user registration and login
- Protected routes and user sessions

### 💰 Financial Management
- **Multiple Account Types**: Bank accounts, cash, mobile wallets, credit cards, investments
- **Transaction Types**: Expenses, income, and transfers between accounts
- **Smart Categories**: Pre-built expense and income categories with custom icons
- **Budget Wallets**: Create wallets with spending limits (monthly or one-time)
- **Real-time Balance Updates**: Account balances update automatically with transactions

### 🧠 Smart Input
- **Natural Language Processing**: Enter transactions like "200 #Cash @Grocery eggs bread today"
- **Auto-parsing**: Extracts amount, account, category, description, and date from natural text
- **Date Recognition**: Supports "today", "tomorrow", "2nd June", "June 1st" formats
- **Quick Entry**: Dropdown suggestions for accounts (#) and categories (@)

### 📊 Analytics & Insights
- **Dashboard Overview**: Monthly income/expense stats, total balance, account summaries
- **Visual Charts**: Beautiful graphs and statistics
- **Historical Data**: View balance at any point in time
- **Monthly Reports**: Track spending patterns and financial health

### 📱 Progressive Web App (PWA)
- **Offline Support**: Full functionality without internet connection
- **Installable**: Add to home screen on mobile and desktop
- **Background Sync**: Automatically syncs data when connection is restored
- **Service Worker**: Caches resources for optimal performance

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern aesthetics with gradients and smooth animations
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive**: Optimized for all screen sizes
- **Accessibility**: Built with accessibility best practices

### 🔧 Advanced Features
- **Multi-currency Support**: Handle different currencies for international accounts
- **Data Export/Import**: CSV import/export functionality
- **Transaction Templates**: Save frequently used transaction patterns
- **Recurring Transactions**: Set up automatic recurring payments
- **Search & Filter**: Find transactions quickly with advanced filtering

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/financeflow-app.git
   cd financeflow-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **PWA**: Service Worker, Web App Manifest
- **State Management**: React Context API
- **Storage**: LocalStorage (with future database integration planned)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── TransactionForm.tsx # Transaction entry form
│   ├── AccountsPage.tsx # Account management
│   ├── CategoriesPage.tsx # Category management
│   ├── WalletsPage.tsx  # Wallet/budget management
│   ├── SettingsPage.tsx # User settings
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   ├── DataContext.tsx # Application data
│   └── ThemeContext.tsx # Theme management
├── utils/             # Utility functions
│   └── transactionParser.ts # Natural language parsing
└── ...
```

## 🎯 Usage Examples

### Natural Language Transaction Entry

```
"200 #Cash @Grocery eggs bread today"
→ Amount: 200, Account: Cash, Category: Grocery, Description: eggs bread, Date: today

"2nd June @Salary #Bank 5000 monthly salary"
→ Amount: 5000, Account: Bank, Category: Salary, Description: monthly salary, Date: June 2nd

"50 @Food lunch yesterday"
→ Amount: 50, Category: Food, Description: lunch, Date: yesterday
```

### Account Types
- **Bank Account**: Traditional bank accounts
- **Cash**: Physical cash management
- **Mobile Wallet**: Digital wallets (PayPal, Venmo, etc.)
- **Credit Card**: Credit card tracking
- **Investment**: Investment account monitoring

### Transaction Types
- **Expense**: Money going out
- **Income**: Money coming in
- **Transfer**: Moving money between your accounts

## 🔮 Roadmap

- [ ] Database integration (Supabase/Firebase)
- [ ] Social authentication (Google, Apple)
- [ ] Advanced analytics and reporting
- [ ] Bill reminders and notifications
- [ ] Receipt scanning and OCR
- [ ] Investment tracking
- [ ] Multi-user support (family accounts)
- [ ] API integrations (bank connections)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by **Jawaid** - [Jawaid.dev](http://Jawaid.dev)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern fintech applications
- Built with love for the open-source community

---

**FinanceFlow** - Take control of your finances with style! 💰✨