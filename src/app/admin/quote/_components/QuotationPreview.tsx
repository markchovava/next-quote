"use client"
import useQuoteStore from "@/app/_store/QuoteStore";
import { formatDate } from "@/app/_utils/formatDate";


// Quotation Preview Component
export default function QuotationPreview() {
    const { formData } = useQuoteStore();
    


    return (
        <div className="bg-white border-2 border-gray-300 shadow-xl max-w-[90%] mx-auto font-sans">
            <div className="h-[1rem]" />

            {/*  */}
            <section className="grid grid-cols-2 px-6 ">
                <div></div>
                <div className="flex flex-col justify-end items-end">
                    <h1 className="font-light text-[2.5rem] leading-tight">QUOTATION</h1>
                    <div className="h-[0.5rem]" />
                    {formData.companyName &&
                        <h5 className="font-medium uppercase leading-tight text-sm">
                            {formData.companyName}
                        </h5>
                    }
                    { formData.companyAddress && 
                    <h5 className="font-medium uppercase leading-tight text-sm">{formData.companyAddress}</h5>
                    }
                    <div className="h-[1rem]" />
                    { formData.companyPhone && 
                    <h5 className="leading-tight text-sm flex items-center gap-1">
                        Landline: 
                        <span className="font-medium">{formData.companyPhone}</span>
                    </h5>
                    }
                    { formData.companyMobilePhone &&
                    <h5 className="leading-tight text-sm flex items-center gap-1">
                        Mobile: 
                        <span className="font-medium">{formData.companyMobilePhone}</span>
                    </h5> }
                    {formData.companyWebsite &&
                    <h5 className="leading-tight text-sm flex items-center gap-1">
                        Website:
                        <span className="font-medium">{formData.companyWebsite} </span>
                    </h5>
                    }
                </div>
            </section>
            <div className="h-[1rem]" />
            <div className="w-full border-b border-gray-300" />
            <div className="h-[1rem]" />

            {/*  */}
            <section className="w-full grid grid-cols-3 gap-4 px-6">
                <div className="col-span-2">
                    <h3 className="font-light text-[1.6rem] leading-tight mb-2">Bill To</h3>
                    <h5 className="font-medium leading-tight text-sm flex justify-start gap-2">
                        {formData.customerName}
                    </h5>
                    <h5 className="font-medium leading-tight text-sm flex justify-start gap-2">
                        {formData.customerAddress}
                    </h5>
                    <div className="h-[1rem]" />
                     <h5 className="font-medium leading-tight text-sm flex justify-start gap-2">
                        {formData.customerPhone}
                    </h5>
                </div>
                <div className="flex flex-col gap-1">
                    {formData.estimateNumber &&
                    <h5 className="leading-tight font-light text-sm flex justify-end gap-2">
                        Estimate Number:
                        <span className="font-medium">{formData.estimateNumber} </span>
                    </h5>
                    }
                    {formData.estimateDate &&
                    <h5 className="leading-tight font-light text-sm flex justify-end gap-2">
                        Estimate Date:
                        <span className="font-medium">{formatDate(formData.estimateDate)} </span>
                    </h5>
                    }
                    {formData.validUntil &&
                     <h5 className="leading-tight font-light text-sm flex justify-end gap-2">
                        Valid Until:
                        <span className="font-medium">{formatDate(formData.validUntil)} </span>
                    </h5>
                    }
                    {formData.grandTotal > 0 &&
                    <h5 className="leading-tight py-1 px-1 bg-blue-100 font-light flex justify-end gap-2">
                        Grand Total:
                        <span className="font-medium text-blue-950">${formData.grandTotal.toFixed(2)} </span>
                    </h5>
                    }
                  
                </div>
            </section>
            <div className="h-[1rem]" />
            <div className="w-full border-b border-gray-300" />
            <div className="h-[1rem]" />

            <h2 className="font-light text-[1.6rem] px-6">Items</h2>
            <div className="h-[0.2rem]" />
            <div className="w-full border-b border-gray-300" />
            <div className="h-[0.3rem]" />
            {/* Table Header */}
            <section className="w-full bg-gray-100 text-gray-700 font-bold uppercase text-sm grid grid-cols-5 gap-4 py-2 px-6">
                <div className="col-span-2">Description</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Unit Price</div>
                <div className="text-right">Total</div>
            </section>
            {/* TABLE ROW */}
            {formData.items.length > 0 ? (
                formData.items.map((item, index) => (
                    <section className="w-full text-sm grid grid-cols-5 gap-4 py-2 px-6">
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
                    </section>
                ))
            ) : (
                <div className="grid grid-cols-5 px-6 gap-4 py-3 text-sm text-gray-500 text-center">
                    <div className="col-span-5">No items added yet</div>
                </div>
            )}
            {/* Totals Section */}
            <section className="px-6">
                <div className="border-t-2 border-gray-300 pt-4 ">
                    <div className="max-w-sm ml-auto space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Subtotal:</span>
                            <span>${formData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Tax ({formData.tax}%):</span>
                            <span>${(formData.subtotal * (formData.tax / 100)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold bg-blue-100 p-3 ">
                            <span>GRAND TOTAL:</span>
                            <span className="text-blue-950">${formData.grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="h-[2rem]" />

            {/* NOTES */}
            <section className="px-6">
                <h2 className="font-light text-[1.2rem]">Notes / Terms</h2>
                <ul className="mx-6 text-sm font-light list-disc">
                    <li>Client to provide electricity or backup 5.5KVA generator.</li>
                    <li>Furniture movement is the responsibility of the client.</li>
                    <li>Please note all prices are in United States Dollars (USD for Pricing Purposes).</li>
                    <li>For local RTGS payments, the Rate of the day is used.</li>
                </ul>
                <h2 className="font-light text-[1.2rem]">Payment Terms</h2>
                <ul className="mx-6 text-sm font-light list-disc">
                    <li>RTGS: Full payment on confirmation of order.</li>
                    <li>USD: 80% deposit, balance on completion of works.</li>
                </ul>
            </section>
             <div className="h-[5rem]" />


    
        </div>
    );
};