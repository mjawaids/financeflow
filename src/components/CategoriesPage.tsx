import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Plus, Tag, Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'expense' | 'income',
    icon: 'Tag'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      updateCategory(editingCategory, formData);
    } else {
      addCategory(formData);
    }
    
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      type: 'expense',
      icon: 'Tag'
    });
  };

  const handleEdit = (category: any) => {
    setFormData({
      name: category.name,
      type: category.type,
      icon: category.icon
    });
    setEditingCategory(category.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const incomeCategories = categories.filter(cat => cat.type === 'income');

  const CategoryCard: React.FC<{ category: any }> = ({ category }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            category.type === 'expense' 
              ? 'bg-red-100 dark:bg-red-900/30' 
              : 'bg-emerald-100 dark:bg-emerald-900/30'
          }`}>
            <Tag className={`w-5 h-5 ${
              category.type === 'expense' 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-emerald-600 dark:text-emerald-400'
            }`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{category.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(category)}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(category.id)}
            className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize your transactions with custom categories
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Sections */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Expense Categories */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Expense Categories ({expenseCategories.length})
            </h2>
          </div>
          <div className="space-y-3">
            {expenseCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
            {expenseCategories.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No expense categories yet
              </div>
            )}
          </div>
        </div>

        {/* Income Categories */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Income Categories ({incomeCategories.length})
            </h2>
          </div>
          <div className="space-y-3">
            {incomeCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
            {incomeCategories.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No income categories yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                      formData.type === 'expense'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" />
                    <span>Expense</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                      formData.type === 'income'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Income</span>
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                    setFormData({
                      name: '',
                      type: 'expense',
                      icon: 'Tag'
                    });
                  }}
                  className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-semibold"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;