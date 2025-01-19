document.addEventListener("DOMContentLoaded", function() {
  loadRecommendations();
  loadAboutMe();
  loadEducation();
  loadExperiences();
  loadProjects();
  loadSkills();
  loadAboutMe();
  addTrainingAndCertsSection();

  // Show or hide the scroll-to-top button based on scroll position
  window.addEventListener("scroll", function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function addTrainingAndCertsSection() {
  fetch('./training-and-certs.html') // Ensure the correct relative path
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('training-and-certs-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading training-and-certs.html:', error));
}


function loadAboutMe() {
  fetch('about-me.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('about-me-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading about me section:', error));
}

function loadEducation() {
  fetch('education.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('education-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading education section:', error));
}

function loadExperiences() {
  fetch('experiences.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('experiences-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading experiences section:', error));
}

function loadProjects() {
  fetch('projects.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('projects-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading projects section:', error));
}

function loadSkills() {
  fetch('skills.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('skills-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading skills section:', error));
}

function addRecommendation() {
  // Get the name and message of the new recommendation
  const name = document.getElementById("name").value.trim();
  const recommendation = document.getElementById("new_recommendation").value.trim();
  
  // If the user has left a recommendation, display a pop-up
  if (recommendation) {
    console.log("New recommendation added");
    showPopup(true);

    // Create a new 'recommendation' element and set its value to the user's message
    const element = document.createElement("div");
    element.setAttribute("class", "recommendation");
    element.innerHTML = "<span>&#8220;</span>" + recommendation + "<span>&#8221;</span>";
    
    // If the user provided a name, include it
    if (name) {
      const nameElement = document.createElement("p");
      nameElement.textContent = "- " + name;
      element.appendChild(nameElement);
    }

    // Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
      deleteRecommendation(element, name, recommendation);
    };
    element.appendChild(deleteButton);

    // Add this element to the end of the list of recommendations
    document.getElementById("all_recommendations").appendChild(element); 
    
    // Save the recommendation to localStorage
    saveRecommendation(name, recommendation);

    // Reset the values of the input fields
    document.getElementById("name").value = "";
    document.getElementById("new_recommendation").value = "";
  }
}

function showPopup(bool) {
  const popup = document.getElementById('popup');
  popup.style.display = bool ? 'block' : 'none';
}

function saveRecommendation(name, recommendation) {
  try {
    const recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    recommendations.push({ name: name, recommendation: recommendation });
    localStorage.setItem("recommendations", JSON.stringify(recommendations));
  } catch (error) {
    console.error("Error saving recommendation to localStorage", error);
  }
}

function loadRecommendations() {
  try {
    const recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    recommendations.forEach(function(rec) {
      const element = document.createElement("div");
      element.setAttribute("class", "recommendation");
      element.innerHTML = "<span>&#8220;</span>" + rec.recommendation + "<span>&#8221;</span>";
      
      if (rec.name) {
        const nameElement = document.createElement("p");
        nameElement.textContent = "- " + rec.name;
        element.appendChild(nameElement);
      }

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function() {
        deleteRecommendation(element, rec.name, rec.recommendation);
      };
      element.appendChild(deleteButton);

      document.getElementById("all_recommendations").appendChild(element);
    });
  } catch (error) {
    console.error("Error loading recommendations from localStorage", error);
  }
}

function deleteRecommendation(element, name, recommendation) {
  // Remove the element from the DOM
  element.remove();

  // Remove the recommendation from localStorage
  try {
    let recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    recommendations = recommendations.filter(function(rec) {
      return rec.name !== name || rec.recommendation !== recommendation;
    });
    localStorage.setItem("recommendations", JSON.stringify(recommendations));
  } catch (error) {
    console.error("Error deleting recommendation from localStorage", error);
  }
}