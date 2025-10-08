// // // document.addEventListener('DOMContentLoaded', () => {
// // //     const navItems = document.querySelectorAll('.bottom-nav .nav-item');
// // //     const pages = document.querySelectorAll('.page');
// // //     const header = document.getElementById('header');

// // //     function showPage(pageId) {
// // //         // Hide all pages
// // //         pages.forEach(page => {
// // //             page.classList.remove('active');
// // //         });

// // //         // Show the requested page
// // //         const activePage = document.getElementById(pageId);
// // //         if (activePage) {
// // //             activePage.classList.add('active');
// // //         }

// // //         // Update active state of bottom nav
// // //         navItems.forEach(item => {
// // //             item.classList.remove('active');
// // //             if (item.getAttribute('data-page') === pageId) {
// // //                 item.classList.add('active');
// // //             }
// // //         });

// // //         // Update header content based on the active page
// // //         if (pageId === 'home-page') {
// // //             header.innerHTML = '<span id="location"><i class="fas fa-map-marker-alt"></i> Bhuvan, Ranchi-Jharkhand</span>';
// // //             // Center content for home page header
// // //             header.style.justifyContent = 'center';
// // //         } else {
// // //             // Find the title element within the active page
// // //             const pageTitleElement = activePage.querySelector('.page-title');
// // //             const pageTitle = pageTitleElement ? pageTitleElement.textContent : '';

// // //             // Set header with a back button and the page title
// // //             header.innerHTML = `<span class="back-btn" onclick="showPage('home-page')"><i class="fas fa-arrow-left"></i></span> ${pageTitle}`;
// // //             // Align content to start for other pages to make space for back button
// // //             header.style.justifyContent = 'flex-start';
// // //         }
// // //     }

// // //     // Add click listeners to bottom navigation items
// // //     navItems.forEach(item => {
// // //         item.addEventListener('click', (e) => {
// // //             e.preventDefault(); // Prevent default link behavior (page reload)
// // //             const pageId = item.getAttribute('data-page');
// // //             showPage(pageId);
// // //         });
// // //     });

// // //     // Add click listeners to "What to grow now?" card on home page
// // //     const whatToGrowCard = document.querySelector('#home-page .crop-suggestion').closest('.card');
// // //     if (whatToGrowCard) {
// // //         whatToGrowCard.addEventListener('click', () => {
// // //             showPage('crop-suggestions-page');
// // //         });
// // //     }

// // //     // Add click listeners to "Quick Actions" items on home page
// // //     const quickActions = document.querySelectorAll('.quick-actions .action-item');
// // //     quickActions.forEach(action => {
// // //         action.addEventListener('click', () => {
// // //             // Extract pageId from the onclick attribute (or data-attribute if preferred)
// // //             const pageId = action.getAttribute('onclick').match(/'(.*)'/)[1];
// // //             showPage(pageId);
// // //         });
// // //     });

// // //     // Initialize the home page view on load
// // //     showPage('home-page');
// // // });

// // document.addEventListener('DOMContentLoaded', () => {
// //     const navItems = document.querySelectorAll('.bottom-nav .nav-item');
// //     const pages = document.querySelectorAll('.page');
// //     const header = document.getElementById('header');

// //     // This function is triggered by the Google Sign-In button.
// //     window.handleCredentialResponse = function(response) {
// //         console.log("Google Sign-in was clicked. Simulating successful login.");
// //         showPage('home-page');
// //     };

// //     // This function handles the manual sign-up form submission.
// //     const signupForm = document.getElementById('signup-form');
// //     if (signupForm) {
// //         signupForm.addEventListener('submit', async (e) => {
// //             e.preventDefault();

// //             const name = document.getElementById('name').value;
// //             const mobile_number = document.getElementById('mobile').value;

// //             // Send data to the backend's /register endpoint
// //             try {
// //                 const response = await fetch('http://127.0.0.1:5000/register', {
// //                     method: 'POST',
// //                     headers: {
// //                         'Content-Type': 'application/json'
// //                     },
// //                     body: JSON.stringify({ name: name, mobile_number: mobile_number })
// //                 });

// //                 const data = await response.json();

// //                 if (response.ok) {
// //                     // Registration successful, redirect to home page
// //                     console.log("Registration successful!", data);
// //                     alert("Registration successful!");
// //                     showPage('home-page');
// //                 } else {
// //                     // Handle errors from the backend
// //                     console.error("Registration failed:", data.error);
// //                     alert("Registration failed: " + data.error);
// //                 }

// //             } catch (error) {
// //                 console.error("Network or server error:", error);
// //                 alert("An error occurred. Please try again later.");
// //             }
// //         });
// //     }

// //     function showPage(pageId) {
// //         pages.forEach(page => {
// //             page.classList.remove('active');
// //         });

// //         const activePage = document.getElementById(pageId);
// //         if (activePage) {
// //             activePage.classList.add('active');
// //         }

// //         navItems.forEach(item => {
// //             item.classList.remove('active');
// //             if (item.getAttribute('data-page') === pageId) {
// //                 item.classList.add('active');
// //             }
// //         });

// //         updateHeader(pageId);
// //     }

// //     function updateHeader(pageId) {
// //         if (pageId === 'home-page') {
// //             header.innerHTML = '<span id="location"><i class="fas fa-map-marker-alt"></i> Kanke, Ranchi-Jharkhand</span>';
// //             header.style.justifyContent = 'center';
// //         } else if (pageId === 'auth-page') {
// //             header.innerHTML = '';
// //         } else {
// //             const pageTitleElement = document.getElementById(pageId).querySelector('.page-title');
// //             const pageTitle = pageTitleElement ? pageTitleElement.textContent : '';
// //             header.innerHTML = `<span class="back-btn" onclick="showPage('home-page')"><i class="fas fa-arrow-left"></i></span> ${pageTitle}`;
// //             header.style.justifyContent = 'flex-start';
// //         }
// //     }

