// 收闔事件
const toggleBtn = document.querySelector("#toggle-btn");
// 控制整個 body 收闔
const body = document.querySelector("body");
// 點擊收闔事件 -> 點擊後 為 body 加上 class
toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.toggle("sidebar-toggled");
});

// canvas 動態圖表
(() => {
  const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };
  var randomScalingFactor = function () {
    return Math.round(Math.random() * 2000000);
  };

  const pieCtx = document.getElementById("pie-chart").getContext("2d");
  const barCtx = document.getElementById("bar-chart").getContext("2d");

  const config = {
    type: "pie",
    data: {
      datasets: [
        {
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ],
          backgroundColor: [
            chartColors.red,
            chartColors.orange,
            chartColors.yellow,
            chartColors.green,
            chartColors.blue,
          ],
          label: "Dataset 1",
        },
      ],
      labels: [
        "大麥克全餐",
        "肥宅快樂水",
        "太爽啦義大利麵",
        "薯條加大吃不完",
        "兒童餐椅不給坐",
      ],
    },
    options: {
      responsive: true,
    },
  };
  const barConfig = {
    type: "bar",
    data: {
      datasets: [
        {
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ],
          backgroundColor: [
            chartColors.red,
            chartColors.orange,
            chartColors.yellow,
            chartColors.green,
            chartColors.blue,
            chartColors.purple,
          ],
          label: "Dataset 1",
        },
      ],
      labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
    },
    options: {
      responsive: true,
    },
  };
  const pieChart = new Chart(pieCtx, config);
  const barChart = new Chart(barCtx, barConfig);
})();
