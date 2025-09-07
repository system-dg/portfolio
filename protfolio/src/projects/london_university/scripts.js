
document.querySelectorAll('.logo').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});


document.querySelectorAll('.home1').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});


document.querySelectorAll('.Report-a-Problem').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');0
        if (url) {
            window.location.href = url;
        }
    });
});


document.querySelectorAll('.knowledge-base').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});


document.querySelectorAll('.teaching-learning').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});


document.querySelectorAll('.create-incident-2').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});


document.querySelectorAll('.create-incident').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});








const messageIcon = document.getElementById('message-icon');
const chatPopup = document.getElementById('chat-popup');
const messageInput = document.getElementById('message-input');
const search = document.getElementById('search');
const search1 = document.getElementById('search-1');
const suggestions = document.getElementById('suggestions');
const passwordreset = document.getElementById('password-reset');
const passwordreset1 = document.getElementById('password-reset1');
const verification = document.getElementById('verification');
const chatMessages = document.getElementById('chat-messages');
const closeBtn = document.getElementById('close-btn');
const suggesclosebtn = document.getElementById('sugges-close-btn');
let verificationResponseSent = false; // Track if response has already been sent

const autoReplies = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! What can I do for you?",
    "help": "Sure, I’m here to help. What do you need assistance with?",
    "thanks": "You're welcome! If you need anything else, just let me know.",
    "wifi not working": "I am sorry you are facing issues with your computer.",
    "no internet connection": "I am sorry you are facing issues with your computer.",
    "yes": "Can you change the WiFi channel if the one you are using is too crowded? Check your Access Point manual for instructions on how to change the channel.",
    "no": ["Are You sure" , "Thanking You for Contact our Star Support"],
    "yeah! i did that. still, i am not able to connect to wifi": "Sorry to hear that, I take a complaint request for your problem.",
    "i did that": [
        "Sorry to hear that, I take a complaint request for your problem.",
        "Here's your request ID.",
        "Your problem will get resolved in 24 hrs",
        "Thanks for Using Our Support Chat"
    ],
    "i am not able to connect to wifi": "Sorry to hear that, I take a complaint request for your problem."
};

messageIcon.addEventListener('click', function() {
    const isActive = chatPopup.style.display === 'block';
    chatPopup.style.display = isActive ? 'none' : 'block';
    messageIcon.innerHTML = isActive ? '&#9993;' : '&#10006;'; // Change to X icon
    messageIcon.classList.toggle('active', !isActive); // Toggle active class
});

closeBtn.addEventListener('click', function() {
    chatPopup.style.display = 'none';
});

document.getElementById('send-button').addEventListener('click', function() {
    sendMessage(messageInput.value.trim());
});