// //     navItems.forEach(item => {
// //         item.addEventListener('click', (e) => {
// //             e.preventDefault();
// //             const pageId = item.getAttribute('data-page');
// //             showPage(pageId);
// //         });
// //     });

// //     const whatToGrowCard = document.querySelector('.crop-suggestion').closest('.card');
// //     if (whatToGrowCard) {
// //         whatToGrowCard.addEventListener('click', () => {
// //             showPage('crop-suggestions-page');
// //         });
// //     }

// //     const quickActions = document.querySelectorAll('.quick-actions .action-item');
// //     quickActions.forEach(action => {
// //         action.addEventListener('click', () => {
// //             const pageId = action.getAttribute('onclick').match(/'(.*)'/)[1];
// //             showPage(pageId);
// //         });
// //     });

// //     showPage('auth-page');
// // });

// document.addEventListener("DOMContentLoaded", () => {
//   const navItems = document.querySelectorAll(".bottom-nav .nav-item");
//   const pages = document.querySelectorAll(".page");
//   const header = document.getElementById("header");

//   // This function is triggered by the Google Sign-In button.
//   window.handleCredentialResponse = function (response) {
//     console.log("Google Sign-in was clicked. Simulating successful login.");
//     showPage("home-page");
//   };

//   // This function handles the manual sign-up form submission.
//   const signupForm = document.getElementById("signup-form");
//   if (signupForm) {
//     signupForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const name = document.getElementById("name").value;
//       const mobile_number = document.getElementById("mobile").value;

//       try {
//         const response = await fetch("http://127.0.0.1:5000/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name: name, mobile_number: mobile_number }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           console.log("Registration successful!", data);
//           alert("Registration successful!");
//           showPage("home-page");
//         } else {
//           console.error("Registration failed:", data.error);
//           alert("Registration failed: " + data.error);
//         }
//       } catch (error) {
//         console.error("Network or server error:", error);
//         alert("An error occurred. Please try again later.");
//       }
//     });
//   }

//   function getWeatherIcon(condition) {
//     condition = condition.toLowerCase();
//     if (condition.includes("cloud")) return "fas fa-cloud";
//     if (condition.includes("rain")) return "fas fa-cloud-showers-heavy";
//     if (condition.includes("storm")) return "fas fa-bolt";
//     if (condition.includes("sun") || condition.includes("clear"))
//       return "fas fa-sun";
//     if (condition.includes("snow")) return "fas fa-snowflake";
//     return "fas fa-smog"; // fallback
//   }

//   function updateWeatherUI(data) {
//     // Current weather
//     const tempEl = document.getElementById("weather-temp");
//     const conditionEl = document.getElementById("weather-condition");
//     const iconEl = document.getElementById("weather-icon");

//     if (tempEl && data.current?.temp != null)
//       tempEl.textContent = `${Math.round(data.current.temp)}°C`;
//     if (conditionEl && data.current?.condition)
//       conditionEl.textContent = data.current.condition;

//     if (iconEl && data.current?.condition) {
//       const iconClass = getWeatherIcon(data.current.condition);
//       iconEl.className = iconClass;
//     }

//     // Forecast
//     const forecastTomorrowEl = document.getElementById("weather-temp-tomorrow");
//     const forecastDay2El = document.getElementById("weather-temp-day2");
//     const forecastDay3El = document.getElementById("weather-temp-day3");

//     if (forecastTomorrowEl && data.forecast?.tomorrow != null)
//       forecastTomorrowEl.textContent = `${Math.round(
//         data.forecast.tomorrow
//       )}°C`;
//     if (forecastDay2El && data.forecast?.day2 != null)
//       forecastDay2El.textContent = `${Math.round(data.forecast.day2)}°C`;
//     if (forecastDay3El && data.forecast?.day3 != null)
//       forecastDay3El.textContent = `${Math.round(data.forecast.day3)}°C`;

//     // Location
//     const locationEl = document.getElementById("location");
//     if (locationEl)
//       locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${
//         data.location || "Unknown"
//       }`;
//   }

//   // New function to fetch location and weather data from the backend
//   async function fetchLocationAndWeather() {
//     try {
//       // Step 1: Get device coordinates
//       const position = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//       });

//       const { latitude, longitude } = position.coords;

//       // Step 2: Call your weather API directly with lat/lon
//       const response = await fetch(
//         `http://127.0.0.1:5000/api/weather?lat=${latitude}&lon=${longitude}`
//       );
//       const data = await response.json();
//       console.log("Weather API response:", data);

//       if (response.ok) {
//         updateWeatherUI(data);
//       } else {
//         console.error("Failed to fetch weather:", data.error);
//         // fallback
//         const mockData = {
//           location: "Unknown",
//           current: { temp: 28, condition: "Sunny & Clear" },
//           forecast: { tomorrow: 25, day2: 26, day3: 30 },
//         };
//         updateWeatherUI(mockData);
//       }
//     } catch (error) {
//       console.error("Error getting location or weather:", error);
//       const mockData = {
//         location: "Unknown",
//         current: { temp: 28, condition: "Sunny & Clear" },
//         forecast: { tomorrow: 25, day2: 26, day3: 30 },
//       };
//       updateWeatherUI(mockData);
//     }
//   }

//   // --- The rest of the existing script.js code remains the same ---

//   function showPage(pageId) {
//     pages.forEach((page) => {
//       page.classList.remove("active");
//     });

//     const activePage = document.getElementById(pageId);
//     if (activePage) {
//       activePage.classList.add("active");
//     }

//     navItems.forEach((item) => {
//       item.classList.remove("active");
//       if (item.getAttribute("data-page") === pageId) {
//         item.classList.add("active");
//       }
//     });

//     updateHeader(pageId);

//     if (pageId === "home-page") {
//       fetchLocationAndWeather();
//     }
//   }

