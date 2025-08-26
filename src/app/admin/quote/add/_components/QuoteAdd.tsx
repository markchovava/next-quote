"use client"
import TextInput from '@/app/_components/form-inputs/TextInput';
import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import useQuoteStore from '@/app/_store/QuoteStore';




export default function QuoteAdd() {
  const {
    formData,
    errors,
    setField,
    addItem,
    removeItem,
    updateItem,
    calculateTotals,
    clearError
  } = useQuoteStore();

  console.log("formData", formData)

  // State for the new item input row
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  // Recalculate totals whenever items change
  useEffect(() => {
    calculateTotals();
  }, [formData.items, formData.tax, calculateTotals]);

  const handleItemChange = (index: number, field: keyof typeof formData.items[0], value: string) => {
    updateItem(index, field, value);
    clearError(`items.${index}.${field}`);
  };

  const handleNewItemChange = (field: keyof typeof newItem, value: string) => {
    setNewItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    // Add the item to the store
    addItem();
    
    // Get the new item index (last item)
    const newIndex = formData.items.length;
    
    // Update the newly added item with the values from newItem state
    if (newItem.name) updateItem(newIndex, 'name', newItem.name);
    if (newItem.quantity) updateItem(newIndex, 'quantity', newItem.quantity);
    if (newItem.price) updateItem(newIndex, 'price', newItem.price);
    
    // Clear the new item form
    setNewItem({
      name: '',
      quantity: '',
      price: ''
    });
  };

  // Calculate total for the new item preview
  const newItemTotal = (parseFloat(newItem.quantity) || 0) * (parseFloat(newItem.price) || 0);

  return (
    <>
      <section className='w-full pt-[5rem] pb-[6rem]'>
        <div className='w-[92%] mx-auto flex items-center justify-between mb-8'>

        </div>
        <div className='w-[92%] mx-auto grid lg:grid-cols-2 grid-cols-1 gap-8'>
          {/* Company Information */}
          <div className='bg-white drop-shadow px-6 py-4'>
            <h2 className='font-light text-[2rem] leading-tight'>Company Information</h2>
            <div className='h-[1rem]' />
            <div className='space-y-4'>
              <TextInput 
                label="Company Name"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(value) => setField('companyName', value)}
                error={errors.companyName}
              />
              <TextInput 
                label="Address"
                placeholder="Enter company address"
                value={formData.companyAddress}
                onChange={(value) => setField('companyAddress', value)}
                error={errors.companyAddress}
              />
              <TextInput 
                label="Phone"
                placeholder="Enter phone number"
                value={formData.companyPhone}
                onChange={(value) => setField('companyPhone', value)}
                error={errors.companyPhone}
                type="tel"
              />
              <TextInput 
                label="Mobile Phone"
                placeholder="Enter mobile phone"
                value={formData.companyMobilePhone}
                onChange={(value) => setField('companyMobilePhone', value)}
                error={errors.companyMobilePhone}
                type="tel"
              />
              <TextInput 
                label="Website"
                placeholder="Enter website URL"
                value={formData.companyWebsite}
                onChange={(value) => setField('companyWebsite', value)}
                error={errors.companyWebsite}
                type="url"
              />
            </div>
          </div>

          {/* Bill To */}
          <div className='bg-white drop-shadow px-6 py-4'>
            <h2 className='font-light text-[2rem]'>Bill To</h2>
            <div className='h-[1rem]' />
            <div className='space-y-4'>
              <TextInput 
                label="Customer Name"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={(value) => setField('customerName', value)}
                error={errors.customerName}
              />
              <TextInput 
                label="Customer Address"
                placeholder="Enter customer address"
                value={formData.customerAddress}
                onChange={(value) => setField('customerAddress', value)}
                error={errors.customerAddress}
              />
              <TextInput 
                label="Customer Phone"
                placeholder="Enter customer phone"
                value={formData.customerPhone}
                onChange={(value) => setField('customerPhone', value)}
                error={errors.customerPhone}
                type="tel"
              />
              <TextInput 
                label="Estimate Number"
                placeholder="Enter estimate number"
                value={formData.estimateNumber}
                onChange={(value) => setField('estimateNumber', value)}
                error={errors.estimateNumber}
              />
              <TextInput 
                label="Estimate Date"
                placeholder="Select date"
                value={formData.estimateDate}
                onChange={(value) => setField('estimateDate', value)}
                error={errors.estimateDate}
                type="date"
              />
            </div>
          </div>
        </div>

        <div className='h-8' />

        {/* Quote Items */}
        <div className='w-[92%] mx-auto bg-white drop-shadow px-6 py-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-light text-[2rem]'>Quote Items</h2>
          </div>

          {/* Items Header - Only show when there are items */}
        <div className='w-full grid grid-cols-6 gap-4 mb-4 font-semibold'>
            <div className='col-span-2'>Item Name</div>
            <div className='col-span-1'>Quantity</div>
            <div className='col-span-1'>Price</div>
            <div className='col-span-1'>Total</div>
            <div className='col-span-1'>Action</div>
        </div>
        

          {/* New Item Input Row - Always Present */}
          <div className='w-full grid grid-cols-6 gap-4 mb-4 border-b-2 border-dashed border-gray-300 pb-4'>
            <div className='col-span-2'>
              <TextInput 
                label=""
                placeholder="Enter item name"
                value={newItem.name}
                onChange={(value) => handleNewItemChange('name', value)}
              />
            </div>
            <div className='col-span-1'>
              <TextInput 
                label=""
                placeholder="0"
                value={newItem.quantity}
                onChange={(value) => handleNewItemChange('quantity', value)}
                type="number"
              />
            </div>
            <div className='col-span-1'>
              <TextInput 
                label=""
                placeholder="0.00"
                value={newItem.price}
                onChange={(value) => handleNewItemChange('price', value)}
                type="number"
              />
            </div>
            <div className='col-span-1 flex items-center'>
              <div className='bg-gray-50 px-3 py-2 rounded-lg w-full text-center border-2 border-dashed border-gray-300'>
                ${newItemTotal.toFixed(2)}
              </div>
            </div>
            <div className='col-span-1 flex items-center'>
              <button 
                onClick={handleAddItem}
                disabled={!newItem.name.trim()}
                className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>
          </div>

          {/* Existing Items List */}
          {formData.items.map((item, index) => (
            <div key={index} className='w-full grid grid-cols-6 gap-4 mb-4'>
              <div className='col-span-2'>
                <TextInput 
                  label=""
                  placeholder="Enter item name"
                  value={item.name}
                  onChange={(value) => handleItemChange(index, 'name', value)}
                  error={errors[`items.${index}.name`]}
                />
              </div>
              <div className='col-span-1'>
                <TextInput 
                  label=""
                  placeholder="0"
                  value={item.quantity}
                  onChange={(value) => handleItemChange(index, 'quantity', value)}
                  error={errors[`items.${index}.quantity`]}
                  type="number"
                />
              </div>
              <div className='col-span-1'>
                <TextInput 
                  label=""
                  placeholder="0.00"
                  value={item.price}
                  onChange={(value) => handleItemChange(index, 'price', value)}
                  error={errors[`items.${index}.price`]}
                  type="number"
                />
              </div>
              <div className='col-span-1 flex items-center'>
                <div className='bg-gray-100 px-3 py-2 rounded-lg w-full text-center'>
                  ${item.total.toFixed(2)}
                </div>
              </div>
              <div className='col-span-1 flex items-center'>
                <button 
                  onClick={() => removeItem(index)}
                  className='text-red-500 hover:text-red-700 p-2'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Totals Section */}
          <div className='border-t pt-4 mt-8'>
            <div className='w-full max-w-md ml-auto space-y-4'>
              <TextInput 
                label="Tax (%)"
                placeholder="0"
                value={formData.tax.toString()}
                onChange={(value) => setField('tax', parseFloat(value) || 0)}
                error={errors.tax}
                type="number"
              />
              <div className='flex justify-between'>
                <span className='font-semibold'>Subtotal:</span>
                <span>${formData.subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-semibold'>Tax:</span>
                <span>${(formData.subtotal * (formData.tax / 100)).toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-xl font-bold border-t pt-2'>
                <span>Grand Total:</span>
                <span>${formData.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}