document.addEventListener("DOMContentLoaded", function() {
  loadRecommendations();
  // loadPendingRecommendations(); // Commented out
  loadAboutMe();
  loadEducation();
  loadExperiences();
  // loadProjects();
  loadSkills();
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

  // Check for admin query parameter to show admin login prompt
  // const urlParams = new URLSearchParams(window.location.search);
  // if (urlParams.get('admin') === 'true') {
  //   document.getElementById('admin-login').style.display = 'block';
  // }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addTrainingAndCertsSection() {
  fetch('../static/training-and-certs.html') // Ensure the correct relative path
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
  fetch('../static/about-me.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('about-me-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading about me section:', error));
}

function loadEducation() {
  fetch('../static/education.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('education-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading education section:', error));
}

function loadExperiences() {
  fetch('../static/experiences.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('experiences-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading experiences section:', error));
}

function loadProjects() {
  fetch('../static/projects.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('projects-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading projects section:', error));
}

function loadSkills() {
  fetch('../static/skills.html')
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
    loadRecommendations(); // Reload recommendations to display the new one
  } catch (error) {
    console.error("Error saving recommendation to localStorage", error);
  }
}

function loadRecommendations() {
  try {
    const recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    const recommendationsContainer = document.getElementById("all_recommendations");
    recommendationsContainer.innerHTML = ''; // Clear existing recommendations
    recommendations.forEach(function(rec, index) {
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
        deleteRecommendation(index);
      };
      element.appendChild(deleteButton);

      recommendationsContainer.appendChild(element);
    });
  } catch (error) {
    console.error("Error loading recommendations from localStorage", error);
  }
}

function deleteRecommendation(index) {
  try {
    let recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    recommendations.splice(index, 1);
    localStorage.setItem("recommendations", JSON.stringify(recommendations));
    loadRecommendations(); // Reload recommendations to update the list
  } catch (error) {
    console.error("Error deleting recommendation from localStorage", error);
  }
}

// Commented out pending recommendations functions
/*
function loadPendingRecommendations() {
  try {
    const pendingRecommendations = JSON.parse(localStorage.getItem("pendingRecommendations")) || [];
    const pendingContainer = document.getElementById("pending_recommendations");
    pendingRecommendations.forEach(function(rec, index) {
      const element = document.createElement("div");
      element.setAttribute("class", "recommendation");
      element.innerHTML = "<span>&#8220;</span>" + rec.recommendation + "<span>&#8221;</span>";
      
      if (rec.name) {
        const nameElement = document.createElement("p");
        nameElement.textContent = "- " + rec.name;
        element.appendChild(nameElement);
      }

      const approveButton = document.createElement("button");
      approveButton.textContent = "Approve";
      approveButton.onclick = function() {
        approveRecommendation(index);
      };
      element.appendChild(approveButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function() {
        deletePendingRecommendation(index);
      };
      element.appendChild(deleteButton);

      pendingContainer.appendChild(element);
    });
  } catch (error) {
    console.error("Error loading pending recommendations from localStorage", error);
  }
}

function approveRecommendation(index) {
  try {
    const pendingRecommendations = JSON.parse(localStorage.getItem("pendingRecommendations")) || [];
    const approvedRecommendation = pendingRecommendations.splice(index, 1)[0];
    localStorage.setItem("pendingRecommendations", JSON.stringify(pendingRecommendations));

    const recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    recommendations.push(approvedRecommendation);
    localStorage.setItem("recommendations", JSON.stringify(recommendations));

    location.reload(); // Reload the page to update the recommendations
  } catch (error) {
    console.error("Error approving recommendation", error);
  }
}

function deletePendingRecommendation(index) {
  try {
    const pendingRecommendations = JSON.parse(localStorage.getItem("pendingRecommendations")) || [];
    pendingRecommendations.splice(index, 1);
    localStorage.setItem("pendingRecommendations", JSON.stringify(pendingRecommendations));

    location.reload(); // Reload the page to update the pending recommendations
  } catch (error) {
    console.error("Error deleting pending recommendation", error);
  }
}
*/