import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import AccountsPage from './components/AccountsPage';
import CategoriesPage from './components/CategoriesPage';
import TransactionsPage from './components/TransactionsPage';
import WalletsPage from './components/WalletsPage';
import SettingsPage from './components/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/transactions/new" element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionForm />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/accounts" element={
                <ProtectedRoute>
                  <Layout>
                    <AccountsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/categories" element={
                <ProtectedRoute>
                  <Layout>
                    <CategoriesPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/wallets" element={
                <ProtectedRoute>
                  <Layout>
                    <WalletsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <SettingsPage />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;