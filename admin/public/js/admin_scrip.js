document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    // Mô phỏng dữ liệu bán hàng, truy cập web và tìm kiếm
    var salesData = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
      datasets: [
        {
          label: 'Doanh số bán hàng',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: [100, 200, 150, 300, 250],
          fill: false
        },
        {
          label: 'Số lượt truy cập web',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          data: [500, 600, 700, 550, 800],
          fill: false
        },
        {
          label: 'Số lượt tìm kiếm',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          data: [200, 250, 300, 280, 320],
          fill: false
        }
      ]
    };
    
    var myChart = new Chart(ctx, {
      type: 'line',
      data: salesData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });