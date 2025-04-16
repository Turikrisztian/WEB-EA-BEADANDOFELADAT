// === GEOLOCATION API ===
function getLocation() {
    const output = document.getElementById("location");
    if (!navigator.geolocation) {
      output.textContent = "A böngésződ nem támogatja a geolokációt.";
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lon = position.coords.longitude.toFixed(5);
        output.textContent = `Szélesség: ${lat}, Hosszúság: ${lon}`;
      },
      () => {
        output.textContent = "Nem sikerült lekérni a helyzetet.";
      }
    );
  }
  
  // === WEB WORKER ===
  let worker;
  
  function startWorker() {
    if (typeof Worker !== "undefined") {
      if (!worker) {
        worker = new Worker("worker.js");
      }
      worker.onmessage = function (e) {
        document.getElementById("workerResult").textContent = `Eredmény: ${e.data}`;
      };
      worker.postMessage("start");
    } else {
      document.getElementById("workerResult").textContent = "A böngésződ nem támogatja a Web Workert.";
    }
  }
  
  // === CANVAS RAJZ ===
  window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
  
    // Rajzolj egy színes kört
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "#06b6d4";
    ctx.fill();
  
    ctx.font = "16px Poppins";
    ctx.fillStyle = "#fff";
    ctx.fillText("HTML5 Canvas", 40, 190);
  });
  