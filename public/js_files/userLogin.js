document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const text = await response.text();
      let result;
      
      // Check if response text is not empty before parsing as JSON
      if (text) {
        result = JSON.parse(text);
      } else {
        result = { message: "Empty response from server" };
      }

      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred during login. Please try again later.");
    }
});

document.getElementById('back').addEventListener('click', function() {
    window.location.href = 'index.html';
});