//   function updateHeader(pageId) {
//     if (pageId === "home-page") {
//       header.innerHTML =
//         '<span id="location"><i class="fas fa-map-marker-alt"></i></span>';
//       header.style.justifyContent = "center";
//     } else if (pageId === "auth-page") {
//       header.innerHTML = "";
//     } else {
//       const pageTitleElement = document
//         .getElementById(pageId)
//         .querySelector(".page-title");
//       const pageTitle = pageTitleElement ? pageTitleElement.textContent : "";
//       header.innerHTML = `<span class="back-btn" onclick="showPage('home-page')"><i class="fas fa-arrow-left"></i></span> ${pageTitle}`;
//       header.style.justifyContent = "flex-start";
//     }
//   }

//   navItems.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       e.preventDefault();
//       const pageId = item.getAttribute("data-page");
//       showPage(pageId);
//     });
//   });

//   const whatToGrowCard = document
//     .querySelector(".crop-suggestion")
//     .closest(".card");
//   if (whatToGrowCard) {
//     whatToGrowCard.addEventListener("click", () => {
//       showPage("crop-suggestions-page");
//     });
//   }

//   const quickActions = document.querySelectorAll(".quick-actions .action-item");
//   quickActions.forEach((action) => {
//     action.addEventListener("click", () => {
//       const pageId = action.getAttribute("onclick").match(/'(.*)'/)[1];
//       showPage(pageId);
//     });
//   });

//   showPage("auth-page");
// });



// // Global variables
// let currentUserId = localStorage.getItem("currentUserId") || null; 

// // Make showPage globally accessible
// window.showPage = function(pageId) {
//     console.log("🔄 showPage called with:", pageId);
    
//     const pages = document.querySelectorAll(".page");
//     const navItems = document.querySelectorAll(".bottom-nav .nav-item");
//     const header = document.getElementById("header");
    
//     console.log("📄 Total pages found:", pages.length);
    
//     pages.forEach((page) => {
//         page.classList.remove("active");
//     });

//     const activePage = document.getElementById(pageId);
//     if (activePage) {
//         activePage.classList.add("active");
//         console.log("✅ Activated page:", pageId);
//     } else {
//         console.error("❌ Page not found:", pageId);
//         return;
//     }

//     const navContainer = document.querySelector('.bottom-nav');

//     if(pageId === 'auth-page' || pageId === 'profile-collect-page') {
//         if(navContainer) navContainer.style.display = 'none'; 
//         header.innerHTML = "";
//         console.log("👁️ Hidden nav bar for:", pageId);
//     } else {
//         if(navContainer) navContainer.style.display = 'flex'; 
        
//         navItems.forEach((item) => {
//             item.classList.remove("active");
//             if (item.getAttribute("data-page") === pageId) {
//                 item.classList.add("active");
//             }
//         });
//         updateHeader(pageId);
//     }

//     if (pageId === "home-page") {
//         fetchRealTimeLocationAndWeather(); 
//     }
//     if (pageId === "profile-page") {
//         loadProfile(); 
//     }
//     if (pageId === "market-trends-page") {
//         loadMarketData();
//     }
// }

// window.logoutUser = function() {
//     localStorage.removeItem("currentUserId");
//     currentUserId = null;
//     console.log("🚪 User logged out");
//     alert("You have been logged out.");
//     showPage("auth-page");
// }

// function updateHeader(pageId) {
//     const header = document.getElementById("header");
    
//     if (pageId === "home-page") {
//         header.innerHTML = '<span id="location"><i class="fas fa-map-marker-alt"></i> Kanke, Ranchi-Jharkhand</span>';
//         header.style.justifyContent = "center";
//     } else {
//         const pageTitleElement = document.getElementById(pageId)?.querySelector(".page-title");
//         const pageTitle = pageTitleElement ? pageTitleElement.textContent : "";
//         header.innerHTML = `<span class="back-btn" onclick="showPage('home-page')"><i class="fas fa-arrow-left"></i></span> ${pageTitle}`;
//         header.style.justifyContent = "flex-start";
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("🚀 DOM Loaded - Initializing Kisan Mitra App");
    
//     const navItems = document.querySelectorAll(".bottom-nav .nav-item");

//     // --- UTILITY FUNCTIONS ---

//     function getWeatherIcon(condition) {
//         condition = condition.toLowerCase();
//         if (condition.includes("cloud") || condition.includes("overcast")) return "fas fa-cloud";
//         if (condition.includes("rain") || condition.includes("shower")) return "fas fa-cloud-showers-heavy";
//         if (condition.includes("storm") || condition.includes("thunder")) return "fas fa-bolt";
//         if (condition.includes("sun") || condition.includes("clear")) return "fas fa-sun";
//         if (condition.includes("snow")) return "fas fa-snowflake";
//         return "fas fa-smog"; 
//     }

//     function updateWeatherUI(data) {
//         const tempEl = document.getElementById("weather-temp");
//         const conditionEl = document.getElementById("weather-condition");
//         const iconEl = document.getElementById("weather-icon");

//         if (tempEl && data.current?.temp != null)
//             tempEl.textContent = `${Math.round(data.current.temp)}°C`;
//         if (conditionEl && data.current?.condition)
//             conditionEl.textContent = data.current.condition.charAt(0).toUpperCase() + data.current.condition.slice(1);

//         if (iconEl && data.current?.condition) {
//             const iconClass = getWeatherIcon(data.current.condition);
//             iconEl.className = iconClass; 
//         }

//         const forecastTomorrowEl = document.getElementById("weather-temp-tomorrow");
//         const forecastDay2El = document.getElementById("weather-temp-day2");
//         const forecastDay3El = document.getElementById("weather-temp-day3");

//         if (forecastTomorrowEl && data.forecast?.tomorrow != null)
//             forecastTomorrowEl.textContent = `${Math.round(data.forecast.tomorrow)}°C`;
//         if (forecastDay2El && data.forecast?.day2 != null)
//             forecastDay2El.textContent = `${Math.round(data.forecast.day2)}°C`;
//         if (forecastDay3El && data.forecast?.day3 != null)
//             forecastDay3El.textContent = `${Math.round(data.forecast.day3)}°C`;

