"use client"
import useQuoteStore from "@/app/_store/QuoteStore";


// Quotation Preview Component
export default function QuotationPreview() {
    const { formData } = useQuoteStore();
    
    return (
        <div className="bg-white border-2 border-gray-300 shadow-xl max-w-2xl mx-auto font-sans">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">
                        {formData.companyName || 'Your Company Name'}
                    </h1>
                    <p className="text-sm opacity-90 mb-1">
                        {formData.companyAddress || 'Company Address'}
                    </p>
                    <p className="text-sm opacity-90">
                        Phone: {formData.companyPhone || 'N/A'} | Mobile: {formData.companyMobilePhone || 'N/A'}
                    </p>
                    <p className="text-sm opacity-90">
                        Website: {formData.companyWebsite || 'N/A'}
                    </p>
                    <h2 className="text-xl font-bold mt-4 bg-white text-blue-800 inline-block px-4 py-1 rounded">
                        QUOTATION
                    </h2>
                </div>
            </div>

            <div className="p-6">
                {/* Quotation Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                    <div>
                        <span className="font-semibold text-gray-700">Estimate #: </span>
                        <span>{formData.estimateNumber || 'N/A'}</span>
                    </div>
                    <div className="text-right">
                        <span className="font-semibold text-gray-700">Date: </span>
                        <span>{formData.estimateDate || new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">
                        Bill To:
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-800">
                            {formData.customerName || 'Customer Name'}
                        </p>
                        <p className="text-gray-600 text-sm">
                            {formData.customerAddress || 'Customer Address'}
                        </p>
                        <p className="text-gray-600 text-sm">
                            Phone: {formData.customerPhone || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">
                        Items & Services
                    </h3>
                    <div className="overflow-hidden border border-gray-300 rounded-lg">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 bg-gray-100 p-3 font-semibold text-sm text-gray-700 border-b">
                            <div className="col-span-2">Description</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-right">Unit Price</div>
                            <div className="text-right">Total</div>
                        </div>
                        
                        {/* Table Body */}
                        {formData.items.length > 0 ? (
                            formData.items.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="grid grid-cols-5 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <div className="col-span-2 font-medium">
                                        {item.name || 'Untitled Item'}
                                    </div>
                                    <div className="text-center">
                                        {item.quantity || '0'}
                                    </div>
                                    <div className="text-right">
                                        ${parseFloat(item.price || '0').toFixed(2)}
                                    </div>
                                    <div className="text-right font-medium">
                                        ${item.total.toFixed(2)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="grid grid-cols-5 gap-4 p-3 text-sm text-gray-500 text-center">
                                <div className="col-span-5">No items added yet</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Totals Section */}
                <div className="border-t-2 border-gray-300 pt-4">
                    <div className="max-w-sm ml-auto space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Subtotal:</span>
                            <span>${formData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Tax ({formData.tax}%):</span>
                            <span>${(formData.subtotal * (formData.tax / 100)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold bg-blue-100 p-3 rounded-lg border-2 border-blue-300">
                            <span>GRAND TOTAL:</span>
                            <span className="text-blue-800">${formData.grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600 space-y-1">
                    <p className="font-medium">Thank you for your business!</p>
                    <p>This quotation is valid for 30 days from the date of issue.</p>
                    <p>Please contact us if you have any questions about this quotation.</p>
                </div>
            </div>
        </div>
    );
};