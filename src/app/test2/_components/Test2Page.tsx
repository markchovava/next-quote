"use client"

import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Svg, Path } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

// PDF Document with inline SVG
const MyPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello! This is a PDF with SVG inside 🚀</Text>
      </View>

      {/* SVG Example */}
      <Svg height="100" width="100" viewBox="0 0 100 100">
        <Path
          d="M10 80 C 40 10, 65 10, 95 80"
          stroke="blue"
          fill="transparent"
          strokeWidth={3}
        />
      </Svg>
    </Page>
  </Document>
);

// Component with download link
export default function PDFWithSVG() {
  return (
    <div>
      <PDFDownloadLink document={<MyPDF />} fileName="example.pdf">
        {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
}
