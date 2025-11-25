PacketTrack – Real-Time Network Packet Monitoring Simulator

PacketTrack is a lightweight, browser-based network packet simulation dashboard built using HTML, CSS, and JavaScript.
It demonstrates how packets move through a network using real-time updates, color-coded statuses, and animated alerts — perfect for Computer Networks mini-projects.

This project simulates packet generation, movement, and suspicious packet detection inside a clean, neon-themed dashboard UI.

✨ Features
🔹 Real-Time Packet Simulation

Generates packets every second with dynamic values (ID, type, source, destination, payload).

🔹 Neon Glow Animations

New packets gently glow on arrival, giving a live-network feel.

🔹 Suspicious Packet Alerts

Suspicious packets (e.g., odd payloads, unusual types) are highlighted with red/pink glowing effects.

🔹 Color-Coded Status Indicators

Sent (Blue)

In Transit (Yellow)

Received (Green)

Error (Red)

Suspicious (Purple/Pink)

🔹 Interactive Packet Details

Click any packet row to view its full information in a pop-up modal.

🔹 Simple Search & Filter

Filter packets by ID, type, status, or IP address.

🛠️ Technology Stack
Component	Technology	Purpose
Frontend	HTML5, CSS3, JavaScript	UI, animations, simulation logic
UI Theme	CSS Neon Effects	Modern, cyber-style visual appearance
Data Handling	JavaScript Arrays	Stores and updates packet list

No backend required. No installations. Just open and run.

🚀 Getting Started
✔ 1. Clone or Download the Project
git clone <your-repo-link>
cd packettrack

✔ 2. Run the Project

Simply open the file:

index.html


The dashboard will start working immediately in your browser.

📁 Project Structure
packettrack/
│
├── index.html      # Main interface
├── style.css       # Neon theme + animations
└── script.js       # Packet simulation logic


(If your build is in one file, that is perfectly fine.)

🔑 Key Logic Highlights
✔ Packet Generator

Simulates live packet creation with random data:

const packet = {
  id: "PKT-" + Math.floor(Math.random() * 9000 + 1000),
  type: randomType(),
  source: randomIP(),
  destination: randomIP(),
  status: getRandomStatus()
};

✔ Suspicious Packet Detection

Triggers glowing alert for unusual packet behavior.

✔ Live Dashboard Updates

Table refreshes every second with new packets and status changes.

🔮 Future Enhancements

Export packet logs as CSV

Add a real packet analyzer using Python/Node.js

Animated network topology diagram

WebSocket support for true real-time data
