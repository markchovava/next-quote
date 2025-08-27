"use client";
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Download, FileText } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import useQuoteStore from '@/app/_store/QuoteStore';
import QuotationPDFDocument from './QuotationPDFDocument';


// PDF Download Component
export default function PDFDownloadButton() {
    const [isGenerating, setIsGenerating] = useState(false);
    const { formData } = useQuoteStore();

    const handleDownload = async () => {
        try {
            setIsGenerating(true);
            
            // Generate PDF blob
            const blob = await pdf(<QuotationPDFDocument />).toBlob();
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `quotation-${formData.estimateNumber || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium transition-all duration-200 ${
                isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
            }`}
        >
            {isGenerating ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Generating PDF...
                </>
            ) : (
                <>
                    <Download size={16} />
                    Download PDF
                </>
            )}
        </button>
    );
};