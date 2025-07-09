import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { Dashboard } from './components/Dashboard'
import { Layout } from './components/Layout'
import { TrendingUp, Loader2 } from 'lucide-react'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading FinanceFlow...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="relative z-10 px-4 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">FinanceFlow</span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Take Control of Your
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"> Finances</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Track expenses, manage budgets, and achieve your financial goals with our intuitive personal finance manager.
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Smart Analytics', desc: 'Get insights into your spending patterns' },
                  { title: 'Secure & Private', desc: 'Bank-level security for your data' },
                  { title: 'Multi-Account', desc: 'Manage all accounts in one place' },
                  { title: 'Goal Tracking', desc: 'Set and achieve financial goals' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Auth form */}
            <div className="lg:pl-12">
              <AuthForm onSuccess={() => window.location.reload()} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<div>Transactions Page</div>} />
          <Route path="/transactions/new" element={<div>New Transaction Page</div>} />
          <Route path="/accounts" element={<div>Accounts Page</div>} />
          <Route path="/goals" element={<div>Goals Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App