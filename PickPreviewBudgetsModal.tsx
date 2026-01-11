import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface Budget {
  id: string;
  name: string;
  icon: string;
  groupName: string;
  groupColor: string;
  budget: number;
  spent: number;
}

interface PickPreviewBudgetsModalProps {
  onClose: () => void;
  onSave: () => void;
}

export function PickPreviewBudgetsModal({ onClose, onSave }: PickPreviewBudgetsModalProps) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBudgetsAndPreferences();
  }, []);

  const loadBudgetsAndPreferences = async () => {
    try {
      // Load all budgets
      const budgetsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/budgets`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );

      if (budgetsResponse.ok) {
        const data = await budgetsResponse.json();
        if (data.budgets && Object.keys(data.budgets).length > 0) {
          // Convert budgets object to array, excluding leftover cash
          const budgetsArray = Object.entries(data.budgets)
            .filter(([id]) => id !== 'leftover-cash')
            .map(([id, budget]: [string, any]) => ({
              id,
              name: budget.name,
              icon: budget.icon,
              groupName: budget.groupName,
              groupColor: budget.groupColor,
              budget: budget.budget,
              spent: budget.spent || 0
            }));
          
          setBudgets(budgetsArray);
        }
      }

      // Load user's preview preferences
      const preferencesResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/preview-budgets`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );

      if (preferencesResponse.ok) {
        const data = await preferencesResponse.json();
        if (data.selectedBudgets && Array.isArray(data.selectedBudgets)) {
          setSelectedBudgets(data.selectedBudgets);
        }
      }
    } catch (error) {
      console.error('Error loading budgets and preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBudget = (budgetId: string) => {
    setSelectedBudgets(prev => {
      if (prev.includes(budgetId)) {
        // Deselect
        return prev.filter(id => id !== budgetId);
      } else {
        // Select (max 3)
        if (prev.length >= 3) {
          toast.error('You can only select up to 3 budgets');
          return prev;
        }
        return [...prev, budgetId];
      }
    });
  };

  const handleSave = async () => {
    if (selectedBudgets.length === 0) {
      toast.error('Please select at least one budget');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/preview-budgets`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ selectedBudgets })
        }
      );

      if (response.ok) {
        toast.success('Preview budgets updated!');
        onSave();
        onClose();
      } else {
        toast.error('Failed to save preview budgets');
      }
    } catch (error) {
      console.error('Error saving preview budgets:', error);
      toast.error('Failed to save preview budgets');
    }
  };

  // Group budgets by category
  const financialGoals = budgets.filter(b => b.groupName === 'Financial Goals');
  const fixedExpenses = budgets.filter(b => b.groupName === 'Fixed Expenses');
  const variableExpenses = budgets.filter(b => b.groupName === 'Variable Expenses');

  const renderBudgetGroup = (groupName: string, groupBudgets: Budget[], color: string) => {
    if (groupBudgets.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="h-1 w-6 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 
            className="text-[13px] text-[#162a2c]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 500
            }}
          >
            {groupName}
          </h3>
        </div>
        <div className="space-y-2">
          {groupBudgets.map(budget => {
            const isSelected = selectedBudgets.includes(budget.id);
            return (
              <button
                key={budget.id}
                onClick={() => toggleBudget(budget.id)}
                className={`w-full p-3 rounded-md flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-[#5e6c5b] text-white shadow-md'
                    : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[16px]"
                    style={{
                      filter: 'grayscale(100%)',
                      opacity: 0.6
                    }}
                  >
                    {budget.icon}
                  </span>
                  <span 
                    className="text-[12px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    {budget.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className={`text-[11px] ${isSelected ? 'text-white' : 'text-[#686867]'}`}
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    ${budget.spent.toFixed(0)} / ${budget.budget.toFixed(0)}
                  </span>
                  {isSelected && (
                    <Check className="size-4 text-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#E9F0F1] rounded-lg w-full max-w-[375px] max-h-[85vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-[#686867]/20 p-4 flex items-center justify-between">
          <div>
            <h2 
              className="text-[#162a2c] text-[18px]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 500
              }}
            >
              Pick Preview Budgets
            </h2>
            <p 
              className="text-[#686867] text-[11px] mt-1"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Select up to 3 budgets to preview ({selectedBudgets.length}/3)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#E9F0F1] transition-colors"
          >
            <X className="size-5 text-[#686867]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-8">
              <p 
                className="text-[#686867] text-[12px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Loading budgets...
              </p>
            </div>
          ) : budgets.length === 0 ? (
            <div className="text-center py-8">
              <p 
                className="text-[#686867] text-[12px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                No budgets found. Create budgets first!
              </p>
            </div>
          ) : (
            <>
              {renderBudgetGroup('Financial Goals', financialGoals, '#5e6c5b')}
              {renderBudgetGroup('Fixed Expenses', fixedExpenses, '#ffa47d')}
              {renderBudgetGroup('Variable Expenses', variableExpenses, '#686867')}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-[#686867]/20 p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-md text-[12px] bg-white text-[#686867] border border-[#686867]/30 hover:bg-[#E9F0F1] transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedBudgets.length === 0}
            className={`flex-1 px-4 py-2.5 rounded-md text-[12px] text-white transition-colors ${
              selectedBudgets.length === 0
                ? 'bg-[#686867]/50 cursor-not-allowed'
                : 'bg-[#686867] hover:bg-[#162a2c]'
            }`}
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Save Selection
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
