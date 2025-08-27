import { StyleSheet } from "@react-pdf/renderer";



// Create PDF styles
export const PdfStyles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    spacer: {
        height: 16,
    },
    smallSpacer: {
        height: 8,
    },
    tinySpacer: {
        height: 4,
    },
    largeSpacer: {
        height: 32,
    },
    xlSpacer: {
        height: 80,
    },
    
    // Header section
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingTop: 16,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    quotationTitle: {
        fontSize: 30,
        fontWeight: 300,
        letterSpacing: 2,
    },
    companyName: {
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        lineHeight: 1.2,
        marginTop: 8,
    },
    companyDetails: {
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        lineHeight: 1.2,
        marginTop: 2,
    },
    contactInfo: {
        fontSize: 11,
        lineHeight: 1.2,
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactLabel: {
        fontWeight: 400,
    },
    contactValue: {
        fontWeight: 600,
        marginLeft: 4,
    },
    
    // Divider
    divider: {
        borderBottom: '1px solid #d1d5db',
        width: '100%',
        marginVertical: 16,
    },
    
    // Bill to section
    billToSection: {
        flexDirection: 'row',
        paddingHorizontal: 0,
        gap: 16,
    },
    billToLeft: {
        flex: 2,
    },
    billToRight: {
        flex: 1,
        gap: 4,
    },
    billToTitle: {
        fontSize: 20,
        fontWeight: 300,
        lineHeight: 1.2,
        marginBottom: 8,
    },
    customerInfo: {
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1.2,
        marginBottom: 2,
    },
    estimateInfo: {
        fontSize: 11,
        fontWeight: 300,
        lineHeight: 1.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    estimateValue: {
        fontWeight: 600,
    },
    grandTotalRow: {
        fontSize: 11,
        fontWeight: 300,
        lineHeight: 1.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
        backgroundColor: '#dbeafe',
        padding: 4,
    },
    grandTotalValue: {
        fontWeight: 600,
        color: '#1e3a8a',
    },
    
    // Items section
    itemsTitle: {
        fontSize: 20,
        fontWeight: 300,
        paddingHorizontal: 0,
        marginBottom: 3,
    },
    
    // Table styles
    tableHeader: {
        backgroundColor: '#f3f4f6',
        color: '#374151',
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        gap: 16,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        gap: 16,
        fontSize: 11,
    },
    columnDescription: {
        flex: 2,
    },
    columnQuantity: {
        flex: 1,
        textAlign: 'center',
    },
    columnPrice: {
        flex: 1,
        textAlign: 'right',
    },
    columnTotal: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 600,
    },
    noItems: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 11,
        paddingVertical: 12,
        paddingHorizontal: 0,
    },
    
    // Totals section
    totalsSection: {
        paddingHorizontal: 0,
    },
    totalsContainer: {
        borderTop: '2px solid #d1d5db',
        paddingTop: 16,
        alignItems: 'flex-end',
    },
    totalsBox: {
        width: 200,
        gap: 8,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 11,
    },
    totalLabel: {
        fontWeight: 600,
        color: '#374151',
    },
    finalTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#dbeafe',
        padding: 12,
    },
    finalTotalValue: {
        color: '#1e3a8a',
    },
    
    // Notes section
    notesSection: {
        paddingHorizontal: 0,
    },
    notesTitle: {
        fontSize: 15,
        fontWeight: 300,
        marginBottom: 8,
    },
    notesList: {
        paddingLeft: 24,
        marginBottom: 16,
    },
    noteItem: {
        fontSize: 11,
        fontWeight: 300,
        lineHeight: 1.4,
        marginBottom: 4,
        flexDirection: 'row',
    },
    bullet: {
        width: 8,
        fontSize: 11,
    },
    noteText: {
        flex: 1,
    },
});