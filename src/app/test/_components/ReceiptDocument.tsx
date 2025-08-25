"use client"

import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import dynamic from 'next/dynamic';

// Type definitions
interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface ReceiptData {
  receiptNumber: string;
  date: string;
  time: string;
  cashier: string;
  company: CompanyInfo;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  cardLast4: string;
}

interface ReceiptDocumentProps {
  receiptData: ReceiptData;
}

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 2,
    color: '#666',
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  col1: {
    width: '50%',
  },
  col2: {
    width: '50%',
    textAlign: 'right',
  },
  itemsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  itemName: {
    width: '40%',
  },
  itemQty: {
    width: '15%',
    textAlign: 'center',
  },
  itemPrice: {
    width: '20%',
    textAlign: 'right',
  },
  itemTotal: {
    width: '25%',
    textAlign: 'right',
  },
  totalSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  totalLabel: {
    width: '75%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  totalAmount: {
    width: '25%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  }
});

// Sample receipt data
const sampleReceipt: ReceiptData = {
  receiptNumber: 'RCP-2024-001',
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
  cashier: 'John Doe',
  company: {
    name: 'Your Store Name',
    address: '123 Main Street',
    city: 'City, State 12345',
    phone: '(555) 123-4567',
    email: 'info@yourstore.com'
  },
  items: [
    { name: 'Coffee - Large', quantity: 2, price: 4.99, total: 9.98 },
    { name: 'Sandwich - BLT', quantity: 1, price: 7.50, total: 7.50 },
    { name: 'Chips', quantity: 1, price: 2.25, total: 2.25 },
    { name: 'Soda - Medium', quantity: 1, price: 2.99, total: 2.99 }
  ],
  subtotal: 22.72,
  tax: 1.82,
  total: 24.54,
  paymentMethod: 'Credit Card',
  cardLast4: '****1234'
};

