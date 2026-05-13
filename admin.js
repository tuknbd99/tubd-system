function showSection(id){
  document.querySelectorAll('.section').forEach(section=>{
    section.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}

const memberForm = document.getElementById('memberForm');
const memberTable = document.getElementById('memberTable');

let members = [];

memberForm.addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  const district = document.getElementById('district').value;
  const deposit = document.getElementById('deposit').value;

  const member = {
    id: "M" + (members.length + 1).toString().padStart(3, '0'),
    name,
    mobile,
    district,
    deposit
  };

  members.push(member);

  renderMembers();

  memberForm.reset();
});

function renderMembers(){
  memberTable.innerHTML = "";

  members.forEach(member=>{
    const row = `
      <tr>
        <td>${member.id}</td>
        <td>${member.name}</td>
        <td>${member.mobile}</td>
        <td>${member.district}</td>
      </tr>
    `;

    memberTable.innerHTML += row;
  });
}

document.getElementById('logoutBtn').addEventListener('click', ()=>{
  alert('লগআউট হয়েছে');
});