messageInput.addEventListener('input', function() {
    const value = messageInput.value.toLowerCase();
    if (value.includes('wifi') || value.includes('wi-fi') || value.includes('internet')) {
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
});


search.addEventListener('input', function() {
    const value = search.value.toLowerCase();
    if (value.includes('password reset') || value.includes('wi-fi') || value.includes('internet')) {
        passwordreset.style.display = 'block';
    } else {
        passwordreset.style.display = 'none';
    }
});




const suggestionElements = document.querySelectorAll('.suggestion');
suggestionElements.forEach(element => {
    element.addEventListener('click', function() {
        const suggestionText = element.textContent.trim();
        sendMessage(suggestionText);

        if (suggestionText === 'Wi-Fi not working' || suggestionText === 'No internet connection') {
            setTimeout(() => {
                const replyMessage = document.createElement('div');
                replyMessage.className = 'message received';
                replyMessage.textContent = "I am sorry you are facing issues with your computer.";
                chatMessages.appendChild(replyMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom

                // Show verification request
                verification.style.display = 'block';
            }, 1000); // 1-second delay
        }
    });
});

document.getElementById('verification-yes').addEventListener('click', function() {
    sendMessage('Yes');
    verification.style.display = 'none';
    if (!verificationResponseSent) {
        setTimeout(() => {
            const replyMessage = document.createElement('div');
            replyMessage.className = 'message received';
            replyMessage.textContent = autoReplies['yes'];
            chatMessages.appendChild(replyMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
            verificationResponseSent = true; // Mark response as sent
        }, 500);
    }
});

document.getElementById('verification-no').addEventListener('click', function() {
    sendMessage('No');
    verification.style.display = 'none';
    setTimeout(() => {
        const replyMessage = document.createElement('div');
        replyMessage.className = 'message received';
        replyMessage.textContent = "Please provide the correct computer model.";
        chatMessages.appendChild(replyMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }, 500);
});

function sendMessage(messageText) {
    if (messageText) {
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.textContent = messageText;
        chatMessages.appendChild(newMessage);
        messageInput.value = ''; // Clear input field
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        suggestions.style.display = 'none'; // Hide suggestions after sending a message
        verification.style.display = 'none'; // Hide verification box if visible
        respondToMessage(messageText);
    }
}

function respondToMessage(messageText) {
    const lowerCaseMessage = messageText.toLowerCase();
    const replyMessage = document.createElement('div');
    replyMessage.className = 'message received';

    if (Array.isArray(autoReplies[lowerCaseMessage])) {
        sendMultipleReplies(autoReplies[lowerCaseMessage]);
    } else {
        replyMessage.textContent = autoReplies[lowerCaseMessage] || ".......";
        chatMessages.appendChild(replyMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }
}

function sendMultipleReplies(replies) {
    replies.forEach((reply, index) => {
        setTimeout(() => {
            const replyMessage = document.createElement('div');
            replyMessage.className = 'message received';
            replyMessage.textContent = reply;
            chatMessages.appendChild(replyMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom


            // After sending "We will process your complaint shortly." add the registration div
            if (reply === "Here's your request ID.") {
                setTimeout(() => {
                    const registrationDiv = document.createElement('div');
                    registrationDiv.id = 'complaint-registration';
                    registrationDiv.style.width = '100%';   
                    registrationDiv.style.padding = '10px';
                    registrationDiv.style.border = '1px solid #ddd';
                    registrationDiv.style.marginTop = '10px';
                    registrationDiv.innerHTML = `

                        <div style ="width:80%;" > 
                            
                                        <img src="img/id.png"  style ="width:200px">

                        </div>
                    `;
                    chatMessages.appendChild(registrationDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
                }, 1000); // Delay before showing the registration div
            }


        }, index * 1000); // Delay each message by 1 second
    });
}


// ...............................................links


// document.getElementById('Report-a-Problem').addEventListener('click', function() {
//     window.location.href = 'create-incident.html';
// });


document.querySelectorAll('.logo').forEach(function(div) {
    div.addEventListener('click', function() {
        var url = this.getAttribute('data-url');
        if (url) {
            window.location.href = url;
        }
    });
});

















let setIndex = 0;
const totalSets = document.getElementsByClassName("set").length;

function showSet(n) {
    const sets = document.getElementsByClassName("sets")[0];
    const dots = document.getElementsByClassName("dot");

    // If we reach the end, go back to the beginning
    if (n >= totalSets) {
        setIndex = 0;
        sets.style.transition = 'none'; // Turn off transition to create loop effect
        sets.style.transform = `translateX(0)`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                sets.style.transition = 'transform 1.5s ease-in-out'; // Turn transition back on
                setIndex++;
                sets.style.transform = `translateX(-${setIndex * 100}%)`;
            });
        });
    } else if (n < 0) {
        setIndex = totalSets - 1;
        sets.style.transition = 'none'; // Turn off transition to create loop effect
        sets.style.transform = `translateX(-${setIndex * 100}%)`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                sets.style.transition = 'transform 1.5s ease-in-out'; // Turn transition back on
                setIndex--;
                sets.style.transform = `translateX(-${setIndex * 100}%)`;
            });
        });
    } else {
        sets.style.transform = `translateX(-${setIndex * 100}%)`;
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[setIndex].className += " active";
}


function nextSet() {
    setIndex++;
    showSet(setIndex);
}

function prevSet() {
    setIndex--;
    showSet(setIndex);
}

function currentSet(n) {
    setIndex = n;
    showSet(setIndex);
}

// Initial display
showSet(setIndex);

// Automatically switch sets every 3 seconds
setInterval(nextSet, 3000);


// ................................Creat Incident

document.querySelector('.discribe').addEventListener('input', function() {
    const input = this.value.trim().toLowerCase();
    const popupDiv = document.querySelector('.popup-div-for-issue');

    if (input === 'describe your issue') {
        popupDiv.style.display = 'block';
    } else {
        popupDiv.style.display = 'none';
    }
});


 // ............................................................links