//         const locationEl = document.getElementById("location");
//         if (locationEl)
//             locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location || "Unknown Location"}`;
//     }

//     async function fetchDefaultWeather() {
//         const defaultLocation = "Kanke, Ranchi-Jharkhand";
//         try {
//             const response = await fetch(`http://127.0.0.1:5000/api/weather?location=${encodeURIComponent(defaultLocation)}`);
//             const data = await response.json();
//             if (response.ok) {
//                 updateWeatherUI(data);
//             } else {
//                 const hardcodedData = { location: defaultLocation, current: { temp: 28, condition: "Sunny & Clear" }, forecast: { tomorrow: 25, day2: 26, day3: 30 } };
//                 updateWeatherUI(hardcodedData);
//             }
//         } catch (error) {
//             console.error("⚠️ Weather fetch error:", error);
//         }
//     }

//     window.fetchRealTimeLocationAndWeather = function() {
//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     const lat = position.coords.latitude;
//                     const lon = position.coords.longitude;
                    
//                     try {
//                         const response = await fetch(`http://127.0.0.1:5000/api/weather?lat=${lat}&lon=${lon}`);
//                         const data = await response.json();

//                         if (response.ok) {
//                             updateWeatherUI(data);
//                         } else {
//                             fetchDefaultWeather(); 
//                         }
//                     } catch (error) {
//                         fetchDefaultWeather(); 
//                     }
//                 },
//                 (error) => { 
//                     console.log("⚠️ Geolocation error, using default");
//                     fetchDefaultWeather(); 
//                 }
//             );
//         } else {
//             fetchDefaultWeather();
//         }
//     }

//     // --- MARKET API LOGIC ---
//     window.loadMarketData = async function() {
//         const tableBody = document.getElementById("market-data-table");
        
//         const staticRows = `
//             <tr>
//                 <td><img src="image_e738e6.jpg" alt="Wheat" style="width: 25px; height: 25px; border-radius: 50%;"> Wheat</td>
//                 <td>₹2,850</td>
//                 <td>₹2,700</td>
//                 <td class="up"><i class="fas fa-caret-up"></i> +2.1%</td>
//             </tr>
//             <tr>
//                 <td><img src="image_e73928.jpg" alt="Rice" style="width: 25px; height: 25px; border-radius: 50%;"> Rice</td>
//                 <td>₹3,200</td>
//                 <td>₹3,050</td>
//                 <td class="up"><i class="fas fa-caret-up"></i> +2.1%</td>
//             </tr>
//             <tr>
//                 <td><img src="image_e73c0b.jpg" alt="Maize" style="width: 25px; height: 25px; border-radius: 50%;"> Maize</td>
//                 <td>₹2,100</td>
//                 <td>₹1,950</td>
//                 <td class="up"><i class="fas fa-caret-up"></i> +2.1%</td>
//             </tr>
//             <tr>
//                 <td><img src="image_e73c4c.jpg" alt="Sugarcane" style="width: 25px; height: 25px; border-radius: 50%;"> Sugarcane</td>
//                 <td>₹380</td>
//                 <td>₹230</td>
//                 <td class="up"><i class="fas fa-caret-up"></i> +2.1%</td>
//             </tr>
//         `;
        
//         if(!tableBody) return;
//         tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:gray;">Loading market data...</td></tr>';

//         try {
//             const response = await fetch("http://127.0.0.1:5000/api/live_market");
//             const data = await response.json();

//             if (response.ok && Array.isArray(data) && data.length > 0) {
//                 let tableRowsHTML = '';
                
//                 data.forEach(item => {
//                     const changeValue = item.seven_days_ago > 0 ? ((item.today - item.seven_days_ago) / item.seven_days_ago) * 100 : 0;
                    
//                     const changeClass = changeValue > 0 ? 'up' : 'down';
//                     const icon = changeValue > 0 ? 'fa-caret-up' : 'fa-caret-down';
                    
//                     let imgSrc = '';
//                     if (item.crop === 'Wheat') imgSrc = 'image_e738e6.jpg';
//                     else if (item.crop === 'Rice') imgSrc = 'image_e73928.jpg';
//                     else if (item.crop === 'Maize') imgSrc = 'image_e73c0b.jpg';
//                     else if (item.crop === 'Sugarcane') imgSrc = 'image_e73c4c.jpg';

//                     tableRowsHTML += `
//                         <tr>
//                             <td><img src="${imgSrc}" alt="${item.crop}" style="width: 25px; height: 25px; border-radius: 50%;"> ${item.crop}</td>
//                             <td>₹${item.today.toLocaleString()}</td>
//                             <td>₹${item.seven_days_ago.toLocaleString()}</td>
//                             <td class="${changeClass}"><i class="fas ${icon}"></i> ${changeValue.toFixed(2)}%</td>
//                         </tr>
//                     `;
//                 });
                
//                 tableBody.innerHTML = tableRowsHTML;
//             } else {
//                 tableBody.innerHTML = staticRows;
//             }
//         } catch (error) {
//             console.error("⚠️ Market data error:", error);
//             tableBody.innerHTML = staticRows;
//         }
//     }

//     // --- PROFILE LOADING ---
//     window.loadProfile = async function() {
//         const userId = localStorage.getItem("currentUserId");

//         if (!userId) {
//             alert("Please log in to view your profile.");
//             showPage("auth-page");
//             return;
//         }

//         try {
//             const response = await fetch(`http://127.0.0.1:5000/profile/get/${userId}`);
//             const data = await response.json();
            
//             if (response.ok) {
//                 const user = data.user;
//                 const farm = data.farm;

//                 document.getElementById("profile-name").innerText = user.name || "N/A";
//                 document.getElementById("profile-age").innerText = user.age || "N/A";
//                 document.getElementById("profile-mobile").innerText = user.mobile_number || "N/A";
//                 document.getElementById("profile-location").innerText = user.location || "N/A";
                
