(() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

/* for review star */
document.addEventListener('DOMContentLoaded', function () {
    const starLabels = document.querySelectorAll('.star-rating label');

    // Add event listeners for mouseover, mouseout, and click
    starLabels.forEach(label => {
        label.addEventListener('mouseover', function () {
            const rating = this.getAttribute('for').replace('star', '');
            starLabels.forEach(l => {
                l.style.color = l.getAttribute('for').replace('star', '') <= rating ? 'gold' : '#ccc';
            });
        });

        label.addEventListener('mouseout', function () {
            const checkedRating = document.querySelector('.star-rating input:checked')?.value;
            starLabels.forEach(l => {
                l.style.color = l.getAttribute('for').replace('star', '') <= checkedRating ? 'gold' : '#ccc';
            });
        });

        label.addEventListener('click', function () {
            const rating = this.getAttribute('for').replace('star', '');
            starLabels.forEach(l => {
                l.style.color = l.getAttribute('for').replace('star', '') <= rating ? 'gold' : '#ccc';
            });
        });
    });
});

/* for list input */
document.getElementById("toggleFormButton")?.addEventListener("click", function () {
    const form = document.getElementById("listForm");
    const button = document.getElementById("toggleFormButton");

    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
        button.style.display = "none"; // Hide the button
    } else {
        form.style.display = "none";
        button.style.display = "block"; // Show the button
    }
});

/* for list show button */
document.getElementById("toggleListButton")?.addEventListener("click", function () {
    const listContainer = document.getElementById("listContainer");
    const button = document.getElementById("toggleListButton");

    if (listContainer.style.display === "none" || listContainer.style.display === "") {
        listContainer.style.display = "block";
        button.innerText = "Hide List"; // Change button text
    } else {
        listContainer.style.display = "none";
        button.innerText = "Show List"; // Reset button text
    }
});

// JavaScript to Open/Close the Pop-up and Redirect
window.onload = function () {
    const privacyPopup = document.getElementById('privacyPopup');
    const termsPopup = document.getElementById('termsPopup');
    
    if (privacyPopup) {
        privacyPopup.style.display = 'block';
    }
    if (termsPopup) {
        termsPopup.style.display = 'block';
    }
};

function toggleAgreeButton(popupId) {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const agreeBtn = document.getElementById('agreeBtn');
    agreeBtn.disabled = !agreeCheckbox.checked;
}

function closePopup(popupId) {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    if (agreeCheckbox.checked) {
        document.getElementById(popupId).style.display = 'none';
        window.location.href = "/hr";
    }
}

// for home page
document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "/images/image1.jpg",
        "/images/image2.jpg",
        "/images/image3.jpg",
        "/images/image4.jpg",
        "/images/image5.jpg",
        "/images/image6.jpg",
        "/images/image7.jpg",
        "/images/image8.jpg",
        "/images/image10.jpg",
        "/images/image11.jpg",
        "/images/image12.jpg",
        "/images/image13.jpg",
        "/images/image16.jpg",
        "/images/image15.jpg"
    ];

    const imagesA = [
        "/images/imageA1.jpg",
        "/images/imageA2.jpg",
        "/images/imageA3.jpg",
        "/images/imageA4.jpeg",
        "/images/imageA5.jpg",
        "/images/imageA7.jpg",
        "/images/imageA8.jpg",
        "/images/imageA10.jpg",
        "/images/imageA11.jpg"
    ];

    const scrollingImages = document.getElementById('scrolling-images');
    const scrollingImagesA = document.getElementById('scrolling-imagesA');

    if (scrollingImages && scrollingImagesA) {
        // Function to append images to container
        function appendImages(container, images) {
            images.forEach(src => {
                let img = document.createElement('img');
                img.src = src;
                container.appendChild(img);
            });

            // Duplicate the images for seamless scroll
            images.forEach(src => {
                let img = document.createElement('img');
                img.src = src;
                container.appendChild(img);
            });

            // Duplicate again to ensure continuous scroll
            images.forEach(src => {
                let img = document.createElement('img');
                img.src = src;
                container.appendChild(img);
            });
        }

        // Append images to both containers
        appendImages(scrollingImages, images);
        appendImages(scrollingImagesA, imagesA);
    }
});


//for pop up
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const popup = document.getElementById('popupImage');
    const closePopup = document.getElementById('closePopup');

    // Show the popup for 5 seconds
    setTimeout(() => {
        console.log('Showing popup');
        popup.classList.add('show');
    }, 100);

    // Close the popup when the button is clicked
    closePopup.addEventListener('click', () => {
        console.log('Closing popup');
        popup.classList.remove('show');
    });

    // Optionally hide the popup automatically after a certain time
    setTimeout(() => {
        console.log('Automatically closing popup');
        popup.classList.remove('show');
    }, 5000);
});

//for username validation
document.getElementById('username').addEventListener('input', function() {
    const usernameInput = this.value;
    const usernameHelp = document.getElementById('usernameHelp');
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (usernameInput.length < 3) {
        usernameHelp.textContent = "Username must be at least 3 characters long.";
        usernameHelp.style.color = "red";
    } else if (usernameInput.length > 20) {
        usernameHelp.textContent = "Username must be no more than 20 characters long.";
        usernameHelp.style.color = "red";
    } else if (!usernamePattern.test(usernameInput)) {
        usernameHelp.textContent = "Username can only contain letters, numbers, and underscores.";
        usernameHelp.style.color = "red";
    } else {
        usernameHelp.textContent = "Username looks good!";
        usernameHelp.style.color = "green";
    }
});
