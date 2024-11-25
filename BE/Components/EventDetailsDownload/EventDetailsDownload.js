const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();

app.use(express.json());

app.post('/generate-pdf', (req, res) => {
  const eventDetails = req.body;

  // Create a new PDF document
  const doc = new PDFDocument();

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="event_details.pdf"');

  // Pipe the PDF document to the response stream
  doc.pipe(res);

  // Add event details to the PDF document
  doc.fontSize(20).text('Event Details', { align: 'center' }).moveDown();
  doc.fontSize(16).text(`Event Name: ${eventDetails.event_name}`).moveDown();
  doc.text(`Description: ${eventDetails.description}`).moveDown();
  doc.text(`Location: ${eventDetails.venue}`).moveDown();
  doc.text(`Date: ${new Date(eventDetails.date).toLocaleDateString()}`).moveDown();

  // Finalize the PDF
  doc.end();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
