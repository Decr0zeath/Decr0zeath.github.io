const startHour = 7;
const endHour = 19;
const interval = 30;
let savedData = {};

const colorPalette = [
  "#FABEBE", "#800000", "#000075", "#E6194B", "#3CB44B",
  "#FFE119", "#4363D8", "#F58231", "#F032E6", "#46F0F0",
  "#BCF60C", "#911EB4", "#AAFFC3", "#008080", "#9A6324",
  "#FFFAC8", "#808000", "#FFD8B1", "#808080", "#E6BEFF",
];
let colorMap = {};

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function getColorForOffer(offerId) {
  let normalizedId = offerId.trim().toLowerCase().split(" ")[0];
  if (!colorMap[normalizedId]) {
    const index = Math.abs(hashCode(normalizedId)) % colorPalette.length;
    colorMap[normalizedId] = colorPalette[index];
  }
  return colorMap[normalizedId];
}

function formatTime(h, m) {
  let ampm = h >= 12 ? "PM" : "AM";
  let hour12 = h % 12 || 12;
  let minStr = m.toString().padStart(2, '0');
  return `${hour12}:${minStr} ${ampm}`;
}

function addMinutes(h, m, minsToAdd) {
  let totalMins = h * 60 + m + minsToAdd;
  return { h: Math.floor(totalMins / 60), m: totalMins % 60 };
}

async function loadData() {
  // 1) Try localStorage first
  const local = localStorage.getItem("scheduleDataMerged");
  if (local) {
    savedData = JSON.parse(local);
    console.log("Loaded from localStorage");
    buildTable();
    return;
  }

  // 2) Otherwise fetch JSON
  try {
    const response = await fetch("schedule.json");
    savedData = await response.json();
    console.log("Loaded from schedule.json");
  } catch (e) {
    console.error("Error loading JSON:", e);
    savedData = {};
  }

  localStorage.setItem("scheduleDataMerged", JSON.stringify(savedData));
  buildTable();
}

function saveData() {
  // Always sync to localStorage
  localStorage.setItem("scheduleDataMerged", JSON.stringify(savedData));

  // Also let user download for repo update
  const blob = new Blob([JSON.stringify(savedData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "schedule.json";
  a.click();
  URL.revokeObjectURL(url);
}

function resetData() {
  if (confirm("Clear all cached changes and reload from schedule.json?")) {
    localStorage.removeItem("scheduleDataMerged"); // clear cache
    loadData(); // reload from repo file
  }
}

function buildTable() {
  const tbody = document.querySelector("#schedule tbody");
  tbody.innerHTML = "";
  colorMap = {};

  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      let startLabel = formatTime(hour, minute);
      let endTime = addMinutes(hour, minute, interval);
      let endLabel = formatTime(endTime.h, endTime.m);
      slots.push({ startHour: hour, startMin: minute, label: `${startLabel} - ${endLabel}` });
    }
  }

  for (let rowIndex = 0; rowIndex < slots.length; rowIndex++) {
    let row = document.createElement("tr");

    let timeCell = document.createElement("td");
    timeCell.textContent = slots[rowIndex].label;
    row.appendChild(timeCell);

    for (let day = 1; day <= 6; day++) {
      let currentKey = `${slots[rowIndex].startHour}:${slots[rowIndex].startMin}-${day}`;
      let cellData = savedData[currentKey] || { subject: "", room: "" };
      let prevKey = rowIndex > 0 ? `${slots[rowIndex - 1].startHour}:${slots[rowIndex - 1].startMin}-${day}` : null;

      if (rowIndex > 0 && savedData[prevKey] && savedData[prevKey].subject === cellData.subject && cellData.subject.trim() !== "") {
        continue;
      }

      let rowspan = 1;
      for (let r = rowIndex + 1; r < slots.length; r++) {
        let compareKey = `${slots[r].startHour}:${slots[r].startMin}-${day}`;
        if (savedData[compareKey] && savedData[compareKey].subject === cellData.subject && cellData.subject.trim() !== "") {
          rowspan++;
        } else {
          break;
        }
      }

      let cell = document.createElement("td");
      cell.style.verticalAlign = "middle";
      cell.style.textAlign = "center";

      if (cellData.subject.trim() !== "") {
        let startTimeLabel = slots[rowIndex].label.split(" - ")[0];
        let endSlot = slots[rowIndex + rowspan - 1];
        let endTimeObj = addMinutes(endSlot.startHour, endSlot.startMin, interval);
        let endTimeLabel = formatTime(endTimeObj.h, endTimeObj.m);

        cell.style.background = getColorForOffer(cellData.subject);

        cell.innerHTML = `
          <span class="time-label">${startTimeLabel} - ${endTimeLabel}</span>
          <div class="subject-label" contenteditable="true">${cellData.subject}</div>
          <input type="text" class="room-input" placeholder="Room" value="${cellData.room}">
        `;

        let subjectDiv = cell.querySelector(".subject-label");
        let roomInput = cell.querySelector(".room-input");

        subjectDiv.addEventListener("blur", () => {
          savedData[currentKey] = {
            subject: subjectDiv.textContent.trim(),
            room: roomInput.value.trim()
          };
          localStorage.setItem("scheduleDataMerged", JSON.stringify(savedData));
          buildTable();
        });

        roomInput.addEventListener("blur", () => {
          savedData[currentKey] = {
            subject: subjectDiv.textContent.trim(),
            room: roomInput.value.trim()
          };
          localStorage.setItem("scheduleDataMerged", JSON.stringify(savedData));
        });
      } else {
        cell.contentEditable = "true";
        cell.addEventListener("blur", () => {
          savedData[currentKey] = { subject: cell.textContent.trim(), room: "" };
          localStorage.setItem("scheduleDataMerged", JSON.stringify(savedData));
          buildTable();
        });
      }

      if (rowspan > 1) {
        cell.rowSpan = rowspan;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }
}

loadData();
