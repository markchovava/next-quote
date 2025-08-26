import React from 'react';
import { create } from 'zustand';

// Define TypeScript interfaces
interface Item {
  name: string;
  quantity: string;
  price: string;
  total: number;
}

interface FormInput {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyMobilePhone: string;
  companyWebsite: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  tax: number;
  grandTotal: number;
  estimateNumber: string;
  estimateDate: string;
  subtotal: number;
  items: Item[];
}

interface QuoteStore {
  formData: FormInput;
  errors: Record<string, string>;
  isSubmitting: boolean;
  setField: (field: keyof FormInput, value: string | number | Item[]) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, field: keyof Item, value: string | number) => void;
  calculateTotals: () => void;
  resetForm: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

const defaultItem: Item = {
  name: "",
  quantity: "",
  price: "",
  total: 0,
};

const defaultFormData: FormInput = {
  companyName: "",
  companyAddress: "",
  companyPhone: "",
  companyMobilePhone: "",
  companyWebsite: "",
  customerName: "",
  customerAddress: "",
  customerPhone: "",
  tax: 0,
  grandTotal: 0,
  estimateNumber: "",
  estimateDate: "",
  subtotal: 0,
  items: [] // Changed: Start with empty array instead of one empty item
};

// Zustand store for form management
const useQuoteStore = create<QuoteStore>((set, get) => ({
  // Form data
  formData: defaultFormData,
  // Form validation errors
  errors: {},
  // Loading state
  isSubmitting: false,

  // Set a field value
  setField: (field: keyof FormInput, value: string | number | Item[]) => 
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  // Error management
  setError: (field: string, error: string) =>
    set((state) => ({
      errors: {
        ...state.errors,
        [field]: error,
      },
    })),

  clearError: (field: string) =>
    set((state) => {
      const newErrors = { ...state.errors };
      delete newErrors[field];
      return { errors: newErrors };
    }),

  clearAllErrors: () => set({ errors: {} }),

  // Item management
  addItem: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        items: [...state.formData.items, { ...defaultItem }], // Changed: Add to end instead of beginning
      },
    })),

  removeItem: (index: number) =>
    set((state) => ({
      formData: {
        ...state.formData,
        items: state.formData.items.filter((_, i) => i !== index),
      },
    })),

  updateItem: (index: number, field: keyof Item, value: string | number) =>
    set((state) => {
      const updatedItems = [...state.formData.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      
      // Calculate item total if quantity or price changes
      if (field === 'quantity' || field === 'price') {
        const quantity = parseFloat(updatedItems[index].quantity) || 0;
        const price = parseFloat(updatedItems[index].price) || 0;
        updatedItems[index].total = quantity * price;
      }

      return {
        formData: {
          ...state.formData,
          items: updatedItems,
        },
      };
    }),

  // Calculate subtotal, tax, and grand total
  calculateTotals: () =>
    set((state) => {
      const subtotal = state.formData.items.reduce((sum, item) => sum + item.total, 0);
      const taxAmount = subtotal * (state.formData.tax / 100);
      const grandTotal = subtotal + taxAmount;

      return {
        formData: {
          ...state.formData,
          subtotal,
          grandTotal,
        },
      };
    }),

  // Reset form to initial state
  resetForm: () =>
    set({
      formData: { ...defaultFormData, items: [] }, // Changed: Reset to empty array
      errors: {},
      isSubmitting: false,
    }),

  // Set submitting state
  setSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
}));

export default useQuoteStore;