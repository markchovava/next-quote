"use client";
import { Download, FileText } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import useQuoteStore from '@/app/_store/QuoteStore';



// PDF Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontSize: 11,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
        paddingBottom: 10,
    },
    companyName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1a202c',
    },
    companyInfo: {
        fontSize: 10,
        marginBottom: 2,
        color: '#4a5568',
    },
    quotationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: '#2d3748',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2d3748',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 3,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    col1: {
        width: '50%',
        fontSize: 10,
    },
    col2: {
        width: '50%',
        textAlign: 'right',
        fontSize: 10,
    },
    itemsTable: {
        marginTop: 20,
        marginBottom: 20,
    },
    itemsHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
        paddingBottom: 5,
        marginBottom: 10,
        backgroundColor: '#f7fafc',
        padding: 5,
    },
    itemHeaderText: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    itemRow: {
        flexDirection: 'row',
        marginBottom: 3,
        padding: 3,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e2e8f0',
    },
    itemName: {
        width: '40%',
        fontSize: 9,
        paddingRight: 5,
    },
    itemQty: {
        width: '15%',
        textAlign: 'center',
        fontSize: 9,
    },
    itemPrice: {
        width: '20%',
        textAlign: 'right',
        fontSize: 9,
    },
    itemTotal: {
        width: '25%',
        textAlign: 'right',
        fontSize: 9,
        fontWeight: 'bold',
    },
    totalSection: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#000000',
    },
    totalRow: {
        flexDirection: 'row',
        marginBottom: 5,
        paddingHorizontal: 5,
    },
    totalLabel: {
        width: '75%',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 11,
    },
    totalAmount: {
        width: '25%',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 11,
    },
    grandTotal: {
        backgroundColor: '#f7fafc',
        padding: 8,
        borderWidth: 1,
        borderColor: '#000000',
        marginTop: 5,
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 9,
        color: '#4a5568',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 15,
    },
    customerSection: {
        backgroundColor: '#f7fafc',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    }
});

// PDF Document Component
export default function QuotationPDFDocument() {
    const { formData } = useQuoteStore();
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.companyName}>
                        {formData.companyName || 'Your Company Name'}
                    </Text>
                    <Text style={styles.companyInfo}>
                        {formData.companyAddress || 'Company Address'}
                    </Text>
                    <Text style={styles.companyInfo}>
                        Phone: {formData.companyPhone || 'N/A'} | Mobile: {formData.companyMobilePhone || 'N/A'}
                    </Text>
                    <Text style={styles.companyInfo}>
                        Website: {formData.companyWebsite || 'N/A'}
                    </Text>
                    <Text style={styles.quotationTitle}>QUOTATION</Text>
                </View>

                {/* Quotation Info */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.col1}>
                            Estimate #: {formData.estimateNumber || 'N/A'}
                        </Text>
                        <Text style={styles.col2}>
                            Date: {formData.estimateDate || new Date().toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                {/* Customer Information */}
                <View style={[styles.section, styles.customerSection]}>
                    <Text style={styles.sectionTitle}>Bill To:</Text>
                    <Text style={styles.col1}>
                        {formData.customerName || 'Customer Name'}
                    </Text>
                    <Text style={styles.col1}>
                        {formData.customerAddress || 'Customer Address'}
                    </Text>
                    <Text style={styles.col1}>
                        Phone: {formData.customerPhone || 'N/A'}
                    </Text>
                </View>

                {/* Items Table */}
                <View style={styles.itemsTable}>
                    <Text style={styles.sectionTitle}>Items & Services</Text>
                    
                    {/* Items Header */}
                    <View style={styles.itemsHeader}>
                        <Text style={[styles.itemName, styles.itemHeaderText]}>Description</Text>
                        <Text style={[styles.itemQty, styles.itemHeaderText]}>Qty</Text>
                        <Text style={[styles.itemPrice, styles.itemHeaderText]}>Unit Price</Text>
                        <Text style={[styles.itemTotal, styles.itemHeaderText]}>Total</Text>
                    </View>

                    {/* Items */}
                    {formData.items.length > 0 ? formData.items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                            <Text style={styles.itemName}>{item.name || 'Untitled Item'}</Text>
                            <Text style={styles.itemQty}>{item.quantity || '0'}</Text>
                            <Text style={styles.itemPrice}>
                                ${parseFloat(item.price || '0').toFixed(2)}
                            </Text>
                            <Text style={styles.itemTotal}>${item.total.toFixed(2)}</Text>
                        </View>
                    )) : (
                        <View style={styles.itemRow}>
                            <Text style={styles.itemName}>No items added</Text>
                            <Text style={styles.itemQty}>0</Text>
                            <Text style={styles.itemPrice}>$0.00</Text>
                            <Text style={styles.itemTotal}>$0.00</Text>
                        </View>
                    )}
                </View>

                {/* Totals */}
                <View style={styles.totalSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal:</Text>
                        <Text style={styles.totalAmount}>${formData.subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tax ({formData.tax}%):</Text>
                        <Text style={styles.totalAmount}>
                            ${(formData.subtotal * (formData.tax / 100)).toFixed(2)}
                        </Text>
                    </View>
                    <View style={[styles.totalRow, styles.grandTotal]}>
                        <Text style={styles.totalLabel}>GRAND TOTAL:</Text>
                        <Text style={styles.totalAmount}>${formData.grandTotal.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Thank you for your business!</Text>
                    <Text>This quotation is valid for 30 days from the date of issue.</Text>
                    <Text>Please contact us if you have any questions about this quotation.</Text>
                </View>
            </Page>
        </Document>
    );
};