//                 document.getElementById("profile-farm-name").innerText = farm.farm_name || "N/A";
//                 document.getElementById("profile-farm-size").innerText = farm.farm_size || "N/A";
//                 document.getElementById("profile-crop-history").innerText = farm.crop_history || "N/A";
//                 document.getElementById("profile-soil").innerText = farm.soil_type || "N/A";
//                 document.getElementById("profile-irrigation").innerText = farm.irrigation_source || "N/A";
                
//                 // Update stats display
//                 const farmSizeDisplay = document.getElementById("profile-farm-size-display");
//                 if(farmSizeDisplay) farmSizeDisplay.innerText = farm.farm_size || "2.5 acres";

//             } else {
//                 alert("Failed to load profile data: " + (data.error || "Please check backend."));
//             }
//         } catch(error) {
//             console.error("⚠️ Profile load error:", error);
//             alert("Network error: Could not connect to backend to load profile.");
//         }
//     }

//     // --- AUTHENTICATION & FLOW HANDLERS ---

//     // Show/Hide Login and Signup forms
//     const showLoginBtn = document.getElementById("show-login-btn");
//     const showSignupBtn = document.getElementById("show-signup-btn");
//     const signupContainer = document.querySelector("#auth-page .auth-container:first-child");
//     const loginContainer = document.getElementById("login-container");

//     if(showLoginBtn) {
//         showLoginBtn.addEventListener("click", () => {
//             signupContainer.style.display = "none";
//             loginContainer.style.display = "block";
//         });
//     }

//     if(showSignupBtn) {
//         showSignupBtn.addEventListener("click", () => {
//             loginContainer.style.display = "none";
//             signupContainer.style.display = "block";
//         });
//     }

//     // Sign Up Form Handler
//     const signupForm = document.getElementById("signup-form");
//     if (signupForm) {
//         signupForm.addEventListener("submit", async (e) => {
//             e.preventDefault();
//             console.log("🔵 Sign up form submitted");

//             const name = document.getElementById("name").value.trim();
//             const mobile_number = document.getElementById("mobile").value.trim();

//             if(!name || !mobile_number) {
//                 alert("Please fill in all fields");
//                 return;
//             }

//             if(mobile_number.length !== 10) {
//                 alert("Please enter a valid 10-digit mobile number");
//                 return;
//             }

//             console.log("📝 Form data:", { name, mobile_number });

//             try {
//                 console.log("📡 Sending request to backend...");
//                 const response = await fetch("http://127.0.0.1:5000/register", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ name: name, mobile_number: mobile_number }),
//                 });

//                 console.log("📨 Response status:", response.status);
//                 const data = await response.json();
//                 console.log("📦 Response data:", data);

//                 if (response.ok && data.user_id) {
//                     currentUserId = data.user_id; 
//                     localStorage.setItem("currentUserId", currentUserId);
//                     console.log("✅ Registration successful! User ID:", currentUserId);
//                     alert("Registration successful! Please complete your profile.");
//                     console.log("🔄 Calling showPage('profile-collect-page')");
//                     showPage("profile-collect-page"); 
//                 } else {
//                     console.error("❌ Registration failed:", data.error);
//                     alert("Registration failed: " + (data.error || "Unknown error"));
//                 }
//             } catch (error) {
//                 console.error("❌ Network error:", error);
//                 alert("An error occurred. Make sure your Flask server is running at http://127.0.0.1:5000");
//             }
//         });
//     } else {
//         console.error("❌ Signup form not found in DOM");
//     }

//     // Login Form Handler
//     const loginForm = document.getElementById("login-form");
//     if (loginForm) {
//         loginForm.addEventListener("submit", async (e) => {
//             e.preventDefault();
//             console.log("🔵 Login form submitted");

//             const mobile_number = document.getElementById("login-mobile").value.trim();

//             if(!mobile_number || mobile_number.length !== 10) {
//                 alert("Please enter a valid 10-digit mobile number");
//                 return;
//             }

//             try {
//                 console.log("📡 Sending login request...");
//                 const response = await fetch("http://127.0.0.1:5000/login", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ mobile_number: mobile_number }),
//                 });

//                 const data = await response.json();
//                 console.log("📦 Login response:", data);

//                 if (response.ok && data.user_id) {
//                     currentUserId = data.user_id;
//                     localStorage.setItem("currentUserId", currentUserId);
//                     console.log("✅ Login successful! User ID:", currentUserId);
//                     alert("Login successful! Welcome back " + data.name);
//                     showPage("home-page");
//                 } else {
//                     console.error("❌ Login failed:", data.error);
//                     alert("Login failed: " + (data.error || "User not found. Try signing up first."));
//                 }

//             } catch (error) {
//                 console.error("❌ Login error:", error);
//                 alert("An error occurred during login. Check server connection.");
//             }
//         });
//     }
    
//     // Profile Collection Form Handler
//     const profileCollectForm = document.getElementById("profile-collect-form");
//     if (profileCollectForm) {
//         profileCollectForm.addEventListener("submit", async (e) => {
//             e.preventDefault();
//             console.log("🔵 Profile form submitted");

//             if (!currentUserId) {
//                 alert("Error: User ID not found. Please re-register/login.");
//                 showPage("auth-page");
//                 return;
//             }
            
//             const profileData = {
//                 user_id: currentUserId,
//                 age: document.getElementById("age").value,
//                 location_manual: document.getElementById("location_manual").value,
//                 farm_name: document.getElementById("farm_name").value,
//                 farm_size: document.getElementById("farm_size").value,
//                 crop_history: document.getElementById("crop_history").value,
//                 soil_type: document.getElementById("soil_type").value,
//                 irrigation_source: document.getElementById("irrigation_source").value,
//             };

//             console.log("📝 Profile data:", profileData);

