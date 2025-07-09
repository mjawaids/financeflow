import React from 'react'
import { useAccounts } from '../hooks/useAccounts'
import { useTransactions } from '../hooks/useTransactions'
import { useGoals } from '../hooks/useGoals'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Target,
  Wallet
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { accounts, getTotalBalance } = useAccounts()
  const { transactions, getMonthlyStats } = useTransactions()
  const { goals } = useGoals()
  
  const totalBalance = getTotalBalance()
  const monthlyStats = getMonthlyStats()
  const recentTransactions = transactions.slice(0, 5)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const StatCard = ({ title, value, icon: Icon, change, changeType, gradient }: any) => (
    <div className={`bg-gradient-to-r ${gradient} p-6 rounded-2xl text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {changeType === 'positive' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm">{change}</span>
            </div>
          )}
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <Link
          to="/transactions/new"
          className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          icon={DollarSign}
          gradient="from-blue-600 to-blue-700"
        />
        <StatCard
          title="Monthly Income"
          value={formatCurrency(monthlyStats.income)}
          icon={TrendingUp}
          gradient="from-emerald-600 to-emerald-700"
        />
        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(monthlyStats.expense)}
          icon={TrendingDown}
          gradient="from-red-600 to-red-700"
        />
        <StatCard
          title="Net Income"
          value={formatCurrency(monthlyStats.income - monthlyStats.expense)}
          icon={Calendar}
          gradient="from-purple-600 to-purple-700"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
            <Link
              to="/transactions"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
                <Link
                  to="/transactions/new"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2 inline-block"
                >
                  Add your first transaction
                </Link>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'income' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : transaction.type === 'expense'
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : transaction.type === 'expense' ? (
                        <ArrowDownRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.description || 'Transaction'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : transaction.type === 'expense'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}
                      {formatCurrency(transaction.amount).replace(/^./, '')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Accounts & Goals */}
        <div className="space-y-6">
          {/* Accounts Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Accounts</h2>
              <Link
                to="/accounts"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Manage
              </Link>
            </div>
            
            <div className="space-y-4">
              {accounts.slice(0, 3).map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{account.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{account.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(account.balance)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{account.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Goals</h2>
              <Link
                to="/goals"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {goals.slice(0, 2).map((goal) => {
                const progress = (goal.current_amount / goal.target_amount) * 100
                return (
                  <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <p className="font-medium text-gray-900 dark:text-white">{goal.name}</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {progress.toFixed(0)}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatCurrency(goal.current_amount)}</span>
                      <span>{formatCurrency(goal.target_amount)}</span>
                    </div>
                  </div>
                )
              })}
              {goals.length === 0 && (
                <div className="text-center py-4">
                  <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No goals set yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}