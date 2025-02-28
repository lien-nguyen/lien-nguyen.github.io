document.addEventListener("DOMContentLoaded", function() {
  loadRecommendations();
  loadAboutMe();
  loadEducation();
  loadExperiences();
  loadProjects();
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

  // Initialize language switcher
  const languageSwitcher = document.getElementById('language-switcher');
  languageSwitcher.addEventListener('change', (event) => {
    setLanguage(event.target.value);
  });

  // Set default language
  setLanguage('en');
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

    // Check if the user is an admin
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';

    recommendations.forEach(function(rec, index) {
      const element = document.createElement("div");
      element.setAttribute("class", "recommendation");
      element.innerHTML = "<span>&#8220;</span>" + rec.recommendation + "<span>&#8221;</span>";
      
      if (rec.name) {
        const nameElement = document.createElement("p");
        nameElement.textContent = "- " + rec.name;
        element.appendChild(nameElement);
      }

      if (isAdmin) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
          deleteRecommendation(index);
        };
        element.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
          editRecommendation(index);
        };
        element.appendChild(editButton);
      }

      recommendationsContainer.appendChild(element);
    });
  } catch (error) {
    console.error("Error loading recommendations from localStorage", error);
  }
}

function editRecommendation(index) {
  try {
    const recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    const recommendation = recommendations[index];

    // Prompt the user to edit the recommendation
    const newRecommendation = prompt("Edit your recommendation:", recommendation.recommendation);
    if (newRecommendation !== null && newRecommendation.trim() !== "") {
      recommendations[index].recommendation = newRecommendation.trim();
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
      loadRecommendations(); // Reload recommendations to display the updated one
    }
  } catch (error) {
    console.error("Error editing recommendation", error);
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

// Function to set the language and load translations
function setLanguage(lang) {
  fetch(`/languages/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.getElementById('aboutMe').innerText = translations.aboutMe;
      document.getElementById('experiences').innerText = translations.experiences;
      document.getElementById('skills').innerText = translations.skills;
      document.getElementById('projects').innerText = translations.projects;
      document.getElementById('education').innerText = translations.education;
      document.getElementById('certifications').innerText = translations.certifications;
      document.getElementById('contact').innerText = translations.contact;
      document.getElementById('recommendations').innerText = translations.recommendations;
      document.getElementById('leaveRecommendation').innerText = translations.leaveRecommendation;
      document.getElementById('contactInformation').innerText = translations.contactInformation;
      document.getElementById('recommend_btn').innerText = translations.submit;
      document.getElementById('thanksForRecommendation').innerText = translations.thanksForRecommendation;

      // Load content from static HTML files for English
      if (lang === 'en') {
        loadAboutMe();
        loadEducation();
        loadExperiences();
        loadProjects();
        loadSkills();
        addTrainingAndCertsSection();
      } else {
        // Load content from JSON for other languages
        document.getElementById('about-me-placeholder').innerHTML = `<section id="about-me">
          <div class="container">
            <div>
              <img class="profile_image" src="../img/profile_pic.png" alt="Profile Picture"/>
            </div>
            <div>
              <h1>${translations.aboutMe}</h1>
              <p>${translations.aboutMeContent}</p>
            </div>
          </div>
        </section>`;
        document.getElementById('experiences-placeholder').innerHTML = translations.experiencesContent;
        document.getElementById('skills-placeholder').innerHTML = translations.skillsContent;
        document.getElementById('projects-placeholder').innerHTML = translations.projectsContent;
        document.getElementById('education-placeholder').innerHTML = translations.educationContent;
        document.getElementById('training-and-certs-placeholder').innerHTML = translations.certificationsContent;
        document.getElementById('contact').innerHTML = translations.contactContent;
      }
    })
    .catch(error => console.error('Error loading translations:', error));
}