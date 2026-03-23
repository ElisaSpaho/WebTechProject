function saveMemberInfo(event) {

    event.preventDefault(); // Prevent form submission

    let memberName      = document.getElementById('memberName').value;
    let memberId        = document.getElementById('memberId').value;
    let memberEmail     = document.getElementById('memberEmail').value;
    let memberPhone     = document.getElementById('memberPhone').value;
    let membershipType  = document.getElementById('membershipType').value;
    let memberStatus    = document.getElementById('memberStatus').value;

    console.log('Member Name:', memberName);

    let newMember = {
        name:           memberName,
        id:             memberId,
        email:          memberEmail,
        phone:          memberPhone,
        membershipType: membershipType,
        status:         memberStatus
    };

    let members = JSON.parse(localStorage.getItem('members')) || [];
    members.push(newMember);
    localStorage.setItem('members', JSON.stringify(members));

    console.log('New Member Object:', newMember);

    alert('Member information saved successfully!');

}