import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Account } from '../types/database'

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAccounts(data || [])
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createAccount = async (account: Omit<Account, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert([account])
        .select()
        .single()

      if (error) throw error
      setAccounts(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error creating account:', error)
      throw error
    }
  }

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setAccounts(prev => prev.map(acc => acc.id === id ? data : acc))
      return data
    } catch (error) {
      console.error('Error updating account:', error)
      throw error
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('accounts')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      setAccounts(prev => prev.filter(acc => acc.id !== id))
    } catch (error) {
      console.error('Error deleting account:', error)
      throw error
    }
  }

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0)
  }

  return {
    accounts,
    loading,
    createAccount,
    updateAccount,
    deleteAccount,
    getTotalBalance,
    refetch: fetchAccounts,
  }
}