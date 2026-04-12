function openFilterDropdown(){
            console.log("Opening filter dropdown");
            if (document.querySelector('.dropdown').style.visibility === 'visible'){
                document.querySelector('.dropdown').style.visibility = 'hidden';
                return;
            }
            document.querySelector('.dropdown').style.visibility = 'visible';
        }

        function updateMobileTopbarLabel(page) {
            const label = document.getElementById('mobileTopbarLabel');
            if (!label) return;
            const pageName = {
                home: 'Home',
                projects: 'Projects',
                music: 'Music',
                algorithms: 'Algorithms',
                games: 'Games',
                links: 'Links'
            }[page] || 'home';
            label.textContent = `# ${pageName}`;
        }

        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            if (!sidebar) return;
            sidebar.classList.toggle('sidebar-open');
        }

        function closeSidebar() {
            const sidebar = document.querySelector('.sidebar');
            if (!sidebar) return;
            sidebar.classList.remove('sidebar-open');
        }

        function clickedSubpage(page){
            switch (page){
                case "home":
                    load("SubPages/home.html", document.querySelector(".main-content"));
                    break;
                case 'projects':
                    load("SubPages/projects.html", document.querySelector(".main-content"));
                    break;
                case 'music':
                    load("SubPages/music.html", document.querySelector(".main-content"));
                    break;
                case 'algorithms':
                    load("SubPages/algorithms.html", document.querySelector(".main-content"));
                    break;
                case 'games':
                    load("SubPages/games.html", document.querySelector(".main-content"));
                    break;
                case 'links':
                    load("SubPages/links.html", document.querySelector(".main-content"));
                    break;
            }
            updateMobileTopbarLabel(page);
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        }

        // Source - https://stackoverflow.com/questions/17901116/i-need-the-equivalent-of-load-to-js
        function load(url, element)
        {
            req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.send(null);
            
            element.innerHTML = req.responseText; 
        }

        function loadContentBasedOnHash() {
            var hash = window.location.hash.substring(1); // Remove the '#' character
            switch (hash) {
                case 'algorithms':
                    load("SubPages/algorithms.html", document.querySelector(".main-content"));
                    updateMobileTopbarLabel('algorithms');
                    break;
                case 'projects':
                    load("SubPages/projects.html", document.querySelector(".main-content"));
                    updateMobileTopbarLabel('projects');
                    break;
                case 'music':
                    load("SubPages/music.html", document.querySelector(".main-content"));
                    updateMobileTopbarLabel('music');
                    break;
                case 'games':
                    load("SubPages/games.html", document.querySelector(".main-content"));
                    updateMobileTopbarLabel('games');
                    break;
                case 'links':
                    load("SubPages/links.html", document.querySelector(".main-content"));
                    updateMobileTopbarLabel('links');
                    break;
                case '':
                case 'home':
                    load("SubPages/home.html", document.querySelector(".main-content"));
                    updateMobileTopbarLabel('home');
                    break;  
                default:
                    load("SubPages/error404.html", document.querySelector(".main-content"));
                    updateMobileTopbarLabel('home');
                    break;
            }
        }
        window.addEventListener('hashchange', loadContentBasedOnHash);
        loadContentBasedOnHash();