"use client";
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FileText } from 'lucide-react';
import PDFDownloadButton from '../quote/_components/PDFDownloadButton';
import QuotationPreview from '../quote/_components/QuotationPreview';

// Define the animation variants with proper typing
const variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            type: 'spring' as const,
            duration: 1,
        }
    },
};

// Interface for component props
interface ModalCompProps {
    isModal: boolean;
    setIsModal: (isModal: boolean) => void;
}



// Main component with explicit return type
const ModalComp: React.FC<ModalCompProps> = ({ isModal, setIsModal }) => {
    const [activeTab, setActiveTab] = useState<'preview' | 'pdf'>('preview');
    
    // Handler function with proper typing
    const handleClose = (): void => {
        setIsModal(false);
    };

    return (
        <>
            <AnimatePresence>
                {isModal && (
                    <motion.section
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="w-[100vw] h-[100vh] fixed top-0 left-0 z-[200] overflow-y-auto"
                    >
                        {/* Backdrop */}
                        <div 
                            className="absolute z-0 top-0 left-0 w-[100%] h-[100%] bg-black opacity-40"
                            onClick={handleClose}
                            role="button"
                            tabIndex={0}
                            aria-label="Close modal"
                        />
                        
                        {/* Modal content container */}
                        <div className="w-[100%] h-[100%] absolute z-10 overflow-auto scroll__width py-[2rem]">
                            <section className="mx-auto lg:w-[80%] xl:w-[70%] w-[95%] bg-white text-black rounded-2xl shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-blue-600" size={24} />
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Quotation Preview
                                        </h2>
                                    </div>
                                    
                                    {/* Tab Navigation */}
                                    <div className="flex bg-gray-200 rounded-lg p-1">
                                        <button
                                            onClick={() => setActiveTab('preview')}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                                activeTab === 'preview'
                                                    ? 'bg-white text-blue-600 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            Preview
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('pdf')}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                                activeTab === 'pdf'
                                                    ? 'bg-white text-blue-600 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            Download
                                        </button>
                                    </div>
                                    
                                    <button 
                                        onClick={handleClose}
                                        className="hover:text-red-600 transition-all ease-in-out duration-200 p-2 hover:bg-red-50 rounded-full"
                                        type="button"
                                        aria-label="Close modal"
                                    >
                                        <IoClose className="text-2xl" />
                                    </button>
                                </div>
                                
                                {/* Modal content */}
                                <div className="p-6">
                                    {activeTab === 'preview' && (
                                        <div className="overflow-auto max-h-[75vh]">
                                            <QuotationPreview />
                                        </div>
                                    )}
                                    
                                    {activeTab === 'pdf' && (
                                        <div className="text-center py-12">
                                            <div className="mb-6">
                                                <FileText size={64} className="mx-auto text-blue-600 mb-4" />
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                    Download Quotation PDF
                                                </h3>
                                                <p className="text-gray-600 max-w-md mx-auto">
                                                    Generate and download a professional PDF version of your quotation. 
                                                    The PDF will include all your company details, customer information, 
                                                    and itemized services.
                                                </p>
                                            </div>
                                            
                                            <div className="flex justify-center gap-4">
                                                <PDFDownloadButton />
                                                <button
                                                    onClick={() => setActiveTab('preview')}
                                                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                                                >
                                                    <FileText size={16} />
                                                    Back to Preview
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
};

export default ModalComp;