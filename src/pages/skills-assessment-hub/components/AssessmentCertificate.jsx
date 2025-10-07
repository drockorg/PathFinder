import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1a1a1a',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#4a4a4a',
  },
  content: {
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    color: '#2a2a2a',
  },
  highlight: {
    fontSize: 18,
    color: '#1a1a1a',
    marginVertical: 10,
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    color: '#6a6a6a',
    fontSize: 10,
  },
  signature: {
    marginTop: 60,
    borderTop: '1px solid #000',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  grid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    padding: 10,
  },
});

const AssessmentCertificate = ({ assessment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Certificate of Completion</Text>
        <Text style={styles.subtitle}>PathFinder Skills Assessment</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>This is to certify that</Text>
        <Text style={styles.highlight}>{assessment.userName}</Text>
        <Text style={styles.text}>has successfully completed</Text>
        <Text style={styles.highlight}>{assessment.title}</Text>
        <Text style={styles.text}>with a score of</Text>
        <Text style={styles.highlight}>{assessment.score}%</Text>

        <View style={styles.grid}>
          {Object.entries(assessment.skillBreakdown).map(([skill, score]) => (
            <View key={skill} style={styles.gridItem}>
              <Text style={styles.text}>{skill}: {score}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Completed on {format(new Date(assessment.completedAt), 'PPPP')}</Text>
        <Text>Certificate ID: {assessment.id}</Text>
      </View>

      <View style={styles.signature}>
        <Text>Authorized Signature</Text>
      </View>
    </Page>
  </Document>
);

export default AssessmentCertificate;