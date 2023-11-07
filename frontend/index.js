const conflict1 = document.getElementById('conflict');
let selectedSlot = "";
const slotsRemaining = {
    '2pm': 4,
    '230pm': 4,
    '3pm': 4,
    '330pm': 4
};
const googleMeetLinks = {
    '2pm': 'https://meet.google.com/srd-dqqm-swz?authuser=0',
    '230pm': 'https://meet.google.com/ceb-pbpo-iiv?authuser=0',
    '3pm': 'https://meet.google.com/srd-dqqm-swz?authuser=0',
    '330pm': 'https://meet.google.com/ceb-pbpo-iiv?authuser=0'
};
function showForm(slot) {
    if (slotsRemaining[slot] > 0) {
        selectedSlot = slot;
        document.getElementById('booking-form').style.display = 'block';
    } else {
        document.getElementById('confirmation').textContent = `Sorry, all slots for ${slot} are booked.`;
        document.getElementById('confirmation').style.display = 'block';
    }
}

async function bookSlot() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const googleMeetLink = googleMeetLinks[selectedSlot];
    try {
        const response = await axios.post('http://localhost:4000/calendar/post-cal',{
            name,
            email,
            googleMeetLink,
            selectedSlot
        });
        showOn(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function showOn(stored) {
    if (slotsRemaining[selectedSlot] > 0) {
        slotsRemaining[selectedSlot]--;
        document.getElementById(`slots-${selectedSlot}`).textContent = slotsRemaining[selectedSlot];
        console.log(slotsRemaining[selectedSlot]);
        const googleMeetLink = stored.googleMeetLink;
        document.getElementById('confirmation').textContent = `Slot confirmed ${stored.name} Please join at ${stored.selectedSlot} via (${googleMeetLink}) link`;

        const cancel = document.createElement('input');
        cancel.type = 'button';
        cancel.className='btn-update'
        cancel.value = 'Cancel';
        confirmation.appendChild(cancel);
        cancel.onclick = async () => {
            try {
                await axios.delete(`http://localhost:4000/calendar/delete-cal/${stored.id}`);
                confirmation.remove();
                console.log('Booking canceled.');
            } catch (error) {
                console.error(error);
            }
        }

        document.getElementById('confirmation').style.display = 'block';
        document.getElementById('booking-form').style.display = 'none';
    } else {
        document.getElementById('confirmation').textContent = `Sorry, all slots for ${selectedSlot} are booked.`;
        document.getElementById('confirmation').style.display = 'block';
    }
}

async function fetchStoredBookings() {
    try {
        const response = await axios.get('http://localhost:4000/calendar/get-cal');
        for (const stored of response.data) {
            showOnScrren(stored);
        }
    } catch (error) {
        console.error(error);
    }
}

async function showOnScrren(appoint) {
    try {
        console.log(appoint.name)
        const li = document.createElement('li');
        li.textContent = `Slot confirmed ${appoint.name} Please join at ${appoint.selectedSlot} via (${appoint.googleMeetLink}) link`;
        const cancel = document.createElement('input');
        cancel.type = 'button';
        cancel.className='btn-update'
        cancel.value = 'Cancel';
        cancel.onclick = async () => {
            try {
                await axios.delete(`http://localhost:4000/calendar/delete-cal/${appoint.id}`);
                conflict1.remove();
                console.log('Booking canceled.');
            } catch (error) {
                console.error(error);
            }
        }
        conflict1.appendChild(li);
        conflict1.appendChild(cancel);
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    fetchStoredBookings();
});