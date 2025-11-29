function openFilterDropdown(){
            console.log("Opening filter dropdown");
            if (document.querySelector('.dropdown').style.visibility === 'visible'){
                document.querySelector('.dropdown').style.visibility = 'hidden';
                return;
            }
            document.querySelector('.dropdown').style.visibility = 'visible';
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
                    break;
                case 'projects':
                    load("SubPages/projects.html", document.querySelector(".main-content"));
                    break;
                case 'music':
                    load("SubPages/music.html", document.querySelector(".main-content"));
                    break;
                case 'home':
                default:
                    load("SubPages/home.html", document.querySelector(".main-content"));
                    break;
            }
        }
        loadContentBasedOnHash();