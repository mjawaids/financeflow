import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Goal } from '../types/database'

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGoals(data || [])
    } catch (error) {
      console.error('Error fetching goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const createGoal = async (goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([goal])
        .select()
        .single()

      if (error) throw error
      setGoals(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error creating goal:', error)
      throw error
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setGoals(prev => prev.map(goal => goal.id === id ? data : goal))
      return data
    } catch (error) {
      console.error('Error updating goal:', error)
      throw error
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)

      if (error) throw error
      setGoals(prev => prev.filter(goal => goal.id !== id))
    } catch (error) {
      console.error('Error deleting goal:', error)
      throw error
    }
  }

  return {
    goals,
    loading,
    createGoal,
    updateGoal,
    deleteGoal,
    refetch: fetchGoals,
  }
}