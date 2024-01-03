var http = require("http");

function startServer() {
  http
    .createServer(function (req, res) {
      res.writeHead(200, { "Content-Type": "text/html" });
      var htmlContent = `
            <!DOCTYPE html>
<html>
  <head>
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
    <title>My Web</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
      }
      .container {
        text-align: center;
        background-color: black;
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        padding: 50px;
        border-radius: 15px;
        max-width: 600px;
        animation: fadeIn 1s ease-in-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      h1 {
        color: #e4b444;
        margin-bottom: 20px;
      }
      p {
        color: #adb5bd;
        line-height: 1.6;
      }
      .main {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
      }

      .up {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
      }

      .down {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
      }
			
      .card4 {
        width: 150px;
        height: 150px;
        outline: none;
        border: none;
        background-color: #8c9eff;
        border-radius: 80px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        transition: 0.2s ease-in-out;
      }

      .card4:hover {
        cursor: pointer;
        scale: 1.1;
        background-color: #8c9eff;
      }

      .card4:hover .discord {
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome To My Web</h1>
      <p>You can copy the link with the button below:</p>
      <div class="main">
        <div class="up">
          <button class="card4" onclick="copyLink()">
            <i class="bx bxs-copy twitter"></i>
          </button>
        </div>
      </div>
    </div>
    <script>
      function copyLink() {
        const el = document.createElement("textarea");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        alert("Link copied to clipboard!");
      }
    </script>
    
  </body>
</html>
        `;
      res.write(htmlContent);
      res.end();
    })
    .listen(5000);

  console.log("Server is running on http://localhost:5000");
}

module.exports = { startServer };