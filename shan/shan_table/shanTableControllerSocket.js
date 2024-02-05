const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const tableGetter = require("./tableGetter");
const ShanTable = require("./shanTableModel");

exports.createTableData = async (socket, data) => {
  try {
    const newTable = new ShanTable({
      tableName: data.tableName,
      role: data.role,
      description: data.description,
    });
    await newTable.save();

    return newTable;
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};

exports.readTableData = async (socket, data) => {
  try {
    if (data.idValue === "all") {
      const tablesValue = await tableGetter.responseTableAll();
      socket.emit("responseTableDataAll", {
        length: tablesValue.length,
        tableDataAll: tablesValue,
      });
    } else if (data.idValue !== "all" && data.idValue) {
      const tablesValue = await tableGetter.responseTableByRole(data.idValue);
      socket.emit("responseTableDataAll", {
        length: tablesValue.length,
        tableDataAll: tablesValue,
      });
    }
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};