//             try {
//                 console.log("📡 Sending profile update...");
//                 const response = await fetch("http://127.0.0.1:5000/profile/update", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(profileData),
//                 });
                
//                 console.log("📨 Profile update status:", response.status);
                
//                 if (response.ok) {
//                     console.log("✅ Profile updated successfully");
//                     alert("Profile setup complete! Welcome to the app.");
//                     showPage("home-page"); 
//                 } else {
//                     const data = await response.json();
//                     console.error("❌ Profile update failed:", data);
//                     alert("Profile update failed: " + (data.error || "Unknown error"));
//                 }
//             } catch (error) {
//                 console.error("❌ Profile update error:", error);
//                 alert("An error occurred while saving your profile. Check your Flask server and database setup.");
//             }
//         });
//     }

//     // --- NAVIGATION AND UI HANDLERS ---

//     navItems.forEach((item) => {
//         item.addEventListener("click", (e) => {
//             e.preventDefault();
//             const pageId = item.getAttribute("data-page");
            
//             if (!currentUserId && pageId !== 'auth-page') {
//                 alert("Please sign up or login to access the app features.");
//                 showPage('auth-page');
//                 return;
//             }
//             showPage(pageId);
//         });
//     });

//     const quickActions = document.querySelectorAll(".quick-actions .action-item");
//     quickActions.forEach((action) => {
//         action.addEventListener("click", (e) => {
//             if (!currentUserId) {
//                 e.preventDefault();
//                 alert("Please complete your profile first.");
//                 return;
//             }
//             const onclickAttr = action.getAttribute("onclick");
//             if(onclickAttr) {
//                 const pageId = onclickAttr.match(/'(.*)'/)[1];
//                 showPage(pageId);
//             }
//         });
//     });

//     // Initial page load
//     console.log("🔍 Checking user session...");
//     console.log("Current User ID:", currentUserId);
    
//     if (currentUserId) {
//         console.log("✅ User logged in, loading home page");
//         showPage("home-page");
//     } else {
//         console.log("⚠️ No user session, showing auth page");
//         showPage("auth-page");
//     }
// });


// Global variables
let currentUserId = localStorage.getItem("currentUserId") || null; 

console.log("=== SCRIPT LOADED ===");
console.log("Initial currentUserId:", currentUserId);

// Make showPage globally accessible BEFORE DOMContentLoaded
window.showPage = function(pageId) {
    console.log("=== showPage CALLED ===");
    console.log("Target page:", pageId);
    
    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const header = document.getElementById("header");
    const navContainer = document.querySelector('.bottom-nav');
    
    console.log("Found pages:", pages.length);
    console.log("Found nav items:", navItems.length);
    
    // Hide all pages
    pages.forEach((page) => {
        page.classList.remove("active");
    });

    // Show target page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add("active");
        console.log("✅ Page activated:", pageId);
    } else {
        console.error("❌ PAGE NOT FOUND:", pageId);
        console.log("Available page IDs:");
        pages.forEach(p => console.log("  -", p.id));
        return;
    }

    // Handle navigation bar visibility
    if(pageId === 'auth-page' || pageId === 'profile-collect-page') {
        if(navContainer) navContainer.style.display = 'none'; 
        if(header) header.innerHTML = "";
        console.log("Nav bar hidden for:", pageId);
    } else {
        if(navContainer) navContainer.style.display = 'flex'; 
        
        navItems.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("data-page") === pageId) {
                item.classList.add("active");
            }
        });
        updateHeader(pageId);
        console.log("Nav bar shown for:", pageId);
    }

    // Page-specific actions
    if (pageId === "home-page") {
        console.log("Loading weather for home page");
        fetchRealTimeLocationAndWeather(); 
    }
    if (pageId === "profile-page") {
        console.log("Loading profile data");
        loadProfile(); 
    }
    if (pageId === "market-trends-page") {
        console.log("Loading market data");
        loadMarketData();
    }
}

window.logoutUser = function() {
    console.log("=== LOGOUT CALLED ===");
    localStorage.removeItem("currentUserId");
    currentUserId = null;
    alert("You have been logged out.");
    showPage("auth-page");
}

function updateHeader(pageId) {
    const header = document.getElementById("header");
    
    if (pageId === "home-page") {
        header.innerHTML = '<span id="location"><i class="fas fa-map-marker-alt"></i> Kanke, Ranchi-Jharkhand</span>';
        header.style.justifyContent = "center";
    } else {
        const pageTitleElement = document.getElementById(pageId)?.querySelector(".page-title");
        const pageTitle = pageTitleElement ? pageTitleElement.textContent : "";
        header.innerHTML = `<span class="back-btn" onclick="showPage('home-page')"><i class="fas fa-arrow-left"></i></span> ${pageTitle}`;
        header.style.justifyContent = "flex-start";
    }
}

// Weather functions
function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes("cloud") || condition.includes("overcast")) return "fas fa-cloud";
    if (condition.includes("rain") || condition.includes("shower")) return "fas fa-cloud-showers-heavy";
    if (condition.includes("storm") || condition.includes("thunder")) return "fas fa-bolt";
    if (condition.includes("sun") || condition.includes("clear")) return "fas fa-sun";
    if (condition.includes("snow")) return "fas fa-snowflake";
    return "fas fa-smog"; 
}

