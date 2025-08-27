"use client";
import { Document, Page, Text, View } from '@react-pdf/renderer';
import useQuoteStore from '@/app/_store/QuoteStore';
import { PdfStyles } from './PdfStyles';





// PDF Document Component
export default function QuotationPDFDocument1() {
    const { formData } = useQuoteStore();
    
    return (
        <Document>
            <Page size="A4" style={ PdfStyles.page}>
                <View style={PdfStyles.section}>
                    <View></View>
                </View>
                {/* Header */}
                <View style={ PdfStyles.header}>
                    <Text style={ PdfStyles.companyName}>
                        {formData.companyName || 'Your Company Name'}
                    </Text>
                    <Text style={ PdfStyles.companyInfo}>
                        {formData.companyAddress || 'Company Address'}
                    </Text>
                    <Text style={ PdfStyles.companyInfo}>
                        Phone: {formData.companyPhone || 'N/A'} | Mobile: {formData.companyMobilePhone || 'N/A'}
                    </Text>
                    <Text style={ PdfStyles.companyInfo}>
                        Website: {formData.companyWebsite || 'N/A'}
                    </Text>
                    <Text style={ PdfStyles.quotationTitle}>QUOTATION</Text>
                </View>

                {/* Quotation Info */}
                <View style={ PdfStyles.section}>
                    <View style={ PdfStyles.row}>
                        <Text style={ PdfStyles.col1}>
                            Estimate #: {formData.estimateNumber || 'N/A'}
                        </Text>
                        <Text style={ PdfStyles.col2}>
                            Date: {formData.estimateDate || new Date().toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                {/* Customer Information */}
                <View style={[ PdfStyles.section,  PdfStyles.customerSection]}>
                    <Text style={ PdfStyles.sectionTitle}>Bill To:</Text>
                    <Text style={ PdfStyles.col1}>
                        {formData.customerName || 'Customer Name'}
                    </Text>
                    <Text style={ PdfStyles.col1}>
                        {formData.customerAddress || 'Customer Address'}
                    </Text>
                    <Text style={ PdfStyles.col1}>
                        Phone: {formData.customerPhone || 'N/A'}
                    </Text>
                </View>

                {/* Items Table */}
                <View style={ PdfStyles.itemsTable}>
                    <Text style={ PdfStyles.sectionTitle}>Items & Services</Text>
                    
                    {/* Items Header */}
                    <View style={ PdfStyles.itemsHeader}>
                        <Text style={[ PdfStyles.itemName,  PdfStyles.itemHeaderText]}>Description</Text>
                        <Text style={[ PdfStyles.itemQty,  PdfStyles.itemHeaderText]}>Qty</Text>
                        <Text style={[ PdfStyles.itemPrice,  PdfStyles.itemHeaderText]}>Unit Price</Text>
                        <Text style={[ PdfStyles.itemTotal,  PdfStyles.itemHeaderText]}>Total</Text>
                    </View>

                    {/* Items */}
                    {formData.items.length > 0 ? formData.items.map((item, index) => (
                        <View key={index} style={ PdfStyles.itemRow}>
                            <Text style={ PdfStyles.itemName}>{item.name || 'Untitled Item'}</Text>
                            <Text style={ PdfStyles.itemQty}>{item.quantity || '0'}</Text>
                            <Text style={ PdfStyles.itemPrice}>
                                ${parseFloat(item.price || '0').toFixed(2)}
                            </Text>
                            <Text style={ PdfStyles.itemTotal}>${item.total.toFixed(2)}</Text>
                        </View>
                    )) : (
                        <View style={ PdfStyles.itemRow}>
                            <Text style={ PdfStyles.itemName}>No items added</Text>
                            <Text style={ PdfStyles.itemQty}>0</Text>
                            <Text style={ PdfStyles.itemPrice}>$0.00</Text>
                            <Text style={ PdfStyles.itemTotal}>$0.00</Text>
                        </View>
                    )}
                </View>

                {/* Totals */}
                <View style={ PdfStyles.totalSection}>
                    <View style={ PdfStyles.totalRow}>
                        <Text style={ PdfStyles.totalLabel}>Subtotal:</Text>
                        <Text style={ PdfStyles.totalAmount}>${formData.subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={ PdfStyles.totalRow}>
                        <Text style={ PdfStyles.totalLabel}>Tax ({formData.tax}%):</Text>
                        <Text style={ PdfStyles.totalAmount}>
                            ${(formData.subtotal * (formData.tax / 100)).toFixed(2)}
                        </Text>
                    </View>
                    <View style={[ PdfStyles.totalRow,  PdfStyles.grandTotal]}>
                        <Text style={ PdfStyles.totalLabel}>GRAND TOTAL:</Text>
                        <Text style={ PdfStyles.totalAmount}>${formData.grandTotal.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={ PdfStyles.footer}>
                    <Text>Thank you for your business!</Text>
                    <Text>This quotation is valid for 30 days from the date of issue.</Text>
                    <Text>Please contact us if you have any questions about this quotation.</Text>
                </View>
            </Page>
        </Document>
    );
};