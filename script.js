let countdownInterval;

function startCountdown() {
  clearInterval(countdownInterval);
  document.getElementById("completed").innerHTML = "";

  const eventName = document.getElementById("eventText").value || "Your Event";
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value || "00:00";

  if (!date) {
    alert("Please select a date.");
    return;
  }

  // Handle background image
  const imageInput = document.getElementById("bgImage");
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(file);
  }

  const eventDateTime = new Date(`${date}T${time}:00`).getTime();
  document.getElementById("event-name").textContent = eventName;
  document.getElementById("output").style.display = "block";

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDateTime - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.querySelector(".countdown").style.display = "none";
      document.getElementById("completed").innerHTML = `🎉 Hooray! <br><span style="color: #00ffc3;">${eventName}</span> has started! 🥳`;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}