function updateWeatherUI(data) {
    const tempEl = document.getElementById("weather-temp");
    const conditionEl = document.getElementById("weather-condition");
    const iconEl = document.getElementById("weather-icon");

    if (tempEl && data.current?.temp != null)
        tempEl.textContent = `${Math.round(data.current.temp)}°C`;
    if (conditionEl && data.current?.condition)
        conditionEl.textContent = data.current.condition.charAt(0).toUpperCase() + data.current.condition.slice(1);

    if (iconEl && data.current?.condition) {
        const iconClass = getWeatherIcon(data.current.condition);
        iconEl.className = iconClass; 
    }

    const forecastTomorrowEl = document.getElementById("weather-temp-tomorrow");
    const forecastDay2El = document.getElementById("weather-temp-day2");
    const forecastDay3El = document.getElementById("weather-temp-day3");

    if (forecastTomorrowEl && data.forecast?.tomorrow != null)
        forecastTomorrowEl.textContent = `${Math.round(data.forecast.tomorrow)}°C`;
    if (forecastDay2El && data.forecast?.day2 != null)
        forecastDay2El.textContent = `${Math.round(data.forecast.day2)}°C`;
    if (forecastDay3El && data.forecast?.day3 != null)
        forecastDay3El.textContent = `${Math.round(data.forecast.day3)}°C`;

    const locationEl = document.getElementById("location");
    if (locationEl)
        locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location || "Unknown Location"}`;
}

async function fetchDefaultWeather() {
    const defaultLocation = "Kanke, Ranchi-Jharkhand";
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/weather?location=${encodeURIComponent(defaultLocation)}`);
        const data = await response.json();
        if (response.ok) {
            updateWeatherUI(data);
        }
    } catch (error) {
        console.error("Weather fetch error:", error);
    }
}

window.fetchRealTimeLocationAndWeather = function() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                try {
                    const response = await fetch(`http://127.0.0.1:5000/api/weather?lat=${lat}&lon=${lon}`);
                    const data = await response.json();

                    if (response.ok) {
                        updateWeatherUI(data);
                    } else {
                        fetchDefaultWeather(); 
                    }
                } catch (error) {
                    fetchDefaultWeather(); 
                }
            },
            (error) => { 
                fetchDefaultWeather(); 
            }
        );
    } else {
        fetchDefaultWeather();
    }
}

// Market data function
window.loadMarketData = async function() {
    const tableBody = document.getElementById("market-data-table");
    if(!tableBody) return;
    
    tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:gray;">Loading...</td></tr>';

    try {
        const response = await fetch("http://127.0.0.1:5000/api/live_market");
        const data = await response.json();

        if (response.ok && Array.isArray(data) && data.length > 0) {
            let tableRowsHTML = '';
            
            data.forEach(item => {
                const changeValue = item.change || 0;
                const changeClass = changeValue > 0 ? 'up' : 'down';
                const icon = changeValue > 0 ? 'fa-caret-up' : 'fa-caret-down';
                
                let imgSrc = 'wheat.jpg';
                if (item.crop === 'Wheat') imgSrc = 'image_e738e6.jpg';
                else if (item.crop === 'Rice') imgSrc = 'image_e73928.jpg';
                else if (item.crop === 'Maize') imgSrc = 'image_e73c0b.jpg';
                else if (item.crop === 'Sugarcane') imgSrc = 'image_e73c4c.jpg';

                tableRowsHTML += `
                    <tr>
                        <td><img src="${imgSrc}" alt="${item.crop}" style="width: 25px; height: 25px; border-radius: 50%;"> ${item.crop}</td>
                        <td>₹${item.today.toLocaleString()}</td>
                        <td>₹${item.seven_days_ago.toLocaleString()}</td>
                        <td class="${changeClass}"><i class="fas ${icon}"></i> ${changeValue.toFixed(2)}%</td>
                    </tr>
                `;
            });
            
            tableBody.innerHTML = tableRowsHTML;
        }
    } catch (error) {
        console.error("Market data error:", error);
    }
}