// PDF Document Component
const ReceiptDocument: React.FC<ReceiptDocumentProps> = ({ receiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.companyName}>{receiptData.company.name}</Text>
        <Text style={styles.companyInfo}>{receiptData.company.address}</Text>
        <Text style={styles.companyInfo}>{receiptData.company.city}</Text>
        <Text style={styles.companyInfo}>{receiptData.company.phone}</Text>
        <Text style={styles.companyInfo}>{receiptData.company.email}</Text>
        <Text style={styles.receiptTitle}>QUOTATION</Text>
      </View>

      {/* Receipt Info */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.col1}>Receipt #: {receiptData.receiptNumber}</Text>
          <Text style={styles.col2}>Date: {receiptData.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col1}>Cashier: {receiptData.cashier}</Text>
          <Text style={styles.col2}>Time: {receiptData.time}</Text>
        </View>
      </View>

      {/* Items Header */}
      <View style={styles.itemsHeader}>
        <Text style={styles.itemName}>Item</Text>
        <Text style={styles.itemQty}>Qty</Text>
        <Text style={styles.itemPrice}>Price</Text>
        <Text style={styles.itemTotal}>Total</Text>
      </View>

      {/* Items */}
      {receiptData.items.map((item: ReceiptItem, index: number) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQty}>{item.quantity}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.itemTotal}>${item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalAmount}>${receiptData.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax:</Text>
          <Text style={styles.totalAmount}>${receiptData.tax.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalAmount}>${receiptData.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Payment Info */}
      <View style={styles.section}>
        <View style={styles.row}>
         {/*  <Text style={styles.col1}>Payment Method: {receiptData.paymentMethod}</Text> */}
          <Text style={styles.col2}>{receiptData.cardLast4}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
        <Text>Please keep this receipt for your records</Text>
      </View>
    </Page>
  </Document>
);

// Receipt Preview Component
const ReceiptPreview: React.FC<ReceiptDocumentProps> = ({ receiptData }) => (
  <div className="bg-white border border-gray-300 shadow-lg max-w-md mx-auto p-6 font-mono text-sm">
    {/* Header */}
    <div className="text-center mb-4">
      <h2 className="text-lg font-bold mb-1">{receiptData.company.name}</h2>
      <p className="text-xs text-gray-600 mb-0.5">{receiptData.company.address}</p>
      <p className="text-xs text-gray-600 mb-0.5">{receiptData.company.city}</p>
      <p className="text-xs text-gray-600 mb-0.5">{receiptData.company.phone}</p>
      <p className="text-xs text-gray-600 mb-2">{receiptData.company.email}</p>
      <h3 className="text-base font-bold mt-3">RECEIPT</h3>
    </div>

    {/* Receipt Info */}
    <div className="mb-4 text-xs">
      <div className="flex justify-between mb-1">
        <span>Receipt #: {receiptData.receiptNumber}</span>
        <span>Date: {receiptData.date}</span>
      </div>
      <div className="flex justify-between">
        <span>Cashier: {receiptData.cashier}</span>
        <span>Time: {receiptData.time}</span>
      </div>
    </div>

    {/* Items Header */}
    <div className="flex border-b border-black pb-1 mb-2 text-xs font-bold">
      <div className="w-2/5">Item</div>
      <div className="w-1/6 text-center">Qty</div>
      <div className="w-1/5 text-right">Price</div>
      <div className="w-1/4 text-right">Total</div>
    </div>

    {/* Items */}
    <div className="mb-4">
      {receiptData.items.map((item: ReceiptItem, index: number) => (
        <div key={index} className="flex text-xs mb-1">
          <div className="w-2/5 truncate">{item.name}</div>
          <div className="w-1/6 text-center">{item.quantity}</div>
          <div className="w-1/5 text-right">${item.price.toFixed(2)}</div>
          <div className="w-1/4 text-right">${item.total.toFixed(2)}</div>
        </div>
      ))}
    </div>

    {/* Totals */}
    <div className="border-t border-black pt-2 text-xs">
      <div className="flex justify-between mb-1">
        <span className="font-bold text-right flex-1 mr-2">Subtotal:</span>
        <span className="font-bold w-1/4 text-right">${receiptData.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="font-bold text-right flex-1 mr-2">Tax:</span>
        <span className="font-bold w-1/4 text-right">${receiptData.tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <span className="text-right flex-1 mr-2">TOTAL:</span>
        <span className="w-1/4 text-right">${receiptData.total.toFixed(2)}</span>
      </div>
    </div>

    {/* Payment Info */}
    <div className="mt-4 text-xs">
      <div className="flex justify-between">
        {/* <span>Payment Method: {receiptData.paymentMethod}</span> */}
        <span>{receiptData.cardLast4}</span>
      </div>
    </div>

    {/* Footer */}
    <div className="text-center mt-6 text-xs text-gray-600">
      <p className="mb-1">Thank you for your business!</p>
      <p>Please keep this receipt for your records</p>
    </div>
  </div>
);

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading PDF generator...</p>
  }
);

// Client-side PDF Download Component
const PDFDownloadButton: React.FC<{ receiptData: ReceiptData }> = ({ receiptData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="text-center">
        <div className="inline-block px-6 py-3 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed">
          Loading PDF Generator...
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <PDFDownloadLink
        document={<ReceiptDocument receiptData={receiptData} />}
        fileName={`receipt-${receiptData.receiptNumber}.pdf`}
        className="inline-block px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download Quotation PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

// Main Component
const PDFReceiptGenerator: React.FC = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData>(sampleReceipt);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const updateReceiptData = (field: keyof ReceiptData, value: any): void => {
    setReceiptData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateCompanyData = (field: keyof CompanyInfo, value: string): void => {
    setReceiptData(prev => ({
      ...prev,
      company: { ...prev.company, [field]: value }
    }));
  };

  const addItem = (): void => {
    const newItem: ReceiptItem = {
      name: 'New Item',
      quantity: 1,
      price: 0.00,
      total: 0.00
    };
    setReceiptData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (index: number, field: keyof ReceiptItem, value: string | number): void => {
    setReceiptData(prev => {
      const newItems: ReceiptItem[] = [...prev.items];
      
      if (field === 'name') {
        newItems[index] = { ...newItems[index], [field]: value as string };
      } else {
        newItems[index] = { ...newItems[index], [field]: value as number };
      }
      
      // Recalculate total for the item
      if (field === 'quantity' || field === 'price') {
        newItems[index].total = newItems[index].quantity * newItems[index].price;
      }
      
      // Recalculate receipt totals
      const subtotal: number = newItems.reduce((sum: number, item: ReceiptItem) => sum + item.total, 0);
      const tax: number = subtotal * 0.08; // 8% tax
      const total: number = subtotal + tax;
      
      return {
        ...prev,
        items: newItems,
        subtotal,
        tax,
        total
      };
    });
  };

  const removeItem = (index: number): void => {
    setReceiptData(prev => {
      const newItems: ReceiptItem[] = prev.items.filter((_, i) => i !== index);
      
      // Recalculate receipt totals
      const subtotal: number = newItems.reduce((sum: number, item: ReceiptItem) => sum + item.total, 0);
      const tax: number = subtotal * 0.08; // 8% tax
      const total: number = subtotal + tax;
      
      return {
        ...prev,
        items: newItems,
        subtotal,
        tax,
        total
      };
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => void
  ): void => {
    callback(event.target.value);
  };

  const handleNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (value: number) => void
  ): void => {
    const value = parseFloat(event.target.value) || 0;
    callback(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Quotation Generator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6 overflow-y-auto max-h-[90vh]">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quotation Details</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Quotation Number:</label>
                <input
                  type="text"
                  value={receiptData.receiptNumber}
                  onChange={(e) => handleInputChange(e, (value) => updateReceiptData('receiptNumber', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cashier:</label>
                <input
                  type="text"
                  value={receiptData.cashier}
                  onChange={(e) => handleInputChange(e, (value) => updateReceiptData('cashier', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
             {/*  <div>
                <label className="block text-sm font-medium mb-1">Payment Method:</label>
                <input
                  type="text"
                  value={receiptData.paymentMethod}
                  onChange={(e) => handleInputChange(e, (value) => updateReceiptData('paymentMethod', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div> */}
              
              <div>
                <label className="block text-sm font-medium mb-1">Card Last 4:</label>
                <input
                  type="text"
                  value={receiptData.cardLast4}
                  onChange={(e) => handleInputChange(e, (value) => updateReceiptData('cardLast4', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Company Info Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Store Name:</label>
                <input
                  type="text"
                  value={receiptData.company.name}
                  onChange={(e) => handleInputChange(e, (value) => updateCompanyData('name', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Address:</label>
                <input
                  type="text"
                  value={receiptData.company.address}
                  onChange={(e) => handleInputChange(e, (value) => updateCompanyData('address', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">City, State ZIP:</label>
                <input
                  type="text"
                  value={receiptData.company.city}
                  onChange={(e) => handleInputChange(e, (value) => updateCompanyData('city', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone:</label>
                <input
                  type="text"
                  value={receiptData.company.phone}
                  onChange={(e) => handleInputChange(e, (value) => updateCompanyData('phone', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  value={receiptData.company.email}
                  onChange={(e) => handleInputChange(e, (value) => updateCompanyData('email', value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Items</h2>
              <button
                onClick={addItem}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                type="button"
              >
                Add Item
              </button>
            </div>
            
            <div className="space-y-2">
              {receiptData.items.map((item: ReceiptItem, index: number) => (
                <div key={index} className="grid grid-cols-5 gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    placeholder="Item name"
                    className="p-2 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    placeholder="Qty"
                    className="p-2 border border-gray-300 rounded text-sm"
                    min="0"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="Price"
                    className="p-2 border border-gray-300 rounded text-sm"
                    min="0"
                  />
                  <div className="p-2 bg-gray-100 border border-gray-300 rounded text-sm text-right">
                    ${item.total.toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="text-right space-y-1">
                <div>Subtotal: ${receiptData.subtotal.toFixed(2)}</div>
                <div>Tax (8%): ${receiptData.tax.toFixed(2)}</div>
                <div className="text-lg font-bold">Total: ${receiptData.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Preview/Download Section */}
        <div className="bg-gray-50 p-4 rounded-lg overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Receipt Preview & Download</h2>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              type="button"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
          
          {showPreview && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 text-gray-700">Live Preview:</h3>
              <div className="max-h-96 overflow-y-auto border rounded-lg bg-gray-100 p-4">
                <ReceiptPreview receiptData={receiptData} />
              </div>
            </div>
          )}
          
          <PDFDownloadButton receiptData={receiptData} />
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">TypeScript Features:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• <strong>Type Safety:</strong> Fully typed interfaces and functions</li>
              <li>• <strong>Interface Definitions:</strong> ReceiptData, ReceiptItem, CompanyInfo</li>
              <li>• <strong>Type Guards:</strong> Proper type checking for inputs</li>
              <li>• <strong>Generic Types:</strong> Strongly typed event handlers</li>
              <li>• <strong>Null Safety:</strong> Proper handling of undefined values</li>
              <li>• <strong>IntelliSense:</strong> Better IDE support and autocompletion</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Enhanced Features:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Professional receipt layout</li>
              <li>• Complete company information editor</li>
              <li>• Dynamic item management (add/remove)</li>
              <li>• Automatic calculations with tax</li>
              <li>• Type-safe form handling</li>
              <li>• Input validation</li>
              <li>• Responsive design</li>
              <li>• <strong>SSR Compatible:</strong> Fixed Next.js build issues</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-2">TypeScript Installation:</h3>
        <div className="text-sm space-y-2 font-mono bg-gray-800 text-green-400 p-3 rounded">
          <div>npm install @react-pdf/renderer</div>
          <div>npm install --save-dev @types/react</div>
          <div># or with yarn</div>
          <div>yarn add @react-pdf/renderer</div>
          <div>yarn add --dev @types/react</div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Fixed Next.js SSR Issues:</h4>
          <div className="text-sm space-y-1 text-gray-600">
            <div>• Used dynamic imports for PDFDownloadLink</div>
            <div>• Added client-side check with useEffect</div>
            <div>• Disabled SSR for PDF components</div>
            <div>• Added loading states for better UX</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFReceiptGenerator;