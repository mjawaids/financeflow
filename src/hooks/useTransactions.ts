import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Transaction } from '../types/database'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
        .single()

      if (error) throw error
      setTransactions(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error creating transaction:', error)
      throw error
    }
  }

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setTransactions(prev => prev.map(trans => trans.id === id ? data : trans))
      return data
    } catch (error) {
      console.error('Error updating transaction:', error)
      throw error
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTransactions(prev => prev.filter(trans => trans.id !== id))
    } catch (error) {
      console.error('Error deleting transaction:', error)
      throw error
    }
  }

  const getMonthlyStats = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthlyTransactions = transactions.filter(trans => {
      const transDate = new Date(trans.date)
      return transDate.getMonth() === currentMonth && transDate.getFullYear() === currentYear
    })
    
    const income = monthlyTransactions
      .filter(trans => trans.type === 'income')
      .reduce((sum, trans) => sum + trans.amount, 0)
    
    const expense = monthlyTransactions
      .filter(trans => trans.type === 'expense')
      .reduce((sum, trans) => sum + trans.amount, 0)
    
    return { income, expense }
  }

  return {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getMonthlyStats,
    refetch: fetchTransactions,
  }
}