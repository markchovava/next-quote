import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from "@/app/_utils/formatDate";
import useQuoteStore from '@/app/_store/QuoteStore';
import { PdfStyles } from './PdfStyles';




export default function QuotationPDFDocument() {
    const { formData } = useQuoteStore();
    
    return (
        <Document>
            <Page size="A4" style={PdfStyles.page}>
                <View>
                    <View style={PdfStyles.spacer} />
                    
                    {/* Header Section */}
                    <View style={PdfStyles.headerSection}>
                        <View style={PdfStyles.headerLeft} />
                        <View style={PdfStyles.headerRight}>
                            <Text style={PdfStyles.quotationTitle}>QUOTATION</Text>
                            <View style={PdfStyles.smallSpacer} />
                            {formData.companyName && (
                                <Text style={PdfStyles.companyName}>
                                    {formData.companyName}
                                </Text>
                            )}
                            {formData.companyAddress && (
                                <Text style={PdfStyles.companyDetails}>
                                    {formData.companyAddress}
                                </Text>
                            )}
                            <View style={PdfStyles.spacer} />
                            {formData.companyPhone && (
                                <View style={PdfStyles.contactInfo}>
                                    <Text style={PdfStyles.contactLabel}>Landline:</Text>
                                    <Text style={PdfStyles.contactValue}>{formData.companyPhone}</Text>
                                </View>
                            )}
                            {formData.companyMobilePhone && (
                                <View style={PdfStyles.contactInfo}>
                                    <Text style={PdfStyles.contactLabel}>Mobile:</Text>
                                    <Text style={PdfStyles.contactValue}>{formData.companyMobilePhone}</Text>
                                </View>
                            )}
                            {formData.companyWebsite && (
                                <View style={PdfStyles.contactInfo}>
                                    <Text style={PdfStyles.contactLabel}>Website:</Text>
                                    <Text style={PdfStyles.contactValue}>{formData.companyWebsite}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    
                    <View style={PdfStyles.divider} />
                    
                    {/* Bill To Section */}
                    <View style={PdfStyles.billToSection}>
                        <View style={PdfStyles.billToLeft}>
                            <Text style={PdfStyles.billToTitle}>Bill To</Text>
                            <Text style={PdfStyles.customerInfo}>
                                {formData.customerName}
                            </Text>
                            <Text style={PdfStyles.customerInfo}>
                                {formData.customerAddress}
                            </Text>
                            <View style={PdfStyles.spacer} />
                            <Text style={PdfStyles.customerInfo}>
                                {formData.customerPhone}
                            </Text>
                        </View>
                        <View style={PdfStyles.billToRight}>
                            {formData.estimateNumber && (
                                <View style={PdfStyles.estimateInfo}>
                                    <Text>Estimate Number:</Text>
                                    <Text style={PdfStyles.estimateValue}>{formData.estimateNumber}</Text>
                                </View>
                            )}
                            {formData.estimateDate && (
                                <View style={PdfStyles.estimateInfo}>
                                    <Text>Estimate Date:</Text>
                                    <Text style={PdfStyles.estimateValue}>{formatDate(formData.estimateDate)}</Text>
                                </View>
                            )}
                            {formData.validUntil && (
                                <View style={PdfStyles.estimateInfo}>
                                    <Text>Valid Until:</Text>
                                    <Text style={PdfStyles.estimateValue}>{formatDate(formData.validUntil)}</Text>
                                </View>
                            )}
                            {formData.grandTotal > 0 && (
                                <View style={PdfStyles.grandTotalRow}>
                                    <Text>Grand Total:</Text>
                                    <Text style={PdfStyles.grandTotalValue}>${formData.grandTotal.toFixed(2)}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    
                    <View style={PdfStyles.divider} />
                    
                    {/* Items Section */}
                    <Text style={PdfStyles.itemsTitle}>Items</Text>
                    <View style={PdfStyles.tinySpacer} />
                    <View style={PdfStyles.divider} />
                    <View style={PdfStyles.tinySpacer} />
                    
                    {/* Table Header */}
                    <View style={PdfStyles.tableHeader}>
                        <Text style={PdfStyles.columnDescription}>Description</Text>
                        <Text style={PdfStyles.columnQuantity}>Quantity</Text>
                        <Text style={PdfStyles.columnPrice}>Unit Price</Text>
                        <Text style={PdfStyles.columnTotal}>Total</Text>
                    </View>
                    
                    {/* Table Rows */}
                    {formData.items.length > 0 ? (
                        formData.items.map((item, index) => (
                            <View key={index} style={PdfStyles.tableRow}>
                                <Text style={[PdfStyles.columnDescription, { fontWeight: 600 }]}>
                                    {item.name || 'Untitled Item'}
                                </Text>
                                <Text style={PdfStyles.columnQuantity}>
                                    {item.quantity || '0'}
                                </Text>
                                <Text style={PdfStyles.columnPrice}>
                                    ${parseFloat(item.price || '0').toFixed(2)}
                                </Text>
                                <Text style={PdfStyles.columnTotal}>
                                    ${item.total.toFixed(2)}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={PdfStyles.noItems}>No items added yet</Text>
                    )}
                    
                    {/* Totals Section */}
                    <View style={PdfStyles.totalsSection}>
                        <View style={PdfStyles.totalsContainer}>
                            <View style={PdfStyles.totalsBox}>
                                <View style={PdfStyles.totalRow}>
                                    <Text style={PdfStyles.totalLabel}>Subtotal:</Text>
                                    <Text>${formData.subtotal.toFixed(2)}</Text>
                                </View>
                                <View style={PdfStyles.totalRow}>
                                    <Text style={PdfStyles.totalLabel}>Tax ({formData.tax}%):</Text>
                                    <Text>${(formData.subtotal * (formData.tax / 100)).toFixed(2)}</Text>
                                </View>
                                <View style={PdfStyles.finalTotalRow}>
                                    <Text>GRAND TOTAL:</Text>
                                    <Text style={PdfStyles.finalTotalValue}>${formData.grandTotal.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={PdfStyles.largeSpacer} />
                    
                    {/* Notes Section */}
                    <View style={PdfStyles.notesSection}>
                        <Text style={PdfStyles.notesTitle}>Notes / Terms</Text>
                        <View style={PdfStyles.notesList}>
                            <View style={PdfStyles.noteItem}>
                                <Text style={PdfStyles.bullet}>•</Text>
                                <Text style={PdfStyles.noteText}>Client to provide electricity or backup 5.5KVA generator.</Text>
                            </View>
                            <View style={PdfStyles.noteItem}>
                                <Text style={PdfStyles.bullet}>•</Text>
                                <Text style={PdfStyles.noteText}>Furniture movement is the responsibility of the client.</Text>
                            </View>
                            <View style={PdfStyles.noteItem}>
                                <Text style={PdfStyles.bullet}>•</Text>
                                <Text style={PdfStyles.noteText}>Please note all prices are in United States Dollars (USD for Pricing Purposes).</Text>
                            </View>
                            <View style={PdfStyles.noteItem}>
                                <Text style={PdfStyles.bullet}>•</Text>
                                <Text style={PdfStyles.noteText}>For local RTGS payments, the Rate of the day is used.</Text>
                            </View>
                        </View>
                        
                        <Text style={PdfStyles.notesTitle}>Payment Terms</Text>
                        <View style={PdfStyles.notesList}>
                            <View style={PdfStyles.noteItem}>
                                <Text style={PdfStyles.bullet}>•</Text>
                                <Text style={PdfStyles.noteText}>RTGS: Full payment on confirmation of order.</Text>
                            </View>
                            <View style={PdfStyles.noteItem}>
                                <Text style={PdfStyles.bullet}>•</Text>
                                <Text style={PdfStyles.noteText}>USD: 80% deposit, balance on completion of works.</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={PdfStyles.xlSpacer} />
                </View>
            </Page>
        </Document>

    )
}