// Profile loading function
window.loadProfile = async function() {
    const userId = localStorage.getItem("currentUserId");

    if (!userId) {
        alert("Please log in to view your profile.");
        showPage("auth-page");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/profile/get/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
            const user = data.user;
            const farm = data.farm;

            document.getElementById("profile-name").innerText = user.name || "N/A";
            document.getElementById("profile-age").innerText = user.age || "N/A";
            document.getElementById("profile-mobile").innerText = user.mobile_number || "N/A";
            document.getElementById("profile-location").innerText = user.location || "N/A";
            
            document.getElementById("profile-farm-name").innerText = farm.farm_name || "N/A";
            document.getElementById("profile-farm-size").innerText = farm.farm_size || "N/A";
            document.getElementById("profile-crop-history").innerText = farm.crop_history || "N/A";
            document.getElementById("profile-soil").innerText = farm.soil_type || "N/A";
            document.getElementById("profile-irrigation").innerText = farm.irrigation_source || "N/A";
        }
    } catch(error) {
        console.error("Profile load error:", error);
    }
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("=== DOM CONTENT LOADED ===");
    
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const profileCollectForm = document.getElementById("profile-collect-form");
    const showLoginBtn = document.getElementById("show-login-btn");
    const showSignupBtn = document.getElementById("show-signup-btn");
    
    console.log("Elements found:");
    console.log("- Nav items:", navItems.length);
    console.log("- Signup form:", !!signupForm);
    console.log("- Login form:", !!loginForm);
    console.log("- Profile form:", !!profileCollectForm);
    console.log("- Show login btn:", !!showLoginBtn);
    console.log("- Show signup btn:", !!showSignupBtn);

    // Show/Hide Login and Signup forms
    if(showLoginBtn) {
        console.log("Attaching show-login button handler");
        showLoginBtn.addEventListener("click", () => {
            console.log("=== SHOW LOGIN CLICKED ===");
            const signupContainer = document.querySelector("#auth-page .auth-container:first-child");
            const loginContainer = document.getElementById("login-container");
            
            if(signupContainer) signupContainer.style.display = "none";
            if(loginContainer) loginContainer.style.display = "block";
            console.log("Login form should now be visible");
        });
    }

    if(showSignupBtn) {
        console.log("Attaching show-signup button handler");
        showSignupBtn.addEventListener("click", () => {
            console.log("=== SHOW SIGNUP CLICKED ===");
            const signupContainer = document.querySelector("#auth-page .auth-container:first-child");
            const loginContainer = document.getElementById("login-container");
            
            if(loginContainer) loginContainer.style.display = "none";
            if(signupContainer) signupContainer.style.display = "block";
            console.log("Signup form should now be visible");
        });
    }

    // Sign Up Form Handler
    if (signupForm) {
        console.log("Attaching signup form handler");
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("=== SIGNUP FORM SUBMITTED ===");

            const nameInput = document.getElementById("name");
            const mobileInput = document.getElementById("mobile");
            
            console.log("Name input element:", !!nameInput);
            console.log("Mobile input element:", !!mobileInput);

            const name = nameInput ? nameInput.value.trim() : "";
            const mobile_number = mobileInput ? mobileInput.value.trim() : "";

            console.log("Form values:");
            console.log("- Name:", name);
            console.log("- Mobile:", mobile_number);

            if(!name || !mobile_number) {
                alert("Please fill in all fields");
                return;
            }

            if(mobile_number.length !== 10) {
                alert("Please enter a valid 10-digit mobile number");
                return;
            }

            try {
                console.log("Sending registration request to backend...");
                const response = await fetch("http://127.0.0.1:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: name, mobile_number: mobile_number }),
                });

                console.log("Response status:", response.status);
                const data = await response.json();
                console.log("Response data:", data);

                if (response.ok && data.user_id) {
                    currentUserId = data.user_id; 
                    localStorage.setItem("currentUserId", currentUserId);
                    console.log("✅ Registration successful! User ID:", currentUserId);
                    alert("Registration successful! Please complete your profile.");
                    console.log("Calling showPage('profile-collect-page')...");
                    showPage("profile-collect-page"); 
                } else {
                    console.error("❌ Registration failed:", data.error);
                    alert("Registration failed: " + (data.error || "Unknown error"));
                }
            } catch (error) {
                console.error("❌ Network error:", error);
                alert("Error: " + error.message + "\n\nMake sure Flask server is running at http://127.0.0.1:5000");
            }
        });
    } else {
        console.error("❌ SIGNUP FORM NOT FOUND!");
    }

    // Login Form Handler
    if (loginForm) {
        console.log("Attaching login form handler");
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("=== LOGIN FORM SUBMITTED ===");

            const loginMobileInput = document.getElementById("login-mobile");
            const mobile_number = loginMobileInput ? loginMobileInput.value.trim() : "";

            console.log("Login mobile:", mobile_number);

            if(!mobile_number || mobile_number.length !== 10) {
                alert("Please enter a valid 10-digit mobile number");
                return;
            }

            try {
                console.log("Sending login request...");
                const response = await fetch("http://127.0.0.1:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mobile_number: mobile_number }),
                });

                console.log("Login response status:", response.status);
                const data = await response.json();
                console.log("Login response data:", data);

                if (response.ok && data.user_id) {
                    currentUserId = data.user_id;
                    localStorage.setItem("currentUserId", currentUserId);
                    console.log("✅ Login successful! User ID:", currentUserId);
                    alert("Login successful! Welcome back " + data.name);
                    showPage("home-page");
                } else {
                    console.error("❌ Login failed:", data.error);
                    alert("Login failed: " + (data.error || "User not found"));
                }
            } catch (error) {
                console.error("❌ Login error:", error);
                alert("Login error: " + error.message);
            }
        });
    } else {
        console.error("❌ LOGIN FORM NOT FOUND!");
    }
    
    // Profile Collection Form Handler
    if (profileCollectForm) {
        console.log("Attaching profile form handler");
        profileCollectForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("=== PROFILE FORM SUBMITTED ===");

            if (!currentUserId) {
                alert("Error: User ID not found. Please re-register/login.");
                showPage("auth-page");
                return;
            }
            
            const profileData = {
                user_id: currentUserId,
                age: document.getElementById("age").value,
                location_manual: document.getElementById("location_manual").value,
                farm_name: document.getElementById("farm_name").value,
                farm_size: document.getElementById("farm_size").value,
                crop_history: document.getElementById("crop_history").value,
                soil_type: document.getElementById("soil_type").value,
                irrigation_source: document.getElementById("irrigation_source").value,
            };

            console.log("Profile data:", profileData);

            try {
                console.log("Sending profile update...");
                const response = await fetch("http://127.0.0.1:5000/profile/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(profileData),
                });
                
                console.log("Profile update status:", response.status);
                
                if (response.ok) {
                    console.log("✅ Profile updated successfully");
                    alert("Profile setup complete! Welcome to the app.");
                    showPage("home-page"); 
                } else {
                    const data = await response.json();
                    console.error("❌ Profile update failed:", data);
                    alert("Profile update failed: " + (data.error || "Unknown error"));
                }
            } catch (error) {
                console.error("❌ Profile update error:", error);
                alert("Profile update error: " + error.message);
            }
        });
    } else {
        console.error("❌ PROFILE FORM NOT FOUND!");
    }

    // Navigation handlers
    navItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const pageId = item.getAttribute("data-page");
            console.log("Nav item clicked:", pageId);
            
            if (!currentUserId && pageId !== 'auth-page') {
                alert("Please sign up or login first");
                showPage('auth-page');
                return;
            }
            showPage(pageId);
        });
    });

    // Quick actions handlers
    const quickActions = document.querySelectorAll(".quick-actions .action-item");
    quickActions.forEach((action) => {
        action.addEventListener("click", () => {
            if (!currentUserId) {
                alert("Please complete your profile first.");
                return;
            }
            const onclickAttr = action.getAttribute("onclick");
            if(onclickAttr) {
                const match = onclickAttr.match(/'([^']+)'/);
                if(match) {
                    const pageId = match[1];
                    showPage(pageId);
                }
            }
        });
    });

    // Initial page load
    console.log("=== INITIAL PAGE LOAD ===");
    console.log("Current User ID:", currentUserId);
    
    if (currentUserId) {
        console.log("User logged in, showing home page");
        showPage("home-page");
    } else {
        console.log("No user session, showing auth page");
        showPage("auth-page");
    }
    
    console.log("=== INITIALIZATION COMPLETE ===");
});