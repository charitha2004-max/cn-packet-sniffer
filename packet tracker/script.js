const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const packetTable = document.getElementById('packetTable').getElementsByTagName('tbody')[0];
const filterStatus = document.getElementById('filterStatus');
const searchPacket = document.getElementById('searchPacket');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const alertBox = document.getElementById('alertBox');

let packetId = 1;
let running = false;
let packets = [];

function updateStats() {
    document.getElementById('total').innerText = packets.length;
    document.getElementById('sent').innerText = packets.filter(p=>p.status==="Sent").length;
    document.getElementById('transit').innerText = packets.filter(p=>p.status==="In Transit").length;
    document.getElementById('received').innerText = packets.filter(p=>p.status==="Received").length;
    document.getElementById('error').innerText = packets.filter(p=>p.status==="Error").length;
    document.getElementById('suspicious').innerText = packets.filter(p=>p.status==="Suspicious").length;
}

function showAlert(message) {
    alertBox.innerText = message;
    alertBox.style.display = "block";
    setTimeout(() => alertBox.style.display="none", 5000);
}

function generatePacket() {
    const sources = ["192.168.1.1","10.0.0.5","172.16.0.2"];
    const destinations = ["192.168.1.100","10.0.0.10","172.16.0.20"];
    const types = ["TCP","UDP","ICMP"];
    let packet = {
        id: packetId++,
        source: sources[Math.floor(Math.random()*sources.length)],
        destination: destinations[Math.floor(Math.random()*destinations.length)],
        type: types[Math.floor(Math.random()*types.length)],
        status: "Sent"
    };

    // 5% chance of suspicious packet
    if(Math.random() < 0.05) {
        packet.status = "Suspicious";
        showAlert("⚠️ Suspicious activity detected in Packet ID " + packet.id);
    }

    packets.push(packet);
    updateTable(); updateStats();

    // Randomly update status after 1-4 seconds
    setTimeout(()=>{
        if(!running) return;
        if(packet.status!=="Suspicious") {
            const statuses=["In Transit","Received","Error"];
            packet.status=statuses[Math.floor(Math.random()*statuses.length)];
            if(packet.status==="Error") showAlert("❌ Error detected in Packet ID " + packet.id);
        }
        updateTable(); updateStats();
    }, 1000 + Math.random()*3000);
}

function updateTable() {
    packetTable.innerHTML = "";
    let filtered = packets.filter(p=>filterStatus.value==="All" || p.status===filterStatus.value);
    if(searchPacket.value) filtered = filtered.filter(p=>p.id==searchPacket.value);

    filtered.forEach(packet => {
        const row = packetTable.insertRow();
        row.insertCell(0).innerText = packet.id;
        row.insertCell(1).innerText = packet.source;
        row.insertCell(2).innerText = packet.destination;
        row.insertCell(3).innerText = packet.type;
        const statusCell = row.insertCell(4);
        statusCell.innerText = packet.status;
        statusCell.className = 'status-' + packet.status.replace(' ','\\ ');

        // Add glow animation for new packet
        row.classList.add('new-packet');

        row.addEventListener('click', ()=> {
            modalContent.innerHTML = `<strong>ID:</strong> ${packet.id}<br>
                                      <strong>Source:</strong> ${packet.source}<br>
                                      <strong>Destination:</strong> ${packet.destination}<br>
                                      <strong>Type:</strong> ${packet.type}<br>
                                      <strong>Status:</strong> ${packet.status}`;
            modal.style.display = "flex";
        });
    });
}

startBtn.addEventListener('click', ()=>{
    if(running) return;
    running=true; startBtn.disabled=true; stopBtn.disabled=false;
    const interval = setInterval(()=>{ if(!running){clearInterval(interval);return;} generatePacket(); }, 2000);
});
stopBtn.addEventListener('click', ()=>{ running=false; startBtn.disabled=false; stopBtn.disabled=true; });
filterStatus.addEventListener('change', updateTable);
searchPacket.addEventListener('input', updateTable);
closeModal.addEventListener('click', ()=>modal.style.display='none');
window.addEventListener('click', e=>{ if(e.target==modal) modal.style.display='none'; });
stopBtn.disabled = true;
