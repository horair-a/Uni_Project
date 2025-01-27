import React, { useState } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import SalesGraph from "./SalesGraph";
const GenerateSalesReports = ({ orders }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    // Filter orders within the selected date range
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    if (filteredOrders.length === 0) {
      toast.error("No orders found in the selected date range.");
      setReportData(null);
      return;
    }

    // Calculate total sales and top products
    const totalSales = filteredOrders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0
    );
    const totalOrders = filteredOrders.length;

    const productSales = filteredOrders.reduce((acc, order) => {
      acc[order.productName] = (acc[order.productName] || 0) + order.price * order.quantity;
      return acc;
    }, {});

    const topProducts = Object.entries(productSales)
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    setReportData({ totalSales, totalOrders, topProducts });
    toast.success("Report generated successfully.");
  };

  const handleDownloadPDF = () => {
    if (!reportData) {
      toast.error("Generate the report first!");
      return;
    }

    const doc = new jsPDF();
    doc.text("Sales Report", 10, 10);
    doc.text(`Start Date: ${startDate}`, 10, 20);
    doc.text(`End Date: ${endDate}`, 10, 30);
    doc.text(`Total Sales: $${reportData.totalSales}`, 10, 40);
    doc.text(`Total Orders: ${reportData.totalOrders}`, 10, 50);
    doc.text("Top Products:", 10, 60);

    reportData.topProducts.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} - $${product.sales}`, 10, 70 + index * 10);
    });

    doc.save("SalesReport.pdf");
  };

  return (
    <div className="main-content" style={{ padding: "20px" }}>
      <header>
        <h1 style={{ marginBottom: "20px" }}>Generate Sales Report</h1>
      </header>

      <div
        className="search-box"
        style={{
          width: "100%",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <button
          className="edit-btn"
          onClick={handleGenerateReport}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Generate Report
        </button>
      </div>

      {reportData && (
        <div
          className="report-container"
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Report Summary</h2>
          <p>Total Sales: ${reportData.totalSales}</p>
          <p>Total Orders: {reportData.totalOrders}</p>
          <h3 style={{ marginTop: "20px" }}>Top Products</h3>
          <ul>
            {reportData.topProducts.map((product, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {product.name} - ${product.sales}
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "20px" }}>Sales Graph</h3>
          <SalesGraph
            salesData={reportData.topProducts.map((product) => ({
              product: product.name,
              sales: product.sales,
            }))}
          />

          <button
            className="edit-btn"
            onClick={handleDownloadPDF}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateSalesReports;
