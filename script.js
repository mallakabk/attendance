// Load students from JSON
fetch("students.json")
  .then(res => res.json())
  .then(students => {
    const tbody = document.querySelector("#attendanceTable tbody");

    students.forEach(stu => {
      const full = stu.name.trim().split(" ");
      const first = full[0];
      const last = full.slice(1).join(" ");

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${stu.student_id}</td>
        <td>${stu.group}</td>
        <td>${last}</td>
        <td>${first}</td>

        ${[1,2,3,4,5,6].map(()=> `<td><input class="sess" type="checkbox"></td>`).join("")}
        ${[1,2,3,4,5,6].map(()=> `<td><input class="par" type="checkbox"></td>`).join("")}

        <td class="absCount">0 Abs</td>
        <td class="parCount">0 Par</td>
        <td class="message-cell">New student</td>
      `;

      tbody.appendChild(row);
      attachEvents(row);
      updateRow(row);
    });
  });

function updateRow(row) {
  const abs = [...row.querySelectorAll(".sess")].filter(c => !c.checked).length;
  const par = [...row.querySelectorAll(".par")].filter(c => c.checked).length;

  row.querySelector(".absCount").textContent = `${abs} Abs`;
  row.querySelector(".parCount").textContent = `${par} Par`;

  if (abs >= 5) row.style.backgroundColor = "#e96767ff";
  else if (abs >= 3) row.style.backgroundColor = "#f0e087ff";
  else row.style.backgroundColor = "#81f0a8ff";
}

function attachEvents(row) {
  row.querySelectorAll("input[type='checkbox']")
      .forEach(ch => ch.addEventListener("change", ()=> updateRow(row)));
}

document.getElementById("showReportBtn").addEventListener("click", function() {
  const rows = document.querySelectorAll("#attendanceTable tbody tr");

  let total = rows.length;
  let totalAbs = 0, totalPar = 0;

  rows.forEach(r => {
    totalAbs += parseInt(r.querySelector(".absCount").textContent);
    totalPar += parseInt(r.querySelector(".parCount").textContent);
  });

  document.getElementById("totalStudents").textContent = "Total Students: " + total;
  document.getElementById("presentCount").textContent = "Total Absences: " + totalAbs;
  document.getElementById("participationCount").textContent = "Total Participation: " + totalPar;

  const ctx = document.getElementById("reportChart").getContext("2d");

  if (window.reportChartInstance) window.reportChartInstance.destroy();

  window.reportChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Students", "Absences", "Participation"],
        datasets: [{
          label: "Stats",
          data: [total, totalAbs, totalPar],
          backgroundColor: ["blue","pink","green"]
        }]
      }
  });
  document.getElementById("highlightExcellent").addEventListener("click", function () {
    let rows = document.querySelectorAll("#studentTable tbody tr");

    rows.forEach(row => {
        let absCell = row.querySelector(".abs-count");

        if (!absCell) return;

        let abs = parseInt(absCell.innerText);

        if (abs < 3) {
            row.style.backgroundColor = "#b6ffb3"; // أخضر للطلاب الممتازين
            row.style.fontWeight = "bold";
        }
    });
});

  document.getElementById("reportSection").style.display = "block";
  // Apply JS logic to static rows + JSON rows
document.querySelectorAll("#attendanceTable tbody tr").forEach(row => {
    attachEvents(row);
    updateRow(row);
});


});

