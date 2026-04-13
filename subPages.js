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

        function initProjectAtlas() {
            const atlases = document.querySelectorAll('.atlas');
            if (!atlases.length) return;

            const getEmbedUrl = url => {
                if (!url) return '';
                if (url.includes('youtube.com/watch')) {
                    return url.replace('watch?v=', 'embed/') + '?rel=0&showinfo=0';
                }
                if (url.includes('youtu.be/')) {
                    return url.replace('youtu.be/', 'www.youtube.com/embed/') + '?rel=0&showinfo=0';
                }
                return url;
            };

            atlases.forEach(atlas => {
                const mainImage = atlas.querySelector('.atlas-current');
                const mainVideo = atlas.querySelector('.atlas-video');
                const prevButton = atlas.querySelector('.atlas-nav.prev');
                const nextButton = atlas.querySelector('.atlas-nav.next');
                const previews = Array.from(atlas.querySelectorAll('.atlas-thumb'));
                if (!mainImage || !mainVideo || !previews.length) return;

                let currentIndex = 0;

                const activateThumb = index => {
                    currentIndex = (index + previews.length) % previews.length;
                    const item = previews[currentIndex];
                    const type = item.dataset.type || 'img';
                    const src = item.dataset.src;
                    const title = item.dataset.title || '';

                    previews.forEach((thumb, idx) => {
                        thumb.classList.toggle('active', idx === currentIndex);
                    });

                    if (type === 'video') {
                        mainImage.style.display = 'none';
                        mainVideo.style.display = 'block';
                        mainVideo.src = getEmbedUrl(item.dataset.videoUrl || src);
                        mainVideo.title = title;
                    } else {
                        mainVideo.style.display = 'none';
                        mainVideo.src = '';
                        mainImage.style.display = 'block';
                        mainImage.src = src;
                        mainImage.alt = title;
                    }

                    const activeThumb = previews[currentIndex];
                    activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                };

                previews.forEach((thumb, index) => {
                    thumb.addEventListener('click', () => activateThumb(index));
                });

                if (prevButton) {
                    prevButton.addEventListener('click', () => activateThumb(currentIndex - 1));
                }
                if (nextButton) {
                    nextButton.addEventListener('click', () => activateThumb(currentIndex + 1));
                }

                activateThumb(0);
            });
        }

        function initPageScripts() {
            initProjectAtlas();
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
            initPageScripts();
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
            initPageScripts();
        }
        window.addEventListener('hashchange', loadContentBasedOnHash);
        loadContentBasedOnHash();